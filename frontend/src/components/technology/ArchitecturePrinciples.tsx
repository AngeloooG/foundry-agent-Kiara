import { architecturePrinciples } from "~/data/technologyArchitecture";
import styles from "./ArchitecturePrinciples.module.css";

export function ArchitecturePrinciples() {
  return (
    <section className={styles.section} aria-labelledby="principles-title">
      <header>
        <p>Principios</p>
        <h2 id="principles-title">Decisiones que sostienen la solución</h2>
        <span>
          La arquitectura prioriza seguridad, trazabilidad y evolución independiente de los componentes.
        </span>
      </header>

      <div className={styles.grid}>
        {architecturePrinciples.map((principle) => (
          <article key={principle.title}>
            <span aria-hidden="true">{principle.icon}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
