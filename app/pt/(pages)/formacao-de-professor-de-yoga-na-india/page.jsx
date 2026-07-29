// Portuguese YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/formacao-de-professor-de-yoga-na-india/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Formação de Professor de Yoga na Índia | YTTC 200, 300 e 500 Horas em Rishikesh | Adhiroha",
  description:
    "Formação de professor de yoga na Índia com a Adhiroha, Rishikesh — cursos residenciais de 200, 300 e 500 horas certificados pela Yoga Alliance. Mais de 3.000 alunos de mais de 70 países. Valor com tudo incluído e certificação reconhecida internacionalmente.",
  keywords: [
    "formação de professor de yoga na índia",
    "formação de professor de yoga em rishikesh",
    "formação de professor de yoga 200 horas índia",
    "formação de professor de yoga 300 horas",
    "formação de professor de yoga 500 horas rishikesh",
    "yoga ttc índia",
  ],
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Formação de Professor de Yoga na Índia | YTTC 200, 300 e 500 Horas em Rishikesh",
    description:
      "Formações de professor de yoga de 200, 300 e 500 horas certificadas pela Yoga Alliance em Rishikesh, Índia. Tudo incluído, certificação reconhecida internacionalmente.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formação de Professor de Yoga de 200 Horas em Rishikesh, Índia",
    description:
      "Curso residencial de formação de professor de yoga de 200 horas certificado pela Yoga Alliance em Rishikesh, Índia — a base para iniciantes em asana, pranayama, anatomia, filosofia e prática de ensino.",
    url: "/pt/200-horas-formacao-de-professor-de-yoga-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, Ashtanga Vinyasa e Yin yoga",
  }),
  courseSchema({
    name: "Formação de Professor de Yoga de 300 Horas em Rishikesh, Índia",
    description:
      "Curso residencial avançado de formação de professor de yoga de 300 horas em Rishikesh, Índia, para formados de 200 horas, completando o caminho até o RYT 500.",
    url: "/pt/300-horas-formacao-de-professor-de-yoga-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, Ashtanga Vinyasa e alinhamento",
  }),
  courseSchema({
    name: "Formação de Professor de Yoga de 500 Horas em Rishikesh, Índia",
    description:
      "Curso residencial de formação de professor de yoga de 500 horas em Rishikesh, Índia — a imersão completa de 60 dias que combina os programas de 200 e 300 horas, do nível iniciante ao avançado.",
    url: "/pt/500-horas-formacao-de-professor-de-yoga-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, Ashtanga, Yin e alinhamento",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formação de professor de yoga na Índia", url: PT }])
);

export default function Page() {
  return (
    <div lang="pt">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
