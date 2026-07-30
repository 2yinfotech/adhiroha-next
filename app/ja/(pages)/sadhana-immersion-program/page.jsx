// Japanese Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const JA = "/ja/sadhana-immersion-program/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "リシケシのサーダナ集中プログラム | 15日間 — Adhiroha",
  description:
    "リシケシでの15日間の滞在型サーダナ集中 — 伝統的なアシュラムの規律のもとでの沈黙、自主練習、瞑想、カルマヨガ、バガヴァッド・ギーター。€699からオールインクルーシブ。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "リシケシのサーダナ集中プログラム | 15日間 — Adhiroha",
    description: "リシケシでの15日間の滞在型サーダナ集中 — 伝統的なアシュラムの規律のもとでの沈黙、自主練習、瞑想、カルマヨガ、バガヴァッド・ギーター。€699からオールインクルーシブ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "リシケシのサーダナ集中プログラム | 15日間 — Adhiroha",
    description: "リシケシでの15日間の滞在型サーダナ集中 — 伝統的なアシュラムの規律のもとでの沈黙、自主練習、瞑想、カルマヨガ、バガヴァッド・ギーター。€699からオールインクルーシブ。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "リシケシのサーダナ集中プログラム",
    description: metadata.description,
    url: JA,
    price: 699,
    days: 15,
    styles: "ハタヨガ、プラーナヤーマ、瞑想、カルマヨガ、ヨガ哲学",
  ...courseFacts("/sadhana-immersion-programme/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "サーダナ集中プログラム", url: JA }])
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
