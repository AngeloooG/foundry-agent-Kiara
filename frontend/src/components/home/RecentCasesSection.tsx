import { ArrowRight20Regular, Calendar20Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { SectionHeading } from "./SectionHeading";
import styles from "./RecentCasesSection.module.css";

const recentCases = [
  { id: "1", area: "Automatización & IA", title: "Automatización documental para aprobación interna", impact: "70% menos tiempo de elaboración", technology: ["Power Automate", "SharePoint"], date: "28 jul 2026" },
  { id: "3", area: "DATA AUTOMATION & AI", title: "Agente interno para consulta de procedimientos", impact: "Atención interna 3 veces más rápida", technology: ["Copilot Studio", "Azure AI Search"], date: "15 jul 2026" },
  { id: "4", area: "Data & Analytics", title: "Gobierno de datos para reportes operativos", impact: "65% menos tiempo de reporte", technology: ["Azure SQL", "Power BI"], date: "20 jul 2026" },
] as const;

export function RecentCasesSection() {
  return (
    <section className={styles.section} aria-labelledby="cases-title">
      <div className={styles.headerRow}>
        <SectionHeading eyebrow="Conocimiento disponible" title="Experiencias recientes" align="left" />
        <Link className={styles.viewAll} to="/cases">Ver biblioteca <ArrowRight20Regular aria-hidden="true" /></Link>
      </div>
      <div className={styles.grid} id="cases-title">
        {recentCases.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.meta}><span>{item.area}</span><span><Calendar20Regular aria-hidden="true" />{item.date}</span></div>
            <h3>{item.title}</h3>
            <p className={styles.impact}>{item.impact}</p>
            <div className={styles.technologies}>{item.technology.map((technology) => <span key={technology}>{technology}</span>)}</div>
            <Link className={styles.caseLink} to={`/cases/${item.id}`}>Ver caso <ArrowRight20Regular aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
