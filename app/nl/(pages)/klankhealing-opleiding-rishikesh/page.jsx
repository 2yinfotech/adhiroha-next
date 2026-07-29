// Dutch sound-healing TTC page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/klankhealing-opleiding-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Klankhealing-opleiding in Rishikesh | 6 Dagen — Adhiroha",
  description:
    "Zesdaagse residentiële klankhealing- en therapie-docentenopleiding in Rishikesh — Tibetaanse klankschalen, gongs en Vedische klankwetenschap, niveau 1, 2 en 3. Vanaf € 690 all-inclusive.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Klankhealing-opleiding in Rishikesh | 6 Dagen — Adhiroha",
    description: "Zesdaagse residentiële klankhealing- en therapie-docentenopleiding in Rishikesh — Tibetaanse klankschalen, gongs en Vedische klankwetenschap, niveau 1, 2 en 3. Vanaf € 690 all-inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klankhealing-opleiding in Rishikesh | 6 Dagen — Adhiroha",
    description: "Zesdaagse residentiële klankhealing- en therapie-docentenopleiding in Rishikesh — Tibetaanse klankschalen, gongs en Vedische klankwetenschap, niveau 1, 2 en 3. Vanaf € 690 all-inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Klankhealing- en Therapie-docentenopleiding in Rishikesh",
    description: metadata.description,
    url: NL,
    price: 690,
    days: 6,
    styles: "Tibetaanse klankschalen, gongs, Vedische klankwetenschap, chakrabalans, meditatie",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Klankhealing-opleiding", url: NL }])
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
