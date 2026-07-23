// German Yoga- & Ayurveda-Wellness-Retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/yoga-retreat-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Yoga- & Ayurveda-Retreat in Rishikesh | 6 Tage — Adhiroha",
  description: "6-tägiges Yoga- & Ayurveda-Wellness-Retreat in Rishikesh. Sanftes Yoga, ayurvedische Therapien, sattvisches Essen — Ruhe im Himalaya-Ashram.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Yoga- & Ayurveda-Retreat in Rishikesh | 6 Tage — Adhiroha", description: "6-tägiges Yoga- & Ayurveda-Wellness-Retreat in Rishikesh. Sanftes Yoga, ayurvedische Therapien, sattvisches Essen — Ruhe im Himalaya-Ashram.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Yoga- & Ayurveda-Wellness-Retreat in Rishikesh", description: metadata.description, url: DE, price: 510, days: 6, styles: "Hatha Yoga, ayurvedische Therapien, Meditation, Wellness" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yoga- & Ayurveda-Wellness-Retreat", url: DE }])
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
