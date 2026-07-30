// Portuguese Pranayama & Meditation course page — served at /pt/pranayama-meditacao-formacao-de-professor-de-yoga-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/pranayama-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/pranayama-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const PT = "/pt/pranayama-meditacao-formacao-de-professor-de-yoga-rishikesh/";
const EN = "/pranayama-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introdução", target: "top" },
  { label: "Valores", target: "course-glance" },
  { label: "Matérias", target: "curriculum" },
  { label: "Ritmo do dia", target: "daily-rhythm" },
  { label: "Estrutura", target: "amenities" },
  { label: "Acomodação", target: "accommodation" },
  { label: "Professores", target: "your-teachers" },
  { label: "Arredores", target: "finding-us" },
  { label: "Contato", target: "begin" }
];

export const metadata = {
  title: "Formação de Professor de Pranayama e Meditação em Rishikesh | 12 Dias — Adhiroha",
  description:
    "Formação de professor de pranayama e meditação de doze dias em Rishikesh, acreditada pelo Ministério de Ayush. Turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
  alternates: {
    canonical: PT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "pt_BR",
    url: `${SITE}${PT}`,
    title: "Formação de Professor de Pranayama e Meditação em Rishikesh | 12 Dias — Adhiroha",
    description:
      "Formação de professor de pranayama e meditação de doze dias em Rishikesh, acreditada pelo Ministério de Ayush. Turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formação de Professor de Pranayama e Meditação em Rishikesh | 12 Dias — Adhiroha",
    description: "Formação de professor de pranayama e meditação de doze dias em Rishikesh, acreditada pelo Ministério de Ayush. Turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "Formação de Professor de Pranayama e Meditação em Rishikesh",
    description: metadata.description,
    url: PT,
    price: 790,
    days: 14,
    styles: "Pranayama, meditação, shatkarma, anatomia do corpo sutil, filosofia do yoga, metodologia de ensino",
  ...courseFacts("/pranayama-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formação de professor de pranayama e meditação", url: PT }])
);

export default function Page() {
  return (
    <div lang="pt">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
