import { ChatPreview } from "~/components/home/ChatPreview";
import { HomeHero } from "~/components/home/HomeHero";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="kiara-home-title">
        <div className={styles.backgroundGrid} aria-hidden="true" />
        <div className={styles.glowPrimary} aria-hidden="true" />
        <div className={styles.glowSecondary} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <HomeHero />
          <ChatPreview />
        </div>
      </section>
    </main>
  );
}
