import ArticleScripts from "@/components/ArticleScripts";
import { DRAWER_HTML, FOOTER_HTML, HEADER_HTML } from "@/components/chrome";
import "./chrome.css";
import styles from "./AuxiliaryPage.module.css";

const LOCAL_FOOTER_HTML = FOOTER_HTML
  .replaceAll("https://adhiroha.com/weather.php", "/weather/")
  .replaceAll("https://adhiroha.com/volunteer-opportunity-in-rishikesh", "/volunteer-opportunity-in-rishikesh/")
  .replaceAll("https://adhiroha.com/apply-for-teacher-in-rishikesh", "/apply-for-teacher-in-rishikesh/");

/** Shared shell for the informational footer pages. */
export default function AuxiliaryPage({ eyebrow, title, description, children }) {
  return (
    <>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/uploads/rishikesh-2.webp"
          alt="Morning yoga practice in Rishikesh"
          width="1400"
          height="967"
          fetchPriority="high"
        />
        <div className={styles.heroShade} />
        <div dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.heroCopy}>{description}</p>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: DRAWER_HTML }} />
      <main className={styles.page}>{children}</main>
      <div dangerouslySetInnerHTML={{ __html: LOCAL_FOOTER_HTML }} />
      <ArticleScripts />
    </>
  );
}
