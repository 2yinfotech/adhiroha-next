import { notFound } from "next/navigation";
import "./styles.css";
import { HEADER_HTML, DRAWER_HTML, FOOTER_HTML } from "@/components/chrome";
import ArticleScripts from "@/components/ArticleScripts";
import { getArticleBySlug, getAllArticles, getFaqs, getInternalOk } from "@/lib/articles";
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
  return {
    title: article.title_tag || article.title,
    alternates: { canonical: `/blog/${article.slug}/` },
  };
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
