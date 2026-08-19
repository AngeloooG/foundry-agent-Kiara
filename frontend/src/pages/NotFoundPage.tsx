import { ArrowLeft20Regular, Home24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.code} aria-hidden="true">404</div>
      <span aria-hidden="true"><Home24Regular /></span>
      <p>Ruta no disponible</p>
      <h1>La página solicitada no existe</h1>
      <strong>La dirección puede haber cambiado o no formar parte de la experiencia actual de Kiara.</strong>
      <div><Link className={styles.primary} to="/"><Home24Regular aria-hidden="true" /> Ir al inicio</Link><Link className={styles.secondary} to="/cases"><ArrowLeft20Regular aria-hidden="true" /> Explorar casos</Link></div>
    </main>
  );
}
