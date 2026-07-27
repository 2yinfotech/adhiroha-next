// Italian Ashtanga & Vinyasa Yoga Teacher Training in Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../../(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/ashtanga-vinyasa-formazione-insegnanti-yoga-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

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
  title: "Formazione Insegnanti di Yoga Ashtanga a Rishikesh | Adhiroha",
  description: "Impara la serie primaria e il sequencing vinyasa nella nostra formazione insegnanti di yoga Ashtanga di 14 giorni a Rishikesh, tra le pendici himalayane di Upper Tapovan.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga Ashtanga a Rishikesh | Adhiroha", description: "Impara la serie primaria e il sequencing vinyasa nella nostra formazione insegnanti di yoga Ashtanga di 14 giorni a Rishikesh, tra le pendici himalayane di Upper Tapovan.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formazione Insegnanti di Yoga Ashtanga & Vinyasa a Rishikesh", description: metadata.description, url: IT, price: 790, days: 14, styles: "Serie primaria Ashtanga, sequenze vinyasa, pranayama, meditazione" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione Insegnanti di Yoga Ashtanga & Vinyasa", url: IT }])
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
