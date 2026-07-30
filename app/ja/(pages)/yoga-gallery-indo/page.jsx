// Japanese gallery page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const JA = "/ja/yoga-gallery-indo/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "フォトギャラリー | アディローハ・ヨガアシュラム、リシケシ",
  description:
    "リシケシ、アッパー・タポヴァンのアディローハ・アシュラムのありのままの写真181枚 — シャラ、客室、サットヴィックな食事、儀式、遠足、そして生徒たち。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "フォトギャラリー | アディローハ・ヨガアシュラム、リシケシ",
    description: "リシケシ、アッパー・タポヴァンのアディローハ・アシュラムのありのままの写真181枚 — シャラ、客室、サットヴィックな食事、儀式、遠足、そして生徒たち。",
  },
  twitter: {
    card: "summary_large_image",
    title: "フォトギャラリー | アディローハ・ヨガアシュラム、リシケシ",
    description: "リシケシ、アッパー・タポヴァンのアディローハ・アシュラムのありのままの写真181枚 — シャラ、客室、サットヴィックな食事、儀式、遠足、そして生徒たち。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "ギャラリー", url: JA }])
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
