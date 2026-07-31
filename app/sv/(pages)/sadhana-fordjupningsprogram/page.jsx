// Swedish Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const SV = "/sv/sadhana-fordjupningsprogram/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Sadhana Fördjupningsprogram i Rishikesh | 15 Dagar | Adhiroha",
  description:
    "Femton dagars Sadhana-fördjupningsprogram i Rishikesh, tystnad, egen övning, meditation, karma yoga och Bhagavad Gita i traditionell ashramrytm. Från 699 € all-inclusive.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Sadhana Fördjupningsprogram i Rishikesh | 15 Dagar | Adhiroha",
    description: "Femton dagars Sadhana-fördjupningsprogram i Rishikesh, tystnad, egen övning, meditation, karma yoga och Bhagavad Gita i traditionell ashramrytm. Från 699 € all-inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadhana Fördjupningsprogram i Rishikesh | 15 Dagar | Adhiroha",
    description: "Femton dagars Sadhana-fördjupningsprogram i Rishikesh, tystnad, egen övning, meditation, karma yoga och Bhagavad Gita i traditionell ashramrytm. Från 699 € all-inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
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
  ...courseFacts("/sadhana-immersion-programme/")}),
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
