// Spanish 200-hour course page — served at /es/200-horas-formacion-de-profesor-de-yoga-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const ES = "/es/200-horas-formacion-de-profesor-de-yoga-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introducción", target: "top" },
  { label: "Tarifas", target: "course-glance" },
  { label: "Materias", target: "curriculum" },
  { label: "El Día a Día", target: "daily-rhythm" },
  { label: "Instalaciones", target: "amenities" },
  { label: "Alojamiento", target: "accommodation" },
  { label: "Profesores", target: "your-teachers" },
  { label: "Entorno", target: "finding-us" },
  { label: "Contacto", target: "begin" }
];

export const metadata = {
  title: "Formación de Profesor de Yoga de 200 Horas en Rishikesh | Adhiroha",
  description:
    "Formación de profesor de yoga de 200 horas en Rishikesh, certificada por Yoga Alliance. 24 días, grupos reducidos, ashram en el Himalaya, todas las comidas y excursiones incluidas.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "es_ES",
    url: `${SITE}${ES}`,
    title: "Formación de Profesor de Yoga de 200 Horas en Rishikesh | Adhiroha",
    description:
      "Formación de profesor de yoga de 200 horas en Rishikesh, certificada por Yoga Alliance. 24 días, grupos reducidos, ashram en el Himalaya, todas las comidas y excursiones incluidas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de Profesor de Yoga de 200 Horas en Rishikesh | Adhiroha",
    description: "Formación de profesor de yoga de 200 horas en Rishikesh, certificada por Yoga Alliance. 24 días, grupos reducidos, ashram en el Himalaya, todas las comidas y excursiones incluidas.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "Formación de Profesor de Yoga de 200 Horas en Rishikesh",
    description: metadata.description,
    url: ES,
    price: 1275,
    days: 24,
    styles: "Hatha Yoga, Ashtanga Vinyasa, Pranayama, Meditación, Filosofía del Yoga, Anatomía, Metodología de la Enseñanza",
  ...courseFacts("/200-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de Profesor de Yoga de 200 Horas", url: ES }])
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
