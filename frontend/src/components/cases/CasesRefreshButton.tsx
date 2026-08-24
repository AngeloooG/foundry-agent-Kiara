import { ArrowClockwise20Regular } from "@fluentui/react-icons";
import styles from "./CasesRefreshButton.module.css";

interface Props {
  isRefreshing: boolean;
  lastUpdatedUtc: string | null;
  error: string | null;
  onRefresh: () => void;
}

export function CasesRefreshButton({ isRefreshing, lastUpdatedUtc, error, onRefresh }: Props) {
  const formatted = lastUpdatedUtc
    ? new Intl.DateTimeFormat("es-VE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastUpdatedUtc))
    : "Sin actualización registrada";

  return (
    <div className={styles.wrapper}>
      <div>
        <span>Última actualización</span>
        <strong>{formatted}</strong>
        {error && <small role="status">{error}</small>}
      </div>
      <button type="button" onClick={onRefresh} disabled={isRefreshing}>
        <ArrowClockwise20Regular aria-hidden="true" />
        {isRefreshing ? "Actualizando..." : "Actualizar"}
      </button>
    </div>
  );
}
