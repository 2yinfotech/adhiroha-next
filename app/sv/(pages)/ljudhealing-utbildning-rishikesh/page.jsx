// Swedish sound-healing TTC page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const SV = "/sv/ljudhealing-utbildning-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Ljudhealingutbildning i Rishikesh | 6 Dagar — Adhiroha",
  description:
    "Sex dagars ljudhealing- och terapilärarutbildning med boende i Rishikesh — tibetanska klangskålar, gonggonger och vedisk ljudvetenskap, nivå 1, 2 och 3. Från 690 € all-inclusive.",
  alternates: {
    canonical: SV,
    languages: { sv: `${SITE}${SV}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "Ljudhealingutbildning i Rishikesh | 6 Dagar — Adhiroha",
    description: "Sex dagars ljudhealing- och terapilärarutbildning med boende i Rishikesh — tibetanska klangskålar, gonggonger och vedisk ljudvetenskap, nivå 1, 2 och 3. Från 690 € all-inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ljudhealingutbildning i Rishikesh | 6 Dagar — Adhiroha",
    description: "Sex dagars ljudhealing- och terapilärarutbildning med boende i Rishikesh — tibetanska klangskålar, gonggonger och vedisk ljudvetenskap, nivå 1, 2 och 3. Från 690 € all-inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Ljudhealing- och Terapilärarutbildning i Rishikesh",
    description: metadata.description,
    url: SV,
    price: 690,
    days: 6,
    styles: "Tibetanska klangskålar, gonggonger, vedisk ljudvetenskap, chakrabalansering, meditation",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Ljudhealingutbildning", url: SV }])
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
