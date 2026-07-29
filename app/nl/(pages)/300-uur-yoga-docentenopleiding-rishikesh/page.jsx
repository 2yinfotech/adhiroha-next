// Dutch 300-hour course page — served at /nl/300-uur-yoga-docentenopleiding-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/300-uur-yoga-docentenopleiding-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introductie", target: "top" },
  { label: "Prijzen", target: "course-glance" },
  { label: "Vakken", target: "curriculum" },
  { label: "Dagritme", target: "daily-rhythm" },
  { label: "Voorzieningen", target: "amenities" },
  { label: "Verblijf", target: "accommodation" },
  { label: "Docenten", target: "your-teachers" },
  { label: "Omgeving", target: "finding-us" },
  { label: "Contact", target: "begin" }
];

export const metadata = {
  title: "300-Uur Yoga-docentenopleiding in Rishikesh | Adhiroha",
  description:
    "Gevorderde 300-uur yoga-docentenopleiding in Rishikesh, gecertificeerd door Yoga Alliance. 30 dagen, kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "nl_NL",
    url: `${SITE}${NL}`,
    title: "300-Uur Yoga-docentenopleiding in Rishikesh | Adhiroha",
    description:
      "Gevorderde 300-uur yoga-docentenopleiding in Rishikesh, gecertificeerd door Yoga Alliance. 30 dagen, kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "300-Uur Yoga-docentenopleiding in Rishikesh",
    description: metadata.description,
    url: NL,
    price: 1500,
    days: 30,
    styles: "Gevorderde hatha yoga, ashtanga vinyasa, uitlijning, pranayama, meditatie, yogafilosofie, anatomie",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "300-uur yoga-docentenopleiding", url: NL }])
);

export default function Page() {
  return (
    <div lang="nl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
