import {
  ArrowSync24Regular,
  DataUsage24Regular,
  DocumentDismiss24Regular,
  PeopleTeam24Regular,
  Search24Regular,
  Timer24Regular,
} from "@fluentui/react-icons";
import { SectionHeading } from "./SectionHeading";
import styles from "./ProblemSection.module.css";

const problems = [
  { icon: <DocumentDismiss24Regular />, title: "Conocimiento disperso", description: "Las experiencias quedan repartidas entre chats, correos, documentos y recuerdos individuales." },
  { icon: <Timer24Regular />, title: "Documentar toma tiempo", description: "El equipo técnico prioriza la entrega y pospone la documentación hasta que el contexto se pierde." },
  { icon: <Search24Regular />, title: "Difícil de encontrar", description: "Ventas y preventa no localizan rápidamente experiencias comparables para nuevas oportunidades." },
  { icon: <PeopleTeam24Regular />, title: "Dependencia de especialistas", description: "El conocimiento estratégico permanece concentrado en pocas personas y no escala al resto del equipo." },
  { icon: <DataUsage24Regular />, title: "Métricas incompletas", description: "Resultados, impactos y aprendizajes no se capturan con una estructura consistente." },
  { icon: <ArrowSync24Regular />, title: "Trabajo repetido", description: "Soluciones, argumentos y decisiones se reconstruyen porque no existe una memoria reutilizable." },
] as const;

export function ProblemSection() {
  return (
    <section className={styles.section} aria-labelledby="problem-title">
      <SectionHeading
        eyebrow="El reto"
        title="La experiencia existe, pero rara vez se convierte en memoria organizacional"
        description="Kiara reduce la fricción entre ejecutar un proyecto y dejar conocimiento útil para el siguiente equipo."
      />
      <div className={styles.grid} id="problem-title">
        {problems.map((problem, index) => (
          <article key={problem.title} className={styles.card}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <span className={styles.icon} aria-hidden="true">{problem.icon}</span>
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
