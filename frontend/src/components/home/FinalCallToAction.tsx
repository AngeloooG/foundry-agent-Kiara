import { ArrowRight24Regular, Chat24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import styles from "./FinalCallToAction.module.css";

export function FinalCallToAction() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.icon} aria-hidden="true"><Chat24Regular /></span>
      <p className={styles.eyebrow}>Tu experiencia puede ayudar al próximo proyecto</p>
      <h2 id="final-cta-title">Convierte lo aprendido hoy en una ventaja para mañana</h2>
      <p>Kiara te acompaña desde el relato inicial hasta un documento estructurado y listo para reutilizar.</p>
      <Link className={styles.action} to="/chat">Comenzar una conversación <ArrowRight24Regular aria-hidden="true" /></Link>
    </section>
  );
}
