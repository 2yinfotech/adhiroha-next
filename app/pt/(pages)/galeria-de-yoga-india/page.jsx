// Portuguese gallery page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/galeria-de-yoga-india/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galeria de Fotos | Ashram de Yoga Adhiroha em Rishikesh, Índia",
  description:
    "181 fotos honestas do ashram Adhiroha em Upper Tapovan, Rishikesh — a shala, os quartos, a comida sáttvica, as cerimônias, os passeios e o dia da certificação.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Galeria de Fotos | Ashram de Yoga Adhiroha em Rishikesh, Índia",
    description: "181 fotos honestas do ashram Adhiroha em Upper Tapovan, Rishikesh — a shala, os quartos, a comida sáttvica, as cerimônias, os passeios e o dia da certificação.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galeria", url: PT }])
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
