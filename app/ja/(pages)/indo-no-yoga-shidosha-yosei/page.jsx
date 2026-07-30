// Japanese YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const JA = "/ja/indo-no-yoga-shidosha-yosei/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "インドのヨガ指導者養成コース | リシケシの200・300・500時間 YTTC | Adhiroha",
  description:
    "インド・リシケシのアディローハで学ぶヨガ指導者養成コース — ヨガアライアンス認定の200・300・500時間の滞在型コース。70か国以上から3,000人を超える生徒。オールインクルーシブ料金、国際的に認められた認定。",
  keywords: [
    "インド ヨガ指導者養成",
    "リシケシ ヨガ指導者養成",
    "200時間 ヨガ指導者養成 インド",
    "300時間 ヨガ指導者養成",
    "500時間 ヨガ指導者養成 リシケシ",
    "ヨガ TTC インド",
  ],
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "インドのヨガ指導者養成コース | リシケシの200・300・500時間 YTTC",
    description:
      "インド・リシケシで開講する、ヨガアライアンス認定の200・300・500時間ヨガ指導者養成コース。オールインクルーシブ、国際的に認められた認定。",
  },
  twitter: {
    card: "summary_large_image",
    title: "インドのヨガ指導者養成コース | リシケシの200・300・500時間 YTTC",
    description: "インド・リシケシで開講する、ヨガアライアンス認定の200・300・500時間ヨガ指導者養成コース。オールインクルーシブ、国際的に認められた認定。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "インド・リシケシの200時間ヨガ指導者養成コース",
    description:
      "インド・リシケシで開講する、ヨガアライアンス認定の200時間滞在型ヨガ指導者養成コース — アーサナ、プラーナヤーマ、解剖学、哲学、指導実習を学ぶ初心者向けの基礎。",
    url: "/ja/200-jikan-yoga-shidosha-yosei-rishikesh/",
    price: 1275,
    days: 24,
    styles: "ハタヨガ、アシュタンガ・ヴィンヤサ、陰ヨガ",
  ...courseFacts("/200-hour-yoga-teacher-training-course-rishikesh/")}),
  courseSchema({
    name: "インド・リシケシの300時間ヨガ指導者養成コース",
    description:
      "200時間を修了した方のための、インド・リシケシでの上級300時間滞在型ヨガ指導者養成コース。RYT 500への道を完成させます。",
    url: "/ja/300-jikan-yoga-shidosha-yosei-rishikesh/",
    price: 1500,
    days: 30,
    styles: "ハタヨガ、アシュタンガ・ヴィンヤサ、アライメント",
  ...courseFacts("/300-hour-yoga-teacher-training-course-rishikesh/")}),
  courseSchema({
    name: "インド・リシケシの500時間ヨガ指導者養成コース",
    description:
      "インド・リシケシでの500時間滞在型ヨガ指導者養成コース — 200時間と300時間のプログラムを結ぶ、初心者からマスターレベルまでの完全な60日間の没入。",
    url: "/ja/500-jikan-yoga-shidosha-yosei-rishikesh/",
    price: 2790,
    days: 60,
    styles: "ハタ、アシュタンガ、陰、アライメント",
  ...courseFacts("/500-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "インドのヨガ指導者養成", url: JA }])
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
