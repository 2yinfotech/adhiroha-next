// Spanish Código de conducta page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/codigo-de-conducta/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Código de conducta y políticas | Adhiroha, Rishikesh",
  description:
    "Consulta el código de conducta, las normas del ashram, y las políticas de reembolso y cancelación de la formación de profesor de yoga en Adhiroha, Rishikesh, India.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Código de conducta y políticas | Adhiroha, Rishikesh",
    description: "Consulta el código de conducta, las normas del ashram, y las políticas de reembolso y cancelación de la formación de profesor de yoga en Adhiroha, Rishikesh, India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Código de conducta y políticas | Adhiroha, Rishikesh",
    description: "Consulta el código de conducta, las normas del ashram, y las políticas de reembolso y cancelación de la formación de profesor de yoga en Adhiroha, Rishikesh, India.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Código de conducta", url: ES }])
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
