// Spanish Formación de sonoterapia page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const ES = "/es/formacion-sonoterapia-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Formación de Sonoterapia en Rishikesh | Adhiroha",
  description: "Formación de Sonoterapia y Sanación con Sonido de 6 días en Rishikesh. Cuencos tibetanos, gongs y ciencia védica del sonido, acreditada por el Ministry of Ayush.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Formación de Sonoterapia en Rishikesh | Adhiroha", description: "Formación de Sonoterapia y Sanación con Sonido de 6 días en Rishikesh. Cuencos tibetanos, gongs y ciencia védica del sonido, acreditada por el Ministry of Ayush.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de Sonoterapia en Rishikesh | Adhiroha",
    description: "Formación de Sonoterapia y Sanación con Sonido de 6 días en Rishikesh. Cuencos tibetanos, gongs y ciencia védica del sonido, acreditada por el Ministry of Ayush.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formación de Sonoterapia y Sanación con Sonido en Rishikesh", description: metadata.description, url: ES, price: 690, days: 6, styles: "Cuencos, gongs, canto de mantras, sonoterapia" , ...courseFacts("/sound-healing-ttc-rishikesh/")}),
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
