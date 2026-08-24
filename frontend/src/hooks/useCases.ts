import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { ApiCasesRepository } from "~/repositories/casesRepository";
import { CasesApi } from "~/services/casesApi";
import type { CaseFilters, KnowledgeCase } from "~/types/knowledgeCase";

export const defaultCaseFilters: CaseFilters = {
  query: "", status: "Todos", area: "Todas", technology: "Todas", sort: "newest",
};

export function useCases(filters: CaseFilters) {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [allCases, setAllCases] = useState<KnowledgeCase[]>([]);
  const [total, setTotal] = useState(0);
  const [lastUpdatedUtc, setLastUpdatedUtc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const activeController = useRef<AbortController | null>(null);

  const repository = useMemo(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "/api";
    return new ApiCasesRepository(new CasesApi(apiUrl, getAccessToken));
  }, [getAccessToken]);

  const load = useCallback(async (refresh: boolean) => {
    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;

    if (refresh) {
      setIsRefreshing(true);
      setRefreshError(null);
    } else {
      setIsLoading(true);
      setError(null);
    }

    try {
      const response = await repository.list({ refresh, signal: controller.signal });
      if (controller.signal.aborted) return;
      setAllCases(response.items);
      setTotal(response.total);
      setLastUpdatedUtc(response.lastUpdatedUtc);
    } catch (loadError: unknown) {
      if (loadError instanceof DOMException && loadError.name === "AbortError") return;
      const message = loadError instanceof Error ? loadError.message : "No fue posible cargar los casos.";
      if (refresh) setRefreshError(message);
      else setError(message);
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, [repository]);

  useEffect(() => {
    if (!isAuthenticated) {
      setError("Debes iniciar sesión para consultar los casos.");
      setIsLoading(false);
      return;
    }
    void load(false);
    return () => activeController.current?.abort();
  }, [isAuthenticated, load]);

  const areas = useMemo(() => [...new Set(allCases.map(item => item.area))].sort((a,b)=>a.localeCompare(b,"es")), [allCases]);
  const technologies = useMemo(() => [...new Set(allCases.flatMap(item => item.technology))].sort((a,b)=>a.localeCompare(b,"es")), [allCases]);

  const cases = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("es");
    return allCases.filter(item => {
      const searchable = [item.title,item.client,item.specialist,item.area,item.impact,...item.technology,...item.tags].join(" ").toLocaleLowerCase("es");
      return (!query || searchable.includes(query))
        && (filters.status === "Todos" || item.status === filters.status)
        && (filters.area === "Todas" || item.area === filters.area)
        && (filters.technology === "Todas" || item.technology.includes(filters.technology));
    }).sort((left,right) => {
      if (filters.sort === "title") return left.title.localeCompare(right.title,"es");
      const difference = new Date(left.date).getTime() - new Date(right.date).getTime();
      return filters.sort === "oldest" ? difference : -difference;
    });
  }, [allCases, filters]);

  return {
    cases, total, areas, technologies, isLoading, isRefreshing, error,
    refreshError, lastUpdatedUtc, refresh: () => load(true),
  };
}
