import { Dismiss20Regular, Search20Regular } from "@fluentui/react-icons";
import type { FaqCategory } from "~/data/faqItems";
import styles from "./FaqControls.module.css";

export type FaqCategoryFilter = "Todas" | FaqCategory;

interface Props {
  query: string;
  category: FaqCategoryFilter;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: FaqCategoryFilter) => void;
  onClear: () => void;
}

const categories: FaqCategoryFilter[] = ["Todas", "Uso", "Seguridad", "Documentos", "Conocimiento"];

export function FaqControls({ query, category, onQueryChange, onCategoryChange, onClear }: Props) {
  return (
    <section className={styles.controls} aria-label="Buscar y filtrar preguntas">
      <label className={styles.search}>
        <span>Buscar preguntas</span>
        <div><Search20Regular aria-hidden="true" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Ejemplo: documentos, seguridad o SharePoint" /></div>
      </label>
      <div className={styles.categories} aria-label="Categorías">
        {categories.map((item) => (
          <button type="button" key={item} className={category === item ? styles.active : ""} onClick={() => onCategoryChange(item)} aria-pressed={category === item}>{item}</button>
        ))}
      </div>
      <button className={styles.clear} type="button" onClick={onClear} disabled={!query && category === "Todas"}><Dismiss20Regular aria-hidden="true" /> Limpiar</button>
    </section>
  );
}
