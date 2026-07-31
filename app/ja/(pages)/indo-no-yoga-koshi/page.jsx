// Japanese teachers page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, teacherSchemas, hreflangFor } from "@/lib/seo";

const JA = "/ja/indo-no-yoga-koshi/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "インドのヨガ講師陣 | アディローハのアチャリヤ、リシケシ",
  description:
    "リシケシのアディローハで教える11人のヨガ・アチャリヤをご紹介します。ヨガ科学の修士や自然療法学の博士たちが、合計115年を超える指導経験をもって導きます。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "インドのヨガ講師陣 | アディローハのアチャリヤ、リシケシ",
    description: "リシケシのアディローハで教える11人のヨガ・アチャリヤをご紹介します。ヨガ科学の修士や自然療法学の博士たちが、合計115年を超える指導経験をもって導きます。",
  },
  twitter: {
    card: "summary_large_image",
    title: "インドのヨガ講師陣 | アディローハのアチャリヤ、リシケシ",
    description: "リシケシのアディローハで教える11人のヨガ・アチャリヤをご紹介します。ヨガ科学の修士や自然療法学の博士たちが、合計115年を超える指導経験をもって導きます。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...teacherSchemas("ja"),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "講師紹介", url: JA }])
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
