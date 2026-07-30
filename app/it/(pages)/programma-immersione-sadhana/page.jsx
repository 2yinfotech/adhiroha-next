// Italian Programma di Immersione Sadhana page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const IT = "/it/programma-immersione-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Programma di Immersione Sadhana a Rishikesh | 15 Giorni",
  description:
    "Un Programma di Immersione Sadhana di 15 giorni a Rishikesh per approfondire la tua pratica personale — sadhana quotidiana disciplinata, silenzio e vita yogica nel nostro ashram dell'Himalaya.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Programma di Immersione Sadhana a Rishikesh | 15 Giorni",
    description: "Un Programma di Immersione Sadhana di 15 giorni a Rishikesh per approfondire la tua pratica personale — sadhana quotidiana disciplinata, silenzio e vita yogica nel nostro ashram dell'Himalaya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programma di Immersione Sadhana a Rishikesh | 15 Giorni",
    description: "Un Programma di Immersione Sadhana di 15 giorni a Rishikesh per approfondire la tua pratica personale — sadhana quotidiana disciplinata, silenzio e vita yogica nel nostro ashram dell'Himalaya.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Programma di Immersione Sadhana a Rishikesh", description: metadata.description, url: IT, price: 699, days: 15, styles: "Sadhana quotidiana, meditazione, silenzio, vita yogica" , ...courseFacts("/sadhana-immersion-programme/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Programma di Immersione Sadhana", url: IT }])
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
