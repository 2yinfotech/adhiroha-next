// Danish teachers page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/yogalaerere-i-indien/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Vores yogaundervisere i Indien | Adhirohas acharyaer, Rishikesh",
  description:
    "Mød Adhirohas 11 yoga-acharyaer i Rishikesh — kandidater i yogisk videnskab og doktorer i naturmedicin, med over 115 års samlet undervisningserfaring.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Vores yogaundervisere i Indien | Adhirohas acharyaer, Rishikesh",
    description: "Mød Adhirohas 11 yoga-acharyaer i Rishikesh — kandidater i yogisk videnskab og doktorer i naturmedicin, med over 115 års samlet undervisningserfaring.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Vores undervisere", url: DA }])
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
