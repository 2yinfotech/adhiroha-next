// Swedish Ashtanga & Vinyasa course page — served at /sv/ashtanga-vinyasa-yogalararutbildning-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/ashtanga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/ashtanga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/ashtanga-vinyasa-yogalararutbildning-rishikesh/";
const EN = "/ashtanga-teacher-training-course-rishikesh/";

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
  title: "Ashtanga- och Vinyasa-yogalärarutbildning i Rishikesh | 12 Dagar — Adhiroha",
  description:
    "Tolv dagars ashtanga- och vinyasa-yogalärarutbildning i Rishikesh, ackrediterad av Ayushministeriet. Små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "sv_SE",
    url: `${SITE}${SV}`,
    title: "Ashtanga- och Vinyasa-yogalärarutbildning i Rishikesh | 12 Dagar — Adhiroha",
    description:
      "Tolv dagars ashtanga- och vinyasa-yogalärarutbildning i Rishikesh, ackrediterad av Ayushministeriet. Små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashtanga- och Vinyasa-yogalärarutbildning i Rishikesh | 12 Dagar — Adhiroha",
    description: "Tolv dagars ashtanga- och vinyasa-yogalärarutbildning i Rishikesh, ackrediterad av Ayushministeriet. Små grupper, boende i himalayiskt ashram, alla måltider och utflykter ingår.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Ashtanga- och Vinyasa-yogalärarutbildning i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 790,
    days: 14,
    styles: "Ashtanga vinyasa, vinyasaflöde, uppriktning, pranayama, meditation, anatomi, undervisningsmetodik",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Ashtanga- och vinyasalärarutbildning", url: SV }])
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
