// Swedish "Kontakt" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/kontakt/";
const EN = "/contact-us/";

export const metadata = {
  title: "Kontakt | Adhiroha — Yogaskola i Rishikesh",
  description:
    "Kontakta yoga-ashramet Adhiroha i Upper Tapovan, Rishikesh. WhatsApp, e-post eller formulär — det är en riktig människa som svarar, oftast inom en dag.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Kontakt | Adhiroha — Yogaskola i Rishikesh",
    description: "Kontakta yoga-ashramet Adhiroha i Upper Tapovan, Rishikesh. WhatsApp, e-post eller formulär — det är en riktig människa som svarar, oftast inom en dag.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | Adhiroha — Yogaskola i Rishikesh",
    description: "Kontakta yoga-ashramet Adhiroha i Upper Tapovan, Rishikesh. WhatsApp, e-post eller formulär — det är en riktig människa som svarar, oftast inom en dag.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kontakt", url: SV }])
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
