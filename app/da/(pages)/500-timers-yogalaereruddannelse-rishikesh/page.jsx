// Danish 500-hour course page — served at /da/500-timers-yogalaereruddannelse-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/500-timers-yogalaereruddannelse-rishikesh/";
const EN = "/500-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introduktion", target: "top" },
  { label: "Priser", target: "course-glance" },
  { label: "Fag", target: "curriculum" },
  { label: "Dagsrytme", target: "daily-rhythm" },
  { label: "Faciliteter", target: "amenities" },
  { label: "Indkvartering", target: "accommodation" },
  { label: "Undervisere", target: "your-teachers" },
  { label: "Omgivelser", target: "finding-us" },
  { label: "Kontakt", target: "begin" }
];

export const metadata = {
  title: "500-timers yogalæreruddannelse i Rishikesh | Adhiroha",
  description:
    "500-timers yogalæreruddannelse i Rishikesh, certificeret af Yoga Alliance. 60 dage, hele vejen fra fundament til mesterskab, ophold i himalayansk ashram, alt inklusive.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "da_DK",
    url: `${SITE}${DA}`,
    title: "500-timers yogalæreruddannelse i Rishikesh | Adhiroha",
    description:
      "500-timers yogalæreruddannelse i Rishikesh, certificeret af Yoga Alliance. 60 dage, hele vejen fra fundament til mesterskab, ophold i himalayansk ashram, alt inklusive.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "500-timers yogalæreruddannelse i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 2790,
    days: 60,
    styles: "Hatha yoga, ashtanga vinyasa, yin, opretning, pranayama, meditation, yogafilosofi, anatomi, undervisningsmetodik",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "500-timers yogalæreruddannelse", url: DA }])
);

export default function Page() {
  return (
    <div lang="da">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
