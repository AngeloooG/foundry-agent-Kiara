import { Link } from "react-router-dom";
import styles from "./PageStatus.module.css";

export function HomePage() {
  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>Agente de conocimiento corporativo</p>
      <h1 className={styles.title}>Kiara</h1>
      <p className={styles.description}>
        Convierte experiencias de proyecto en conocimiento estructurado y reutilizable para CONSEIN.
        La experiencia visual completa de inicio se integrará en el Lote 2.
      </p>
      <Link className={styles.primaryLink} to="/chat">Hablar con Kiara</Link>
    </main>
  );
}
