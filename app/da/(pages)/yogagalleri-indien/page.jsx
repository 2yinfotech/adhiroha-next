// Danish gallery page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DA = "/da/yogagalleri-indien/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Fotogalleri | Yogaashrammet Adhiroha, Rishikesh",
  description:
    "181 ærlige fotos fra Adhirohas ashram i Upper Tapovan, Rishikesh, shalaen, værelserne, den sattviske mad, ceremonierne, udflugterne og eleverne.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Fotogalleri | Yogaashrammet Adhiroha, Rishikesh",
    description: "181 ærlige fotos fra Adhirohas ashram i Upper Tapovan, Rishikesh, shalaen, værelserne, den sattviske mad, ceremonierne, udflugterne og eleverne.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotogalleri | Yogaashrammet Adhiroha, Rishikesh",
    description: "181 ærlige fotos fra Adhirohas ashram i Upper Tapovan, Rishikesh, shalaen, værelserne, den sattviske mad, ceremonierne, udflugterne og eleverne.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galleri", url: DA }])
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
