// Polish Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const PL = "/pl/program-immersji-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Program Immersji Sadhana w Riszikeś | 15 Dni | Adhiroha",
  description:
    "Piętnastodniowy program immersji Sadhana w Riszikeś, cisza, własna praktyka, medytacja, karma joga i Bhagawadgita w tradycyjnym rytmie aśramu. Od 699 € all inclusive.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Program Immersji Sadhana w Riszikeś | 15 Dni | Adhiroha",
    description: "Piętnastodniowy program immersji Sadhana w Riszikeś, cisza, własna praktyka, medytacja, karma joga i Bhagawadgita w tradycyjnym rytmie aśramu. Od 699 € all inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Immersji Sadhana w Riszikeś | 15 Dni | Adhiroha",
    description: "Piętnastodniowy program immersji Sadhana w Riszikeś, cisza, własna praktyka, medytacja, karma joga i Bhagawadgita w tradycyjnym rytmie aśramu. Od 699 € all inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Program Immersji Sadhana w Riszikeś",
    description: metadata.description,
    url: PL,
    price: 699,
    days: 15,
    styles: "Hatha joga, pranajama, medytacja, karma joga, filozofia jogi",
  ...courseFacts("/sadhana-immersion-programme/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Program immersji Sadhana", url: PL }])
);

export default function Page() {
  return (
    <div lang="pl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
