// Pagina italiana della formazione insegnanti di yoga di 500 ore — servita su /it/500-ore-formazione-insegnanti-yoga-rishikesh.
// Riutilizza senza modifiche il foglio di stile e lo script della pagina inglese; cambia solo il contenuto.
import "../../../(en)/(main)/500-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/500-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const IT = "/it/500-ore-formazione-insegnanti-yoga-rishikesh/";
const EN = "/500-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "Formazione Insegnanti di Yoga di 500 Ore a Rishikesh | Adhiroha",
  description:
    "Completa il tuo RYT-500 con la nostra formazione insegnanti di yoga di 500 ore a Rishikesh, 60 giorni che combinano il programma delle 200 e delle 300 ore, con alloggio e pasti inclusi.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "it_IT",
    url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga di 500 Ore a Rishikesh | Adhiroha",
    description:
      "Completa il tuo RYT-500 con la nostra formazione insegnanti di yoga di 500 ore a Rishikesh, 60 giorni che combinano il programma delle 200 e delle 300 ore, con alloggio e pasti inclusi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione Insegnanti di Yoga di 500 Ore a Rishikesh | Adhiroha",
    description: "Completa il tuo RYT-500 con la nostra formazione insegnanti di yoga di 500 ore a Rishikesh, 60 giorni che combinano il programma delle 200 e delle 300 ore, con alloggio e pasti inclusi.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

// Dati strutturati per questa pagina — Course/FAQ/breadcrumbs così l'annuncio
// può ottenere rich results. Le FAQ vengono estratte dal markup della pagina stessa.
const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "Formazione Insegnanti di Yoga di 500 Ore a Rishikesh",
    description: metadata.description,
    url: IT,
    price: 2790,
    days: 60,
    styles: "Hatha yoga, Ashtanga vinyasa, asana avanzato, pranayama, meditazione, filosofia, anatomia, metodologia dell'insegnamento",
  ...courseFacts("/500-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione Insegnanti di Yoga di 500 Ore", url: IT }])
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
