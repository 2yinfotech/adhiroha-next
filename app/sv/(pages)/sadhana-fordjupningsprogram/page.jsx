// Swedish Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/sadhana-fordjupningsprogram/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Sadhana Fördjupningsprogram i Rishikesh | 15 Dagar — Adhiroha",
  description:
    "Femton dagars Sadhana-fördjupningsprogram i Rishikesh — tystnad, egen övning, meditation, karma yoga och Bhagavad Gita i traditionell ashramrytm. Från 699 € all-inclusive.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Sadhana Fördjupningsprogram i Rishikesh | 15 Dagar — Adhiroha",
    description: "Femton dagars Sadhana-fördjupningsprogram i Rishikesh — tystnad, egen övning, meditation, karma yoga och Bhagavad Gita i traditionell ashramrytm. Från 699 € all-inclusive.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Sadhana Fördjupningsprogram i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 699,
    days: 15,
    styles: "Hatha yoga, pranayama, meditation, karma yoga, yogafilosofi",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sadhana fördjupningsprogram", url: SV }])
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
