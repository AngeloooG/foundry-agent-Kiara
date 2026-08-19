import { ArrowRight20Regular } from "@fluentui/react-icons";
import type { CaseMetric } from "~/types/knowledgeCase";
import styles from "./CaseMetrics.module.css";

export function CaseMetrics({ metrics }: { metrics: CaseMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="case-metrics-title">
      <header>
        <p>Evidencia cuantitativa</p>
        <h2 id="case-metrics-title">Métricas antes y después</h2>
      </header>
      <div className={styles.grid}>
        {metrics.map((metric) => (
          <article key={metric.label}>
            <h3>{metric.label}</h3>
            <div className={styles.comparison}>
              <span><small>Antes</small><strong>{metric.before}</strong></span>
              <ArrowRight20Regular aria-hidden="true" />
              <span className={styles.after}><small>Después</small><strong>{metric.after}</strong></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
