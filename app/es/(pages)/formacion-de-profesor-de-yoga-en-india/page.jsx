// Spanish Formación de profesor de yoga en India page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/formacion-de-profesor-de-yoga-en-india/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Formación de profesor de yoga en India | YTTC de 200, 300 y 500 horas en Rishikesh | Adhiroha",
  description: "Formación de profesor de yoga certificada por Yoga Alliance de 200, 300 y 500 horas en Rishikesh, India. Alojamiento incluido y todo incluido.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Formación de profesor de yoga en India | YTTC de 200, 300 y 500 horas en Rishikesh | Adhiroha", description: "Formación de profesor de yoga certificada por Yoga Alliance de 200, 300 y 500 horas en Rishikesh, India. Alojamiento incluido y todo incluido.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de profesor de yoga en India | YTTC de 200, 300 y 500 horas en Rishikesh | Adhiroha",
    description: "Formación de profesor de yoga certificada por Yoga Alliance de 200, 300 y 500 horas en Rishikesh, India. Alojamiento incluido y todo incluido.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formación de profesor de yoga de 200 horas en Rishikesh, India", description: metadata.description, url: ES, price: 1275, days: 24, styles: "Hatha, Ashtanga Vinyasa y Yin yoga" }),
  courseSchema({ name: "Formación de profesor de yoga de 300 horas en Rishikesh, India", description: metadata.description, url: ES, price: 1500, days: 30, styles: "Asana avanzado, pranayama, filosofía" }),
  courseSchema({ name: "Formación de profesor de yoga de 500 horas en Rishikesh, India", description: metadata.description, url: ES, price: 2790, days: 60, styles: "Hatha, Ashtanga Vinyasa, asana avanzado" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de profesor de yoga en India", url: ES }])
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
