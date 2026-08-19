import { Dismiss20Regular, Search20Regular } from "@fluentui/react-icons";
import type { CaseFilters } from "~/types/knowledgeCase";
import styles from "./CaseFiltersBar.module.css";

interface Props {
  filters: CaseFilters;
  areas: string[];
  technologies: string[];
  onChange: (next: CaseFilters) => void;
  onClear: () => void;
}

export function CaseFiltersBar({ filters, areas, technologies, onChange, onClear }: Props) {
  const hasFilters = filters.query || filters.status !== "Todos" || filters.area !== "Todas" || filters.technology !== "Todas" || filters.sort !== "newest";

  return (
    <section className={styles.filters} aria-label="Filtros de casos">
      <label className={styles.search}>
        <Search20Regular aria-hidden="true" />
        <span className={styles.srOnly}>Buscar casos</span>
        <input value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} placeholder="Buscar por título, cliente, especialista o tecnología" />
      </label>

      <label><span>Estado</span><select value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as CaseFilters["status"] })}><option>Todos</option><option>Publicado</option><option>Borrador</option></select></label>
      <label><span>Área</span><select value={filters.area} onChange={(event) => onChange({ ...filters, area: event.target.value })}><option>Todas</option>{areas.map((area) => <option key={area}>{area}</option>)}</select></label>
      <label><span>Tecnología</span><select value={filters.technology} onChange={(event) => onChange({ ...filters, technology: event.target.value })}><option>Todas</option>{technologies.map((technology) => <option key={technology}>{technology}</option>)}</select></label>
      <label><span>Ordenar</span><select value={filters.sort} onChange={(event) => onChange({ ...filters, sort: event.target.value as CaseFilters["sort"] })}><option value="newest">Más recientes</option><option value="oldest">Más antiguos</option><option value="title">Título A-Z</option></select></label>

      <button type="button" className={styles.clear} onClick={onClear} disabled={!hasFilters}><Dismiss20Regular aria-hidden="true" /> Limpiar</button>
    </section>
  );
}
