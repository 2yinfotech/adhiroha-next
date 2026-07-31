// Dutch yoga & Ayurveda retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const NL = "/nl/yoga-en-ayurveda-retraite-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Yoga- en Ayurvedaretraite in Rishikesh | 6 Dagen | Adhiroha",
  description:
    "Zesdaagse yoga- en ayurvedaretraite in Rishikesh, India, zachte yoga, pranayama, persoonlijke ayurvedische therapieën en sattvisch eten. Vanaf € 510 all-inclusive.",
  alternates: {
    canonical: NL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Yoga- en Ayurvedaretraite in Rishikesh | 6 Dagen | Adhiroha",
    description: "Zesdaagse yoga- en ayurvedaretraite in Rishikesh, India, zachte yoga, pranayama, persoonlijke ayurvedische therapieën en sattvisch eten. Vanaf € 510 all-inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoga- en Ayurvedaretraite in Rishikesh | 6 Dagen | Adhiroha",
    description: "Zesdaagse yoga- en ayurvedaretraite in Rishikesh, India, zachte yoga, pranayama, persoonlijke ayurvedische therapieën en sattvisch eten. Vanaf € 510 all-inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Yoga- en Ayurvedaretraite in Rishikesh",
    description: metadata.description,
    url: NL,
    price: 510,
    days: 6,
    styles: "Hatha yoga, ayurvedische therapieën, meditatie, welzijn",
  ...courseFacts("/yoga-retreat-in-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yoga- en ayurvedaretraite", url: NL }])
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
