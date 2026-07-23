// German Datenschutz page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../(main)/privacy-policy/styles.css";
import content from "./content";
import scripts from "../../(main)/privacy-policy/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/datenschutz/";
const EN = "/privacy-policy/";

export const metadata = {
  title: "Datenschutzerklärung | Adhiroha Yoga School, Rishikesh",
  description: "Die Datenschutzerklärung der Adhiroha Yoga School — welche Daten wir erheben, wie wir sie verwenden und wie wir sie schützen.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Datenschutzerklärung | Adhiroha Yoga School, Rishikesh", description: "Die Datenschutzerklärung der Adhiroha Yoga School — welche Daten wir erheben, wie wir sie verwenden und wie wir sie schützen.",
  },
};

const pageSchema = graph(
  breadcrumbSchema([{ name: "Datenschutz", url: DE }])
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
