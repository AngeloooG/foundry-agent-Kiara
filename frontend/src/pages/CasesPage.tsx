import { useState } from "react";
import { Search24Regular } from "@fluentui/react-icons";
import { CaseCard } from "~/components/cases/CaseCard";
import { CaseFiltersBar } from "~/components/cases/CaseFiltersBar";
import { defaultCaseFilters, useCases } from "~/hooks/useCases";
import type { CaseFilters } from "~/types/knowledgeCase";
import styles from "./CasesPage.module.css";

export function CasesPage() {
  const [filters, setFilters] = useState<CaseFilters>(defaultCaseFilters);
  const { cases, total, areas, technologies, isLoading, error } = useCases(filters);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div><p>Biblioteca de conocimiento</p><h1>Casos generados</h1><span>Explora soluciones, decisiones, resultados y aprendizajes documentados por el equipo.</span></div>
        <aside><strong>{total}</strong><span>casos disponibles</span></aside>
      </header>

      <CaseFiltersBar filters={filters} areas={areas} technologies={technologies} onChange={setFilters} onClear={() => setFilters(defaultCaseFilters)} />

      <div className={styles.resultsLine} role="status"><strong>{cases.length}</strong> {cases.length === 1 ? "resultado" : "resultados"}</div>

      {isLoading && <div className={styles.state}>Cargando biblioteca...</div>}
      {error && <div className={`${styles.state} ${styles.error}`} role="alert">{error}</div>}
      {!isLoading && !error && cases.length === 0 && (
        <div className={styles.state}><Search24Regular aria-hidden="true" /><h2>No encontramos casos</h2><p>Modifica la búsqueda o limpia los filtros para volver a ver la biblioteca.</p><button type="button" onClick={() => setFilters(defaultCaseFilters)}>Limpiar filtros</button></div>
      )}
      {!isLoading && !error && cases.length > 0 && <section className={styles.grid} aria-label="Resultados de casos">{cases.map((item) => <CaseCard key={item.id} item={item} />)}</section>}
    </main>
  );
}
