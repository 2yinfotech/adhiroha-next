// Danish Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/sadhana-fordybelsesprogram/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Sadhana fordybelsesprogram i Rishikesh | 15 dage — Adhiroha",
  description:
    "Femten dages sadhana-fordybelse med ophold i Rishikesh — stilhed, egen praksis, meditation, karma yoga og Bhagavad Gita i traditionel ashram-disciplin. Fra 699 € alt inklusive.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Sadhana fordybelsesprogram i Rishikesh | 15 dage — Adhiroha",
    description: "Femten dages sadhana-fordybelse med ophold i Rishikesh — stilhed, egen praksis, meditation, karma yoga og Bhagavad Gita i traditionel ashram-disciplin. Fra 699 € alt inklusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadhana fordybelsesprogram i Rishikesh | 15 dage — Adhiroha",
    description: "Femten dages sadhana-fordybelse med ophold i Rishikesh — stilhed, egen praksis, meditation, karma yoga og Bhagavad Gita i traditionel ashram-disciplin. Fra 699 € alt inklusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Sadhana fordybelsesprogram i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 699,
    days: 15,
    styles: "Hatha yoga, pranayama, meditation, karma yoga, yogafilosofi",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sadhana fordybelsesprogram", url: DA }])
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
