import { ArchitectureFlow } from "~/components/technology/ArchitectureFlow";
import { ArchitecturePrinciples } from "~/components/technology/ArchitecturePrinciples";
import { TechnologyCallToAction } from "~/components/technology/TechnologyCallToAction";
import styles from "./TechnologyPage.module.css";

export function TechnologyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.content}>
          <p>Tecnología detrás de Kiara</p>
          <h1>Una arquitectura empresarial para convertir conversación en conocimiento</h1>
          <span>
            Kiara combina identidad, agentes, datos y automatización en una solución desacoplada,
            trazable y preparada para evolucionar.
          </span>
          <dl>
            <div><dt>6</dt><dd>capas funcionales</dd></div>
            <div><dt>100%</dt><dd>acceso autenticado</dd></div>
            <div><dt>SSE</dt><dd>streaming de respuestas</dd></div>
          </dl>
        </div>
      </header>

      <ArchitectureFlow />
      <ArchitecturePrinciples />
      <TechnologyCallToAction />
    </main>
  );
}
