// French Sonothérapie & soin par le son page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const FR = "/fr/formation-sonotherapie-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Formation en sonothérapie à Rishikesh | Adhiroha",
  description: "Formation de 6 jours en sonothérapie & soin par le son à Rishikesh. Bols tibétains, gongs et science védique du son, accréditée par le Ministry of Ayush.",
  alternates: {
    canonical: FR,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "fr_FR", url: `${SITE}${FR}`,
    title: "Formation en sonothérapie à Rishikesh | Adhiroha",
    description: "Formation de 6 jours en sonothérapie & soin par le son à Rishikesh. Bols tibétains, gongs et science védique du son, accréditée par le Ministry of Ayush.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation en sonothérapie à Rishikesh | Adhiroha",
    description: "Formation de 6 jours en sonothérapie & soin par le son à Rishikesh. Bols tibétains, gongs et science védique du son, accréditée par le Ministry of Ayush.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Formation en sonothérapie & soin par le son à Rishikesh", description: metadata.description, url: FR, price: 690, days: 6, styles: "Bols chantants, gongs, chant de mantras, sonothérapie" , ...courseFacts("/sound-healing-ttc-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formation en sonothérapie", url: FR }])
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
