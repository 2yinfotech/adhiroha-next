// German Sadhana Immersion Programm page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/sadhana-immersion-programm/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Sadhana Immersion Programm in Rishikesh | 15 Tage",
  description: "15-tägiges Sadhana Immersion Programm in Rishikesh — Eigenpraxis, Meditation, Stille und bewusstes yogisches Leben im Ashram.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Sadhana Immersion Programm in Rishikesh | 15 Tage", description: "15-tägiges Sadhana Immersion Programm in Rishikesh — Eigenpraxis, Meditation, Stille und bewusstes yogisches Leben im Ashram.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Sadhana Immersion Programm in Rishikesh", description: metadata.description, url: DE, price: 699, days: 15, styles: "Tägliche Sadhana, Meditation, Stille, yogisches Leben" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sadhana Immersion Programm", url: DE }])
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
