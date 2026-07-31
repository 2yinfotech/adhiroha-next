// French Sécurité & Hygiène page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const FR = "/fr/securite-hygiene-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Sécurité & hygiène dans notre ashram de Rishikesh | Adhiroha",
  description: "Comment Adhiroha à Rishikesh assure la sécurité, l’hygiène et la logistique de voyage, en particulier pour les femmes voyageant seules. Accueil à l’arrivée, vidéosurveillance et plus.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Sécurité & hygiène dans notre ashram de Rishikesh | Adhiroha", description: "Comment Adhiroha à Rishikesh assure la sécurité, l’hygiène et la logistique de voyage, en particulier pour les femmes voyageant seules. Accueil à l’arrivée, vidéosurveillance et plus.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sécurité & hygiène dans notre ashram de Rishikesh | Adhiroha",
    description: "Comment Adhiroha à Rishikesh assure la sécurité, l’hygiène et la logistique de voyage, en particulier pour les femmes voyageant seules. Accueil à l’arrivée, vidéosurveillance et plus.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sécurité & hygiène", url: FR }])
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
