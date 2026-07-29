// Spanish Seguridad e higiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/seguridad-higiene-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Seguridad e higiene en nuestro ashram de Rishikesh | Adhiroha",
  description: "Cómo Adhiroha en Rishikesh garantiza la seguridad, la higiene y la logística de viaje — especialmente para mujeres que viajan solas. Recogida en el aeropuerto, videovigilancia y más.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Seguridad e higiene en nuestro ashram de Rishikesh | Adhiroha", description: "Cómo Adhiroha en Rishikesh garantiza la seguridad, la higiene y la logística de viaje — especialmente para mujeres que viajan solas. Recogida en el aeropuerto, videovigilancia y más.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguridad e higiene en nuestro ashram de Rishikesh | Adhiroha",
    description: "Cómo Adhiroha en Rishikesh garantiza la seguridad, la higiene y la logística de viaje — especialmente para mujeres que viajan solas. Recogida en el aeropuerto, videovigilancia y más.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Seguridad e higiene", url: ES }])
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
