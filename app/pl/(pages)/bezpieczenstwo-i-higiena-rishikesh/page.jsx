// Polish safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PL = "/pl/bezpieczenstwo-i-higiena-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Bezpieczeństwo i Higiena | Aśram Jogi Adhiroha, Riszikeś",
  description:
    "Monitoring 24/7, ogrodzony kampus, odbiór z lotniska w cenie i wsparcie dla kobiet podróżujących samotnie — jak Adhiroha dba o bezpieczeństwo i higienę w Riszikeś.",
  alternates: {
    canonical: PL,
    languages: { pl: `${SITE}${PL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Bezpieczeństwo i Higiena | Aśram Jogi Adhiroha, Riszikeś",
    description: "Monitoring 24/7, ogrodzony kampus, odbiór z lotniska w cenie i wsparcie dla kobiet podróżujących samotnie — jak Adhiroha dba o bezpieczeństwo i higienę w Riszikeś.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Bezpieczeństwo i higiena", url: PL }])
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
