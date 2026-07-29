// Portuguese teachers page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/professores-de-yoga-na-india/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Nossos Professores de Yoga na Índia | Acharyas da Adhiroha, Rishikesh",
  description:
    "Conheça os 11 acharyas de yoga da Adhiroha em Rishikesh — mestres em Ciência Yogue e doutores em naturopatia, com mais de 115 anos de experiência de ensino somada.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Nossos Professores de Yoga na Índia | Acharyas da Adhiroha, Rishikesh",
    description: "Conheça os 11 acharyas de yoga da Adhiroha em Rishikesh — mestres em Ciência Yogue e doutores em naturopatia, com mais de 115 anos de experiência de ensino somada.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Nossos instrutores", url: PT }])
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
