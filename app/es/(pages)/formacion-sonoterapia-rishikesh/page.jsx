// Spanish Formación de sonoterapia page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/formacion-sonoterapia-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Formación de Sonoterapia en Rishikesh | Adhiroha",
  description: "Formación de Sonoterapia y Sanación con Sonido de 6 días en Rishikesh. Cuencos tibetanos, gongs y ciencia védica del sonido, acreditada por el Ministry of Ayush.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Formación de Sonoterapia en Rishikesh | Adhiroha", description: "Formación de Sonoterapia y Sanación con Sonido de 6 días en Rishikesh. Cuencos tibetanos, gongs y ciencia védica del sonido, acreditada por el Ministry of Ayush.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formación de Sonoterapia y Sanación con Sonido en Rishikesh", description: metadata.description, url: ES, price: 690, days: 6, styles: "Cuencos, gongs, canto de mantras, sonoterapia" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de Sonoterapia", url: ES }])
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
