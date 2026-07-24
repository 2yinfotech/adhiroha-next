// French À propos page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/a-propos/";
const EN = "/about-us/";

export const metadata = {
  title: "À propos d’Adhiroha | École de yoga à Rishikesh, Inde",
  description:
    "Adhiroha est une école de yoga certifiée Yoga Alliance à Upper Tapovan, Rishikesh — un ashram de 20 000 pi², plus de 3 000 élèves formés issus de plus de 70 pays.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "À propos d’Adhiroha | École de yoga à Rishikesh, Inde",
    description: "Adhiroha est une école de yoga certifiée Yoga Alliance à Upper Tapovan, Rishikesh — un ashram de 20 000 pi², plus de 3 000 élèves formés issus de plus de 70 pays.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "À propos", url: DE }])
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
