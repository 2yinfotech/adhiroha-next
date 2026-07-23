// French Formation de professeur de yoga de 500 heures à Rishikesh — reuses the English course dir's CSS/JS unchanged; only the copy differs.
import "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/500-heures-formation-professeur-de-yoga-rishikesh/";
const EN = "/500-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introduction", target: "top" },
  { label: "Tarifs", target: "course-glance" },
  { label: "Matières", target: "curriculum" },
  { label: "Programme quotidien", target: "daily-rhythm" },
  { label: "Équipements", target: "amenities" },
  { label: "Hébergement", target: "accommodation" },
  { label: "Professeurs", target: "your-teachers" },
  { label: "Environs", target: "finding-us" },
  { label: "Contact", target: "begin" }
];

export const metadata = {
  title: "Formation de professeur de yoga de 500 heures à Rishikesh | Adhiroha",
  description: "Obtiens ton RYT-500 avec notre formation de professeur de yoga de 500 heures à Rishikesh — 60 jours réunissant les programmes de 200 et 300 heures, hébergement et repas inclus.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Formation de professeur de yoga de 500 heures à Rishikesh | Adhiroha", description: "Obtiens ton RYT-500 avec notre formation de professeur de yoga de 500 heures à Rishikesh — 60 jours réunissant les programmes de 200 et 300 heures, hébergement et repas inclus.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formation de professeur de yoga de 500 heures à Rishikesh", description: metadata.description, url: DE, price: 2790, days: 60, styles: "Hatha Yoga, Ashtanga Vinyasa, asana avancé, pranayama, méditation, philosophie, anatomie, méthodologie d’enseignement" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formation de professeur de yoga de 500 heures", url: DE }])
);

export default function Page() {
  return (
    <div lang="fr">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
