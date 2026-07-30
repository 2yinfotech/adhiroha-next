// Swedish 500-hour course page — served at /sv/500-timmars-yogalararutbildning-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(en)/(main)/500-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/500-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

const SV = "/sv/500-timmars-yogalararutbildning-rishikesh/";
const EN = "/500-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "500-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
  description:
    "500-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 60 dagar, från grund till avancerat, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "sv_SE",
    url: `${SITE}${SV}`,
    title: "500-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
    description:
      "500-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 60 dagar, från grund till avancerat, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  },
  twitter: {
    card: "summary_large_image",
    title: "500-Timmars Yogalärarutbildning i Rishikesh | Adhiroha",
    description: "500-timmars yogalärarutbildning i Rishikesh, certifierad av Yoga Alliance. 60 dagar, från grund till avancerat, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...studentVideoSchemas(),
  courseSchema({
    name: "500-Timmars Yogalärarutbildning i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 2790,
    days: 60,
    styles: "Hatha yoga, ashtanga vinyasa, yin, uppriktning, pranayama, meditation, yogafilosofi, anatomi",
  ...courseFacts("/500-hour-yoga-teacher-training-course-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "500-timmars yogalärarutbildning", url: SV }])
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
