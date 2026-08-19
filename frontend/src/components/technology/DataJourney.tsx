import {
  ArrowRight20Regular,
  ChatMultiple24Regular,
  DocumentAdd24Regular,
  Search24Regular,
  Sparkle24Regular,
} from "@fluentui/react-icons";
import styles from "./DataJourney.module.css";

const stages = [
  {
    title: "Conversación",
    description: "La experiencia se captura en lenguaje natural.",
    icon: <ChatMultiple24Regular />,
  },
  {
    title: "Estructuración",
    description: "Kiara identifica contexto, solución, métricas y aprendizajes.",
    icon: <Sparkle24Regular />,
  },
  {
    title: "Recuperación",
    description: "Las fuentes empresariales complementan y respaldan el proceso.",
    icon: <Search24Regular />,
  },
  {
    title: "Activo final",
    description: "El resultado queda disponible como documento y caso reutilizable.",
    icon: <DocumentAdd24Regular />,
  },
] as const;

export function DataJourney() {
  return (
    <section className={styles.section} aria-labelledby="data-journey-title">
      <header>
        <p>Flujo de información</p>
        <h2 id="data-journey-title">Cómo se transforma una experiencia</h2>
      </header>

      <ol className={styles.journey}>
        {stages.map((stage, index) => (
          <li key={stage.title}>
            <article>
              <span className={styles.icon} aria-hidden="true">{stage.icon}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
            {index < stages.length - 1 && (
              <ArrowRight20Regular className={styles.arrow} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
