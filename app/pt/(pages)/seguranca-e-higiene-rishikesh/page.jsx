// Portuguese safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/seguranca-e-higiene-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Segurança e Higiene | Ashram de Yoga Adhiroha, Rishikesh",
  description:
    "Câmeras 24/7, campus cercado, traslado do aeroporto incluso e apoio a mulheres viajando sozinhas — como a Adhiroha cuida da segurança e da higiene em Rishikesh.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Segurança e Higiene | Ashram de Yoga Adhiroha, Rishikesh",
    description: "Câmeras 24/7, campus cercado, traslado do aeroporto incluso e apoio a mulheres viajando sozinhas — como a Adhiroha cuida da segurança e da higiene em Rishikesh.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Segurança e higiene", url: PT }])
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
