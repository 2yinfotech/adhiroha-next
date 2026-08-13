// Structured data (JSON-LD) builders for the Adhiroha site.
//
// The SEO audit flagged that the site emitted no schema at all, so competitors
// were winning star ratings, prices and FAQ dropdowns in the search results.
// Everything here is derived from figures that are actually published on the
// site — nothing is invented, because schema that disagrees with the visible
// page is a manual-action risk, not a ranking win.

import { SITE, hreflangFor } from "./i18n-routes";

export { SITE, hreflangFor };

// The homepage cluster, read from the same translation map every other page
// uses. Kept as a named export because the eleven homepages already import it.
export const LANGUAGE_ALTERNATES = hreflangFor("/");

export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

// Every language the site is published in. Used for WebSite.inLanguage and to
// resolve the locale of a page from its own path.
export const LOCALES = ["en", "da", "de", "es", "fr", "it", "ja", "nl", "pl", "pt", "sv"];

const HOME_LABEL = {
  en: "Home", da: "Forside", de: "Startseite", es: "Inicio", fr: "Accueil",
  it: "Home", ja: "ホーム", nl: "Home", pl: "Strona główna", pt: "Início", sv: "Hem",
};

// Locale is read from the page's own path — `/de/…` is German, everything else
// is English. This keeps the localized pages from having to pass it explicitly
// at ~200 call sites.
const localeOf = (path) =>
  (/^\/(da|de|es|fr|it|ja|nl|pl|pt|sv)\//.exec(path || "") || [, "en"])[1];

// The school's Google rating, as published on its Google Business Profile and
// now displayed on the homepage alongside the Yoga Alliance and Tripadvisor
// scores. Both numbers are shown to the reader, which is Google's condition for
// emitting them as structured data: a rating with no visible count, or a count
// the page does not state, is the pattern that earns a manual action.
//
// These are the school's reviews rather than one course's, so the visible line
// on each course page says exactly that. Do not raise either number without a
// matching change on the Google profile.
export const RATING_VALUE = 4.9;
export const REVIEW_COUNT = 383;

// Shown on the homepage tiles. Kept here so the schema and the visible figures
// can never drift apart.
export const PLATFORM_RATINGS = [
  { name: "Google", value: 4.9, count: 383 },
  { name: "Yoga Alliance", value: 4.5, count: 20 },
  { name: "Tripadvisor", value: 4.3, count: 13 },
];

export const aggregateRating = () => ({
  "@type": "AggregateRating",
  ratingValue: String(RATING_VALUE),
  reviewCount: String(REVIEW_COUNT),
  bestRating: "5",
  worstRating: "1",
});

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Adhiroha Trek Road, Upper Tapovan",
  addressLocality: "Rishikesh",
  addressRegion: "Uttarakhand",
  postalCode: "249137",
  addressCountry: "IN",
};

// The map link exactly as the footer and contact page use it. It is also the
// school's Google Maps listing, so it doubles as the `sameAs` entity link the
// audit asked for — `hasMap` tells Google where the place is, `sameAs` tells it
// this Maps listing and this website are the same business.
const MAP_URL = "https://maps.google.com/?q=Adhiroha+Yoga+School+Upper+Tapovan+Rishikesh";

// Profiles the site itself links to, so every sameAs is verifiable from the
// page. The Yoga Alliance school listing belongs here too — it is the single
// most relevant entity link a certified school has — but its URL is published
// nowhere on the site, and guessing one would point the entity graph at the
// wrong business.
const SOCIAL = [
  "https://www.instagram.com/adhiroha.yoga.ashram",
  "https://www.facebook.com/adhirohayogacentre",
  "https://www.youtube.com/@adhiroha",
  MAP_URL,
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
      "Yoga Alliance certified yoga school in Upper Tapovan, Rishikesh, offering 200, 300 and 500 hour yoga teacher training courses, the Sadhana Immersion Programme and sound healing certification.",
    address: ADDRESS,
    geo: { "@type": "GeoCoordinates", latitude: 30.1287, longitude: 78.3211 },
    telephone: "+91-9999-048-900",
    email: "info@adhiroha.com",
    sameAs: SOCIAL,
    hasMap: MAP_URL,
    priceRange: "€€",
    areaServed: "Worldwide",
    // `openingHoursSpecification` is deliberately absent: the site publishes no
    // reception or office hours anywhere, and a residential ashram's real hours
    // are not something to infer. Add it once the school supplies them.
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: "Adhiroha Yoga School",
    publisher: { "@id": ORG_ID },
    // One node, one @id, eleven languages — so this lists them all. Emitting a
    // different single value per locale would make the same entity contradict
    // itself from page to page.
    inLanguage: LOCALES,
  };
}

/* ---------------------------------------------------------------
   Course
   --------------------------------------------------------------- */
// `price` is the all-inclusive triple-sharing fee shown on the course page.
//
// `image`, `credential`, `prerequisites` and `startsOnDays` are injected per
// route from COURSE_FACTS below, keyed by the English slug, so the German and
// Japanese pages describe the same course with the same dates and credential.
export function courseSchema({
  name, description, url, price, days, styles,
  image, credential, prerequisites, startsOnDays,
}) {
  const schema = {
    "@type": "Course",
    name,
    description,
    url: SITE + url,
    provider: { "@id": ORG_ID },
    // Stays "en" on every locale on purpose. inLanguage is the language the
    // course is *taught* in, and the site's own FAQ says so in every language —
    // "English is the medium of study at Adhiroha" / "Englisch ist die
    // Unterrichtssprache". The language of the *page* is carried by <html lang>
    // and hreflang, not by this property.
    inLanguage: "en",
  };
  if (image) schema.image = SITE + image;
  if (credential) schema.educationalCredentialAwarded = credential;
  if (prerequisites) schema.coursePrerequisites = prerequisites;
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
      courseMode: "Onsite",
      courseWorkload: `P${days}D`,
      location: { "@type": "Place", name: "Adhiroha Yoga School", address: ADDRESS },
    };
    // The batches recur rather than run once, so a Schedule describes them
    // honestly where a single startDate would go stale the moment it passed.
    if (startsOnDays?.length) {
      schema.hasCourseInstance.courseSchedule = {
        "@type": "Schedule",
        repeatFrequency: "P1M",
        byMonthDay: startsOnDays.length === 1 ? startsOnDays[0] : startsOnDays,
        duration: `P${days}D`,
        scheduleTimezone: "Asia/Kolkata",
      };
    }
  }
  if (styles) schema.teaches = styles;
  // The school's Google rating. Attached to Course rather than to the
  // organisation because Google does not surface a rating a business collects
  // about itself on LocalBusiness/Organization, but does on Course.
  schema.aggregateRating = aggregateRating();
  return schema;
}

/* ---------------------------------------------------------------
   Per-course facts, keyed by English slug
   ---------------------------------------------------------------
   Every value here is published on the course page itself — the hero image, the
   "Starts 1st of Every Month" line, the certificate wording and the entry
   requirements. Nothing is inferred.
*/
const AYUSH = "accredited by the Yoga Certification Board under the Ministry of Ayush, Government of India";
const ENGLISH_REQ =
  "No prior teaching experience is required. A working level of English, which is the language of instruction.";

export const COURSE_FACTS = {
  "/200-hour-yoga-teacher-training-course-rishikesh/": {
    image: "/img/adhiroha-yttc-014.webp",
    startsOnDays: [1],
    credential: `Adhiroha 200 hour certificate, ${AYUSH}, and eligibility to register with Yoga Alliance as an RYT 200`,
    prerequisites: ENGLISH_REQ,
  },
  "/300-hour-yoga-teacher-training-course-rishikesh/": {
    image: "/img/yttc-004.webp",
    startsOnDays: [1],
    credential: `Adhiroha 300 hour certificate, ${AYUSH}, and eligibility to register with Yoga Alliance at the RYT 300 level`,
    prerequisites:
      "A completed 200 hour yoga teacher training. A working level of English, which is the language of instruction.",
  },
  "/500-hour-yoga-teacher-training-course-rishikesh/": {
    image: "/img/yttc-009.webp",
    startsOnDays: [1],
    credential: `Adhiroha 500 hour certificate, ${AYUSH}, and eligibility to register with Yoga Alliance at the RYT 500 level`,
    prerequisites: ENGLISH_REQ,
  },
  "/hatha-teacher-training-course-rishikesh/": {
    image: "/img/yttc-030.webp",
    startsOnDays: [1],
    credential: `Adhiroha Hatha & Yin certificate, ${AYUSH}`,
    prerequisites: ENGLISH_REQ,
  },
  "/ashtanga-teacher-training-course-rishikesh/": {
    image: "/img/remote/img_ashtanga_ashtanga-001.webp",
    startsOnDays: [1],
    credential: `Adhiroha Ashtanga & Vinyasa certificate, ${AYUSH}`,
    prerequisites: ENGLISH_REQ,
  },
  "/pranayama-teacher-training-course-rishikesh/": {
    image: "/img/retreat-015.webp",
    startsOnDays: [1],
    credential: `Adhiroha Pranayama & Meditation certificate, ${AYUSH}`,
    prerequisites: ENGLISH_REQ,
  },
  "/sound-healing-ttc-rishikesh/": {
    image: "/img/remote/img_sound-therapy-005.webp",
    startsOnDays: [24],
    credential: "Adhiroha Sound Healing & Therapy certificate, levels 1, 2 and 3",
    prerequisites: ENGLISH_REQ,
  },
  "/sadhana-immersion-programme/": {
    image: "/gallery/retreat/retreat-005.webp",
    startsOnDays: [1, 15],
    prerequisites: "Open to all levels. No prior yoga experience required.",
  },
};

/** Facts for a course, looked up by its English slug. */
export const courseFacts = (englishUrl) => COURSE_FACTS[englishUrl] || {};

/* ---------------------------------------------------------------
   Person — the acharyas who teach the courses
   --------------------------------------------------------------- */
// The acharyas exactly as the teachers page lists them — name, the subject on
// their card, their photograph and the years-of-experience badge.
export const TEACHERS = [
  { name: "Yogacharya Jagjeet Singh", subject: "Yoga philosophy and anatomy", image: "/img/remote/img_jagjeet-singh.jpg", years: "20+" },
  { name: "Yogacharya Pratap Rawat", subject: "Ashtanga Vinyasa", image: "/img/remote/img_adhiroha-yttc-023.webp", years: "14+" },
  { name: "Yogacharya Rajat Purwal", subject: "Pranayama and Shatkarma", image: "/img/remote/img_rajat-1.jpg", years: "12+" },
  { name: "Yogacharya Anil Singh", subject: "Adjustment and alignment", image: "/img/remote/img_adhiroha-yttc-024.webp", years: "9+" },
  { name: "Yogacharya Ajay Pundir", subject: "Ashtanga Vinyasa", image: "/img/remote/img_adhiroha-yttc-022.webp", years: "8+" },
  { name: "Yogacharya Anil Rayal", subject: "Anatomy and physiology", image: "/img/remote/img_adhiroha-yttc-027.webp", years: "12+" },
  { name: "Yogacharya Ashish Bangwal", subject: "Hatha Yoga", image: "/img/remote/img_adhiroha-yttc-026.webp", years: "7+" },
  { name: "Yogacharya Jitendra Bhandari", subject: "Pranayama and Shatkarma", image: "/img/remote/img_jitendra.webp", years: "20+" },
  { name: "Yogacharya Sudhanshu Rayal", subject: "Restorative and Yin Yoga", image: "/img/remote/img_adhiroha-yttc-025.webp", years: "7+" },
  { name: "Yogacharya Sunil Bisht", subject: "Meditation", image: "/img/sunil.webp", years: "20+" },
  { name: "Yogacharya Prashant", subject: "Anatomy and asanas", image: "/img/prashant.webp", years: "7+" },
];

// A stable @id per teacher, derived from the name, so other pages can reference
// the same entity instead of describing a second copy of the same person.
// Latin letters only: the Japanese page passes katakana names and keeps the
// romanisation as alternateName, and both must resolve to the same @id.
export const teacherId = (name) =>
  `${SITE}/yoga-teachers-in-india/#${String(name)
    .toLowerCase()
    .replace(/yogacharya|acharya|dr\.?/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;

export function personSchema({ name, subject, image, bio, years, id }) {
  const anchor = id || teacherId(name);
  const p = {
    "@type": "Person",
    "@id": anchor,
    name,
    jobTitle: "Yoga Acharya",
    worksFor: { "@id": ORG_ID },
    url: `${SITE}/yoga-teachers-in-india/`,
  };
  if (subject) p.knowsAbout = subject;
  if (image) p.image = SITE + image;
  if (bio) p.description = bio;
  if (years) p.hasOccupation = {
    "@type": "Occupation",
    name: "Yoga teacher",
    experienceRequirements: `${years} years of teaching experience`,
  };
  return p;
}

// The Japanese teachers page writes the same eleven names in katakana, in the
// same order. Schema has to say what the page says, so that page gets the
// katakana as `name` and keeps the romanisation as `alternateName`.
const TEACHERS_JA = [
  "ヨガチャリヤ・ジャグジート・シン",
  "ヨガチャリヤ・プラタップ・ラワット",
  "ヨガチャリヤ・ラジャット・プルワル",
  "ヨガチャリヤ・アニル・シン",
  "ヨガチャリヤ・アジャイ・プンディール",
  "ヨガチャリヤ・アニル・ラヤル",
  "ヨガチャリヤ・アシシュ・バングワル",
  "ヨガチャリヤ・ジテンドラ・バンダーリ",
  "ヨガチャリヤ・スダンシュ・ラヤル",
  "ヨガチャリヤ・スニル・ビシュト",
  "ヨガチャリヤ・プラシャント",
];

/** All eleven acharyas, for the teachers page in any language. */
export const teacherSchemas = (locale = "en") =>
  TEACHERS.map((t, i) => {
    const p = personSchema(t);
    if (locale === "ja" && TEACHERS_JA[i]) {
      p.alternateName = t.name;
      p.name = TEACHERS_JA[i];
    }
    return p;
  });

/* ---------------------------------------------------------------
   VideoObject — the student review films embedded on the course pages
   ---------------------------------------------------------------
   Titles, upload dates and durations are the real values from the videos'
   own YouTube pages, not estimates. The review number is the label the course
   page itself puts on each card.
*/
export const STUDENT_VIDEOS = [
  { id: "34JbOEe7Xn8", n: 1, uploadDate: "2024-07-30", duration: "PT1M16S" },
  { id: "3a0OhN0uC0U", n: 2, uploadDate: "2024-07-30", duration: "PT1M29S" },
  { id: "-tB_WnA0jAo", n: 3, uploadDate: "2024-07-30", duration: "PT3M9S" },
  { id: "V2mporw4k8Q", n: 4, uploadDate: "2024-07-30", duration: "PT2M20S" },
  { id: "kfngfAxnIlg", n: 5, uploadDate: "2024-07-30", duration: "PT1M9S" },
  { id: "TJsr8gATo9k", n: 6, uploadDate: "2024-05-29", duration: "PT2M32S" },
];

export function videoSchema({ id, n, uploadDate, duration }) {
  return {
    "@type": "VideoObject",
    name: `Student Review ${String(n).padStart(2, "0")}: Yoga Teacher Training Course (YTTC) at Adhiroha, Rishikesh`,
    description:
      "An unscripted review from a graduate of the yoga teacher training course at Adhiroha Yoga School, Upper Tapovan, Rishikesh.",
    uploadDate,
    duration,
    thumbnailUrl: [`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`],
    embedUrl: `https://www.youtube.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    publisher: { "@id": ORG_ID },
  };
}

// The school tour embedded on every homepage. Title, upload date and duration
// are the real values from the video's own YouTube page, not estimates.
export function schoolTourVideoSchema() {
  return {
    "@type": "VideoObject",
    name: "Yoga Teacher Training in Rishikesh, India | Largest Yoga Ashram | Adhiroha Yoga Centre",
    description:
      "A tour of Adhiroha Yoga School in Upper Tapovan, Rishikesh: the shala, the ashram grounds and the Himalayan setting the teacher training courses are taught in.",
    uploadDate: "2024-09-28",
    duration: "PT3M",
    thumbnailUrl: [`${SITE}/img/school-tour-poster.webp`, "https://i.ytimg.com/vi/-slkdTozrMg/maxresdefault.jpg"],
    embedUrl: "https://www.youtube.com/embed/-slkdTozrMg",
    contentUrl: "https://www.youtube.com/watch?v=-slkdTozrMg",
    publisher: { "@id": ORG_ID },
  };
}

/** All six student-review videos, for the course pages that embed them. */
export const studentVideoSchemas = () => STUDENT_VIDEOS.map(videoSchema);

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
// The trail's own first URL tells us the locale, so the root crumb can be
// labelled in the page's language and point at that language's homepage rather
// than sending every localized breadcrumb back to the English root.
export function breadcrumbSchema(trail) {
  const locale = localeOf(trail?.[0]?.url);
  const home = { name: HOME_LABEL[locale], url: locale === "en" ? "/" : `/${locale}/` };
  return {
    "@type": "BreadcrumbList",
    itemListElement: [home, ...trail].map((item, i) => ({
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
