import {
  Bot24Regular,
  CheckmarkCircle20Filled,
  Document24Regular,
  MoreHorizontal20Regular,
} from "@fluentui/react-icons";
import styles from "./ChatPreview.module.css";

export function ChatPreview() {
  return (
    <div className={styles.stage} aria-label="Vista previa de una conversación con Kiara">
      <aside className={`${styles.metricCard} ${styles.metricCardTop}`} aria-label="Tiempo promedio">
        <strong>8 min</strong>
        <span>De relato a documento</span>
      </aside>

      <aside className={`${styles.metricCard} ${styles.metricCardBottom}`} aria-label="Documentos generados">
        <strong>52</strong>
        <span>Documentos generados</span>
      </aside>

      <div className={styles.window}>
        <div className={styles.windowHeader}>
          <div className={styles.agentIdentity}>
            <span className={styles.avatar} aria-hidden="true">K</span>
            <span>
              <strong>Kiara</strong>
              <small><i aria-hidden="true" /> En línea</small>
            </span>
          </div>
          <MoreHorizontal20Regular aria-hidden="true" />
        </div>

        <div className={styles.messages}>
          <div className={styles.assistantRow}>
            <span className={styles.smallAvatar} aria-hidden="true"><Bot24Regular /></span>
            <div className={styles.assistantBubble}>
              Hola, soy Kiara. Cuéntame qué ocurrió en tu proyecto y organizaré la experiencia por ti.
            </div>
          </div>

          <div className={styles.userBubble}>
            Implementamos un agente para ayudar al equipo de RRHH a consultar procedimientos internos.
          </div>

          <div className={styles.assistantRow}>
            <span className={styles.smallAvatar} aria-hidden="true"><Bot24Regular /></span>
            <div className={styles.assistantBubble}>
              He identificado la solución y el contexto. ¿Cuáles fueron las métricas antes y después?
            </div>
          </div>
        </div>

        <div className={styles.documentCard}>
          <span className={styles.documentIcon} aria-hidden="true"><Document24Regular /></span>
          <span className={styles.documentInfo}>
            <strong>Caso_Agente_RRHH.docx</strong>
            <small>Documento generado · SharePoint</small>
          </span>
          <CheckmarkCircle20Filled className={styles.documentCheck} aria-label="Documento generado" />
        </div>

        <div className={styles.inputPreview}>
          <span>Escribe una respuesta...</span>
          <span className={styles.sendButton} aria-hidden="true">↑</span>
        </div>
      </div>
    </div>
  );
}
