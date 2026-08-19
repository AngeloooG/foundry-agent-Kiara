import {
  ArrowLeft20Regular,
  Home20Regular,
  Lightbulb20Regular,
} from "@fluentui/react-icons";
import { Link, useParams } from "react-router-dom";
import { CaseDetailHero } from "~/components/cases/CaseDetailHero";
import { CaseMetrics } from "~/components/cases/CaseMetrics";
import { CaseNarrativeSection } from "~/components/cases/CaseNarrativeSection";
import { CaseSidebar } from "~/components/cases/CaseSidebar";
import { useCase } from "~/hooks/useCase";
import styles from "./CaseDetailPage.module.css";

export function CaseDetailPage() {
  const { id } = useParams();
  const { item, isLoading, error, notFound } = useCase(id);

  if (isLoading) {
    return <main className={styles.state} aria-busy="true">Cargando caso...</main>;
  }

  if (error) {
    return (
      <main className={styles.state} role="alert">
        <h1>No fue posible cargar el caso</h1>
        <p>{error}</p>
        <Link to="/cases">Volver a la biblioteca</Link>
      </main>
    );
  }

  if (notFound || !item) {
    return (
      <main className={styles.state}>
        <h1>Caso no encontrado</h1>
        <p>El identificador solicitado no existe en la biblioteca actual.</p>
        <Link to="/cases">Volver a la biblioteca</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
        <Link to="/"><Home20Regular aria-hidden="true" /> Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link to="/cases">Casos</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{item.title}</span>
      </nav>

      <Link className={styles.back} to="/cases">
        <ArrowLeft20Regular aria-hidden="true" /> Volver a la biblioteca
      </Link>

      <CaseDetailHero item={item} />

      <div className={styles.layout}>
        <div className={styles.content}>
          <CaseNarrativeSection eyebrow="Visión general" title="Resumen ejecutivo" tone="accent">
            <p>{item.executiveSummary}</p>
          </CaseNarrativeSection>

          <div className={styles.twoColumns}>
            <CaseNarrativeSection eyebrow="Punto de partida" title="Contexto">
              <p>{item.context}</p>
            </CaseNarrativeSection>
            <CaseNarrativeSection eyebrow="Desafío" title="Problema">
              <p>{item.problem}</p>
            </CaseNarrativeSection>
          </div>

          <CaseNarrativeSection eyebrow="Intervención" title="Solución implementada">
            <p>{item.solution}</p>
          </CaseNarrativeSection>

          <CaseNarrativeSection eyebrow="Impacto" title="Resultados obtenidos" tone="accent">
            <p>{item.results}</p>
          </CaseNarrativeSection>

          <CaseMetrics metrics={item.metrics} />

          <section className={styles.lessons} aria-labelledby="lessons-title">
            <p>Conocimiento transferible</p>
            <h2 id="lessons-title">Lecciones aprendidas</h2>
            <ol>
              {item.lessons.map((lesson, index) => (
                <li key={lesson}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{lesson}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.reuse} aria-labelledby="reuse-title">
            <Lightbulb20Regular aria-hidden="true" />
            <div>
              <p>Potencial de reutilización</p>
              <h2 id="reuse-title">¿Cómo puede aprovecharse nuevamente?</h2>
              <span>{item.reuse}</span>
            </div>
          </section>
        </div>

        <CaseSidebar item={item} />
      </div>
    </main>
  );
}
