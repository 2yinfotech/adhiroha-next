// Japanese safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const JA = "/ja/anzen-to-eisei-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "安全と衛生 | アディローハ・ヨガアシュラム、リシケシ",
  description:
    "リシケシのアディローハにおける安全、衛生、旅の段取り、24時間の防犯カメラ、塀に囲まれた敷地、空港送迎込み、そしておひとり旅の女性への特別な配慮。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "安全と衛生 | アディローハ・ヨガアシュラム、リシケシ",
    description: "リシケシのアディローハにおける安全、衛生、旅の段取り、24時間の防犯カメラ、塀に囲まれた敷地、空港送迎込み、そしておひとり旅の女性への特別な配慮。",
  },
  twitter: {
    card: "summary_large_image",
    title: "安全と衛生 | アディローハ・ヨガアシュラム、リシケシ",
    description: "リシケシのアディローハにおける安全、衛生、旅の段取り、24時間の防犯カメラ、塀に囲まれた敷地、空港送迎込み、そしておひとり旅の女性への特別な配慮。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "安全と衛生", url: JA }])
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
