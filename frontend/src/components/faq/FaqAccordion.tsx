import { ChevronDown20Regular } from "@fluentui/react-icons";
import type { FaqItem } from "~/data/faqItems";
import styles from "./FaqAccordion.module.css";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details className={styles.item} key={item.id}>
          <summary>
            <span className={styles.category}>{item.category}</span>
            <strong>{item.question}</strong>
            <ChevronDown20Regular aria-hidden="true" />
          </summary>
          <div className={styles.answer}><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
