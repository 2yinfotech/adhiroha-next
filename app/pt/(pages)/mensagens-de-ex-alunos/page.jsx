// Portuguese alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/mensagens-de-ex-alunos/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Uma Mensagem dos Nossos Ex-Alunos | Adhiroha, Rishikesh",
  description:
    "Formados da Adhiroha descrevem com as próprias palavras a formação de professor de yoga em Rishikesh — o jardim, o altar do fogo, os cinco elementos do campus e os professores por trás da transformação.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Uma Mensagem dos Nossos Ex-Alunos | Adhiroha, Rishikesh",
    description: "Formados da Adhiroha descrevem com as próprias palavras a formação de professor de yoga em Rishikesh — o jardim, o altar do fogo, os cinco elementos do campus e os professores por trás da transformação.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uma Mensagem dos Nossos Ex-Alunos | Adhiroha, Rishikesh",
    description: "Formados da Adhiroha descrevem com as próprias palavras a formação de professor de yoga em Rishikesh — o jardim, o altar do fogo, os cinco elementos do campus e os professores por trás da transformação.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Mensagens de ex-alunos", url: PT }])
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
