// Pagina italiana della formazione insegnanti di yoga di 300 ore — servita su /it/300-ore-formazione-insegnanti-yoga-rishikesh.
// Riutilizza senza modifiche il foglio di stile e lo script della pagina inglese; cambia solo il contenuto.
import "../../../(en)/(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import rawContent from "./content";
import { withBatchTable, upcomingBatches } from "@/lib/batches";
import scripts from "../../../(en)/(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

// The batch table is rendered here, not by scripts.js after load, so the
// dates are in the HTML. Revalidated daily so the months roll forward.
export const revalidate = 86400;
const content = rawContent;
const renderedContent = () => withBatchTable(rawContent, "300", "it");

const IT = "/it/300-ore-formazione-insegnanti-yoga-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh",
  description:
    "Fai progredire la tua pratica con la nostra formazione insegnanti di yoga di 300 ore a Rishikesh. 30 giorni di asana avanzato, pranayama e filosofia in una scuola registrata presso Yoga Alliance.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "it_IT",
    url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh | Adhiroha",
    description:
      "Fai progredire la tua pratica con la nostra formazione insegnanti di yoga di 300 ore a Rishikesh. 30 giorni di asana avanzato, pranayama e filosofia in una scuola registrata presso Yoga Alliance.",
    images: [{ url: "/img/adhiroha-og.jpg", width: 1200, height: 630, alt: "Adhiroha Yoga School" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh | Adhiroha",
    description: "Fai progredire la tua pratica con la nostra formazione insegnanti di yoga di 300 ore a Rishikesh. 30 giorni di asana avanzato, pranayama e filosofia in una scuola registrata presso Yoga Alliance.",
    images: ["/img/adhiroha-og.jpg"],
  },
};

const pageSchema = () => graph(
  ...studentVideoSchemas(),
  courseSchema({
    batches: upcomingBatches("300", 6),
    name: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh",
    description: metadata.description,
    url: IT,
    price: 1500,
    days: 30,
    styles: "Asana avanzato, pranayama, kriya, filosofia dello yoga, anatomia, metodologia avanzata dell'insegnamento",
  ...courseFacts("/300-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione Insegnanti di Yoga di 300 Ore", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema()} />
      <div dangerouslySetInnerHTML={{ __html: renderedContent() }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
