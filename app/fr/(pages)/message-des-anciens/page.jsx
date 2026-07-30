// French Message des anciens page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const FR = "/fr/message-des-anciens/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Avis d’élèves & messages des anciens | Adhiroha",
  description:
    "Découvrez ce que disent les diplômés peu après leur formation à Adhiroha — des messages sincères d’élèves de nos cours de 200, 300 et 500 heures à Rishikesh.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Avis d’élèves & messages des anciens | Adhiroha",
    description: "Découvrez ce que disent les diplômés peu après leur formation à Adhiroha — des messages sincères d’élèves de nos cours de 200, 300 et 500 heures à Rishikesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avis d’élèves & messages des anciens | Adhiroha",
    description: "Découvrez ce que disent les diplômés peu après leur formation à Adhiroha — des messages sincères d’élèves de nos cours de 200, 300 et 500 heures à Rishikesh.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Message des anciens", url: FR }])
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
