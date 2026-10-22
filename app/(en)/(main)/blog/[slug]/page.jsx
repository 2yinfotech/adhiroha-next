import { notFound } from "next/navigation";
import "./styles.css";
import { HEADER_HTML, DRAWER_HTML, FOOTER_HTML } from "@/components/chrome";
import ArticleScripts from "@/components/ArticleScripts";
import { getArticleBySlug, getAllArticles, getFaqs, getInternalOk } from "@/lib/articles";
import { postMetadata } from "@/lib/blog-seo";
import { SITE } from "@/lib/seo";
import {
  buildToc,
  fixArticleHtml,
  fixAssetPath,
  readingMinutes,
  formatDate,
} from "@/lib/article-render";

// Articles come from the live database, so render per request (new/edited posts
// appear immediately and no build-time DB connection is needed).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not found | Adhiroha" };
  // Description, canonical and a complete per-post Open Graph block. Before
  // this, every post inherited the root layout's metadata, so all of them
  // shared the homepage's description and announced og:url as the homepage.
  // No image is passed, so postMetadata falls back to the site-wide logo. The
  // post's own cover is deliberately not used here: every URL on the site
  // shares as the logo, so a link pasted into WhatsApp is recognisably Adhiroha
  // whichever page it points at. The cover still carries the article's hero and
  // its schema image further down.
  return postMetadata(article);
}

const ICON_CAL =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 9.5h18"/></svg>';
const ICON_CLOCK =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>';
const ICON_USER =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>';

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [faqs, all, internalOk] = await Promise.all([
    getFaqs(article.id),
    getAllArticles(),
    getInternalOk(),
  ]);

  const toc = buildToc(article.content);
  const body = fixArticleHtml(article.content, { internalOk });
  const cover = fixAssetPath(article.cover_image);
  const minutes = readingMinutes(article.content);
  const date = formatDate(article.published_date);

  const related = all
    .filter((a) => a.slug !== article.slug && a.a_cat === article.a_cat)
    .slice(0, 3);

  const heroMeta =
    `<span class="cat">${escapeHtml(article.a_cat || "Journal")}</span>` +
    `<span>${ICON_CAL} ${escapeHtml(date)}</span>` +
    `<span>${ICON_CLOCK} ${minutes} min read</span>` +
    (article.author ? `<span>${ICON_USER} ${escapeHtml(article.author)}</span>` : "");

  const tocRail = toc
    .map(
      (t, i) =>
        `<a href="#${t.id}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${escapeHtml(
          t.text
        )}</a>`
    )
    .join("");

  const faqHtml = faqs.length
    ? `<section class="art-faq"><h2>Frequently Asked Questions</h2><div class="faq-list">` +
      faqs
        .map(
          (f) =>
            `<details class="faq"><summary>${escapeHtml(f.question)}</summary><div>${f.answer}</div></details>`
        )
        .join("") +
      `</div></section>`
    : "";

  return (
    <>
      {/* HERO (cover + shared nav + article title) */}
      <section className="c-hero">
        <img
          className="u-img"
          src={cover}
          alt={article.title}
          width="1500"
          height="1000"
          loading="eager"
          fetchPriority="high"
        />
        <div dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />
        <div dangerouslySetInnerHTML={{ __html: DRAWER_HTML }} />
        <div className="c-hero-inner art-hero">
          <div>
            <span className="kicker">Adhiroha Journal</span>
            <h1>{article.title}</h1>
            <div className="art-meta" dangerouslySetInnerHTML={{ __html: heroMeta }} />
          </div>
        </div>
      </section>

      <div className="read-bar" id="read-bar" aria-hidden="true"></div>

      <div className="art-cover">
        <figure className="art-img">
          <img className="u-img" src={cover} alt={article.title} loading="lazy" />
        </figure>
      </div>

      {/* ARTICLE */}
      <section className="pad">
        <div className="wrap">
          <div className="art-grid">
            {toc.length > 0 && (
              <aside className="toc reveal" id="toc">
                <div className="toc-h">Contents</div>
                <div className="toc-rail" dangerouslySetInnerHTML={{ __html: tocRail }} />
                <div className="toc-cta">
                  <a href="/blogs/">All Articles</a>
                </div>
              </aside>
            )}

            <article className="art-body reveal">
              <div dangerouslySetInnerHTML={{ __html: body }} />
              <div dangerouslySetInnerHTML={{ __html: faqHtml }} />

              {related.length > 0 && (
                <section className="art-related">
                  <h2>Continue Reading</h2>
                  <ul>
                    {related.map((r) => (
                      <li key={r.slug}>
                        <a href={`/blog/${r.slug}/`}>{r.title}</a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* The grid always reserved a third column for this, so on desktop
                the right of every post was blank. Sticky like the contents rail;
                below 1024px the grid collapses and it follows the article. */}
            <aside className="art-aside" aria-label="Study yoga at Adhiroha">
              <div className="aside-card">
                <span className="aside-k">Train in Rishikesh</span>
                <h4>Want to study authentic yoga in Rishikesh?</h4>
                <p>
                  Join Adhiroha, a Yoga Alliance registered school in Upper Tapovan. Practise and learn with
                  experienced Indian teachers, with your stay and Satvik meals included.
                </p>
                <ul className="aside-ticks">
                  <li>200, 300 &amp; 500 hour teacher training</li>
                  <li>Courses start on the 1st of every month</li>
                  <li>Rated 4.9 on Google</li>
                </ul>
                <div className="aside-rys">
                  <img src="/img/RYS200.png" alt="Yoga Alliance RYS 200" width="54" height="54" loading="lazy" />
                  <img src="/img/RYS300.png" alt="Yoga Alliance RYS 300" width="54" height="54" loading="lazy" />
                  <img src="/img/RYS500.png" alt="Yoga Alliance RYS 500" width="54" height="54" loading="lazy" />
                </div>
                <a className="aside-btn" href="/yoga-teacher-training-course-rishikesh-india/">
                  Join Adhiroha
                  <svg width="16" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 5h17M14 1l4 4-4 4" /></svg>
                </a>
                <a className="aside-wa" href="https://wa.me/919999048900" target="_blank" rel="noopener noreferrer">
                  Ask us on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      <ArticleScripts />
    </>
  );
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
