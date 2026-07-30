// French Contact page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const FR = "/fr/contact/";
const EN = "/contact-us/";

export const metadata = {
  title: "Contacter Adhiroha Yoga School | Rishikesh, Inde",
  description: "Contactez Adhiroha à Rishikesh — WhatsApp, téléphone ou e-mail. Chaque message reçoit une réponse d’une personne réelle, généralement dans la journée.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Contacter Adhiroha Yoga School | Rishikesh, Inde", description: "Contactez Adhiroha à Rishikesh — WhatsApp, téléphone ou e-mail. Chaque message reçoit une réponse d’une personne réelle, généralement dans la journée.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacter Adhiroha Yoga School | Rishikesh, Inde",
    description: "Contactez Adhiroha à Rishikesh — WhatsApp, téléphone ou e-mail. Chaque message reçoit une réponse d’une personne réelle, généralement dans la journée.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Contact", url: FR }])
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
