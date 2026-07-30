// Swedish 200-hour course page — served at /sv/200-timmars-yogalararutbildning-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const SV = "/sv/200-timmars-yogalararutbildning-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introduktion", target: "top" },
  { label: "Priser", target: "course-glance" },
  { label: "Ämnen", target: "curriculum" },
  { label: "Dagsrytm", target: "daily-rhythm" },
  { label: "Faciliteter", target: "amenities" },
  { label: "Boende", target: "accommodation" },
  { label: "Lärare", target: "your-teachers" },
  { label: "Omgivning", target: "finding-us" },
  { label: "Kontakt", target: "begin" }
];

export const metadata = {
  title: "200-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
  description:
    "200-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 24 dagar, små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "sv_SE",
    url: `${SITE}${SV}`,
    title: "200-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
    description:
      "200-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 24 dagar, små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  },
  twitter: {
    card: "summary_large_image",
    title: "200-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
    description: "200-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 24 dagar, små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "200-Timmars Yogalärarutbildning i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 1275,
    days: 24,
    styles: "Hatha yoga, ashtanga vinyasa, pranayama, meditation, yogafilosofi, anatomi, undervisningsmetodik",
  ...courseFacts("/200-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200-timmars yogalärarutbildning", url: SV }])
);

export default function Page() {
  return (
    <div lang="sv">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
