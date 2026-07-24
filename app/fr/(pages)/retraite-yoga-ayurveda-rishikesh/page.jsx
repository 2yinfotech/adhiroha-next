// French Retraite Yoga & Ayurveda page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/retraite-yoga-ayurveda-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Retraite Yoga & Ayurveda à Rishikesh | 6 jours — Adhiroha",
  description:
    "Une retraite bien-être de 6 jours de yoga et d’Ayurveda à Rishikesh. Yoga quotidien, thérapies ayurvédiques, repas sattviques et calme himalayen — à partir de 510 € tout compris.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Retraite Yoga & Ayurveda à Rishikesh | 6 jours — Adhiroha",
    description: "Une retraite bien-être de 6 jours de yoga et d’Ayurveda à Rishikesh. Yoga quotidien, thérapies ayurvédiques, repas sattviques et calme himalayen — à partir de 510 € tout compris.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Retraite bien-être Yoga & Ayurveda à Rishikesh",
    description: metadata.description,
    url: DE,
    price: 510,
    days: 6,
    styles: "Hatha yoga, thérapies ayurvédiques, méditation, bien-être",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Retraite bien-être Yoga & Ayurveda", url: DE }])
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
