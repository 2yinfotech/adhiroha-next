// Japanese yoga & Ayurveda retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const JA = "/ja/yoga-ayurveda-retreat-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "リシケシのヨガ＆アーユルヴェーダ・リトリート | 6日間 — Adhiroha",
  description:
    "インド・リシケシでの6日間のヨガ＆アーユルヴェーダ・リトリート — 穏やかなヨガ、プラーナヤーマ、一人ひとりに合わせたアーユルヴェーダ療法、サットヴィックな食事。€510からオールインクルーシブ。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "リシケシのヨガ＆アーユルヴェーダ・リトリート | 6日間 — Adhiroha",
    description: "インド・リシケシでの6日間のヨガ＆アーユルヴェーダ・リトリート — 穏やかなヨガ、プラーナヤーマ、一人ひとりに合わせたアーユルヴェーダ療法、サットヴィックな食事。€510からオールインクルーシブ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "リシケシのヨガ＆アーユルヴェーダ・リトリート | 6日間 — Adhiroha",
    description: "インド・リシケシでの6日間のヨガ＆アーユルヴェーダ・リトリート — 穏やかなヨガ、プラーナヤーマ、一人ひとりに合わせたアーユルヴェーダ療法、サットヴィックな食事。€510からオールインクルーシブ。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "リシケシのヨガ＆アーユルヴェーダ・リトリート",
    description: metadata.description,
    url: JA,
    price: 510,
    days: 6,
    styles: "ハタヨガ、アーユルヴェーダ療法、瞑想、ウェルネス",
  ...courseFacts("/yoga-retreat-in-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "ヨガ＆アーユルヴェーダ・リトリート", url: JA }])
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
