// Dutch Hatha & Yin course page — served at /nl/hatha-yin-yoga-docentenopleiding-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/hatha-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/hatha-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/hatha-yin-yoga-docentenopleiding-rishikesh/";
const EN = "/hatha-teacher-training-course-rishikesh/";

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
  title: "Hatha- en Yin-yoga-docentenopleiding in Rishikesh | 12 Dagen — Adhiroha",
  description:
    "Twaalfdaagse hatha- en yin-yoga-docentenopleiding in Rishikesh, geaccrediteerd door het Ministerie van Ayush. Kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "nl_NL",
    url: `${SITE}${NL}`,
    title: "Hatha- en Yin-yoga-docentenopleiding in Rishikesh | 12 Dagen — Adhiroha",
    description:
      "Twaalfdaagse hatha- en yin-yoga-docentenopleiding in Rishikesh, geaccrediteerd door het Ministerie van Ayush. Kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hatha- en Yin-yoga-docentenopleiding in Rishikesh | 12 Dagen — Adhiroha",
    description: "Twaalfdaagse hatha- en yin-yoga-docentenopleiding in Rishikesh, geaccrediteerd door het Ministerie van Ayush. Kleine groepen, verblijf in een Himalaya-ashram, alle maaltijden en uitstapjes inbegrepen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Hatha- en Yin-yoga-docentenopleiding in Rishikesh",
    description: metadata.description,
    url: NL,
    price: 790,
    days: 14,
    styles: "Hatha yoga, yin yoga, uitlijning, pranayama, meditatie, anatomie, lesmethodiek",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Hatha- en yin-docentenopleiding", url: NL }])
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
