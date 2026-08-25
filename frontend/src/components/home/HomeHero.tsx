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
      <div
        className={styles.statusBadge}
        role="status"
        aria-label="Estado del agente: activo"
      >
        <span
          className={styles.statusIndicator}
          aria-hidden="true"
        >
          <span className={styles.statusPulse} />
          <span className={styles.statusDot} />
        </span>

        <span>Agente activo</span>
      </div>

      <p className={styles.eyebrow}>
        Memoria organizacional inteligente
      </p>

      <h1 className={styles.title}>
        Convierte experiencias de proyecto en{" "}
        <span className={styles.highlight}>
          conocimiento reutilizable
        </span>
      </h1>

      <p className={styles.description}>
        Kiara captura relatos, soluciones,
        métricas y lecciones aprendidas para
        convertir la experiencia del equipo en
        documentos profesionales listos para
        compartir, revisar y reutilizar.
      </p>

      <ul className={styles.assurances}>
        <li>
          <CheckmarkCircle20Filled
            aria-hidden="true"
          />

          <span>
            Conversación natural, sin
            formularios rígidos
          </span>
        </li>

        <li>
          <CheckmarkCircle20Filled
            aria-hidden="true"
          />

          <span>
            Integración con el ecosistema
            Microsoft
          </span>
        </li>
      </ul>

      <div className={styles.actions}>
        <Link
          className={styles.primaryAction}
          to="/chat"
        >
          <span>Hablar con Kiara</span>

          <ArrowRight24Regular
            aria-hidden="true"
          />
        </Link>

        <Link
          className={styles.secondaryAction}
          to="/cases"
        >
          <Library24Regular
            aria-hidden="true"
          />

          <span>Ver casos generados</span>
        </Link>
      </div>

      <TechnologyPills />
    </div>
  );
}