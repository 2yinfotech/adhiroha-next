// Italian Galleria page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/galleria-yoga-india/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galleria Yoga | L'Ashram Adhiroha, Rishikesh",
  description:
    "181 foto autentiche dell'ashram Adhiroha a Upper Tapovan, Rishikesh — la shala, le camere, il cibo, le cerimonie e le persone.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Galleria Yoga | L'Ashram Adhiroha, Rishikesh",
    description: "181 foto autentiche dell'ashram Adhiroha a Upper Tapovan, Rishikesh — la shala, le camere, il cibo, le cerimonie e le persone.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galleria", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
