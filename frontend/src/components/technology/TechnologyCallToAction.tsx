import {
  ArrowRight24Regular,
  Chat24Regular,
  Library24Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import styles from "./TechnologyCallToAction.module.css";

export function TechnologyCallToAction() {
  return (
    <section className={styles.section} aria-labelledby="technology-cta-title">
      <p>Arquitectura aplicada</p>
      <h2 id="technology-cta-title">Conoce la solución desde la experiencia</h2>
      <span>
        Conversa con Kiara o explora casos para ver cómo estas capacidades se convierten en resultados.
      </span>
      <div className={styles.actions}>
        <Link className={styles.primary} to="/chat">
          <Chat24Regular aria-hidden="true" /> Hablar con Kiara
          <ArrowRight24Regular aria-hidden="true" />
        </Link>
        <Link className={styles.secondary} to="/cases">
          <Library24Regular aria-hidden="true" /> Explorar casos
        </Link>
      </div>
    </section>
  );
}
