// Spanish Ashtanga & Vinyasa Yoga Teacher Training in Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../../(en)/(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const ES = "/es/ashtanga-vinyasa-formacion-de-profesor-de-yoga-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

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
  title: "Formación de Profesor de Yoga Ashtanga y Vinyasa en Rishikesh | Adhiroha",
  description: "Formación de profesor de yoga Ashtanga y Vinyasa de 12 días en Rishikesh, acreditada por el Ministry of Ayush. Grupos reducidos, alojamiento en ashram, todas las comidas incluidas.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Formación de Profesor de Yoga Ashtanga y Vinyasa en Rishikesh | Adhiroha", description: "Formación de profesor de yoga Ashtanga y Vinyasa de 12 días en Rishikesh, acreditada por el Ministry of Ayush. Grupos reducidos, alojamiento en ashram, todas las comidas incluidas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de Profesor de Yoga Ashtanga y Vinyasa en Rishikesh | Adhiroha",
    description: "Formación de profesor de yoga Ashtanga y Vinyasa de 12 días en Rishikesh, acreditada por el Ministry of Ayush. Grupos reducidos, alojamiento en ashram, todas las comidas incluidas.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({ name: "Formación de Profesor de Yoga Ashtanga y Vinyasa en Rishikesh", description: metadata.description, url: ES, price: 790, days: 14, styles: "Ashtanga Primary Series, Vinyasa-Sequencing, Pranayama, Meditation" , ...courseFacts("/ashtanga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de Profesor de Yoga Ashtanga y Vinyasa", url: ES }])
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
