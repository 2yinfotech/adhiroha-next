// Spanish Programa de Inmersión Sadhana page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/programa-inmersion-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Programa de Inmersión Sadhana en Rishikesh | 15 Días",
  description:
    "Un Programa de Inmersión Sadhana de 15 días en Rishikesh para profundizar tu práctica personal — sadhana diaria disciplinada, silencio y vida yóguica en nuestro ashram del Himalaya.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Programa de Inmersión Sadhana en Rishikesh | 15 Días",
    description: "Un Programa de Inmersión Sadhana de 15 días en Rishikesh para profundizar tu práctica personal — sadhana diaria disciplinada, silencio y vida yóguica en nuestro ashram del Himalaya.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Programa de Inmersión Sadhana en Rishikesh", description: metadata.description, url: ES, price: 699, days: 15, styles: "Sadhana diaria, meditación, silencio, vida yóguica" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Programa de Inmersión Sadhana", url: ES }])
);

export default function Page() {
  return (
    <div lang="es">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
