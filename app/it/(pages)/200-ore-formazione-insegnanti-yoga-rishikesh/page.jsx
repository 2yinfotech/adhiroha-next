// Italian 200-hour course page — served at /it/200-ore-formazione-insegnanti-yoga-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/200-ore-formazione-insegnanti-yoga-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introduzione", target: "top" },
  { label: "Tariffe", target: "course-glance" },
  { label: "Materie", target: "curriculum" },
  { label: "Il Ritmo Giornaliero", target: "daily-rhythm" },
  { label: "Strutture", target: "amenities" },
  { label: "Alloggio", target: "accommodation" },
  { label: "Insegnanti", target: "your-teachers" },
  { label: "Dintorni", target: "finding-us" },
  { label: "Contattaci", target: "begin" }
];

export const metadata = {
  title: "Formazione Insegnanti di Yoga di 200 Ore a Rishikesh | Adhiroha",
  description:
    "Formazione insegnanti di yoga di 200 ore a Rishikesh, certificata Yoga Alliance. 24 giorni, gruppi ridotti, soggiorno in ashram himalayano, tutti i pasti e le escursioni incluse.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "it_IT",
    url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga di 200 Ore a Rishikesh | Adhiroha",
    description:
      "Formazione insegnanti di yoga di 200 ore a Rishikesh, certificata Yoga Alliance. 24 giorni, gruppi ridotti, soggiorno in ashram himalayano, tutti i pasti e le escursioni incluse.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione Insegnanti di Yoga di 200 Ore a Rishikesh | Adhiroha",
    description: "Formazione insegnanti di yoga di 200 ore a Rishikesh, certificata Yoga Alliance. 24 giorni, gruppi ridotti, soggiorno in ashram himalayano, tutti i pasti e le escursioni incluse.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
  courseSchema({
    name: "Formazione Insegnanti di Yoga di 200 Ore a Rishikesh",
    description: metadata.description,
    url: IT,
    price: 1275,
    days: 24,
    styles: "Hatha Yoga, Ashtanga Vinyasa, Pranayama, Meditazione, Filosofia dello Yoga, Anatomia, Metodologia dell'Insegnamento",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione Insegnanti di Yoga di 200 Ore", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
