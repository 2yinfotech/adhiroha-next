// Spanish Galería page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/galeria-yoga-india/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galería de Yoga | El Ashram Adhiroha, Rishikesh",
  description: "181 fotos auténticas del ashram Adhiroha en Upper Tapovan, Rishikesh — la shala, las habitaciones, la comida, las ceremonias y las personas.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Galería de Yoga | El Ashram Adhiroha, Rishikesh", description: "181 fotos auténticas del ashram Adhiroha en Upper Tapovan, Rishikesh — la shala, las habitaciones, la comida, las ceremonias y las personas.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galería", url: ES }])
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
