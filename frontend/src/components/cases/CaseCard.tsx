import { ArrowRight20Regular, Calendar20Regular, Person20Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import type { KnowledgeCase } from "~/types/knowledgeCase";
import styles from "./CaseCard.module.css";

export function CaseCard({ item }: { item: KnowledgeCase }) {
  const formattedDate = new Intl.DateTimeFormat("es-VE", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(item.date));

  return (
    <article className={styles.card}>
      <div className={styles.topLine}><span className={`${styles.status} ${item.status === "Publicado" ? styles.published : styles.draft}`}>{item.status}</span><span className={styles.area}>{item.area}</span></div>
      <h2>{item.title}</h2>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.impact}>{item.impact}</p>
      <div className={styles.technologies}>{item.technology.map((technology) => <span key={technology}>{technology}</span>)}</div>
      <dl className={styles.meta}>
        <div><dt><Person20Regular aria-hidden="true" />Especialista</dt><dd>{item.specialist}</dd></div>
        <div><dt><Calendar20Regular aria-hidden="true" />Fecha</dt><dd>{formattedDate}</dd></div>
      </dl>
      <Link className={styles.link} to={`/cases/${item.id}`} aria-label={`Ver caso: ${item.title}`}>Ver caso completo <ArrowRight20Regular aria-hidden="true" /></Link>
    </article>
  );
}
