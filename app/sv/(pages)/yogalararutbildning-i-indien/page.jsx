// Swedish YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/yogalararutbildning-i-indien/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Yogalärarutbildning i Indien | YTTC 200, 300 och 500 Timmar i Rishikesh | Adhiroha",
  description:
    "Yogalärarutbildning i Indien hos Adhiroha, Rishikesh — internatbaserade kurser på 200, 300 och 500 timmar, certifierade av Yoga Alliance. Över 3 000 elever från mer än 70 länder. All-inclusive-pris, internationellt erkänd certifiering.",
  keywords: [
    "yogalärarutbildning i indien",
    "yogalärarutbildning i rishikesh",
    "200-timmars yogalärarutbildning indien",
    "300-timmars yogalärarutbildning",
    "500-timmars yogalärarutbildning rishikesh",
    "yoga ttc indien",
  ],
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Yogalärarutbildning i Indien | YTTC 200, 300 och 500 Timmar i Rishikesh",
    description:
      "Yoga Alliance-certifierade yogalärarutbildningar på 200, 300 och 500 timmar i Rishikesh, Indien. All-inclusive, internationellt erkänd certifiering.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "200-Timmars Yogalärarutbildning i Rishikesh, Indien",
    description:
      "Internatbaserad 200-timmars yogalärarutbildning certifierad av Yoga Alliance i Rishikesh, Indien — grunden för nybörjare i asana, pranayama, anatomi, filosofi och undervisningspraktik.",
    url: "/sv/200-timmars-yogalararutbildning-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, ashtanga vinyasa och yinyoga",
  }),
  courseSchema({
    name: "300-Timmars Yogalärarutbildning i Rishikesh, Indien",
    description:
      "Avancerad internatbaserad 300-timmars yogalärarutbildning i Rishikesh, Indien för dem som gått 200 timmar, och som fullbordar vägen till RYT 500.",
    url: "/sv/300-timmars-yogalararutbildning-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, ashtanga vinyasa och uppriktning",
  }),
  courseSchema({
    name: "500-Timmars Yogalärarutbildning i Rishikesh, Indien",
    description:
      "Internatbaserad 500-timmars yogalärarutbildning i Rishikesh, Indien — den kompletta 60-dagars fördjupningen som förenar programmen på 200 och 300 timmar, från nybörjare till masternivå.",
    url: "/sv/500-timmars-yogalararutbildning-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, ashtanga, yin och uppriktning",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yogalärarutbildning i Indien", url: SV }])
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
