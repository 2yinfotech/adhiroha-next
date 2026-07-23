// French Contact page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/contact/";
const EN = "/contact-us/";

export const metadata = {
  title: "Contacter Adhiroha Yoga School | Rishikesh, Inde",
  description: "Contactez Adhiroha à Rishikesh — WhatsApp, téléphone ou e-mail. Chaque message reçoit une réponse d’une personne réelle, généralement dans la journée.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Contacter Adhiroha Yoga School | Rishikesh, Inde", description: "Contactez Adhiroha à Rishikesh — WhatsApp, téléphone ou e-mail. Chaque message reçoit une réponse d’une personne réelle, généralement dans la journée.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Contact", url: DE }])
);

export default function Page() {
  return (
    <div lang="fr">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
