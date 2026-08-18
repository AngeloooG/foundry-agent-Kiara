import { Button, MessageBar, MessageBarBody, Spinner } from "@fluentui/react-components";
import { AgentChat } from "~/components/AgentChat";
import { useAgentMetadata } from "~/hooks/useAgentMetadata";
import styles from "./ChatPage.module.css";

export function ChatPage() {
  const { agentMetadata, isLoading, error, reload } = useAgentMetadata();

  if (isLoading) {
    return (
      <main className={styles.centered} aria-busy="true">
        <Spinner size="large" label="Cargando Kiara..." />
      </main>
    );
  }

  if (!agentMetadata) {
    return (
      <main className={styles.centered}>
        <MessageBar intent="error">
          <MessageBarBody>No fue posible cargar la configuración de Kiara.</MessageBarBody>
        </MessageBar>
        <Button appearance="primary" onClick={reload}>Reintentar</Button>
      </main>
    );
  }

  return (
    <main className={styles.chatPage}>
      {error && (
        <div className={styles.warning}>
          <MessageBar intent="warning">
            <MessageBarBody>
              Se está utilizando la configuración de respaldo. Detalle: {error}
            </MessageBarBody>
          </MessageBar>
        </div>
      )}
      <div className={styles.chatHost}>
        <AgentChat
          agentId={agentMetadata.id}
          agentName={agentMetadata.name}
          agentDescription={agentMetadata.description ?? undefined}
          agentLogo={agentMetadata.metadata?.logo}
          starterPrompts={agentMetadata.starterPrompts ?? undefined}
        />
      </div>
    </main>
  );
}
