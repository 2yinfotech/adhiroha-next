// Spanish Sobre nosotros page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const ES = "/es/sobre-nosotros/";
const EN = "/about-us/";

export const metadata = {
  title: "Sobre Adhiroha | Escuela de Yoga en Rishikesh, India",
  description: "Conoce Adhiroha — un ashram de yoga certificado por Yoga Alliance en Upper Tapovan, Rishikesh, con acharyas indios experimentados y grupos reducidos.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Sobre Adhiroha | Escuela de Yoga en Rishikesh, India", description: "Conoce Adhiroha — un ashram de yoga certificado por Yoga Alliance en Upper Tapovan, Rishikesh, con acharyas indios experimentados y grupos reducidos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Adhiroha | Escuela de Yoga en Rishikesh, India",
    description: "Conoce Adhiroha — un ashram de yoga certificado por Yoga Alliance en Upper Tapovan, Rishikesh, con acharyas indios experimentados y grupos reducidos.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sobre nosotros", url: ES }])
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
