// Dutch "Contact" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/contact/";
const EN = "/contact-us/";

export const metadata = {
  title: "Contact | Adhiroha — Yogaschool in Rishikesh",
  description:
    "Neem contact op met de yoga-ashram Adhiroha in Upper Tapovan, Rishikesh. WhatsApp, e-mail of formulier — er antwoordt een echt mens, meestal binnen een dag.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Contact | Adhiroha — Yogaschool in Rishikesh",
    description: "Neem contact op met de yoga-ashram Adhiroha in Upper Tapovan, Rishikesh. WhatsApp, e-mail of formulier — er antwoordt een echt mens, meestal binnen een dag.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Adhiroha — Yogaschool in Rishikesh",
    description: "Neem contact op met de yoga-ashram Adhiroha in Upper Tapovan, Rishikesh. WhatsApp, e-mail of formulier — er antwoordt een echt mens, meestal binnen een dag.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Contact", url: NL }])
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
