// Dutch alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const NL = "/nl/berichten-van-oud-studenten/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Een Bericht van Onze Oud-studenten | Adhiroha, Rishikesh",
  description:
    "Afgestudeerden van Adhiroha beschrijven in hun eigen woorden de yoga-docentenopleiding in Rishikesh, de tuin, het vuuraltaar, de vijf elementen van het terrein en de docenten achter de transformatie.",
  alternates: {
    canonical: NL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Een Bericht van Onze Oud-studenten | Adhiroha, Rishikesh",
    description: "Afgestudeerden van Adhiroha beschrijven in hun eigen woorden de yoga-docentenopleiding in Rishikesh, de tuin, het vuuraltaar, de vijf elementen van het terrein en de docenten achter de transformatie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Een Bericht van Onze Oud-studenten | Adhiroha, Rishikesh",
    description: "Afgestudeerden van Adhiroha beschrijven in hun eigen woorden de yoga-docentenopleiding in Rishikesh, de tuin, het vuuraltaar, de vijf elementen van het terrein en de docenten achter de transformatie.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Berichten van oud-studenten", url: NL }])
);

export default function Page() {
  return (
    <div lang="nl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
