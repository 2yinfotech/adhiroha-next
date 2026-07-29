// Polish gallery page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PL = "/pl/galeria-jogi-indie/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galeria Zdjęć | Aśram Jogi Adhiroha w Riszikeś, Indie",
  description:
    "181 szczerych zdjęć z aśramu Adhiroha w Upper Tapovan w Riszikeś — sala, pokoje, jedzenie satwiczne, ceremonie, wycieczki i dzień certyfikacji.",
  alternates: {
    canonical: PL,
    languages: { pl: `${SITE}${PL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Galeria Zdjęć | Aśram Jogi Adhiroha w Riszikeś, Indie",
    description: "181 szczerych zdjęć z aśramu Adhiroha w Upper Tapovan w Riszikeś — sala, pokoje, jedzenie satwiczne, ceremonie, wycieczki i dzień certyfikacji.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galeria", url: PL }])
);

export default function Page() {
  return (
    <div lang="pl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
