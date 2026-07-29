import ArticleScripts from "@/components/ArticleScripts";
import { DRAWER_HTML, FOOTER_HTML, HEADER_HTML } from "@/components/chrome";
import "./chrome.css";
import styles from "./AuxiliaryPage.module.css";

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
      <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      <ArticleScripts />
    </>
  );
}
