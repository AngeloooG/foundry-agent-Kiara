import styles from "./TechnologyPills.module.css";

const technologies = [
  "Microsoft Foundry",
  "Copilot Studio",
  "Power Automate",
  "SharePoint",
  "Azure SQL",
  "MCP",
] as const;

export function TechnologyPills() {
  return (
    <div className={styles.wrapper} aria-label="Tecnologías de Kiara">
      <span className={styles.label}>Construida con</span>
      <div className={styles.list}>
        {technologies.map((technology) => (
          <span key={technology} className={styles.pill}>
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}
