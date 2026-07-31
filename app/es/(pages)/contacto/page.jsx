// Spanish Contacto page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const ES = "/es/contacto/";
const EN = "/contact-us/";

export const metadata = {
  title: "Contacta con Adhiroha Yoga School | Rishikesh, India",
  description: "Ponte en contacto con Adhiroha en Rishikesh, WhatsApp, teléfono o correo electrónico. Cada mensaje recibe respuesta de una persona real, normalmente en un día.",
  alternates: {
    canonical: ES,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "es_ES", url: `${SITE}${ES}`,
    title: "Contacta con Adhiroha Yoga School | Rishikesh, India", description: "Ponte en contacto con Adhiroha en Rishikesh, WhatsApp, teléfono o correo electrónico. Cada mensaje recibe respuesta de una persona real, normalmente en un día.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacta con Adhiroha Yoga School | Rishikesh, India",
    description: "Ponte en contacto con Adhiroha en Rishikesh, WhatsApp, teléfono o correo electrónico. Cada mensaje recibe respuesta de una persona real, normalmente en un día.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Contacto", url: ES }])
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
