// Danish alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DA = "/da/hilsner-fra-tidligere-elever/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "En hilsen fra vores tidligere elever | Adhiroha, Rishikesh",
  description:
    "Tidligere elever fra Adhiroha fortæller om deres yogalæreruddannelse i Rishikesh — ashrammet, de fem elementer, underviserne og forvandlingen.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "En hilsen fra vores tidligere elever | Adhiroha, Rishikesh",
    description: "Tidligere elever fra Adhiroha fortæller om deres yogalæreruddannelse i Rishikesh — ashrammet, de fem elementer, underviserne og forvandlingen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "En hilsen fra vores tidligere elever | Adhiroha, Rishikesh",
    description: "Tidligere elever fra Adhiroha fortæller om deres yogalæreruddannelse i Rishikesh — ashrammet, de fem elementer, underviserne og forvandlingen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Hilsner fra tidligere elever", url: DA }])
);

export default function Page() {
  return (
    <div lang="da">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
