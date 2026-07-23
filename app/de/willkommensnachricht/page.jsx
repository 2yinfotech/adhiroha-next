// German Schülerstimmen page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/willkommensnachricht/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Schülerstimmen & Absolventen-Botschaften | Adhiroha",
  description: "Eine Botschaft der Adhiroha-Absolventen — in einer Stimme, die vielen Namen gehört. Der Ashram, die Lehrer und der Mensch, der du wirst.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Schülerstimmen & Absolventen-Botschaften | Adhiroha", description: "Eine Botschaft der Adhiroha-Absolventen — in einer Stimme, die vielen Namen gehört. Der Ashram, die Lehrer und der Mensch, der du wirst.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Schülerstimmen", url: DE }])
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
