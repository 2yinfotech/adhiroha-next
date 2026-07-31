// Italian Sicurezza e Igiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const IT = "/it/sicurezza-igiene-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Sicurezza e Igiene nel Nostro Ashram a Rishikesh | Adhiroha",
  description:
    "Come Adhiroha protegge il benessere degli studenti a Rishikesh, camere pulite con bagno privato, acqua potabile RO, cucina satvica igienica e supporto sul posto 24/7.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Sicurezza e Igiene nel Nostro Ashram a Rishikesh | Adhiroha",
    description: "Come Adhiroha protegge il benessere degli studenti a Rishikesh, camere pulite con bagno privato, acqua potabile RO, cucina satvica igienica e supporto sul posto 24/7.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sicurezza e Igiene nel Nostro Ashram a Rishikesh | Adhiroha",
    description: "Come Adhiroha protegge il benessere degli studenti a Rishikesh, camere pulite con bagno privato, acqua potabile RO, cucina satvica igienica e supporto sul posto 24/7.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sicurezza e Igiene", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
