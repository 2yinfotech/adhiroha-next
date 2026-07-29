// Japanese 300-hour course page — served at /ja/300-jikan-yoga-shidosha-yosei-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const JA = "/ja/300-jikan-yoga-shidosha-yosei-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "リシケシの300時間ヨガ指導者養成コース | Adhiroha",
  description:
    "ヨガアライアンス認定の上級300時間ヨガ指導者養成コース（リシケシ）。30日間、少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
  alternates: {
    canonical: JA,
    languages: { ja: `${SITE}${JA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "ja_JP",
    url: `${SITE}${JA}`,
    title: "リシケシの300時間ヨガ指導者養成コース | Adhiroha",
    description:
      "ヨガアライアンス認定の上級300時間ヨガ指導者養成コース（リシケシ）。30日間、少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "リシケシの300時間ヨガ指導者養成コース",
    description: metadata.description,
    url: JA,
    price: 1500,
    days: 30,
    styles: "上級ハタヨガ、アシュタンガ・ヴィンヤサ、アライメント、プラーナヤーマ、瞑想、ヨガ哲学、解剖学、指導法",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "300時間ヨガ指導者養成コース", url: JA }])
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
