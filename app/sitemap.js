import fs from "fs";
import path from "path";
import { getAllArticles } from "@/lib/articles";
import { SITE } from "@/lib/seo";

/**
 * The sitemap, generated from the routes that actually exist.
 *
 * It used to be a hand-maintained array of 203 URLs. The gap audit found 384
 * pages earning impressions against those 203 entries — 191 ranking pages
 * missing, 158 of them blog posts, including every article the internal-link
 * plan depends on. A list maintained by hand cannot keep up with a blog that
 * lives in a database, so it is no longer maintained by hand.
 *
 * Two sources, both live:
 *
 *   · the route folders under app/, walked at request time
 *   · the `articles` table, which is where /blog/<slug>/ comes from
 *
 * Revalidated hourly rather than rebuilt per request: the route tree only
 * changes on deploy and a new post can wait an hour to appear. If the database
 * is unreachable the static routes are still served — a sitemap missing its
 * blog section is recoverable, a sitemap that 500s is not.
 */

const BASE = SITE;

// Route groups (parenthesised), private folders (_prefixed) and dynamic
// segments are not URLs. `[slug]` is handled separately from the database.
const isRouteSegment = (name) =>
  !name.startsWith("(") && !name.startsWith("_") && !name.startsWith("[") && !name.startsWith(".");

// A page that sets `index: false` — the admission panel, the registration form,
// /thank-you/ and the two paid-ads landing pages — must not be advertised. The
// flag is read from the source rather than duplicated in a list here, so a page
// that is later opened up to search joins the sitemap on its own.
function isNoindex(dir) {
  for (const f of ["page.jsx", "page.js", "layout.jsx", "layout.js"]) {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) continue;
    if (/index:\s*false/.test(fs.readFileSync(p, "utf8"))) return true;
  }
  return false;
}

/**
 * Every static route in the app, as a URL path.
 *
 * Walks app/ the way Next.js resolves routes: a folder holding a page.jsx is a
 * route, a route group contributes its children at the parent's path, and a
 * noindex layout disqualifies everything beneath it.
 */
function staticRoutes() {
  const root = path.join(process.cwd(), "app");
  const found = [];

  const walk = (dir, urlPath) => {
    if (isNoindex(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    if (entries.some((e) => e.isFile() && /^page\.(jsx?|tsx?)$/.test(e.name))) {
      found.push(urlPath);
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const child = path.join(dir, e.name);
      // A route group adds nothing to the URL; a real folder adds its name.
      if (e.name.startsWith("(")) walk(child, urlPath);
      else if (isRouteSegment(e.name)) walk(child, `${urlPath}${e.name}/`);
    }
  };

  walk(root, "/");
  return [...new Set(found)].sort();
}

/** Every published article, at the /blog/<slug>/ URL the article route serves. */
async function blogRoutes() {
  try {
    const rows = await getAllArticles();
    return rows
      .filter((a) => a.slug)
      .map((a) => ({
        url: `/blog/${a.slug}/`,
        lastModified: new Date(a.modified_date || a.published_date || Date.now()),
      }));
  } catch (err) {
    // Never let a database hiccup take the whole sitemap down with it.
    console.error("sitemap: could not read articles —", err?.message || err);
    return [];
  }
}

// The homepage is crawled most often, the eleven localized homepages and the
// course pages next, everything else at the default weight.
function weightFor(url) {
  if (url === "/") return { changeFrequency: "weekly", priority: 1 };
  if (/^\/[a-z]{2}\/$/.test(url)) return { changeFrequency: "weekly", priority: 0.9 };
  if (/hour-yoga-teacher-training/.test(url)) return { changeFrequency: "weekly", priority: 0.9 };
  if (url.startsWith("/blog/")) return { changeFrequency: "monthly", priority: 0.6 };
  return { changeFrequency: "monthly", priority: 0.7 };
}

export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();
  const pages = staticRoutes().map((url) => ({ url, lastModified: now }));
  const entries = [...pages, ...(await blogRoutes())];

  return entries.map(({ url, lastModified }) => ({
    url: `${BASE}${url}`,
    lastModified,
    ...weightFor(url),
  }));
}
