import { ArrowRight24Regular, Chat24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import styles from "./FaqCallToAction.module.css";

export function FaqCallToAction() {
  return (
    <section className={styles.section} aria-labelledby="faq-cta-title">
      <span aria-hidden="true"><Chat24Regular /></span>
      <div><p>¿No encontraste la respuesta?</p><h2 id="faq-cta-title">Pregunta directamente a Kiara</h2><strong>Describe lo que necesitas y continúa desde la experiencia conversacional.</strong></div>
      <Link to="/chat">Hablar con Kiara <ArrowRight24Regular aria-hidden="true" /></Link>
    </section>
  );
}
