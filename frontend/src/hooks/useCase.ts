import { useEffect, useMemo, useState } from "react";
import { ApiCasesRepository } from "~/repositories/casesRepository";
import { CasesApi } from "~/services/casesApi";
import type { KnowledgeCase } from "~/types/knowledgeCase";
import { useAuth } from "~/hooks/useAuth";

interface UseCaseResult {
  item: KnowledgeCase | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useCase(id: string | undefined): UseCaseResult {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [item, setItem] = useState<KnowledgeCase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const repository = useMemo(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "/api";
    return new ApiCasesRepository(new CasesApi(apiUrl, getAccessToken));
  }, [getAccessToken]);

  useEffect(() => {
    const controller = new AbortController();

    if (!id) {
      setItem(null);
      setNotFound(true);
      setIsLoading(false);
      return () => controller.abort();
    }

    if (!isAuthenticated) {
      setItem(null);
      setError("Debes iniciar sesión para consultar el caso.");
      setIsLoading(false);
      return () => controller.abort();
    }

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    void repository.getById(id, controller.signal)
      .then((result) => {
        if (!result) {
          setItem(null);
          setNotFound(true);
          return;
        }
        setItem(result);
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : "No fue posible cargar el caso.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [id, isAuthenticated, repository]);

  return { item, isLoading, error, notFound };
}
