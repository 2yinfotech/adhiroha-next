// Swedish yoga & Ayurveda retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/yoga-och-ayurveda-retreat-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Yoga- och Ayurvedaretreat i Rishikesh | 6 Dagar — Adhiroha",
  description:
    "Sex dagars yoga- och ayurvedaretreat i Rishikesh, Indien — mjuk yoga, pranayama, personliga ayurvediska behandlingar och sattvisk mat. Från 510 € all-inclusive.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Yoga- och Ayurvedaretreat i Rishikesh | 6 Dagar — Adhiroha",
    description: "Sex dagars yoga- och ayurvedaretreat i Rishikesh, Indien — mjuk yoga, pranayama, personliga ayurvediska behandlingar och sattvisk mat. Från 510 € all-inclusive.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Yoga- och Ayurvedaretreat i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 510,
    days: 6,
    styles: "Hatha yoga, ayurvediska behandlingar, meditation, välbefinnande",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yoga- och ayurvedaretreat", url: SV }])
);

export default function Page() {
  return (
    <div lang="sv">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
