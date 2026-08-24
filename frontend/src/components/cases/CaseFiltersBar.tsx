import {
    Dismiss20Regular,
    Search20Regular,
} from "@fluentui/react-icons";
import type {
    CaseFilters,
} from "~/types/knowledgeCase";
import styles from "./CaseFiltersBar.module.css";

interface CaseFiltersBarProps {
    filters: CaseFilters;
    areas: string[];
    technologies: string[];
    onChange:
    (next: CaseFilters) => void;
    onClear: () => void;
}

export function CaseFiltersBar({
    filters,
    areas,
    technologies,
    onChange,
    onClear,
}: CaseFiltersBarProps) {
    const hasFilters =
        Boolean(filters.query) ||
        filters.status !== "Todos" ||
        filters.area !== "Todas" ||
        filters.technology !== "Todas" ||
        filters.sort !== "newest";

    return (
        <section
            className={styles.controls}
            aria-label="Filtros de casos"
        >
            <label className={styles.search}>
                <span>Buscar casos</span>

                <div className={styles.searchField}>
                    <Search20Regular
                        aria-hidden="true"
                    />

                    <input
                        type="search"
                        value={filters.query}
                        onChange={(event) => {
                            onChange({
                                ...filters,
                                query:
                                    event.target.value,
                            });
                        }}
                        placeholder="Buscar por título, cliente, especialista o tecnología"
                    />
                </div>
            </label>

            <label className={styles.field}>
                <span>Estado</span>

                <select
                    value={filters.status}
                    onChange={(event) => {
                        onChange({
                            ...filters,
                            status:
                                event.target.value as
                                CaseFilters["status"],
                        });
                    }}
                >
                    <option value="Todos">
                        Todos
                    </option>

                    <option value="Publicado">
                        Publicado
                    </option>

                    <option value="Borrador">
                        Borrador
                    </option>
                </select>
            </label>

            <label className={styles.field}>
                <span>Industria</span>

                <select
                    value={filters.area}
                    onChange={(event) => {
                        onChange({
                            ...filters,
                            area:
                                event.target.value,
                        });
                    }}
                >
                    <option value="Todas">
                        Todas
                    </option>

                    {areas.map((area) => (
                        <option
                            key={area}
                            value={area}
                        >
                            {area}
                        </option>
                    ))}
                </select>
            </label>

            <label className={styles.field}>
                <span>Tecnología</span>

                <select
                    value={filters.technology}
                    onChange={(event) => {
                        onChange({
                            ...filters,
                            technology:
                                event.target.value,
                        });
                    }}
                >
                    <option value="Todas">
                        Todas
                    </option>

                    {technologies.map(
                        (technology) => (
                            <option
                                key={technology}
                                value={technology}
                            >
                                {technology}
                            </option>
                        ),
                    )}
                </select>
            </label>

            <label className={styles.field}>
                <span>Ordenar</span>

                <select
                    value={filters.sort}
                    onChange={(event) => {
                        onChange({
                            ...filters,
                            sort:
                                event.target.value as
                                CaseFilters["sort"],
                        });
                    }}
                >
                    <option value="newest">
                        Más recientes
                    </option>

                    <option value="oldest">
                        Más antiguos
                    </option>

                    <option value="title">
                        Título A-Z
                    </option>
                </select>
            </label>

            <button
                className={styles.clear}
                type="button"
                onClick={onClear}
                disabled={!hasFilters}
            >
                <Dismiss20Regular
                    aria-hidden="true"
                />

                Limpiar
            </button>
        </section>
    );
}