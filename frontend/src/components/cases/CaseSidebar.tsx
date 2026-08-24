import {
  DocumentFolder20Regular,
  Open20Regular,
} from "@fluentui/react-icons";
import type { KnowledgeCase } from "~/types/knowledgeCase";
import styles from "./CaseSidebar.module.css";

interface CaseSidebarProps {
  item: KnowledgeCase;
}

export function CaseSidebar({ item }: CaseSidebarProps) {
  const hasTechnologies = item.technology.length > 0;

  return (
    <aside className={styles.sidebar}>
      <section>
        <p>Tecnologías</p>

        {hasTechnologies ? (
          <div className={styles.technologies}>
            {item.technology.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        ) : (
          <span className={styles.empty}>
            Sin tecnologías registradas.
          </span>
        )}
      </section>

      <section>
        <p>Ubicación documental</p>

        {item.documentUrl ? (
          <>
            <a
              className={styles.documentLink}
              href={item.documentUrl}
              target="_blank"
              rel="noreferrer"
            >
              <DocumentFolder20Regular aria-hidden="true" />
              <span>Abrir documento en SharePoint</span>
              <Open20Regular aria-hidden="true" />
            </a>

            <small>
              El documento se abrirá en una pestaña nueva.
            </small>
          </>
        ) : (
          <span className={styles.empty}>
            El caso no tiene un documento asociado.
          </span>
        )}
      </section>
    </aside>
  );
}