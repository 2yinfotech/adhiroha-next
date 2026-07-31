// Japanese "Contact" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const JA = "/ja/otoiawase/";
const EN = "/contact-us/";

export const metadata = {
  title: "お問い合わせ | Adhiroha、リシケシのヨガスクール",
  description:
    "リシケシ、アッパー・タポヴァンのヨガアシュラム、アディローハへのお問い合わせ。WhatsApp、メール、フォームのいずれでも、実際の人間がたいてい1日以内にお返事します。",
  alternates: {
    canonical: JA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "ja_JP", url: `${SITE}${JA}`,
    title: "お問い合わせ | Adhiroha、リシケシのヨガスクール",
    description: "リシケシ、アッパー・タポヴァンのヨガアシュラム、アディローハへのお問い合わせ。WhatsApp、メール、フォームのいずれでも、実際の人間がたいてい1日以内にお返事します。",
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | Adhiroha、リシケシのヨガスクール",
    description: "リシケシ、アッパー・タポヴァンのヨガアシュラム、アディローハへのお問い合わせ。WhatsApp、メール、フォームのいずれでも、実際の人間がたいてい1日以内にお返事します。",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "お問い合わせ", url: JA }])
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
