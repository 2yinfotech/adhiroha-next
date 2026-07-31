// French Politique de confidentialité page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/privacy-policy/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/privacy-policy/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const FR = "/fr/politique-de-confidentialite/";
const EN = "/privacy-policy/";

export const metadata = {
  title: "Politique de confidentialité | Adhiroha Yoga School, Rishikesh",
  description: "La politique de confidentialité d’Adhiroha Yoga School, quelles données nous collectons, comment nous les utilisons et comment nous les protégeons.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Politique de confidentialité | Adhiroha Yoga School, Rishikesh", description: "La politique de confidentialité d’Adhiroha Yoga School, quelles données nous collectons, comment nous les utilisons et comment nous les protégeons.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité | Adhiroha Yoga School, Rishikesh",
    description: "La politique de confidentialité d’Adhiroha Yoga School, quelles données nous collectons, comment nous les utilisons et comment nous les protégeons.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  breadcrumbSchema([{ name: "Politique de confidentialité", url: FR }])
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
