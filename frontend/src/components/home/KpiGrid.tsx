import {
  Clock24Regular,
  Document24Regular,
  Library24Regular,
  PeopleTeam24Regular,
} from "@fluentui/react-icons";
import { dashboardMetrics } from "~/data/dashboardMetrics";
import styles from "./KpiGrid.module.css";

const items = [
  { label: "Casos registrados", value: dashboardMetrics.totalCases, detail: "Experiencias estructuradas", icon: <Library24Regular /> },
  { label: "Especialistas", value: dashboardMetrics.specialists, detail: "Participantes activos", icon: <PeopleTeam24Regular /> },
  { label: "Documentos", value: dashboardMetrics.documents, detail: "Activos de conocimiento", icon: <Document24Regular /> },
  { label: "Tiempo promedio", value: `${dashboardMetrics.averageMinutes} min`, detail: "De relato a borrador", icon: <Clock24Regular /> },
] as const;

export function KpiGrid() {
  return (
    <div className={styles.grid} aria-label="Indicadores generales de Kiara">
      {items.map((item) => (
        <article className={styles.card} key={item.label}>
          <span className={styles.icon} aria-hidden="true">{item.icon}</span>
          <div>
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
