// French Nos professeurs page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, teacherSchemas, hreflangFor } from "@/lib/seo";

const FR = "/fr/professeurs-de-yoga-en-inde/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Nos professeurs de yoga à Rishikesh, Inde | Adhiroha",
  description: "Rencontrez les acharyas de yoga d’Adhiroha à Rishikesh — chacun spécialiste avec 9 à 20 ans d’expérience dans sa propre discipline.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Nos professeurs de yoga à Rishikesh, Inde | Adhiroha", description: "Rencontrez les acharyas de yoga d’Adhiroha à Rishikesh — chacun spécialiste avec 9 à 20 ans d’expérience dans sa propre discipline.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos professeurs de yoga à Rishikesh, Inde | Adhiroha",
    description: "Rencontrez les acharyas de yoga d’Adhiroha à Rishikesh — chacun spécialiste avec 9 à 20 ans d’expérience dans sa propre discipline.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...teacherSchemas("fr"),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Nos professeurs", url: FR }])
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
