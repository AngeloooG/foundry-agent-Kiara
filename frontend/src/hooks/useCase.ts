import { useEffect, useState } from "react";
import { casesRepository } from "~/repositories/casesRepository";
import type { KnowledgeCase } from "~/types/knowledgeCase";

interface UseCaseResult {
  item: KnowledgeCase | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useCase(id: string | undefined): UseCaseResult {
  const [item, setItem] = useState<KnowledgeCase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!id) {
      setItem(null);
      setNotFound(true);
      setIsLoading(false);
      return () => controller.abort();
    }

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    void casesRepository
      .getById(id, controller.signal)
      .then((result) => {
        if (!result) {
          setItem(null);
          setNotFound(true);
          return;
        }

        setItem(result);
      })
      .catch((loadError: unknown) => {
        if (
          loadError instanceof DOMException &&
          loadError.name === "AbortError"
        ) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No fue posible cargar el caso.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  return { item, isLoading, error, notFound };
}
