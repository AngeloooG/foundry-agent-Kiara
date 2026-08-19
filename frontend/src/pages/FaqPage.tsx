import { useMemo, useState } from "react";
import { QuestionCircle24Regular } from "@fluentui/react-icons";
import { FaqAccordion } from "~/components/faq/FaqAccordion";
import { FaqCallToAction } from "~/components/faq/FaqCallToAction";
import { FaqControls, type FaqCategoryFilter } from "~/components/faq/FaqControls";
import { faqItems } from "~/data/faqItems";
import styles from "./FaqPage.module.css";

export function FaqPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategoryFilter>("Todas");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return faqItems.filter((item) => {
      const matchesCategory = category === "Todas" || item.category === category;
      const searchable = `${item.question} ${item.answer} ${item.category}`.toLocaleLowerCase("es");
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query]);

  const clearFilters = () => { setQuery(""); setCategory("Todas"); };

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span aria-hidden="true"><QuestionCircle24Regular /></span>
        <p>Centro de ayuda</p>
        <h1>Preguntas frecuentes</h1>
        <strong>Encuentra respuestas sobre el uso de Kiara, seguridad, documentos y fuentes de conocimiento.</strong>
        <dl><div><dt>{faqItems.length}</dt><dd>respuestas disponibles</dd></div><div><dt>4</dt><dd>categorías</dd></div></dl>
      </header>

      <section className={styles.content} aria-label="Preguntas frecuentes">
        <FaqControls query={query} category={category} onQueryChange={setQuery} onCategoryChange={setCategory} onClear={clearFilters} />
        <div className={styles.results} role="status"><strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? "pregunta" : "preguntas"}</div>
        {filteredItems.length > 0 ? (
          <FaqAccordion items={filteredItems} />
        ) : (
          <div className={styles.empty}>
            <QuestionCircle24Regular aria-hidden="true" />
            <h2>No encontramos una respuesta</h2>
            <p>Prueba otra búsqueda o elimina los filtros seleccionados.</p>
            <button type="button" onClick={clearFilters}>Limpiar búsqueda</button>
          </div>
        )}
      </section>

      <FaqCallToAction />
    </main>
  );
}
