import {
  ChatMultiple24Regular,
  DocumentAdd24Regular,
  Edit24Regular,
  FolderOpen24Regular,
  Sparkle24Regular,
} from "@fluentui/react-icons";
import { SectionHeading } from "./SectionHeading";
import styles from "./ProcessSection.module.css";

const steps = [
  { icon: <ChatMultiple24Regular />, title: "Cuenta la experiencia", description: "Describe el proyecto como lo harías con otra persona. Kiara identifica contexto, problema y solución." },
  { icon: <Sparkle24Regular />, title: "Kiara profundiza", description: "El agente detecta vacíos y formula preguntas concretas sobre decisiones, métricas y aprendizajes." },
  { icon: <Edit24Regular />, title: "Revisa la estructura", description: "La información se organiza con un tono profesional, ejecutivo y consistente." },
  { icon: <FolderOpen24Regular />, title: "Selecciona el destino", description: "Define el área, cliente y proyecto donde debe almacenarse el caso." },
  { icon: <DocumentAdd24Regular />, title: "Genera y reutiliza", description: "El documento queda listo para consulta, venta, preventa y futuros proyectos." },
] as const;

export function ProcessSection() {
  return (
    <section className={styles.section} aria-labelledby="process-title">
      <SectionHeading
        eyebrow="Cómo funciona"
        title="De una conversación a un activo de conocimiento"
        description="Un flujo guiado que preserva el criterio de los especialistas sin imponer formularios extensos."
      />
      <ol className={styles.timeline} id="process-title">
        {steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.connector} aria-hidden="true" />
            <span className={styles.badge} aria-hidden="true">{index + 1}</span>
            <span className={styles.icon} aria-hidden="true">{step.icon}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
