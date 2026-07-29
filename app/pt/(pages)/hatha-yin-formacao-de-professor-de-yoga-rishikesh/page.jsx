// Portuguese Hatha & Yin course page — served at /pt/hatha-yin-formacao-de-professor-de-yoga-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/hatha-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/hatha-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/hatha-yin-formacao-de-professor-de-yoga-rishikesh/";
const EN = "/hatha-teacher-training-course-rishikesh/";

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
  title: "Formação de Professor de Hatha e Yin Yoga em Rishikesh | 12 Dias — Adhiroha",
  description:
    "Formação de professor de Hatha e Yin Yoga de doze dias em Rishikesh, acreditada pelo Ministério de Ayush. Turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "pt_BR",
    url: `${SITE}${PT}`,
    title: "Formação de Professor de Hatha e Yin Yoga em Rishikesh | 12 Dias — Adhiroha",
    description:
      "Formação de professor de Hatha e Yin Yoga de doze dias em Rishikesh, acreditada pelo Ministério de Ayush. Turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formação de Professor de Hatha e Yin Yoga em Rishikesh | 12 Dias — Adhiroha",
    description: "Formação de professor de Hatha e Yin Yoga de doze dias em Rishikesh, acreditada pelo Ministério de Ayush. Turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formação de Professor de Hatha e Yin Yoga em Rishikesh",
    description: metadata.description,
    url: PT,
    price: 790,
    days: 14,
    styles: "Hatha Yoga, Yin Yoga, alinhamento, pranayama, meditação, anatomia, metodologia de ensino",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formação de professor de Hatha e Yin", url: PT }])
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
