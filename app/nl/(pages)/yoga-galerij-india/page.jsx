// Dutch gallery page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/yoga-galerij-india/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Fotogalerij | Yoga-ashram Adhiroha in Rishikesh, India",
  description:
    "181 eerlijke foto's van de Adhiroha-ashram in Upper Tapovan, Rishikesh — de shala, de kamers, het sattvische eten, de ceremonies, de uitstapjes en de diploma-uitreiking.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Fotogalerij | Yoga-ashram Adhiroha in Rishikesh, India",
    description: "181 eerlijke foto's van de Adhiroha-ashram in Upper Tapovan, Rishikesh — de shala, de kamers, het sattvische eten, de ceremonies, de uitstapjes en de diploma-uitreiking.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galerij", url: NL }])
);

export default function Page() {
  return (
    <div lang="nl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
