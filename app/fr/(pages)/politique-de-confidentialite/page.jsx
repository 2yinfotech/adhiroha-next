// French Politique de confidentialité page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/privacy-policy/styles.css";
import content from "./content";
import scripts from "../../../(main)/privacy-policy/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/politique-de-confidentialite/";
const EN = "/privacy-policy/";

export const metadata = {
  title: "Politique de confidentialité | Adhiroha Yoga School, Rishikesh",
  description: "La politique de confidentialité d’Adhiroha Yoga School — quelles données nous collectons, comment nous les utilisons et comment nous les protégeons.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Politique de confidentialité | Adhiroha Yoga School, Rishikesh", description: "La politique de confidentialité d’Adhiroha Yoga School — quelles données nous collectons, comment nous les utilisons et comment nous les protégeons.",
  },
};

const pageSchema = graph(
  breadcrumbSchema([{ name: "Politique de confidentialité", url: DE }])
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
