import { Link } from "react-router-dom";
import styles from "./HomeFooter.module.css";

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}><span aria-hidden="true">K</span><div><strong>Kiara</strong><small>Memoria organizacional inteligente</small></div></div>
      <nav aria-label="Navegación de pie de página">
        <Link to="/chat">Chat</Link>
        <Link to="/cases">Casos</Link>
        <Link to="/technology">Tecnología</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
      <p>CONSEIN · 2026</p>
    </footer>
  );
}
