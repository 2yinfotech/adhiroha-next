// Polish 200-hour course page — served at /pl/200-godzinny-kurs-nauczycielski-jogi-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PL = "/pl/200-godzinny-kurs-nauczycielski-jogi-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "200-Godzinny Kurs Nauczycielski Jogi w Riszikeś | Adhiroha",
  description:
    "200-godzinny kurs nauczycielski jogi w Riszikeś z certyfikatem Yoga Alliance. 24 dni, małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
  alternates: {
    canonical: PL,
    languages: { pl: `${SITE}${PL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "pl_PL",
    url: `${SITE}${PL}`,
    title: "200-Godzinny Kurs Nauczycielski Jogi w Riszikeś | Adhiroha",
    description:
      "200-godzinny kurs nauczycielski jogi w Riszikeś z certyfikatem Yoga Alliance. 24 dni, małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
  },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
  courseSchema({
    name: "200-Godzinny Kurs Nauczycielski Jogi w Riszikeś",
    description: metadata.description,
    url: PL,
    price: 1275,
    days: 24,
    styles: "Hatha joga, ashtanga vinyasa, pranajama, medytacja, filozofia jogi, anatomia, metodyka nauczania",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200-godzinny kurs nauczycielski jogi", url: PL }])
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
