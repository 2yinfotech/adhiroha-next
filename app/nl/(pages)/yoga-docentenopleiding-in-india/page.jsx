// Dutch YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/yoga-docentenopleiding-in-india/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Yoga-docentenopleiding in India | YTTC 200, 300 en 500 Uur in Rishikesh | Adhiroha",
  description:
    "Yoga-docentenopleiding in India bij Adhiroha, Rishikesh — residentiële cursussen van 200, 300 en 500 uur, gecertificeerd door Yoga Alliance. Meer dan 3.000 studenten uit ruim 70 landen. All-inclusive prijs, internationaal erkende certificering.",
  keywords: [
    "yoga-docentenopleiding in india",
    "yoga-docentenopleiding in rishikesh",
    "200-uur yoga-docentenopleiding india",
    "300-uur yoga-docentenopleiding",
    "500-uur yoga-docentenopleiding rishikesh",
    "yoga ttc india",
  ],
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Yoga-docentenopleiding in India | YTTC 200, 300 en 500 Uur in Rishikesh",
    description:
      "Door Yoga Alliance gecertificeerde yoga-docentenopleidingen van 200, 300 en 500 uur in Rishikesh, India. All-inclusive, internationaal erkende certificering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoga-docentenopleiding in India | YTTC 200, 300 en 500 Uur in Rishikesh",
    description: "Door Yoga Alliance gecertificeerde yoga-docentenopleidingen van 200, 300 en 500 uur in Rishikesh, India. All-inclusive, internationaal erkende certificering.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "200-Uur Yoga-docentenopleiding in Rishikesh, India",
    description:
      "Residentiële 200-uur yoga-docentenopleiding met Yoga Alliance-certificering in Rishikesh, India — de basis voor beginners in asana, pranayama, anatomie, filosofie en lespraktijk.",
    url: "/nl/200-uur-yoga-docentenopleiding-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, ashtanga vinyasa en yin yoga",
  }),
  courseSchema({
    name: "300-Uur Yoga-docentenopleiding in Rishikesh, India",
    description:
      "Gevorderde residentiële 300-uur yoga-docentenopleiding in Rishikesh, India voor afgestudeerden van 200 uur, die het pad naar RYT 500 voltooit.",
    url: "/nl/300-uur-yoga-docentenopleiding-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, ashtanga vinyasa en uitlijning",
  }),
  courseSchema({
    name: "500-Uur Yoga-docentenopleiding in Rishikesh, India",
    description:
      "Residentiële 500-uur yoga-docentenopleiding in Rishikesh, India — de complete onderdompeling van 60 dagen die het programma van 200 en 300 uur combineert, van beginner tot masterniveau.",
    url: "/nl/500-uur-yoga-docentenopleiding-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, ashtanga, yin en uitlijning",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yoga-docentenopleiding in India", url: NL }])
);

export default function Page() {
  return (
    <div lang="nl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
