import styles from "./CaseResultsList.module.css";

export function CaseResultsList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}
