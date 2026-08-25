import {
  Bot24Regular,
  CheckmarkCircle20Filled,
  Document24Regular,
  MoreHorizontal20Regular,
} from "@fluentui/react-icons";
import styles from "./ChatPreview.module.css";

export function ChatPreview() {
  return (
    <div className={styles.stage}>
      <div className={styles.window}>
        <header className={styles.windowHeader}>
          <div className={styles.agentIdentity}>
            <span className={styles.avatar}>
              K
            </span>

            <span>
              <strong>Kiara</strong>

              <small>
                <i aria-hidden="true" />
                En línea
              </small>
            </span>
          </div>

          <MoreHorizontal20Regular
            aria-hidden="true"
          />
        </header>

        <div className={styles.messages}>
          <div className={styles.assistantRow}>
            <span className={styles.smallAvatar}>
              <Bot24Regular
                aria-hidden="true"
              />
            </span>

            <div className={styles.assistantBubble}>
              Hola, soy Kiara. Cuéntame qué
              ocurrió en tu proyecto y
              organizaré la experiencia por ti.
            </div>
          </div>

          <div className={styles.userBubble}>
            Implementamos un agente para ayudar
            al equipo de RR. HH. a consultar
            procedimientos internos.
          </div>

          <div className={styles.assistantRow}>
            <span className={styles.smallAvatar}>
              <Bot24Regular
                aria-hidden="true"
              />
            </span>

            <div className={styles.assistantBubble}>
              He identificado la solución y el
              contexto. ¿Cuáles fueron las
              métricas antes, durante y después?
            </div>
          </div>
        </div>

        <div className={styles.documentCard}>
          <span className={styles.documentIcon}>
            <Document24Regular
              aria-hidden="true"
            />
          </span>

          <span className={styles.documentInfo}>
            <strong>
              Caso_Agente_RRHH.docx
            </strong>

            <small>
              Documento generado · SharePoint
            </small>
          </span>

          <CheckmarkCircle20Filled
            className={styles.documentCheck}
            aria-hidden="true"
          />
        </div>

        <div className={styles.inputPreview}>
          <span>
            Escribe una respuesta...
          </span>

          <span className={styles.sendButton}>
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}