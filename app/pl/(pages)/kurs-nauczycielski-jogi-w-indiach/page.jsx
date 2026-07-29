// Polish YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PL = "/pl/kurs-nauczycielski-jogi-w-indiach/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Kurs Nauczycielski Jogi w Indiach | YTTC 200, 300 i 500 Godzin w Riszikeś | Adhiroha",
  description:
    "Kurs nauczycielski jogi w Indiach w Adhiroha, Riszikeś — stacjonarne kursy 200, 300 i 500 godzin z certyfikatem Yoga Alliance. Ponad 3000 uczniów z przeszło 70 krajów. Opłata all inclusive, certyfikat uznawany na całym świecie.",
  keywords: [
    "kurs nauczycielski jogi w indiach",
    "kurs nauczycielski jogi w riszikeś",
    "200-godzinny kurs nauczycielski jogi indie",
    "300-godzinny kurs nauczycielski jogi",
    "500-godzinny kurs nauczycielski jogi riszikeś",
    "yoga ttc indie",
  ],
  alternates: {
    canonical: PL,
    languages: { pl: `${SITE}${PL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Kurs Nauczycielski Jogi w Indiach | YTTC 200, 300 i 500 Godzin w Riszikeś",
    description:
      "Certyfikowane przez Yoga Alliance kursy nauczycielskie jogi 200, 300 i 500 godzin w Riszikeś w Indiach. All inclusive, certyfikat uznawany na całym świecie.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "200-Godzinny Kurs Nauczycielski Jogi w Riszikeś, Indie",
    description:
      "Stacjonarny 200-godzinny kurs nauczycielski jogi z certyfikatem Yoga Alliance w Riszikeś w Indiach — fundament dla początkujących: asany, pranajama, anatomia, filozofia i praktyka nauczania.",
    url: "/pl/200-godzinny-kurs-nauczycielski-jogi-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, ashtanga vinyasa i yin joga",
  }),
  courseSchema({
    name: "300-Godzinny Kurs Nauczycielski Jogi w Riszikeś, Indie",
    description:
      "Zaawansowany, stacjonarny 300-godzinny kurs nauczycielski jogi w Riszikeś w Indiach dla absolwentów kursu 200-godzinnego, dopełniający ścieżkę RYT 500.",
    url: "/pl/300-godzinny-kurs-nauczycielski-jogi-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, ashtanga vinyasa i ustawienie",
  }),
  courseSchema({
    name: "500-Godzinny Kurs Nauczycielski Jogi w Riszikeś, Indie",
    description:
      "Stacjonarny 500-godzinny kurs nauczycielski jogi w Riszikeś w Indiach — pełne 60-dniowe zanurzenie łączące program 200 i 300 godzin, od poziomu początkującego po mistrzowski.",
    url: "/pl/500-godzinny-kurs-nauczycielski-jogi-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, ashtanga, yin i ustawienie",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kurs nauczycielski jogi w Indiach", url: PL }])
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
