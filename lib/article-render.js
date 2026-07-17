// Pure helpers for turning a stored article body into a rendered page:
// building the table of contents from its <section id> anchors, and cleaning up
// its internal/external links and asset paths. No React, no I/O — easy to test.

/**
 * Build a table of contents from the article body.
 * Each `<section id="…">` that contains a heading becomes one TOC entry that
 * links to `#id`. Returns `[{ id, text }]` in document order.
 */
export function buildToc(html) {
  const toc = [];
  if (!html) return toc;
  // Locate every section-with-id opening tag, then look at the slice up to the
  // next section for its first heading.
  const openRe = /<section\b[^>]*\bid="([^"]+)"[^>]*>/gi;
  const opens = [];
  let m;
  while ((m = openRe.exec(html)) !== null) {
    opens.push({ id: m[1], start: m.index + m[0].length });
  }
  for (let i = 0; i < opens.length; i++) {
    const slice = html.slice(opens[i].start, i + 1 < opens.length ? opens[i + 1].start : undefined);
    const h = slice.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
    if (!h) continue;
    const text = h[1]
      .replace(/<span class="n">[\s\S]*?<\/span>/gi, "") // drop the "01" number chip
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .trim();
    if (text) toc.push({ id: opens[i].id, text });
  }
  return toc;
}

// Pages that live on adhiroha.com but have not been migrated into this app yet.
// Internal links to these are pointed at the live site so they still resolve.
export const LIVE_HOSTED = new Set([
  "apply-for-teacher-in-rishikesh",
  "find-your-perfect-yoga-course",
  "student-admission-panel",
  "yoga-teacher-training-course-rishikesh-india",
]);

/**
 * Clean an article body's markup:
 *  - strip leftover AI citation artefacts (<grok-card>)
 *  - normalise `../uploads/…` (and variants) asset paths to `/uploads/…`
 *  - rewrite absolute adhiroha.com links to root-relative links
 *  - strip a stray `/blog/` prefix so it points at the real article route
 *  - classify every internal link:
 *      · valid (a real article or existing route) → keep, add trailing slash
 *      · a known live-only page                   → point at adhiroha.com
 *      · dead (nothing to link to)                → unwrap, keep the text
 *  - open genuine external links safely in a new tab
 *
 * @param {string} html
 * @param {{ internalOk?: Set<string>, liveHosted?: Set<string> }} [opts]
 *   `internalOk` holds valid article slugs and existing route segments. When
 *   omitted, every internal link is treated as valid (handy for unit tests).
 */
export function fixArticleHtml(html, opts = {}) {
  if (!html) return "";
  const internalOk = opts.internalOk instanceof Set ? opts.internalOk : null;
  const liveHosted = opts.liveHosted instanceof Set ? opts.liveHosted : LIVE_HOSTED;
  let out = html;

  // 0. Trim stray whitespace/newlines inside src/href/srcset values (some DB
  //    rows have e.g. src="foo.webp\n"), which would otherwise 404.
  out = out.replace(/((?:src|href|srcset)=")([^"]*)"/gi, (m, p, v) => p + v.trim() + '"');

  // 1. Remove <grok-card …></grok-card> (and any self-closing form).
  out = out.replace(/<grok-card\b[^>]*>(?:\s*<\/grok-card>)?/gi, "");

  // 2. Normalise upload asset paths: any run of ./ or ../ before "uploads/".
  out = out.replace(/((?:src|href|srcset)=")(?:\.\.?\/)*uploads\//gi, "$1/uploads/");

  // 3. Absolute adhiroha.com URLs → root-relative (keep them on-site).
  out = out.replace(/https?:\/\/(?:www\.)?adhiroha\.com/gi, "");
  out = out.replace(/href=""/gi, 'href="/"');

  // 4. A stray "/blog/" prefix points at the old PHP route; drop it.
  out = out.replace(/(href=")\/blog\//gi, "$1/");

  // 5. Classify each internal anchor (href starting with "/").
  out = out.replace(
    /<a\b([^>]*?)href="(\/[^"#?]*)"([^>]*)>([\s\S]*?)<\/a>/gi,
    (full, pre, href, post, inner) => {
      const path = href.replace(/^\/+/, "").replace(/\/+$/, "");
      if (!path || path.startsWith("uploads")) return full; // home / asset
      const seg = path.split("/")[0];
      const valid = internalOk ? internalOk.has(path) || internalOk.has(seg) : true;
      if (valid) return `<a${pre}href="/${path}/"${post}>${inner}</a>`;
      if (liveHosted.has(path)) {
        return `<a${pre}href="https://adhiroha.com/${path}"${post} target="_blank" rel="noopener noreferrer">${inner}</a>`;
      }
      return inner; // dead link → keep the words, drop the anchor
    }
  );

  // 6. Open real external links in a new tab.
  out = out.replace(/<a\b([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (full, pre, url, post) => {
    if (/target=/.test(pre + post)) return full;
    const attrs = [pre.trim(), `href="${url}"`, post.trim(), 'target="_blank"', 'rel="noopener noreferrer"']
      .filter(Boolean)
      .join(" ");
    return `<a ${attrs}>`;
  });

  return out;
}

/** Normalise a single asset path (e.g. a cover_image column value). */
export function fixAssetPath(src, fallback = "/gallery/yoga/yoga-010.webp") {
  if (!src) return fallback;
  let s = String(src).trim();
  s = s.replace(/^(?:\.\.?\/)*uploads\//i, "/uploads/");
  s = s.replace(/^https?:\/\/(?:www\.)?adhiroha\.com/i, "");
  if (!s.startsWith("/") && !/^https?:/i.test(s)) s = "/" + s;
  return s;
}

/** Rough reading time in minutes from an HTML body (~200 wpm). */
export function readingMinutes(html) {
  const words = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Format a YYYY-MM-DD (or Date) as "2 July 2026". */
export function formatDate(value) {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(String(value));
  if (isNaN(d)) return String(value);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
