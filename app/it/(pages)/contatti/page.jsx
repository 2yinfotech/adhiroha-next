// Italian Contatti page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/contatti/";
const EN = "/contact-us/";

export const metadata = {
  title: "Contatta Adhiroha Yoga School | Rishikesh, India",
  description: "Contatta Adhiroha Yoga School a Upper Tapovan, Rishikesh. Chiamaci, scrivici su WhatsApp o via email per date dei corsi, tariffe e viaggio verso l'ashram.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Contatta Adhiroha Yoga School | Rishikesh, India", description: "Contatta Adhiroha Yoga School a Upper Tapovan, Rishikesh. Chiamaci, scrivici su WhatsApp o via email per date dei corsi, tariffe e viaggio verso l'ashram.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Contatti", url: IT }])
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
