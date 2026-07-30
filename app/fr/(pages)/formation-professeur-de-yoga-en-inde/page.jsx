// French Formation de professeur de yoga en Inde page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const FR = "/fr/formation-professeur-de-yoga-en-inde/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Formation de professeur de yoga en Inde | YTTC 200, 300 & 500 heures à Rishikesh | Adhiroha",
  description: "Formation de professeur de yoga certifiée Yoga Alliance de 200, 300 & 500 heures à Rishikesh, Inde. Hébergement inclus et formule tout compris.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Formation de professeur de yoga en Inde | YTTC 200, 300 & 500 heures à Rishikesh | Adhiroha", description: "Formation de professeur de yoga certifiée Yoga Alliance de 200, 300 & 500 heures à Rishikesh, Inde. Hébergement inclus et formule tout compris.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation de professeur de yoga en Inde | YTTC 200, 300 & 500 heures à Rishikesh | Adhiroha",
    description: "Formation de professeur de yoga certifiée Yoga Alliance de 200, 300 & 500 heures à Rishikesh, Inde. Hébergement inclus et formule tout compris.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formation de professeur de yoga de 200 heures à Rishikesh, Inde", description: metadata.description, url: FR, price: 1275, days: 24, styles: "Hatha, Ashtanga Vinyasa et Yin yoga" , ...courseFacts("/200-hour-yoga-teacher-training-course-rishikesh/")}),
  courseSchema({ name: "Formation de professeur de yoga de 300 heures à Rishikesh, Inde", description: metadata.description, url: FR, price: 1500, days: 30, styles: "Asana avancé, pranayama, philosophie" , ...courseFacts("/300-hour-yoga-teacher-training-course-rishikesh/")}),
  courseSchema({ name: "Formation de professeur de yoga de 500 heures à Rishikesh, Inde", description: metadata.description, url: FR, price: 2790, days: 60, styles: "Hatha, Ashtanga Vinyasa, asana avancé" , ...courseFacts("/500-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formation de professeur de yoga en Inde", url: FR }])
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
