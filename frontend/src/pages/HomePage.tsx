import { BenefitsSection } from "~/components/home/BenefitsSection";
import { ChatPreview } from "~/components/home/ChatPreview";
import { FinalCallToAction } from "~/components/home/FinalCallToAction";
import { HomeFooter } from "~/components/home/HomeFooter";
import { HomeHero } from "~/components/home/HomeHero";
import { MetricsSection } from "~/components/home/MetricsSection";
import { ProblemSection } from "~/components/home/ProblemSection";
import { ProcessSection } from "~/components/home/ProcessSection";
import { RecentCasesSection } from "~/components/home/RecentCasesSection";
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

      <ProblemSection />
      <ProcessSection />
      <MetricsSection />
      <BenefitsSection />
      <RecentCasesSection />
      <FinalCallToAction />
      <HomeFooter />
    </main>
  );
}
