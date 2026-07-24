// French Sonothérapie & soin par le son page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/fr/formation-sonotherapie-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Formation en sonothérapie à Rishikesh | Adhiroha",
  description: "Formation de 6 jours en sonothérapie & soin par le son à Rishikesh. Bols tibétains, gongs et science védique du son, accréditée par le Ministry of Ayush.",
  alternates: {
    canonical: DE,
    languages: { fr: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${DE}`,
    title: "Formation en sonothérapie à Rishikesh | Adhiroha",
    description: "Formation de 6 jours en sonothérapie & soin par le son à Rishikesh. Bols tibétains, gongs et science védique du son, accréditée par le Ministry of Ayush.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formation en sonothérapie & soin par le son à Rishikesh", description: metadata.description, url: DE, price: 690, days: 6, styles: "Bols chantants, gongs, chant de mantras, sonothérapie" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formation en sonothérapie", url: DE }])
);

export default function Page() {
  return (
    <div lang="fr">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
