import { KpiGrid } from "./KpiGrid";
import { MetricsCharts } from "./MetricsCharts";
import { MetricsFallback } from "./MetricsFallback";
import { SectionHeading } from "./SectionHeading";
import styles from "./MetricsSection.module.css";

export function MetricsSection() {
  return (
    <section className={styles.section} aria-labelledby="metrics-title">
      <SectionHeading
        eyebrow="Impacto acumulado"
        title="El conocimiento también se puede medir"
        description="Una vista agregada de la adopción y producción de activos de conocimiento durante el período de demostración."
      />
      <div id="metrics-title" className={styles.content}>
        <KpiGrid />
        <MetricsCharts />
        <MetricsFallback />
      </div>
      <p className={styles.note}>Datos demostrativos. La integración productiva deberá obtener estas métricas desde un endpoint agregado.</p>
    </section>
  );
}
