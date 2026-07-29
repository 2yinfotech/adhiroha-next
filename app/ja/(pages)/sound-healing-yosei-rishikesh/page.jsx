// Japanese sound-healing TTC page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const JA = "/ja/sound-healing-yosei-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "リシケシのサウンドヒーリング養成コース | 6日間 — Adhiroha",
  description:
    "リシケシでの6日間の滞在型サウンドヒーリング＆セラピー指導者養成コース — チベットのシンギングボウル、ゴング、ヴェーダの音の科学、レベル1・2・3。€690からオールインクルーシブ。",
  alternates: {
    canonical: JA,
    languages: { ja: `${SITE}${JA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "リシケシのサウンドヒーリング養成コース | 6日間 — Adhiroha",
    description: "リシケシでの6日間の滞在型サウンドヒーリング＆セラピー指導者養成コース — チベットのシンギングボウル、ゴング、ヴェーダの音の科学、レベル1・2・3。€690からオールインクルーシブ。",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "リシケシのサウンドヒーリング＆セラピー指導者養成コース",
    description: metadata.description,
    url: JA,
    price: 690,
    days: 6,
    styles: "チベットのシンギングボウル、ゴング、ヴェーダの音の科学、チャクラのバランス調整、瞑想",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "サウンドヒーリング養成コース", url: JA }])
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
