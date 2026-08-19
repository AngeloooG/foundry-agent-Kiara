import {
  DocumentFolder20Regular,
  Print20Regular,
} from "@fluentui/react-icons";
import type { KnowledgeCase } from "~/types/knowledgeCase";
import styles from "./CaseSidebar.module.css";

export function CaseSidebar({ item }: { item: KnowledgeCase }) {
  return (
    <aside className={styles.sidebar} aria-label="Información complementaria del caso">
      <section>
        <p>Tecnologías</p>
        <div className={styles.technologies}>
          {item.technology.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </section>

      <section>
        <p>Ubicación documental</p>
        <div className={styles.path}>
          <DocumentFolder20Regular aria-hidden="true" />
          <span>{item.sharePointPath}</span>
        </div>
        <small>Ruta informativa del repositorio SharePoint.</small>
      </section>

      <button type="button" onClick={() => window.print()}>
        <Print20Regular aria-hidden="true" />
        Imprimir o guardar como PDF
      </button>
    </aside>
  );
}
