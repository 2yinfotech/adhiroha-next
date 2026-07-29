// Danish Ashtanga & Vinyasa course page — served at /da/ashtanga-vinyasa-yogalaereruddannelse-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/ashtanga-vinyasa-yogalaereruddannelse-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

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
  title: "Ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
  description:
    "Tolv dages ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "da_DK",
    url: `${SITE}${DA}`,
    title: "Ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
    description:
      "Tolv dages ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh | 12 dage — Adhiroha",
    description: "Tolv dages ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh, akkrediteret af Ayush-ministeriet. Små hold, ophold i himalayansk ashram, alle måltider og udflugter inkluderet.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Ashtanga- og vinyasa-yogalæreruddannelse i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 790,
    days: 14,
    styles: "Ashtanga yoga, vinyasa flow, opretning, pranayama, meditation, anatomi, undervisningsmetodik",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Ashtanga- og vinyasa-læreruddannelse", url: DA }])
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
