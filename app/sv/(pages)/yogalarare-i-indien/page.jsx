// Swedish teachers page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/yogalarare-i-indien/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Våra Yogalärare i Indien | Adhirohas Acharyas, Rishikesh",
  description:
    "Möt Adhirohas 11 yoga-acharyas i Rishikesh — masterexaminerade i yogisk vetenskap och doktorer i naturmedicin, med över 115 års samlad undervisningserfarenhet.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Våra Yogalärare i Indien | Adhirohas Acharyas, Rishikesh",
    description: "Möt Adhirohas 11 yoga-acharyas i Rishikesh — masterexaminerade i yogisk vetenskap och doktorer i naturmedicin, med över 115 års samlad undervisningserfarenhet.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Våra lärare", url: SV }])
);

export default function Page() {
  return (
    <div lang="sv">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
