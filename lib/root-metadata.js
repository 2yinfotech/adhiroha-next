import { SITE } from "@/lib/seo";

// The metadata every root layout starts from. There is one root layout per
// locale now (see components/SiteShell), so this is the single place the shared
// defaults live rather than eleven drifting copies.
//
// Only `openGraph.locale` varies by language. Titles and descriptions stay the
// English defaults because every single page — English and translated — sets
// its own title, description and og block; these are the fallback of last
// resort, not what any real page ships.
const OG_LOCALE = {
  en: "en_US",
  da: "da_DK",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  it: "it_IT",
  ja: "ja_JP",
  nl: "nl_NL",
  pl: "pl_PL",
  pt: "pt_BR",
  sv: "sv_SE",
};

// The fallback share image, used by the root layout and by any page that does
// not name one of its own. Relative: `metadataBase` above resolves it.
export const DEFAULT_OG_IMAGE = "/img/yoga-teacher-training-india-course.webp";
export const DEFAULT_OG_ALT = "Adhiroha Yoga School, Upper Tapovan, Rishikesh";

const TITLE = "Yoga Teacher Training in Rishikesh, India | Adhiroha Yoga School";
const DESCRIPTION =
  "Yoga Alliance certified yoga teacher training school in Rishikesh, India. Small batches, expert Indian teachers, three-acre ashram stay and meals included.";

export function rootMetadata(locale) {
  return {
    // www is the canonical host — non-www 301s to it (next.config.mjs and
    // hostinger-node.htaccess).
    metadataBase: new URL(SITE),
    title: TITLE,
    description: DESCRIPTION,
    applicationName: "Adhiroha Yoga School",
    authors: [{ name: "Adhiroha Yoga School" }],
    openGraph: {
      type: "website",
      siteName: "Adhiroha Yoga School",
      locale: OG_LOCALE[locale] || OG_LOCALE.en,
      url: locale === "en" ? SITE : `${SITE}/${locale}/`,
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: DEFAULT_OG_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description:
        "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India.",
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

/**
 * Derives the Open Graph and Twitter block from a page's own metadata.
 *
 * Next.js does not copy `title`/`description` into `openGraph`, and it replaces
 * the parent's openGraph wholesale rather than merging it. So an English page
 * that set only a title and description was inheriting the root layout's
 * openGraph verbatim: every one of them announced the homepage's title, the
 * homepage's description and `og:url = https://www.adhiroha.com/`. The
 * translated locales already build their own block; this gives the English
 * pages the same thing without repeating it 25 times.
 *
 * Wrap the metadata object rather than replacing it, so a page that wants a
 * different og:title or its own image can still set one and win.
 */
export function withOpenGraph(meta, { type = "website", image, locale = "en_US" } = {}) {
  const url = meta?.alternates?.canonical;
  const title = typeof meta?.title === "string" ? meta.title : undefined;
  const description = meta?.description;
  if (!url || !title) return meta;

  // Every page gets a share image. Because Next.js replaces the parent's
  // openGraph block rather than merging into it, a page that set only a title
  // and description was shipping og:title and og:url with no og:image at all —
  // the gap audit found the three course pages rendering as bare links with no
  // preview card, and it was in fact every English page, the homepage included.
  // A page that wants its own still wins: `image` is only defaulted, not forced.
  const images = [{ url: image || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: DEFAULT_OG_ALT }];
  return {
    ...meta,
    openGraph: {
      type,
      siteName: "Adhiroha Yoga School",
      locale,
      url,
      title,
      description,
      images,
      ...(meta.openGraph || {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || DEFAULT_OG_IMAGE],
      ...(meta.twitter || {}),
    },
  };
}
