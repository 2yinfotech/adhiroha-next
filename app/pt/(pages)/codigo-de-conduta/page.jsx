// Portuguese code-of-conduct page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/codigo-de-conduta/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Código de Conduta e Políticas | Ashram de Yoga Adhiroha, Rishikesh",
  description:
    "As regras do ashram Adhiroha em Rishikesh — os quatro pilares, o código de conduta, as políticas de tolerância zero e tudo sobre valores, pagamentos e remarcação.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Código de Conduta e Políticas | Ashram de Yoga Adhiroha, Rishikesh",
    description: "As regras do ashram Adhiroha em Rishikesh — os quatro pilares, o código de conduta, as políticas de tolerância zero e tudo sobre valores, pagamentos e remarcação.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Código de conduta", url: PT }])
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
