// Structured data (JSON-LD) builders for the Adhiroha site.
//
// The SEO audit flagged that the site emitted no schema at all, so competitors
// were winning star ratings, prices and FAQ dropdowns in the search results.
// Everything here is derived from figures that are actually published on the
// site — nothing is invented, because schema that disagrees with the visible
// page is a manual-action risk, not a ranking win.

export const SITE = "https://www.adhiroha.com";

// The 11 localized versions live on the languages subdomain (see next.config.mjs).
// Declared on the homepage only: the subdomain mirrors the landing page, not every
// URL, and hreflang pointing at non-equivalent pages does more harm than good.
export const LANGUAGE_ALTERNATES = {
  en: SITE,
  da: "https://languages.adhiroha.com/da",
  de: `${SITE}/de/`,
  es: "https://languages.adhiroha.com/es",
  fr: "https://languages.adhiroha.com/fr",
  it: "https://languages.adhiroha.com/it",
  ja: "https://languages.adhiroha.com/ja",
  nl: "https://languages.adhiroha.com/nl",
  pl: "https://languages.adhiroha.com/pl",
  pt: "https://languages.adhiroha.com/pt",
  sv: "https://languages.adhiroha.com/sv",
  "x-default": SITE,
};

export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

// Trust figures exactly as displayed on the homepage counters (3,000+ students,
// 70+ countries, 300+ five-star reviews, 5.0 Google score).
export const REVIEW_COUNT = 300;
export const RATING_VALUE = 5.0;

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Adhiroha Trek Road, Upper Tapovan",
  addressLocality: "Rishikesh",
  addressRegion: "Uttarakhand",
  postalCode: "249137",
  addressCountry: "IN",
};

const SOCIAL = [
  "https://www.instagram.com/adhiroha.yoga.ashram",
  "https://www.facebook.com/adhirohayogacentre",
];

/* ---------------------------------------------------------------
   Organization + LocalBusiness (sitewide)
   --------------------------------------------------------------- */
export function organizationSchema() {
  return {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID,
    name: "Adhiroha Yoga School",
    alternateName: "Adhiroha Yoga Ashram",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/img/logo-gold.png` },
    image: `${SITE}/img/yoga-teacher-training-india-course.webp`,
    description:
      "Yoga Alliance certified yoga school in Upper Tapovan, Rishikesh, offering 200, 300 and 500 hour yoga teacher training courses, retreats and sound healing certification.",
    address: ADDRESS,
    geo: { "@type": "GeoCoordinates", latitude: 30.1287, longitude: 78.3211 },
    telephone: "+91-9999-048-900",
    email: "info@adhiroha.com",
    sameAs: SOCIAL,
    priceRange: "€€",
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE,
      bestRating: 5,
      reviewCount: REVIEW_COUNT,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: "Adhiroha Yoga School",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/* ---------------------------------------------------------------
   Course
   --------------------------------------------------------------- */
// `price` is the all-inclusive triple-sharing fee shown on the course page.
export function courseSchema({ name, description, url, price, days, styles }) {
  const schema = {
    "@type": "Course",
    name,
    description,
    url: SITE + url,
    provider: { "@id": ORG_ID },
    inLanguage: "en",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE,
      bestRating: 5,
      reviewCount: REVIEW_COUNT,
    },
  };
  if (price != null) {
    schema.offers = {
      "@type": "Offer",
      price: String(price),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/student-admission-panel/`,
      category: "Residential yoga teacher training, all inclusive",
    };
  }
  if (days) {
    schema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: `P${days}D`,
      location: { "@type": "Place", name: "Adhiroha Yoga School", address: ADDRESS },
    };
  }
  if (styles) schema.teaches = styles;
  return schema;
}

/* ---------------------------------------------------------------
   FAQPage — parsed from the page's own markup
   ---------------------------------------------------------------
   The site renders FAQs as:
     <details class="faq"><summary>Q<span class="plus"></span></summary>
       <div class="faq-a">A</div></details>
   so the schema can be generated from the real content rather than
   maintained as a second, drift-prone copy.
*/
const decode = (s) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&middot;/g, "·")
    .replace(/\s+/g, " ")
    .trim();

export function extractFaqs(html) {
  if (!html) return [];
  const out = [];
  const re = /<details[^>]*class=\s*"?\s*faq[^>]*>([\s\S]*?)<\/details>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const block = m[1];
    const q = /<summary[^>]*>([\s\S]*?)<\/summary>/i.exec(block);
    const a = /<div[^>]*class=\s*"?\s*faq-a[^>]*>([\s\S]*?)<\/div>/i.exec(block);
    if (!q || !a) continue;
    const question = decode(q[1]);
    const answer = decode(a[1]);
    if (question && answer) out.push({ question, answer });
  }
  return out;
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/* ---------------------------------------------------------------
   BreadcrumbList
   --------------------------------------------------------------- */
export function breadcrumbSchema(trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", url: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: SITE + item.url,
    })),
  };
}

/* ---------------------------------------------------------------
   Graph wrapper
   --------------------------------------------------------------- */
export function graph(...nodes) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
