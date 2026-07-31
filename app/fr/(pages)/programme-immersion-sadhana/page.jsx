// French Programme d'immersion Sadhana page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const FR = "/fr/programme-immersion-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Programme d’immersion Sadhana à Rishikesh | 15 jours",
  description:
    "Une immersion Sadhana de 15 jours à Rishikesh pour une pratique personnelle plus profonde, sadhana quotidienne disciplinée, silence et vie yogique dans notre ashram himalayen.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Programme d’immersion Sadhana à Rishikesh | 15 jours",
    description: "Une immersion Sadhana de 15 jours à Rishikesh pour une pratique personnelle plus profonde, sadhana quotidienne disciplinée, silence et vie yogique dans notre ashram himalayen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programme d’immersion Sadhana à Rishikesh | 15 jours",
    description: "Une immersion Sadhana de 15 jours à Rishikesh pour une pratique personnelle plus profonde, sadhana quotidienne disciplinée, silence et vie yogique dans notre ashram himalayen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Programme d’immersion Sadhana à Rishikesh",
    description: metadata.description,
    url: FR,
    price: 699,
    days: 15,
    styles: "Sadhana quotidienne, méditation, silence, vie yogique",
  ...courseFacts("/sadhana-immersion-programme/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Programme d’immersion Sadhana", url: FR }])
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
