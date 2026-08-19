import {
  Calendar20Regular,
  Clock20Regular,
  Folder20Regular,
  Person20Regular,
} from "@fluentui/react-icons";
import type { KnowledgeCase } from "~/types/knowledgeCase";
import styles from "./CaseDetailHero.module.css";

export function CaseDetailHero({ item }: { item: KnowledgeCase }) {
  const date = new Intl.DateTimeFormat("es-VE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(item.date));

  return (
    <header className={styles.hero}>
      <div className={styles.topLine}>
        <span
          className={`${styles.status} ${
            item.status === "Publicado" ? styles.published : styles.draft
          }`}
        >
          {item.status}
        </span>
        <span className={styles.area}>{item.area}</span>
      </div>

      <h1>{item.title}</h1>
      <p className={styles.impact}>{item.impact}</p>
      <p className={styles.description}>{item.description}</p>

      <dl className={styles.metadata}>
        <div>
          <dt><Person20Regular aria-hidden="true" /> Especialista</dt>
          <dd>{item.specialist}</dd>
          <small>{item.specialistRole}</small>
        </div>
        <div>
          <dt><Calendar20Regular aria-hidden="true" /> Fecha</dt>
          <dd>{date}</dd>
          <small>{item.client}</small>
        </div>
        <div>
          <dt><Folder20Regular aria-hidden="true" /> Fase</dt>
          <dd>{item.phase}</dd>
          <small>Estado del proyecto</small>
        </div>
        <div>
          <dt><Clock20Regular aria-hidden="true" /> Duración</dt>
          <dd>{item.duration}</dd>
          <small>Tiempo de ejecución</small>
        </div>
      </dl>
    </header>
  );
}
