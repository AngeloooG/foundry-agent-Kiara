import type { ReactNode } from "react";
import styles from "./CaseNarrativeSection.module.css";

interface Props {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: "default" | "accent";
}

export function CaseNarrativeSection({
  eyebrow,
  title,
  children,
  tone = "default",
}: Props) {
  return (
    <section className={`${styles.section} ${tone === "accent" ? styles.accent : ""}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
