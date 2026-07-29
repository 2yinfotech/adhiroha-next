// Japanese code-of-conduct page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const JA = "/ja/kodo-kihan/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "行動規範とポリシー | アディローハ・ヨガアシュラム、リシケシ",
  description:
    "リシケシのアディローハ・アシュラムのルール — 4つの柱、行動規範、ゼロトレランス・ポリシー、そして料金・お支払い・日程変更に関するすべて。",
  alternates: {
    canonical: JA,
    languages: { ja: `${SITE}${JA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "行動規範とポリシー | アディローハ・ヨガアシュラム、リシケシ",
    description: "リシケシのアディローハ・アシュラムのルール — 4つの柱、行動規範、ゼロトレランス・ポリシー、そして料金・お支払い・日程変更に関するすべて。",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "行動規範", url: JA }])
);

export default function Page() {
  return (
    <div lang="ja">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
