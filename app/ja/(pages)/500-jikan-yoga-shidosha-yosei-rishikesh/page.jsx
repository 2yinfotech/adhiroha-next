// Japanese 500-hour course page — served at /ja/500-jikan-yoga-shidosha-yosei-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/500-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const JA = "/ja/500-jikan-yoga-shidosha-yosei-rishikesh/";
const EN = "/500-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "はじめに", target: "top" },
  { label: "料金", target: "course-glance" },
  { label: "科目", target: "curriculum" },
  { label: "一日の流れ", target: "daily-rhythm" },
  { label: "設備", target: "amenities" },
  { label: "宿泊", target: "accommodation" },
  { label: "講師", target: "your-teachers" },
  { label: "周辺", target: "finding-us" },
  { label: "お問い合わせ", target: "begin" }
];

export const metadata = {
  title: "リシケシの500時間ヨガ指導者養成コース | Adhiroha",
  description:
    "ヨガアライアンス認定の500時間ヨガ指導者養成コース（リシケシ）。60日間、基礎から熟達までの全行程、ヒマラヤのアシュラム滞在、オールインクルーシブ。",
  alternates: {
    canonical: JA,
    languages: { ja: `${SITE}${JA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "ja_JP",
    url: `${SITE}${JA}`,
    title: "リシケシの500時間ヨガ指導者養成コース | Adhiroha",
    description:
      "ヨガアライアンス認定の500時間ヨガ指導者養成コース（リシケシ）。60日間、基礎から熟達までの全行程、ヒマラヤのアシュラム滞在、オールインクルーシブ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "リシケシの500時間ヨガ指導者養成コース | Adhiroha",
    description: "ヨガアライアンス認定の500時間ヨガ指導者養成コース（リシケシ）。60日間、基礎から熟達までの全行程、ヒマラヤのアシュラム滞在、オールインクルーシブ。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "リシケシの500時間ヨガ指導者養成コース",
    description: metadata.description,
    url: JA,
    price: 2790,
    days: 60,
    styles: "ハタヨガ、アシュタンガ・ヴィンヤサ、陰、アライメント、プラーナヤーマ、瞑想、ヨガ哲学、解剖学、指導法",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "500時間ヨガ指導者養成コース", url: JA }])
);

export default function Page() {
  return (
    <div lang="ja">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
