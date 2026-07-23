// French Galerie page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/galerie-yoga-inde/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galerie de yoga | L’ashram Adhiroha, Rishikesh",
  description: "181 photos authentiques de l’ashram Adhiroha à Upper Tapovan, Rishikesh — la shala, les chambres, les repas, les cérémonies et les personnes.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Galerie de yoga | L’ashram Adhiroha, Rishikesh", description: "181 photos authentiques de l’ashram Adhiroha à Upper Tapovan, Rishikesh — la shala, les chambres, les repas, les cérémonies et les personnes.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galerie", url: DE }])
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
