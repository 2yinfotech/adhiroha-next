// Danish code-of-conduct page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DA = "/da/adfaerdskodeks/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Adfærdskodeks og regler | Yogaashrammet Adhiroha, Rishikesh",
  description:
    "Reglerne på Adhirohas ashram i Rishikesh — de fire søjler, adfærdskodekset, nultolerancepolitikken og alt om priser, betaling og omlægning.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Adfærdskodeks og regler | Yogaashrammet Adhiroha, Rishikesh",
    description: "Reglerne på Adhirohas ashram i Rishikesh — de fire søjler, adfærdskodekset, nultolerancepolitikken og alt om priser, betaling og omlægning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adfærdskodeks og regler | Yogaashrammet Adhiroha, Rishikesh",
    description: "Reglerne på Adhirohas ashram i Rishikesh — de fire søjler, adfærdskodekset, nultolerancepolitikken og alt om priser, betaling og omlægning.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Adfærdskodeks", url: DA }])
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
