import { useEffect, useMemo, useState } from "react";
import { ApiCasesRepository } from "~/repositories/casesRepository";
import { CasesApi } from "~/services/casesApi";
import type { CaseFilters, KnowledgeCase } from "~/types/knowledgeCase";
import { useAuth } from "~/hooks/useAuth";

export const defaultCaseFilters: CaseFilters = {
  query: "",
  status: "Todos",
  area: "Todas",
  technology: "Todas",
  sort: "newest",
};

export function useCases(filters: CaseFilters) {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [cases, setCases] = useState<KnowledgeCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = useMemo(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "/api";
    return new ApiCasesRepository(new CasesApi(apiUrl, getAccessToken));
  }, [getAccessToken]);

  useEffect(() => {
    const controller = new AbortController();

    if (!isAuthenticated) {
      setCases([]);
      setError("Debes iniciar sesión para consultar los casos.");
      setIsLoading(false);
      return () => controller.abort();
    }

    setIsLoading(true);
    setError(null);

    void repository.list(controller.signal)
      .then(setCases)
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : "No fue posible cargar los casos.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [isAuthenticated, repository]);

  const areas = useMemo(
    () => [...new Set(cases.map((item) => item.area))].sort((a, b) => a.localeCompare(b, "es")),
    [cases],
  );

  const technologies = useMemo(
    () => [...new Set(cases.flatMap((item) => item.technology))].sort((a, b) => a.localeCompare(b, "es")),
    [cases],
  );

  const filteredCases = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("es");
    const result = cases.filter((item) => {
      const searchable = [
        item.title,
        item.client,
        item.specialist,
        item.area,
        item.impact,
        ...item.technology,
        ...item.tags,
      ].join(" ").toLocaleLowerCase("es");

      return (!query || searchable.includes(query))
        && (filters.status === "Todos" || item.status === filters.status)
        && (filters.area === "Todas" || item.area === filters.area)
        && (filters.technology === "Todas" || item.technology.includes(filters.technology));
    });

    return result.sort((left, right) => {
      if (filters.sort === "title") return left.title.localeCompare(right.title, "es");
      const difference = new Date(left.date).getTime() - new Date(right.date).getTime();
      return filters.sort === "oldest" ? difference : -difference;
    });
  }, [cases, filters]);

  return { cases: filteredCases, total: cases.length, areas, technologies, isLoading, error };
}
