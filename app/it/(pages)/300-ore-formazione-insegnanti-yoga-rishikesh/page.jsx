// Pagina italiana della formazione insegnanti di yoga di 300 ore — servita su /it/300-ore-formazione-insegnanti-yoga-rishikesh.
// Riutilizza senza modifiche il foglio di stile e lo script della pagina inglese; cambia solo il contenuto.
import "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

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
  title: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh | Adhiroha",
  description:
    "Fai progredire la tua pratica con la nostra formazione insegnanti di yoga di 300 ore a Rishikesh. 30 giorni di asana avanzato, pranayama e filosofia in un ashram accreditato Yoga Alliance.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "it_IT",
    url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh | Adhiroha",
    description:
      "Fai progredire la tua pratica con la nostra formazione insegnanti di yoga di 300 ore a Rishikesh. 30 giorni di asana avanzato, pranayama e filosofia in un ashram accreditato Yoga Alliance.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh",
    description: metadata.description,
    url: IT,
    price: 1500,
    days: 30,
    styles: "Asana avanzato, pranayama, kriya, filosofia dello yoga, anatomia, metodologia avanzata dell'insegnamento",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione Insegnanti di Yoga di 300 Ore", url: IT }])
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
