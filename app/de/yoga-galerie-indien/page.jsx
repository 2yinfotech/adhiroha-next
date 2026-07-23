// German Galerie page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/yoga-galerie-indien/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Yoga-Galerie | Der Adhiroha Ashram, Rishikesh",
  description: "181 ehrliche Fotos aus dem Adhiroha Ashram in Upper Tapovan, Rishikesh — die Shala, die Zimmer, das Essen, die Zeremonien und die Menschen.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Yoga-Galerie | Der Adhiroha Ashram, Rishikesh", description: "181 ehrliche Fotos aus dem Adhiroha Ashram in Upper Tapovan, Rishikesh — die Shala, die Zimmer, das Essen, die Zeremonien und die Menschen.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galerie", url: DE }])
);

export default function Page() {
  return (
    <div lang="de">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
