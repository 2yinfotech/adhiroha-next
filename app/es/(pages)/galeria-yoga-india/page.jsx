// Spanish Galería page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const ES = "/es/galeria-yoga-india/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galería de Yoga | El Ashram Adhiroha, Rishikesh",
  description: "181 fotos auténticas del ashram Adhiroha en Upper Tapovan, Rishikesh, la shala, las habitaciones, la comida, las ceremonias y las personas.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Galería de Yoga | El Ashram Adhiroha, Rishikesh", description: "181 fotos auténticas del ashram Adhiroha en Upper Tapovan, Rishikesh, la shala, las habitaciones, la comida, las ceremonias y las personas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galería de Yoga | El Ashram Adhiroha, Rishikesh",
    description: "181 fotos auténticas del ashram Adhiroha en Upper Tapovan, Rishikesh, la shala, las habitaciones, la comida, las ceremonias y las personas.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
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
