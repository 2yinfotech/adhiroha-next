// Polish Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PL = "/pl/program-immersji-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Program Immersji Sadhana w Riszikeś | 15 Dni — Adhiroha",
  description:
    "Piętnastodniowy program immersji Sadhana w Riszikeś — cisza, własna praktyka, medytacja, karma joga i Bhagawadgita w tradycyjnym rytmie aśramu. Od 699 € all inclusive.",
  alternates: {
    canonical: PL,
    languages: { pl: `${SITE}${PL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Program Immersji Sadhana w Riszikeś | 15 Dni — Adhiroha",
    description: "Piętnastodniowy program immersji Sadhana w Riszikeś — cisza, własna praktyka, medytacja, karma joga i Bhagawadgita w tradycyjnym rytmie aśramu. Od 699 € all inclusive.",
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
  }),
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
