// Danish Pranayama & Meditation course page — served at /da/pranayama-meditation-yogalaereruddannelse-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/pranayama-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/pranayama-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const DA = "/da/pranayama-meditation-yogalaereruddannelse-rishikesh/";
const EN = "/pranayama-teacher-training-course-rishikesh/";

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
  title: "Pranayama- og meditations-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
  description:
    "Tolv dages pranayama- og meditations-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "da_DK",
    url: `${SITE}${DA}`,
    title: "Pranayama- og meditations-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
    description:
      "Tolv dages pranayama- og meditations-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranayama- og meditations-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
    description: "Tolv dages pranayama- og meditations-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "Pranayama- og meditations-yogalæreruddannelse i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 790,
    days: 14,
    styles: "Pranayama, meditation, shatkarma, yogafilosofi, anatomi for den subtile krop, undervisningsmetodik",
  ...courseFacts("/pranayama-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Pranayama- og meditationsuddannelse", url: DA }])
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
