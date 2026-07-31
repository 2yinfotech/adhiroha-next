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

const TITLE = "Yoga Teacher Training in Rishikesh | 200/300/500-Hr YTTC | Adhiroha";
const DESCRIPTION =
  "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India. Small batches, expert Indian teachers, ashram stay & meals included.";

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
      images: [{ url: "/img/yoga-teacher-training-india-course.webp", width: 1200, height: 630, alt: "Adhiroha Yoga School, Upper Tapovan, Rishikesh" }],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description:
        "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India.",
      images: ["/img/yoga-teacher-training-india-course.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}
