// Polish sound-healing TTC page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const PL = "/pl/kurs-terapii-dzwiekiem-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Kurs Nauczycielski Terapii Dźwiękiem w Riszikeś | 6 Dni | Adhiroha",
  description:
    "Sześciodniowy stacjonarny kurs nauczycielski terapii i uzdrawiania dźwiękiem w Riszikeś, tybetańskie misy śpiewające, gongi i wedyjska nauka o dźwięku, poziomy 1, 2 i 3. Od 690 € all inclusive.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Kurs Nauczycielski Terapii Dźwiękiem w Riszikeś | 6 Dni | Adhiroha",
    description: "Sześciodniowy stacjonarny kurs nauczycielski terapii i uzdrawiania dźwiękiem w Riszikeś, tybetańskie misy śpiewające, gongi i wedyjska nauka o dźwięku, poziomy 1, 2 i 3. Od 690 € all inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurs Nauczycielski Terapii Dźwiękiem w Riszikeś | 6 Dni | Adhiroha",
    description: "Sześciodniowy stacjonarny kurs nauczycielski terapii i uzdrawiania dźwiękiem w Riszikeś, tybetańskie misy śpiewające, gongi i wedyjska nauka o dźwięku, poziomy 1, 2 i 3. Od 690 € all inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Kurs Nauczycielski Terapii i Uzdrawiania Dźwiękiem w Riszikeś",
    description: metadata.description,
    url: PL,
    price: 690,
    days: 6,
    styles: "Tybetańskie misy śpiewające, gongi, wedyjska nauka o dźwięku, równoważenie czakr, medytacja",
  ...courseFacts("/sound-healing-ttc-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kurs terapii dźwiękiem", url: PL }])
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
