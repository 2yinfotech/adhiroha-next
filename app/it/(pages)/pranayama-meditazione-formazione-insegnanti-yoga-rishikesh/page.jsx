// Italian Pranayama & Meditation Formazione Insegnanti di Yoga in Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../../(en)/(main)/pranayama-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/pranayama-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const IT = "/it/pranayama-meditazione-formazione-insegnanti-yoga-rishikesh/";
const EN = "/pranayama-teacher-training-course-rishikesh/";

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
  title: "Formazione Insegnanti di Yoga Pranayama & Meditazione a Rishikesh | Adhiroha",
  description: "Una formazione insegnanti di yoga Pranayama e Meditazione di 14 giorni a Rishikesh. Respirazione, kriya e meditazione insegnati in modo tradizionale accanto al Ganga nel nostro ashram.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga Pranayama & Meditazione a Rishikesh | Adhiroha", description: "Una formazione insegnanti di yoga Pranayama e Meditazione di 14 giorni a Rishikesh. Respirazione, kriya e meditazione insegnati in modo tradizionale accanto al Ganga nel nostro ashram.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione Insegnanti di Yoga Pranayama & Meditazione a Rishikesh | Adhiroha",
    description: "Una formazione insegnanti di yoga Pranayama e Meditazione di 14 giorni a Rishikesh. Respirazione, kriya e meditazione insegnati in modo tradizionale accanto al Ganga nel nostro ashram.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({ name: "Formazione Insegnanti di Yoga Pranayama & Meditazione a Rishikesh", description: metadata.description, url: IT, price: 790, days: 14, styles: "Pranayama, kriya, meditazione, filosofia dello yoga" , ...courseFacts("/pranayama-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione in Pranayama e Meditazione", url: IT }])
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
