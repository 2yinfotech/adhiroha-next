// Swedish alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/halsningar-fran-tidigare-elever/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "En Hälsning från Våra Tidigare Elever | Adhiroha, Rishikesh",
  description:
    "Adhirohas utexaminerade beskriver med egna ord yogalärarutbildningen i Rishikesh — trädgården, eldaltaret, områdets fem element och lärarna bakom förvandlingen.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "En Hälsning från Våra Tidigare Elever | Adhiroha, Rishikesh",
    description: "Adhirohas utexaminerade beskriver med egna ord yogalärarutbildningen i Rishikesh — trädgården, eldaltaret, områdets fem element och lärarna bakom förvandlingen.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Hälsningar från tidigare elever", url: SV }])
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
