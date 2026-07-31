// Swedish gallery page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const SV = "/sv/yogagalleri-indien/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Fotogalleri | Yoga-ashramet Adhiroha i Rishikesh, Indien",
  description:
    "181 ärliga bilder från Adhirohas ashram i Upper Tapovan, Rishikesh, shalan, rummen, den sattviska maten, ceremonierna, utflykterna och examensdagen.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Fotogalleri | Yoga-ashramet Adhiroha i Rishikesh, Indien",
    description: "181 ärliga bilder från Adhirohas ashram i Upper Tapovan, Rishikesh, shalan, rummen, den sattviska maten, ceremonierna, utflykterna och examensdagen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotogalleri | Yoga-ashramet Adhiroha i Rishikesh, Indien",
    description: "181 ärliga bilder från Adhirohas ashram i Upper Tapovan, Rishikesh, shalan, rummen, den sattviska maten, ceremonierna, utflykterna och examensdagen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galleri", url: SV }])
);

export default function Page() {
  return (
    <div lang="sv">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
