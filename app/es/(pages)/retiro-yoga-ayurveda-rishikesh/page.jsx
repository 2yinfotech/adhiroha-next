// Spanish Retiro Yoga & Ayurveda page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const ES = "/es/retiro-yoga-ayurveda-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Retiro de Yoga y Ayurveda en Rishikesh | 6 días — Adhiroha",
  description: "Retiro de bienestar de 6 días de Yoga y Ayurveda en Rishikesh. Yoga suave, terapias ayurvédicas, comida sátvica — descanso en un ashram del Himalaya.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Retiro de Yoga y Ayurveda en Rishikesh | 6 días — Adhiroha", description: "Retiro de bienestar de 6 días de Yoga y Ayurveda en Rishikesh. Yoga suave, terapias ayurvédicas, comida sátvica — descanso en un ashram del Himalaya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retiro de Yoga y Ayurveda en Rishikesh | 6 días — Adhiroha",
    description: "Retiro de bienestar de 6 días de Yoga y Ayurveda en Rishikesh. Yoga suave, terapias ayurvédicas, comida sátvica — descanso en un ashram del Himalaya.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Retiro de Bienestar Yoga & Ayurveda en Rishikesh", description: metadata.description, url: ES, price: 510, days: 6, styles: "Hatha Yoga, terapias ayurvédicas, meditación, bienestar" , ...courseFacts("/yoga-retreat-in-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Retiro de Bienestar Yoga & Ayurveda", url: ES }])
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
