// Polish yoga & Ayurveda retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const PL = "/pl/odosobnienie-jogi-i-ajurwedy-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Odosobnienie Jogi i Ajurwedy w Riszikeś | 6 Dni — Adhiroha",
  description:
    "Sześciodniowe odosobnienie jogi i ajurwedy w Riszikeś w Indiach — łagodna joga, pranajama, spersonalizowane terapie ajurwedyjskie i jedzenie satwiczne. Od 510 € all inclusive.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Odosobnienie Jogi i Ajurwedy w Riszikeś | 6 Dni — Adhiroha",
    description: "Sześciodniowe odosobnienie jogi i ajurwedy w Riszikeś w Indiach — łagodna joga, pranajama, spersonalizowane terapie ajurwedyjskie i jedzenie satwiczne. Od 510 € all inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odosobnienie Jogi i Ajurwedy w Riszikeś | 6 Dni — Adhiroha",
    description: "Sześciodniowe odosobnienie jogi i ajurwedy w Riszikeś w Indiach — łagodna joga, pranajama, spersonalizowane terapie ajurwedyjskie i jedzenie satwiczne. Od 510 € all inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Odosobnienie Jogi i Ajurwedy w Riszikeś",
    description: metadata.description,
    url: PL,
    price: 510,
    days: 6,
    styles: "Hatha joga, terapie ajurwedyjskie, medytacja, wellness",
  ...courseFacts("/yoga-retreat-in-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Odosobnienie jogi i ajurwedy", url: PL }])
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
