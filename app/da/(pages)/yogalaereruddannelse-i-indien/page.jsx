// Danish YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/yogalaereruddannelse-i-indien/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Yogalæreruddannelse i Indien | YTTC 200, 300 og 500 timer i Rishikesh | Adhiroha",
  description:
    "Yogalæreruddannelse i Indien hos Adhiroha, Rishikesh — kurser med ophold på 200, 300 og 500 timer, certificeret af Yoga Alliance. Over 3.000 elever fra mere end 70 lande. Alt inklusive, internationalt anerkendt certificering.",
  keywords: [
    "yogalæreruddannelse i indien",
    "yogalæreruddannelse i rishikesh",
    "200-timers yogalæreruddannelse indien",
    "300-timers yogalæreruddannelse",
    "500-timers yogalæreruddannelse rishikesh",
    "yoga ttc indien",
  ],
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Yogalæreruddannelse i Indien | YTTC 200, 300 og 500 timer i Rishikesh",
    description:
      "Yoga Alliance-certificerede yogalæreruddannelser på 200, 300 og 500 timer i Rishikesh, Indien. Alt inklusive, internationalt anerkendt certificering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogalæreruddannelse i Indien | YTTC 200, 300 og 500 timer i Rishikesh",
    description: "Yoga Alliance-certificerede yogalæreruddannelser på 200, 300 og 500 timer i Rishikesh, Indien. Alt inklusive, internationalt anerkendt certificering.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "200-timers yogalæreruddannelse i Rishikesh, Indien",
    description:
      "200-timers yogalæreruddannelse med ophold, certificeret af Yoga Alliance, i Rishikesh, Indien — grundforløbet for nybegyndere i asana, pranayama, anatomi, filosofi og undervisningspraksis.",
    url: "/da/200-timers-yogalaereruddannelse-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, ashtanga vinyasa og yin yoga",
  }),
  courseSchema({
    name: "300-timers yogalæreruddannelse i Rishikesh, Indien",
    description:
      "Avanceret 300-timers yogalæreruddannelse med ophold i Rishikesh, Indien for dem, der har gennemført 200 timer, og som fuldender vejen til RYT 500.",
    url: "/da/300-timers-yogalaereruddannelse-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, ashtanga vinyasa og opretning",
  }),
  courseSchema({
    name: "500-timers yogalæreruddannelse i Rishikesh, Indien",
    description:
      "500-timers yogalæreruddannelse med ophold i Rishikesh, Indien — den komplette fordybelse på 60 dage, der forener programmerne på 200 og 300 timer, fra nybegynder til masterniveau.",
    url: "/da/500-timers-yogalaereruddannelse-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, ashtanga, yin og opretning",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yogalæreruddannelse i Indien", url: DA }])
);

export default function Page() {
  return (
    <div lang="da">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
