// Spanish Nuestros profesores page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/profesores-de-yoga-en-india/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Nuestros Profesores de Yoga en Rishikesh, India | Adhiroha",
  description: "Conoce a los acharyas de yoga de Adhiroha en Rishikesh — cada uno especialista con 9 a 20 años de experiencia en su propia disciplina.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Nuestros Profesores de Yoga en Rishikesh, India | Adhiroha", description: "Conoce a los acharyas de yoga de Adhiroha en Rishikesh — cada uno especialista con 9 a 20 años de experiencia en su propia disciplina.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Nuestros profesores", url: ES }])
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
