// Página en español de la formación de profesor de yoga de 300 horas — servida en /es/300-horas-formacion-de-profesor-de-yoga-rishikesh.
// Reutiliza sin cambios la hoja de estilos y el script de la página en inglés; solo cambia el contenido.
import "../../../(en)/(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import rawContent from "./content";
import { withBatchTable, upcomingBatches } from "@/lib/batches";
import scripts from "../../../(en)/(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

// The batch table is rendered here, not by scripts.js after load, so the
// dates are in the HTML. Revalidated daily so the months roll forward.
export const revalidate = 86400;
const content = rawContent;
const renderedContent = () => withBatchTable(rawContent, "300", "es");

const ES = "/es/300-horas-formacion-de-profesor-de-yoga-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "Formación de profesor de yoga de 300 horas en Rishikesh",
  description:
    "Profundiza tu práctica con nuestra formación de profesor de yoga de 300 horas en Rishikesh. 30 días de asanas avanzados, pranayama y filosofía en una escuela registrada en Yoga Alliance.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "es_ES",
    url: `${SITE}${ES}`,
    title: "Formación de profesor de yoga de 300 horas en Rishikesh | Adhiroha",
    description:
      "Profundiza tu práctica con nuestra formación de profesor de yoga de 300 horas en Rishikesh. 30 días de asanas avanzados, pranayama y filosofía en una escuela registrada en Yoga Alliance.",
    images: [{ url: "/img/adhiroha-og.jpg", width: 1200, height: 630, alt: "Adhiroha Yoga School" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formación de profesor de yoga de 300 horas en Rishikesh | Adhiroha",
    description: "Profundiza tu práctica con nuestra formación de profesor de yoga de 300 horas en Rishikesh. 30 días de asanas avanzados, pranayama y filosofía en una escuela registrada en Yoga Alliance.",
    images: ["/img/adhiroha-og.jpg"],
  },
};

const pageSchema = () => graph(
  ...studentVideoSchemas(),
  courseSchema({
    batches: upcomingBatches("300", 6),
    name: "Formación de profesor de yoga de 300 horas en Rishikesh",
    description: metadata.description,
    url: ES,
    price: 1500,
    days: 30,
    styles: "Asanas avanzados, pranayama, kriya, filosofía del yoga, anatomía, metodología de enseñanza avanzada",
  ...courseFacts("/300-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de profesor de yoga de 300 horas", url: ES }])
);

export default function Page() {
  return (
    <div lang="es">
      <JsonLd data={pageSchema()} />
      <div dangerouslySetInnerHTML={{ __html: renderedContent() }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
