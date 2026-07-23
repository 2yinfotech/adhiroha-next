// French FAQ page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../(main)/faqs-of-yoga-school-in-india/styles.css";
import content from "./content";
import scripts from "../../(main)/faqs-of-yoga-school-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/faq-ecole-de-yoga-inde/";
const EN = "/faqs-of-yoga-school-in-india/";

export const metadata = {
  title: "FAQ | École de formation de professeur de yoga à Rishikesh, Inde | Adhiroha",
  description:
    "Réponses aux questions les plus fréquentes sur la formation de professeur de yoga d’Adhiroha à Rishikesh — le cours, le voyage et les repas, l’inscription, la certification et la remise des diplômes.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "FAQ | École de formation de professeur de yoga à Rishikesh, Inde | Adhiroha",
    description: "Réponses aux questions les plus fréquentes sur la formation de professeur de yoga d’Adhiroha à Rishikesh — le cours, le voyage et les repas, l’inscription, la certification et la remise des diplômes.",
  },
};

// FAQs are parsed from the page's own markup so the listing can earn rich results.
const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "FAQ", url: DE }])
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
