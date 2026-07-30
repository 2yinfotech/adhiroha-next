// French Code de conduite page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const FR = "/fr/code-de-conduite/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Code de conduite & règlement | Adhiroha, Rishikesh",
  description:
    "Consultez le code de conduite, les règles de l’ashram, les conditions de remboursement et d’annulation des formations de professeur de yoga à Adhiroha, Rishikesh, Inde.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Code de conduite & règlement | Adhiroha, Rishikesh",
    description: "Consultez le code de conduite, les règles de l’ashram, les conditions de remboursement et d’annulation des formations de professeur de yoga à Adhiroha, Rishikesh, Inde.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code de conduite & règlement | Adhiroha, Rishikesh",
    description: "Consultez le code de conduite, les règles de l’ashram, les conditions de remboursement et d’annulation des formations de professeur de yoga à Adhiroha, Rishikesh, Inde.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Code de conduite", url: FR }])
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
