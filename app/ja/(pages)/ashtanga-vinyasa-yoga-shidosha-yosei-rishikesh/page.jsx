// Japanese Ashtanga & Vinyasa course page — served at /ja/ashtanga-vinyasa-yoga-shidosha-yosei-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const JA = "/ja/ashtanga-vinyasa-yoga-shidosha-yosei-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

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
  title: "リシケシのアシュタンガ＆ヴィンヤサ・ヨガ指導者養成コース | 12日間 — Adhiroha",
  description:
    "アーユシュ省認定の12日間アシュタンガ＆ヴィンヤサ・ヨガ指導者養成コース（リシケシ）。少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
  alternates: {
    canonical: JA,
    languages: { ja: `${SITE}${JA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "ja_JP",
    url: `${SITE}${JA}`,
    title: "リシケシのアシュタンガ＆ヴィンヤサ・ヨガ指導者養成コース | 12日間 — Adhiroha",
    description:
      "アーユシュ省認定の12日間アシュタンガ＆ヴィンヤサ・ヨガ指導者養成コース（リシケシ）。少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "リシケシのアシュタンガ＆ヴィンヤサ・ヨガ指導者養成コース",
    description: metadata.description,
    url: JA,
    price: 790,
    days: 14,
    styles: "アシュタンガヨガ、ヴィンヤサ・フロー、アライメント、プラーナヤーマ、瞑想、解剖学、指導法",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "アシュタンガ＆ヴィンヤサの指導者養成", url: JA }])
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
