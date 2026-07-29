// Portuguese "Sobre nós" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/sobre-nos/";
const EN = "/about-us/";

export const metadata = {
  title: "Sobre a Adhiroha | Escola de Yoga em Rishikesh, Índia",
  description:
    "Conheça a Adhiroha — um ashram de yoga certificado pela Yoga Alliance em Upper Tapovan, Rishikesh, com 20.000 pés quadrados de campus e mais de 3.000 alunos formados de mais de 70 países.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Sobre a Adhiroha | Escola de Yoga em Rishikesh, Índia",
    description: "Conheça a Adhiroha — um ashram de yoga certificado pela Yoga Alliance em Upper Tapovan, Rishikesh, com 20.000 pés quadrados de campus e mais de 3.000 alunos formados de mais de 70 países.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre a Adhiroha | Escola de Yoga em Rishikesh, Índia",
    description: "Conheça a Adhiroha — um ashram de yoga certificado pela Yoga Alliance em Upper Tapovan, Rishikesh, com 20.000 pés quadrados de campus e mais de 3.000 alunos formados de mais de 70 países.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sobre nós", url: PT }])
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
