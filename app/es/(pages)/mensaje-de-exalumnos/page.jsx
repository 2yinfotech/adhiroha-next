// Spanish Mensaje de Exalumnos page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const ES = "/es/mensaje-de-exalumnos/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Opiniones de Alumnos y Mensajes de Exalumnos | Adhiroha",
  description:
    "Descubre lo que dicen los graduados poco después de su formación en Adhiroha, mensajes sinceros de alumnos de nuestros cursos de 200, 300 y 500 horas en Rishikesh.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Opiniones de Alumnos y Mensajes de Exalumnos | Adhiroha",
    description: "Descubre lo que dicen los graduados poco después de su formación en Adhiroha, mensajes sinceros de alumnos de nuestros cursos de 200, 300 y 500 horas en Rishikesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opiniones de Alumnos y Mensajes de Exalumnos | Adhiroha",
    description: "Descubre lo que dicen los graduados poco después de su formación en Adhiroha, mensajes sinceros de alumnos de nuestros cursos de 200, 300 y 500 horas en Rishikesh.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Mensaje de Exalumnos", url: ES }])
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
