// Japanese 200-hour course page — served at /ja/200-jikan-yoga-shidosha-yosei-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const JA = "/ja/200-jikan-yoga-shidosha-yosei-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "リシケシの200時間ヨガ指導者養成コース | Adhiroha",
  description:
    "ヨガアライアンス認定の200時間ヨガ指導者養成コース（リシケシ）。24日間、少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "ja_JP",
    url: `${SITE}${JA}`,
    title: "リシケシの200時間ヨガ指導者養成コース | Adhiroha",
    description:
      "ヨガアライアンス認定の200時間ヨガ指導者養成コース（リシケシ）。24日間、少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
  },
  twitter: {
    card: "summary_large_image",
    title: "リシケシの200時間ヨガ指導者養成コース | Adhiroha",
    description: "ヨガアライアンス認定の200時間ヨガ指導者養成コース（リシケシ）。24日間、少人数制、ヒマラヤのアシュラム滞在、食事と遠足込み。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "リシケシの200時間ヨガ指導者養成コース",
    description: metadata.description,
    url: JA,
    price: 1275,
    days: 24,
    styles: "ハタヨガ、アシュタンガ・ヴィンヤサ、プラーナヤーマ、瞑想、ヨガ哲学、解剖学、指導法",
  ...courseFacts("/200-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200時間ヨガ指導者養成コース", url: JA }])
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
