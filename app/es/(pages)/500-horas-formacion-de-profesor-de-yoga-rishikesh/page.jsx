// Página en español de la formación de profesor de yoga de 500 horas — servida en /es/500-horas-formacion-de-profesor-de-yoga-rishikesh.
// Reutiliza sin cambios la hoja de estilos y el script de la página en inglés; solo cambia el contenido.
import "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const ES = "/es/500-horas-formacion-de-profesor-de-yoga-rishikesh/";
const EN = "/500-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introducción", target: "top" },
  { label: "Precios", target: "course-glance" },
  { label: "Materias", target: "curriculum" },
  { label: "Horario diario", target: "daily-rhythm" },
  { label: "Instalaciones", target: "amenities" },
  { label: "Alojamiento", target: "accommodation" },
  { label: "Profesores", target: "your-teachers" },
  { label: "Alrededores", target: "finding-us" },
  { label: "Contacto", target: "begin" }
];

export const metadata = {
  title: "Formación de profesor de yoga de 500 horas en Rishikesh | Adhiroha",
  description:
    "Completa tu RYT-500 con nuestra formación de profesor de yoga de 500 horas en Rishikesh — 60 días que combinan el plan de estudios de 200 y 300 horas, con alojamiento y comidas incluidos.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "es_ES",
    url: `${SITE}${ES}`,
    title: "Formación de profesor de yoga de 500 horas en Rishikesh | Adhiroha",
    description:
      "Completa tu RYT-500 con nuestra formación de profesor de yoga de 500 horas en Rishikesh — 60 días que combinan el plan de estudios de 200 y 300 horas, con alojamiento y comidas incluidos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de profesor de yoga de 500 horas en Rishikesh | Adhiroha",
    description: "Completa tu RYT-500 con nuestra formación de profesor de yoga de 500 horas en Rishikesh — 60 días que combinan el plan de estudios de 200 y 300 horas, con alojamiento y comidas incluidos.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formación de profesor de yoga de 500 horas en Rishikesh",
    description: metadata.description,
    url: ES,
    price: 2790,
    days: 60,
    styles: "Hatha yoga, Ashtanga vinyasa, asanas avanzados, pranayama, meditación, filosofía, anatomía, metodología de enseñanza",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de profesor de yoga de 500 horas", url: ES }])
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
