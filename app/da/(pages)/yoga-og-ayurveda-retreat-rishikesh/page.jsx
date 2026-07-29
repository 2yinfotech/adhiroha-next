// Danish yoga & Ayurveda retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/yoga-og-ayurveda-retreat-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Yoga- og ayurveda-retreat i Rishikesh | 6 dage — Adhiroha",
  description:
    "Seks dages yoga- og ayurveda-retreat i Rishikesh, Indien — blid yoga, pranayama, personligt tilpassede ayurvediske behandlinger og sattvisk mad. Fra 510 € alt inklusive.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Yoga- og ayurveda-retreat i Rishikesh | 6 dage — Adhiroha",
    description: "Seks dages yoga- og ayurveda-retreat i Rishikesh, Indien — blid yoga, pranayama, personligt tilpassede ayurvediske behandlinger og sattvisk mad. Fra 510 € alt inklusive.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Yoga- og ayurveda-retreat i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 510,
    days: 6,
    styles: "Hatha yoga, ayurvediske behandlinger, meditation, velvære",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yoga- og ayurveda-retreat", url: DA }])
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
