// German Sicherheit & Hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/sicherheit-hygiene-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Sicherheit & Hygiene in unserem Rishikesh-Ashram | Adhiroha",
  description: "Wie Adhiroha in Rishikesh für Sicherheit, Hygiene und Reiselogistik sorgt — besonders für allein reisende Frauen. Abholung, Videoüberwachung und mehr.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Sicherheit & Hygiene in unserem Rishikesh-Ashram | Adhiroha", description: "Wie Adhiroha in Rishikesh für Sicherheit, Hygiene und Reiselogistik sorgt — besonders für allein reisende Frauen. Abholung, Videoüberwachung und mehr.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sicherheit & Hygiene", url: DE }])
);

export default function Page() {
  return (
    <div lang="de">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
