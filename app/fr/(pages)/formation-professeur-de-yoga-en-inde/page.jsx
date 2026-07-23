// French Formation de professeur de yoga en Inde page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/formation-professeur-de-yoga-en-inde/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Formation de professeur de yoga en Inde | YTTC 200, 300 & 500 heures à Rishikesh | Adhiroha",
  description: "Formation de professeur de yoga certifiée Yoga Alliance de 200, 300 & 500 heures à Rishikesh, Inde. Hébergement inclus et formule tout compris.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Formation de professeur de yoga en Inde | YTTC 200, 300 & 500 heures à Rishikesh | Adhiroha", description: "Formation de professeur de yoga certifiée Yoga Alliance de 200, 300 & 500 heures à Rishikesh, Inde. Hébergement inclus et formule tout compris.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formation de professeur de yoga de 200 heures à Rishikesh, Inde", description: metadata.description, url: DE, price: 1275, days: 24, styles: "Hatha, Ashtanga Vinyasa et Yin yoga" }),
  courseSchema({ name: "Formation de professeur de yoga de 300 heures à Rishikesh, Inde", description: metadata.description, url: DE, price: 1500, days: 30, styles: "Asana avancé, pranayama, philosophie" }),
  courseSchema({ name: "Formation de professeur de yoga de 500 heures à Rishikesh, Inde", description: metadata.description, url: DE, price: 2790, days: 60, styles: "Hatha, Ashtanga Vinyasa, asana avancé" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formation de professeur de yoga en Inde", url: DE }])
);

export default function Page() {
  return (
    <div lang="fr">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
