import AuxiliaryPage from "@/components/AuxiliaryPage";
import styles from "@/components/AuxiliaryPage.module.css";

export const metadata = {
  title: "Best Time for Yoga Teacher Training in Rishikesh | Adhiroha",
  description: "A season-by-season guide to planning your yoga teacher training journey in Rishikesh.",
  alternates: { canonical: "/weather/" },
};

const seasons = [
  ["Winter", "December – January", "Peaceful and cosy for inner reflection.", "Crisp mornings, sunny afternoons and cosy evenings.", "A tranquil yoga experience with fewer distractions and smaller groups."],
  ["Spring", "February – March", "Blossom with nature.", "Ideal temperatures and vibrant surroundings.", "Beginning your yoga teacher training amid blooming nature and clear skies."],
  ["Summer", "April – June", "Revitalise and rejuvenate.", "Warm sunny days with refreshing hill breezes.", "Energising practices and the vibrant community atmosphere at Adhiroha."],
  ["Monsoon", "July – September", "A refreshing retreat.", "Lush greenery, soothing rain and misty landscapes.", "Deepening your practice through renewal and introspection."],
  ["Autumn", "October – November", "Balance and harmony.", "Pleasant weather and a lively atmosphere.", "Immersive yoga training in an ideal climate."],
];

export default function WeatherPage() {
  return (
    <AuxiliaryPage
      eyebrow="Weather update"
      title="Know the Best Time for Yoga Teacher Training in Rishikesh"
      description="Rishikesh offers a serene, spiritual setting throughout the year. Find the season that feels right for your yoga journey at Adhiroha."
    >
      <section className={styles.section}>
        <span className={styles.sectionLabel}>Plan your journey</span>
        <h2 className={styles.sectionTitle}>Discover the best time for your yoga journey at Adhiroha</h2>
        <p className={styles.lead}>Every season in Rishikesh has its own rhythm. Whether you are drawn to clear winter days, blooming spring, green monsoon landscapes or autumn&apos;s easy warmth, there is space here to learn, practise and reconnect.</p>
        <div className={styles.seasonGrid}>
          {seasons.map(([name, months, tagline, highlights, perfect]) => (
            <article className={styles.seasonCard} key={name}>
              <span className={styles.seasonMonths}>{months}</span>
              <h3>{name}</h3>
              <p>{tagline}</p>
              <span className={styles.seasonFit}><b>Highlights:</b> {highlights}</span>
              <span className={styles.seasonFit}><b>Perfect for:</b> {perfect}</span>
            </article>
          ))}
        </div>
        <div className={styles.cta}>
          <div><h2>Ready to find your season?</h2><p>Explore the upcoming yoga teacher training and retreat dates, then reserve a place when the timing feels right.</p></div>
          <a className={styles.ctaLink} href="/student-admission-panel/">View courses</a>
        </div>
      </section>
    </AuxiliaryPage>
  );
}
