// Polish 300-hour course page — served at /pl/300-godzinny-kurs-nauczycielski-jogi-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const PL = "/pl/300-godzinny-kurs-nauczycielski-jogi-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "300-Godzinny Kurs Nauczycielski Jogi w Riszikeś | Adhiroha",
  description:
    "Zaawansowany 300-godzinny kurs nauczycielski jogi w Riszikeś z certyfikatem Yoga Alliance. 30 dni, małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "pl_PL",
    url: `${SITE}${PL}`,
    title: "300-Godzinny Kurs Nauczycielski Jogi w Riszikeś | Adhiroha",
    description:
      "Zaawansowany 300-godzinny kurs nauczycielski jogi w Riszikeś z certyfikatem Yoga Alliance. 30 dni, małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "300-Godzinny Kurs Nauczycielski Jogi w Riszikeś | Adhiroha",
    description: "Zaawansowany 300-godzinny kurs nauczycielski jogi w Riszikeś z certyfikatem Yoga Alliance. 30 dni, małe grupy, pobyt w himalajskim aśramie, wszystkie posiłki i wycieczki w cenie.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "300-Godzinny Kurs Nauczycielski Jogi w Riszikeś",
    description: metadata.description,
    url: PL,
    price: 1500,
    days: 30,
    styles: "Zaawansowana hatha joga, ashtanga vinyasa, ustawienie, pranajama, medytacja, filozofia jogi, anatomia",
  ...courseFacts("/300-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "300-godzinny kurs nauczycielski jogi", url: PL }])
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
