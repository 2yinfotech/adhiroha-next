import { SITE } from "@/lib/seo";

/**
 * Meta description for a blog post.
 *
 * The `articles` table has no excerpt, summary or SEO-description column, so
 * there is nothing to fall back to except the article itself. Every post was
 * therefore serving the homepage's description, inherited from the root layout,
 * which is what a blog post gets when it sets none of its own.
 *
 * Never returns the homepage description. If the body yields nothing usable the
 * function returns an empty string and the caller omits the tag, because a
 * missing description is better than a wrong one.
 */
const MAX = 158;

export function buildPostDescription(article) {
  const raw = String(article?.content || "");
  if (!raw) return "";

  // Prefer the article's own lede, which is written as a standalone summary.
  const lede = /<p[^>]*class="[^"]*art-lede[^"]*"[^>]*>([\s\S]*?)<\/p>/i.exec(raw);
  const source = lede ? lede[1] : (/<p[^>]*>([\s\S]*?)<\/p>/i.exec(raw) || [])[1] || raw;

  const text = source
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lsquo;|&rsquo;|&#39;/g, "'")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&mdash;|&ndash;/g, ", ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    // The em-dash pass left gaps like "yourself , even"; close them up.
    .replace(/\s+([,;:.])/g, "$1")
    .replace(/,\s*,/g, ",")
    .trim();

  if (text.length < 40) return "";
  if (text.length <= MAX) return text;

  // Cut at the last complete word rather than mid-syllable.
  const cut = text.slice(0, MAX);
  const trimmed = cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "");
  return `${trimmed}…`;
}

/** Absolute URL for a post, in the canonical trailing-slash form. */
export const postUrl = (slug) => `${SITE}/blog/${slug}/`;

/**
 * The full metadata block for one post: title, description, canonical and a
 * complete Open Graph / Twitter set pointing at the post rather than the
 * homepage. Fields with no real value are omitted rather than invented, so a
 * post with no cover image simply carries no og:image, and no published date is
 * emitted unless the row actually has one.
 */
export function postMetadata(article, { image } = {}) {
  const title = article.title_tag || article.title;
  const description = buildPostDescription(article);
  const url = `/blog/${article.slug}/`;
  const absolute = postUrl(article.slug);

  const iso = (d) => {
    if (!d) return undefined;
    const t = new Date(d);
    return Number.isNaN(t.getTime()) ? undefined : t.toISOString();
  };
  const published = iso(article.published_date);
  const modified = iso(article.modified_date);

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Adhiroha Yoga School",
      locale: "en_US",
      url: absolute,
      title,
      ...(description ? { description } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
      ...(published ? { publishedTime: published } : {}),
      ...(modified ? { modifiedTime: modified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}
