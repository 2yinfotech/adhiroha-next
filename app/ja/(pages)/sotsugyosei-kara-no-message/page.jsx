// Japanese alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const JA = "/ja/sotsugyosei-kara-no-message/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "卒業生からのメッセージ | アディローハ、リシケシ",
  description:
    "アディローハの卒業生が語る、リシケシでのヨガ指導者養成コース、アシュラム、五大元素、講師陣、そして変容の物語。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "卒業生からのメッセージ | アディローハ、リシケシ",
    description: "アディローハの卒業生が語る、リシケシでのヨガ指導者養成コース、アシュラム、五大元素、講師陣、そして変容の物語。",
  },
  twitter: {
    card: "summary_large_image",
    title: "卒業生からのメッセージ | アディローハ、リシケシ",
    description: "アディローハの卒業生が語る、リシケシでのヨガ指導者養成コース、アシュラム、五大元素、講師陣、そして変容の物語。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "卒業生からのメッセージ", url: JA }])
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
