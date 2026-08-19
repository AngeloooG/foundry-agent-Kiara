import { casesByTechnology, dashboardMetrics, documentsByMonth } from "~/data/dashboardMetrics";
import styles from "./MetricsFallback.module.css";

export function MetricsFallback() {
  return (
    <details className={styles.details}>
      <summary>Consultar los datos del dashboard en formato accesible</summary>
      <div className={styles.tables}>
        <table><caption>Estado documental</caption><thead><tr><th>Estado</th><th>Cantidad</th></tr></thead><tbody><tr><td>Publicados</td><td>{dashboardMetrics.published}</td></tr><tr><td>Borradores</td><td>{dashboardMetrics.drafts}</td></tr></tbody></table>
        <table><caption>Casos por tecnología</caption><thead><tr><th>Tecnología</th><th>Casos</th></tr></thead><tbody>{casesByTechnology.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.value}</td></tr>)}</tbody></table>
        <table><caption>Documentos por mes</caption><thead><tr><th>Mes</th><th>Documentos</th></tr></thead><tbody>{documentsByMonth.map((item) => <tr key={item.month}><td>{item.month}</td><td>{item.documents}</td></tr>)}</tbody></table>
      </div>
    </details>
  );
}
