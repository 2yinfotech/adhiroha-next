// French Ashtanga & Vinyasa formation de professeur de yoga à Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../../(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/ashtanga-vinyasa-formation-professeur-de-yoga-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

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
  title: "Formation Ashtanga & Vinyasa de professeur de yoga à Rishikesh | Adhiroha",
  description: "Formation de professeur de yoga Ashtanga & Vinyasa de 12 jours à Rishikesh, accréditée par le Ministry of Ayush. Petits groupes, hébergement en ashram, tous les repas inclus.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Formation Ashtanga & Vinyasa de professeur de yoga à Rishikesh | Adhiroha", description: "Formation de professeur de yoga Ashtanga & Vinyasa de 12 jours à Rishikesh, accréditée par le Ministry of Ayush. Petits groupes, hébergement en ashram, tous les repas inclus.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formation Ashtanga & Vinyasa de professeur de yoga à Rishikesh", description: metadata.description, url: DE, price: 790, days: 14, styles: "Ashtanga série primaire, séquençage vinyasa, pranayama, méditation" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formation Ashtanga & Vinyasa", url: DE }])
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
