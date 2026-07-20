import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import { getAllArticles } from "@/lib/articles";
import { fixAssetPath, formatDate } from "@/lib/article-render";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | The Adhiroha Journal &mdash; Yoga Teacher Training, Honestly Written",
  description: undefined,
  alternates: { canonical: "/blogs/" },
};

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Build the "Read by Category" grid from every database article, grouped by
// category (case-insensitively) and ordered by how many posts each holds.
function buildCategoryGrid(articles) {
  const groups = new Map(); // key -> { name, items: [] }
  for (const a of articles) {
    const key = (a.a_cat || "Journal").trim().toLowerCase();
    if (!groups.has(key)) groups.set(key, { name: (a.a_cat || "Journal").trim(), items: [] });
    groups.get(key).items.push(a);
  }
  const ordered = [...groups.values()].sort((x, y) => y.items.length - x.items.length);

  return ordered
    .map((g, gi) => {
      const cards = g.items
        .map((a) => {
          const cover = fixAssetPath(a.cover_image);
          const date = formatDate(a.published_date);
          return (
            `<a class="bcard reveal" href="/blog/${esc(a.slug)}/">` +
            `<div class="bcard-ph"><img class="u-img" src="${esc(cover)}" alt="${esc(a.title)}" loading="lazy">` +
            `<span class="btag">${esc(g.name)}</span></div>` +
            `<div class="bcard-bd"><div class="bmeta">${esc(date)}</div><h3>${esc(a.title)}</h3></div>` +
            `</a>`
          );
        })
        .join("");
      return (
        `<div class="bcat reveal">` +
        `<div class="bcat-head"><div>` +
        `<span class="bcat-eyebrow">Category ${String(gi + 1).padStart(2, "0")}</span>` +
        `<h3 class="bcat-title">${esc(g.name)}</h3></div>` +
        `<p class="bcat-desc">${g.items.length} article${g.items.length === 1 ? "" : "s"}</p>` +
        `</div><div class="bgrid">${cards}</div></div>`
      );
    })
    .join("\n");
}

export default async function Page() {
  const articles = await getAllArticles();

  // Splice the DB-driven category grid into the existing page: keep everything
  // up to the first category block (header, hero, "Read by Category" intro) and
  // everything from the footer onward, replacing the hand-written cards.
  const cut = content.indexOf('<div class="bcat');
  const footer = content.indexOf("<footer");
  let html = content;
  if (cut !== -1 && footer !== -1) {
    const prefix = content.slice(0, cut);
    const suffix = "\n  </div>\n</section>\n\n" + content.slice(footer);
    html = prefix + buildCategoryGrid(articles) + suffix;
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <PageScripts code={scripts} />
    </>
  );
}
