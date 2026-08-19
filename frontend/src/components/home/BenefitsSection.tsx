import {
  Briefcase24Regular,
  Building24Regular,
  Lightbulb24Regular,
} from "@fluentui/react-icons";
import { SectionHeading } from "./SectionHeading";
import styles from "./BenefitsSection.module.css";

const audiences = [
  { icon: <Lightbulb24Regular />, title: "Especialistas", statement: "Documentar sin interrumpir el ritmo técnico.", benefits: ["Preguntas adaptadas al relato", "Estructura profesional automática", "Lecciones aprendidas preservadas"] },
  { icon: <Briefcase24Regular />, title: "Ventas y preventa", statement: "Encontrar evidencia para construir propuestas con mayor rapidez.", benefits: ["Casos comparables", "Métricas de impacto", "Soluciones y tecnologías reutilizables"] },
  { icon: <Building24Regular />, title: "CONSEIN", statement: "Convertir experiencia acumulada en una ventaja organizacional.", benefits: ["Memoria centralizada", "Menor dependencia individual", "Conocimiento trazable y escalable"] },
] as const;

export function BenefitsSection() {
  return (
    <section className={styles.section} aria-labelledby="benefits-title">
      <SectionHeading eyebrow="Valor para el equipo" title="Una experiencia, múltiples formas de generar valor" />
      <div className={styles.grid} id="benefits-title">
        {audiences.map((audience) => (
          <article key={audience.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">{audience.icon}</span>
            <h3>{audience.title}</h3>
            <p className={styles.statement}>{audience.statement}</p>
            <ul>
              {audience.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
