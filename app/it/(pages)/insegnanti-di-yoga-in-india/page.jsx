// Italian I Nostri Insegnanti page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, teacherSchemas, hreflangFor } from "@/lib/seo";

const IT = "/it/insegnanti-di-yoga-in-india/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "I Nostri Insegnanti di Yoga a Rishikesh, India | Adhiroha",
  description:
    "Incontra gli acharya indiani esperti che insegnano ad Adhiroha — praticanti di lunga data di hatha, ashtanga, pranayama e filosofia dello yoga a Rishikesh.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "I Nostri Insegnanti di Yoga a Rishikesh, India | Adhiroha",
    description: "Incontra gli acharya indiani esperti che insegnano ad Adhiroha — praticanti di lunga data di hatha, ashtanga, pranayama e filosofia dello yoga a Rishikesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Nostri Insegnanti di Yoga a Rishikesh, India | Adhiroha",
    description: "Incontra gli acharya indiani esperti che insegnano ad Adhiroha — praticanti di lunga data di hatha, ashtanga, pranayama e filosofia dello yoga a Rishikesh.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...teacherSchemas("it"),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "I Nostri Insegnanti", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
