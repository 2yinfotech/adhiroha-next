// Danish Hatha & Yin course page — served at /da/hatha-yin-yogalaereruddannelse-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/hatha-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/hatha-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const DA = "/da/hatha-yin-yogalaereruddannelse-rishikesh/";
const EN = "/hatha-teacher-training-course-rishikesh/";

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
  title: "Hatha- og yin-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
  description:
    "Tolv dages hatha- og yin-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "da_DK",
    url: `${SITE}${DA}`,
    title: "Hatha- og yin-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
    description:
      "Tolv dages hatha- og yin-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hatha- og yin-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
    description: "Tolv dages hatha- og yin-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "Hatha- og yin-yogalæreruddannelse i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 790,
    days: 14,
    styles: "Hatha yoga, yin yoga, opretning, pranayama, meditation, anatomi, undervisningsmetodik",
  ...courseFacts("/hatha-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Hatha- og yin-læreruddannelse", url: DA }])
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
