import { ArrowDown24Regular } from "@fluentui/react-icons";
import { architectureLayers } from "~/data/technologyArchitecture";
import styles from "./ArchitectureFlow.module.css";

export function ArchitectureFlow() {
  return (
    <section className={styles.section} aria-labelledby="architecture-flow-title">
      <header className={styles.heading}>
        <p>Arquitectura por capas</p>
        <h2 id="architecture-flow-title">Del usuario al conocimiento empresarial</h2>
        <span>
          Cada capa tiene una responsabilidad clara y se conecta mediante contratos autenticados.
        </span>
      </header>

      <ol className={styles.flow}>
        {architectureLayers.map((layer, index) => (
          <li className={styles.item} key={layer.id}>
            <article className={styles.card}>
              <span className={styles.step} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.icon} aria-hidden="true">{layer.icon}</span>
              <p>{layer.eyebrow}</p>
              <h3>{layer.title}</h3>
              <span className={styles.description}>{layer.description}</span>
              <div className={styles.technologies}>
                {layer.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>

            {index < architectureLayers.length - 1 && (
              <span className={styles.connector} aria-hidden="true">
                <ArrowDown24Regular />
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
