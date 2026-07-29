// Japanese "About us" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const JA = "/ja/adhiroha-ni-tsuite/";
const EN = "/about-us/";

export const metadata = {
  title: "アディローハについて | インド・リシケシのヨガスクール",
  description:
    "アディローハをご紹介します — リシケシ、アッパー・タポヴァンにあるヨガアライアンス認定のヨガアシュラム。2万平方フィートの敷地と、70か国以上から3,000人を超える卒業生。",
  alternates: {
    canonical: JA,
    languages: { ja: `${SITE}${JA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "アディローハについて | インド・リシケシのヨガスクール",
    description: "アディローハをご紹介します — リシケシ、アッパー・タポヴァンにあるヨガアライアンス認定のヨガアシュラム。2万平方フィートの敷地と、70か国以上から3,000人を超える卒業生。",
  },
  twitter: {
    card: "summary_large_image",
    title: "アディローハについて | インド・リシケシのヨガスクール",
    description: "アディローハをご紹介します — リシケシ、アッパー・タポヴァンにあるヨガアライアンス認定のヨガアシュラム。2万平方フィートの敷地と、70か国以上から3,000人を超える卒業生。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "私たちについて", url: JA }])
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
