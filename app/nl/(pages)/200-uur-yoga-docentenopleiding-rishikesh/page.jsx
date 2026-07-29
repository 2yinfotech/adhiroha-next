// Dutch 200-hour course page — served at /nl/200-uur-yoga-docentenopleiding-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/200-uur-yoga-docentenopleiding-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "200-Uur Yoga-docentenopleiding in Rishikesh | Adhiroha",
  description:
    "200-uur yoga-docentenopleiding in Rishikesh, gecertificeerd door Yoga Alliance. 24 dagen, kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "nl_NL",
    url: `${SITE}${NL}`,
    title: "200-Uur Yoga-docentenopleiding in Rishikesh | Adhiroha",
    description:
      "200-uur yoga-docentenopleiding in Rishikesh, gecertificeerd door Yoga Alliance. 24 dagen, kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "200-Uur Yoga-docentenopleiding in Rishikesh | Adhiroha",
    description: "200-uur yoga-docentenopleiding in Rishikesh, gecertificeerd door Yoga Alliance. 24 dagen, kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
  courseSchema({
    name: "200-Uur Yoga-docentenopleiding in Rishikesh",
    description: metadata.description,
    url: NL,
    price: 1275,
    days: 24,
    styles: "Hatha yoga, ashtanga vinyasa, pranayama, meditatie, yogafilosofie, anatomie, lesmethodiek",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200-uur yoga-docentenopleiding", url: NL }])
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
