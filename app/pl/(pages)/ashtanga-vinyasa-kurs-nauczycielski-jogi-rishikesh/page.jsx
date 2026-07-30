// Polish Ashtanga & Vinyasa course page — served at /pl/ashtanga-vinyasa-kurs-nauczycielski-jogi-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const PL = "/pl/ashtanga-vinyasa-kurs-nauczycielski-jogi-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Wprowadzenie", target: "top" },
  { label: "Ceny", target: "course-glance" },
  { label: "Przedmioty", target: "curriculum" },
  { label: "Rytm dnia", target: "daily-rhythm" },
  { label: "Zaplecze", target: "amenities" },
  { label: "Zakwaterowanie", target: "accommodation" },
  { label: "Nauczyciele", target: "your-teachers" },
  { label: "Okolica", target: "finding-us" },
  { label: "Kontakt", target: "begin" }
];

export const metadata = {
  title: "Kurs Nauczycielski Ashtanga i Vinyasa Jogi w Riszikeś | 12 Dni — Adhiroha",
  description:
    "Dwunastodniowy kurs nauczycielski ashtanga i vinyasa jogi w Riszikeś, akredytowany przez Ministerstwo Ayush. Małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "pl_PL",
    url: `${SITE}${PL}`,
    title: "Kurs Nauczycielski Ashtanga i Vinyasa Jogi w Riszikeś | 12 Dni — Adhiroha",
    description:
      "Dwunastodniowy kurs nauczycielski ashtanga i vinyasa jogi w Riszikeś, akredytowany przez Ministerstwo Ayush. Małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurs Nauczycielski Ashtanga i Vinyasa Jogi w Riszikeś | 12 Dni — Adhiroha",
    description: "Dwunastodniowy kurs nauczycielski ashtanga i vinyasa jogi w Riszikeś, akredytowany przez Ministerstwo Ayush. Małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "Kurs Nauczycielski Ashtanga i Vinyasa Jogi w Riszikeś",
    description: metadata.description,
    url: PL,
    price: 790,
    days: 14,
    styles: "Ashtanga vinyasa, przepływ vinyasa, ustawienie, pranajama, medytacja, anatomia, metodyka nauczania",
  ...courseFacts("/ashtanga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kurs nauczycielski ashtanga i vinyasa", url: PL }])
);

export default function Page() {
  return (
    <div lang="pl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
