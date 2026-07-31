// Swedish code-of-conduct page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const SV = "/sv/uppforandekod/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Uppförandekod och Regler | Yoga-ashramet Adhiroha, Rishikesh",
  description:
    "Reglerna på Adhirohas ashram i Rishikesh, de fyra pelarna, uppförandekoden, nolltoleranspolicyn och allt om avgifter, betalningar och ombokning.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Uppförandekod och Regler | Yoga-ashramet Adhiroha, Rishikesh",
    description: "Reglerna på Adhirohas ashram i Rishikesh, de fyra pelarna, uppförandekoden, nolltoleranspolicyn och allt om avgifter, betalningar och ombokning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uppförandekod och Regler | Yoga-ashramet Adhiroha, Rishikesh",
    description: "Reglerna på Adhirohas ashram i Rishikesh, de fyra pelarna, uppförandekoden, nolltoleranspolicyn och allt om avgifter, betalningar och ombokning.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Uppförandekod", url: SV }])
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
