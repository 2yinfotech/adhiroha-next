// Dutch "Over ons" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/over-ons/";
const EN = "/about-us/";

export const metadata = {
  title: "Over Adhiroha | Yogaschool in Rishikesh, India",
  description:
    "Maak kennis met Adhiroha — een door Yoga Alliance gecertificeerde yoga-ashram in Upper Tapovan, Rishikesh, met 20.000 vierkante voet terrein en meer dan 3.000 opgeleide studenten uit ruim 70 landen.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Over Adhiroha | Yogaschool in Rishikesh, India",
    description: "Maak kennis met Adhiroha — een door Yoga Alliance gecertificeerde yoga-ashram in Upper Tapovan, Rishikesh, met 20.000 vierkante voet terrein en meer dan 3.000 opgeleide studenten uit ruim 70 landen.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Over ons", url: NL }])
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
