// Italian Messaggi degli Ex Studenti page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/messaggi-degli-ex-studenti/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Recensioni degli Studenti e Messaggi degli Ex Allievi | Adhiroha",
  description:
    "Leggi cosa dicono i diplomati subito dopo la loro formazione ad Adhiroha — messaggi sinceri dagli studenti dei nostri corsi di 200, 300 e 500 ore a Rishikesh.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Recensioni degli Studenti e Messaggi degli Ex Allievi | Adhiroha",
    description: "Leggi cosa dicono i diplomati subito dopo la loro formazione ad Adhiroha — messaggi sinceri dagli studenti dei nostri corsi di 200, 300 e 500 ore a Rishikesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recensioni degli Studenti e Messaggi degli Ex Allievi | Adhiroha",
    description: "Leggi cosa dicono i diplomati subito dopo la loro formazione ad Adhiroha — messaggi sinceri dagli studenti dei nostri corsi di 200, 300 e 500 ore a Rishikesh.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Recensioni degli Studenti", url: IT }])
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
