// Danish "Kontakt" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/kontakt/";
const EN = "/contact-us/";

export const metadata = {
  title: "Kontakt | Adhiroha — Yogaskole i Rishikesh",
  description:
    "Kontakt yogaashrammet Adhiroha i Upper Tapovan, Rishikesh. WhatsApp, e-mail eller formular — det er et rigtigt menneske, der svarer, som regel inden for et døgn.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Kontakt | Adhiroha — Yogaskole i Rishikesh",
    description: "Kontakt yogaashrammet Adhiroha i Upper Tapovan, Rishikesh. WhatsApp, e-mail eller formular — det er et rigtigt menneske, der svarer, som regel inden for et døgn.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kontakt", url: DA }])
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
