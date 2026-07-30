// Swedish safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const SV = "/sv/sakerhet-och-hygien-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Säkerhet och Hygien | Yoga-ashramet Adhiroha, Rishikesh",
  description:
    "Kameraövervakning dygnet runt, inhägnat område, flygplatshämtning ingår och extra omtanke om kvinnor som reser ensamma — så sköter Adhiroha säkerhet och hygien i Rishikesh.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Säkerhet och Hygien | Yoga-ashramet Adhiroha, Rishikesh",
    description: "Kameraövervakning dygnet runt, inhägnat område, flygplatshämtning ingår och extra omtanke om kvinnor som reser ensamma — så sköter Adhiroha säkerhet och hygien i Rishikesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Säkerhet och Hygien | Yoga-ashramet Adhiroha, Rishikesh",
    description: "Kameraövervakning dygnet runt, inhägnat område, flygplatshämtning ingår och extra omtanke om kvinnor som reser ensamma — så sköter Adhiroha säkerhet och hygien i Rishikesh.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Säkerhet och hygien", url: SV }])
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
