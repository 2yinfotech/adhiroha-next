// Italian Formazione Sonoterapia page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/formazione-sonoterapia-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Formazione in Guarigione del Suono a Rishikesh | Adhiroha",
  description: "Formazione Insegnanti in Guarigione del Suono e Terapia di 6 giorni a Rishikesh. Ciotole tibetane, gong e scienza vedica del suono, in un ashram registrato Yoga Alliance.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Formazione in Guarigione del Suono a Rishikesh | Adhiroha", description: "Formazione Insegnanti in Guarigione del Suono e Terapia di 6 giorni a Rishikesh. Ciotole tibetane, gong e scienza vedica del suono, in un ashram registrato Yoga Alliance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione in Guarigione del Suono a Rishikesh | Adhiroha",
    description: "Formazione Insegnanti in Guarigione del Suono e Terapia di 6 giorni a Rishikesh. Ciotole tibetane, gong e scienza vedica del suono, in un ashram registrato Yoga Alliance.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formazione Insegnanti in Guarigione del Suono e Terapia a Rishikesh", description: metadata.description, url: IT, price: 690, days: 6, styles: "Ciotole tibetane, gong, canto dei mantra, sonoterapia" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione in Guarigione del Suono", url: IT }])
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
