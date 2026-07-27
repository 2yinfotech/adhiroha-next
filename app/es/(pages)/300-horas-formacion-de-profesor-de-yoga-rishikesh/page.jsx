// Página en español de la formación de profesor de yoga de 300 horas — servida en /es/300-horas-formacion-de-profesor-de-yoga-rishikesh.
// Reutiliza sin cambios la hoja de estilos y el script de la página en inglés; solo cambia el contenido.
import "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

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
  title: "Formación de profesor de yoga de 300 horas en Rishikesh | Adhiroha",
  description:
    "Profundiza tu práctica con nuestra formación de profesor de yoga de 300 horas en Rishikesh. 30 días de asanas avanzados, pranayama y filosofía en un ashram acreditado por Yoga Alliance.",
  alternates: {
    canonical: ES,
    languages: { es: `${SITE}${ES}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "es_ES",
    url: `${SITE}${ES}`,
    title: "Formación de profesor de yoga de 300 horas en Rishikesh | Adhiroha",
    description:
      "Profundiza tu práctica con nuestra formación de profesor de yoga de 300 horas en Rishikesh. 30 días de asanas avanzados, pranayama y filosofía en un ashram acreditado por Yoga Alliance.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formación de profesor de yoga de 300 horas en Rishikesh",
    description: metadata.description,
    url: ES,
    price: 1500,
    days: 30,
    styles: "Asanas avanzados, pranayama, kriya, filosofía del yoga, anatomía, metodología de enseñanza avanzada",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formación de profesor de yoga de 300 horas", url: ES }])
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
