// French Programme d'immersion Sadhana page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/programme-immersion-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Programme d’immersion Sadhana à Rishikesh | 15 jours",
  description:
    "Une immersion Sadhana de 15 jours à Rishikesh pour une pratique personnelle plus profonde — sadhana quotidienne disciplinée, silence et vie yogique dans notre ashram himalayen.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Programme d’immersion Sadhana à Rishikesh | 15 jours",
    description: "Une immersion Sadhana de 15 jours à Rishikesh pour une pratique personnelle plus profonde — sadhana quotidienne disciplinée, silence et vie yogique dans notre ashram himalayen.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Programme d’immersion Sadhana à Rishikesh",
    description: metadata.description,
    url: DE,
    price: 699,
    days: 15,
    styles: "Sadhana quotidienne, méditation, silence, vie yogique",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Programme d’immersion Sadhana", url: DE }])
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
