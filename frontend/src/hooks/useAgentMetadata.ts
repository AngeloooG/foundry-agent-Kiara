import { useCallback, useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import type { IAgentMetadata } from "~/types/chat";

interface AgentMetadataState {
  agentMetadata: IAgentMetadata | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

const fallbackMetadata: IAgentMetadata = {
  id: "fallback-agent",
  object: "agent",
  createdAt: Date.now() / 1000,
  name: "Kiara",
  description: "Agente de conocimiento corporativo de CONSEIN",
  model: "unknown",
  metadata: { logo: "Avatar_Default.svg" },
};

export function useAgentMetadata(): AgentMetadataState {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [agentMetadata, setAgentMetadata] = useState<IAgentMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const reload = useCallback(() => setRequestVersion((value) => value + 1), []);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadMetadata() {
      setIsLoading(true);
      setError(null);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("No fue posible adquirir el token de acceso.");

        const apiUrl = import.meta.env.VITE_API_URL || "/api";
        const response = await fetch(`${apiUrl}/agent`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = (await response.json()) as IAgentMetadata;
        setAgentMetadata(data);
        document.title = data.name ? `${data.name} | CONSEIN` : "Kiara | CONSEIN";
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        console.error("Error loading agent metadata:", loadError);
        setAgentMetadata(fallbackMetadata);
        setError(loadError instanceof Error ? loadError.message : "No fue posible cargar el agente.");
        document.title = "Kiara | CONSEIN";
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadMetadata();
    return () => controller.abort();
  }, [getAccessToken, isAuthenticated, requestVersion]);

  return { agentMetadata, isLoading, error, reload };
}
