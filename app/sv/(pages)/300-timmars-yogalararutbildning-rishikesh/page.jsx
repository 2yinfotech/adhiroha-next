// Swedish 300-hour course page — served at /sv/300-timmars-yogalararutbildning-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/300-timmars-yogalararutbildning-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

const sections = [
  { label: "Introduktion", target: "top" },
  { label: "Priser", target: "course-glance" },
  { label: "Ämnen", target: "curriculum" },
  { label: "Dagsrytm", target: "daily-rhythm" },
  { label: "Faciliteter", target: "amenities" },
  { label: "Boende", target: "accommodation" },
  { label: "Lärare", target: "your-teachers" },
  { label: "Omgivning", target: "finding-us" },
  { label: "Kontakt", target: "begin" }
];

export const metadata = {
  title: "300-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
  description:
    "Avancerad 300-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 30 dagar, små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "sv_SE",
    url: `${SITE}${SV}`,
    title: "300-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
    description:
      "Avancerad 300-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 30 dagar, små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "300-Timmars Yogalärarutbildning i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 1500,
    days: 30,
    styles: "Avancerad hatha yoga, ashtanga vinyasa, uppriktning, pranayama, meditation, yogafilosofi, anatomi",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "300-timmars yogalärarutbildning", url: SV }])
);

export default function Page() {
  return (
    <div lang="sv">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
