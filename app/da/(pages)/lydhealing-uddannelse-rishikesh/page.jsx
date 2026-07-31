// Danish sound-healing TTC page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const DA = "/da/lydhealing-uddannelse-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Lydhealing-uddannelse i Rishikesh | 6 dage | Adhiroha",
  description:
    "Seks dages læreruddannelse i lydhealing og -terapi med ophold i Rishikesh, tibetanske syngeskåle, gonger og vedisk lydvidenskab, niveau 1, 2 og 3. Fra 690 € alt inklusive.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Lydhealing-uddannelse i Rishikesh | 6 dage | Adhiroha",
    description: "Seks dages læreruddannelse i lydhealing og -terapi med ophold i Rishikesh, tibetanske syngeskåle, gonger og vedisk lydvidenskab, niveau 1, 2 og 3. Fra 690 € alt inklusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lydhealing-uddannelse i Rishikesh | 6 dage | Adhiroha",
    description: "Seks dages læreruddannelse i lydhealing og -terapi med ophold i Rishikesh, tibetanske syngeskåle, gonger og vedisk lydvidenskab, niveau 1, 2 og 3. Fra 690 € alt inklusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Læreruddannelse i lydhealing og -terapi i Rishikesh",
    description: metadata.description,
    url: DA,
    price: 690,
    days: 6,
    styles: "Tibetanske syngeskåle, gonger, vedisk lydvidenskab, chakrabalancering, meditation",
  ...courseFacts("/sound-healing-ttc-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Lydhealing-uddannelse", url: DA }])
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
