// Italian Hatha & Yin Yoga Teacher Training in Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../../(main)/hatha-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/hatha-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/hatha-yin-formazione-insegnanti-yoga-rishikesh/";
const EN = "/hatha-teacher-training-course-rishikesh/";

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
  title: "Formazione Insegnanti di Yoga Hatha & Yin a Rishikesh | Adhiroha",
  description:
    "Formazione insegnanti di Hatha e Yin yoga di 14 giorni a Rishikesh. Allineamento tradizionale, posizioni prolungate e pratica rigenerante con insegnanti indiani esperti.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga Hatha & Yin a Rishikesh | Adhiroha", description: "Formazione insegnanti di Hatha e Yin yoga di 14 giorni a Rishikesh. Allineamento tradizionale, posizioni prolungate e pratica rigenerante con insegnanti indiani esperti.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione Insegnanti di Yoga Hatha & Yin a Rishikesh | Adhiroha",
    description: "Formazione insegnanti di Hatha e Yin yoga di 14 giorni a Rishikesh. Allineamento tradizionale, posizioni prolungate e pratica rigenerante con insegnanti indiani esperti.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Formazione Insegnanti di Yoga Hatha & Yin a Rishikesh",
      description: metadata.description,
      url: IT,
      price: 790,
      days: 14,
      styles: "Hatha yoga, Yin yoga, allineamento, pranayama, meditazione",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Formazione Insegnanti di Hatha & Yin Yoga", url: IT }])
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
