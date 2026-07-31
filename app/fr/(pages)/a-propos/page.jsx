// French À propos page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const FR = "/fr/a-propos/";
const EN = "/about-us/";

export const metadata = {
  title: "À propos d’Adhiroha | École de yoga à Rishikesh, Inde",
  description:
    "Adhiroha est une école de yoga certifiée Yoga Alliance à Upper Tapovan, Rishikesh, un ashram de 20 000 pi², plus de 3 000 élèves formés issus de plus de 70 pays.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "À propos d’Adhiroha | École de yoga à Rishikesh, Inde",
    description: "Adhiroha est une école de yoga certifiée Yoga Alliance à Upper Tapovan, Rishikesh, un ashram de 20 000 pi², plus de 3 000 élèves formés issus de plus de 70 pays.",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos d’Adhiroha | École de yoga à Rishikesh, Inde",
    description: "Adhiroha est une école de yoga certifiée Yoga Alliance à Upper Tapovan, Rishikesh, un ashram de 20 000 pi², plus de 3 000 élèves formés issus de plus de 70 pays.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "À propos", url: FR }])
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
