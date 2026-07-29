// Portuguese 200-hour course page — served at /pt/200-horas-formacao-de-professor-de-yoga-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/200-horas-formacao-de-professor-de-yoga-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "Formação de Professor de Yoga de 200 Horas em Rishikesh | Adhiroha",
  description:
    "Formação de professor de yoga de 200 horas em Rishikesh, certificada pela Yoga Alliance. 24 dias, turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "pt_BR",
    url: `${SITE}${PT}`,
    title: "Formação de Professor de Yoga de 200 Horas em Rishikesh | Adhiroha",
    description:
      "Formação de professor de yoga de 200 horas em Rishikesh, certificada pela Yoga Alliance. 24 dias, turmas pequenas, hospedagem em ashram himalaio, todas as refeições e passeios inclusos.",
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
  courseSchema({
    name: "Formação de Professor de Yoga de 200 Horas em Rishikesh",
    description: metadata.description,
    url: PT,
    price: 1275,
    days: 24,
    styles: "Hatha Yoga, Ashtanga Vinyasa, pranayama, meditação, filosofia do yoga, anatomia, metodologia de ensino",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formação de professor de yoga de 200 horas", url: PT }])
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
