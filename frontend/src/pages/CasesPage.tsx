import {
    Book20Regular,
    Search24Regular,
} from "@fluentui/react-icons";
import { useState } from "react";
import { CaseCard } from "~/components/cases/CaseCard";
import { CaseFiltersBar } from "~/components/cases/CaseFiltersBar";
import { CasesRefreshButton } from "~/components/cases/CasesRefreshButton";
import {
    defaultCaseFilters,
    useCases,
} from "~/hooks/useCases";
import type {
    CaseFilters,
} from "~/types/knowledgeCase";
import styles from "./CasesPage.module.css";

export function CasesPage() {
    const [filters, setFilters] =
        useState<CaseFilters>(
            defaultCaseFilters,
        );

    const {
        cases,
        total,
        areas,
        technologies,
        isLoading,
        isRefreshing,
        error,
        refreshError,
        lastUpdatedUtc,
        refresh,
    } = useCases(filters);

    const handleClearFilters = () => {
        setFilters(defaultCaseFilters);
    };

    const handleRefresh = () => {
        void refresh();
    };

    return (
        <main className={styles.page}>
            <header className={styles.hero}>
                <div className={styles.heroIcon}>
                    <Book20Regular
                        aria-hidden="true"
                    />
                </div>

                <div className={styles.heroContent}>
                    <p className={styles.eyebrow}>
                        Biblioteca de conocimiento
                    </p>

                    <h1>Casos generados</h1>

                    <p className={styles.description}>
                        Explora soluciones, decisiones,
                        resultados y aprendizajes
                        documentados por el equipo.
                    </p>
                </div>

                <div className={styles.heroCounter}>
                    <strong>{total}</strong>

                    <span>
                        {total === 1
                            ? "caso disponible"
                            : "casos disponibles"}
                    </span>
                </div>
            </header>

            <section
                className={styles.content}
                aria-label="Biblioteca de casos"
            >
                <CasesRefreshButton
                    isRefreshing={isRefreshing}
                    lastUpdatedUtc={lastUpdatedUtc}
                    error={refreshError}
                    onRefresh={handleRefresh}
                />

                <CaseFiltersBar
                    filters={filters}
                    areas={areas}
                    technologies={technologies}
                    onChange={setFilters}
                    onClear={handleClearFilters}
                />

                <div className={styles.resultsBar}>
                    <p>
                        <strong>{cases.length}</strong>{" "}
                        {cases.length === 1
                            ? "resultado"
                            : "resultados"}
                    </p>

                    {isRefreshing && (
                        <span role="status">
                            Actualizando biblioteca...
                        </span>
                    )}
                </div>

                {isLoading && (
                    <div
                        className={styles.loading}
                        role="status"
                    >
                        Cargando biblioteca...
                    </div>
                )}

                {error && (
                    <div
                        className={styles.error}
                        role="alert"
                    >
                        <h2>
                            No fue posible cargar los casos
                        </h2>

                        <p>{error}</p>
                    </div>
                )}

                {!isLoading &&
                    !error &&
                    cases.length === 0 && (
                        <div className={styles.empty}>
                            <Search24Regular
                                aria-hidden="true"
                            />

                            <h2>
                                No encontramos casos
                            </h2>

                            <p>
                                Modifica la búsqueda o limpia
                                los filtros para volver a ver
                                la biblioteca.
                            </p>

                            <button
                                type="button"
                                onClick={
                                    handleClearFilters
                                }
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}

                {!isLoading &&
                    !error &&
                    cases.length > 0 && (
                        <div className={styles.grid}>
                            {cases.map((item) => (
                                <CaseCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>
                    )}
            </section>
        </main>
    );
}
