import {
  ArrowRight24Regular,
  CheckmarkCircle20Filled,
  Library24Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { TechnologyPills } from "./TechnologyPills";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <div className={styles.content}>
      <div className={styles.statusBadge}>
        <span className={styles.statusDot} aria-hidden="true" />
        Agente activo
        <span className={styles.statusDivider} aria-hidden="true" />
        MVP disponible
      </div>

      <p className={styles.eyebrow}>Memoria organizacional inteligente</p>

      <h1 id="kiara-home-title" className={styles.title}>
        Convierte experiencias de proyecto en
        <span className={styles.highlight}> conocimiento reutilizable</span>
      </h1>

      <p className={styles.description}>
        Kiara captura relatos, soluciones, métricas y lecciones aprendidas para
        convertir la experiencia del equipo en documentos profesionales listos
        para compartir, revisar y reutilizar.
      </p>

      <ul className={styles.assurances} aria-label="Capacidades principales">
        <li>
          <CheckmarkCircle20Filled aria-hidden="true" />
          Conversación natural, sin formularios rígidos
        </li>
        <li>
          <CheckmarkCircle20Filled aria-hidden="true" />
          Integración con el ecosistema Microsoft
        </li>
      </ul>

      <div className={styles.actions}>
        <Link className={styles.primaryAction} to="/chat">
          Hablar con Kiara
          <ArrowRight24Regular aria-hidden="true" />
        </Link>

        <Link className={styles.secondaryAction} to="/cases">
          <Library24Regular aria-hidden="true" />
          Ver casos generados
        </Link>
      </div>

      <TechnologyPills />
    </div>
  );
}
