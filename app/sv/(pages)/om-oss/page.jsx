// Swedish "Om oss" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const SV = "/sv/om-oss/";
const EN = "/about-us/";

export const metadata = {
  title: "Om Adhiroha | Yogaskola i Rishikesh, Indien",
  description:
    "Lär känna Adhiroha, ett Yoga Alliance-certifierat yoga-ashram i Upper Tapovan, Rishikesh, med 20 000 kvadratfot område och över 3 000 utbildade elever från mer än 70 länder.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Om Adhiroha | Yogaskola i Rishikesh, Indien",
    description: "Lär känna Adhiroha, ett Yoga Alliance-certifierat yoga-ashram i Upper Tapovan, Rishikesh, med 20 000 kvadratfot område och över 3 000 utbildade elever från mer än 70 länder.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Adhiroha | Yogaskola i Rishikesh, Indien",
    description: "Lär känna Adhiroha, ett Yoga Alliance-certifierat yoga-ashram i Upper Tapovan, Rishikesh, med 20 000 kvadratfot område och över 3 000 utbildade elever från mer än 70 länder.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Om oss", url: SV }])
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
