// Spanish Hatha & Yin Yoga Teacher Training in Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../../(main)/hatha-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/hatha-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/hatha-yin-formacion-de-profesor-de-yoga-rishikesh/";
const EN = "/hatha-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introducción", target: "top" },
  { label: "Tarifas", target: "course-glance" },
  { label: "Materias", target: "curriculum" },
  { label: "Rutina diaria", target: "daily-rhythm" },
  { label: "Instalaciones", target: "amenities" },
  { label: "Alojamiento", target: "accommodation" },
  { label: "Profesores", target: "your-teachers" },
  { label: "Entorno", target: "finding-us" },
  { label: "Contacto", target: "begin" }
];

export const metadata = {
  title: "Formación de Profesor de Hatha y Yin Yoga en Rishikesh | Adhiroha",
  description: "Formación de profesor de Hatha y Yin yoga de 12 días en Rishikesh, acreditada por el Ministry of Ayush. Grupos reducidos, alojamiento en ashram, todas las comidas incluidas.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Formación de Profesor de Hatha y Yin Yoga en Rishikesh | Adhiroha", description: "Formación de profesor de Hatha y Yin yoga de 12 días en Rishikesh, acreditada por el Ministry of Ayush. Grupos reducidos, alojamiento en ashram, todas las comidas incluidas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de Profesor de Hatha y Yin Yoga en Rishikesh | Adhiroha",
    description: "Formación de profesor de Hatha y Yin yoga de 12 días en Rishikesh, acreditada por el Ministry of Ayush. Grupos reducidos, alojamiento en ashram, todas las comidas incluidas.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formación de Profesor de Hatha y Yin Yoga en Rishikesh", description: metadata.description, url: ES, price: 790, days: 14, styles: "Hatha Yoga, Yin Yoga, Alignment, Pranayama, Meditation" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de Profesor de Hatha y Yin", url: ES }])
);

export default function Page() {
  return (
    <div lang="es">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
