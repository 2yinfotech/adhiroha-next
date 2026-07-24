// French Message des anciens page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/message-des-anciens/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Avis d’élèves & messages des anciens | Adhiroha",
  description:
    "Découvrez ce que disent les diplômés peu après leur formation à Adhiroha — des messages sincères d’élèves de nos cours de 200, 300 et 500 heures à Rishikesh.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Avis d’élèves & messages des anciens | Adhiroha",
    description: "Découvrez ce que disent les diplômés peu après leur formation à Adhiroha — des messages sincères d’élèves de nos cours de 200, 300 et 500 heures à Rishikesh.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Message des anciens", url: DE }])
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
