// Danish safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/sikkerhed-og-hygiejne-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Sikkerhed og hygiejne | Yogaashrammet Adhiroha, Rishikesh",
  description:
    "Sikkerhed, hygiejne og rejselogistik på Adhiroha i Rishikesh — videoovervågning døgnet rundt, indhegnet område, lufthavnsafhentning inkluderet og særlig omsorg for kvinder, der rejser alene.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Sikkerhed og hygiejne | Yogaashrammet Adhiroha, Rishikesh",
    description: "Sikkerhed, hygiejne og rejselogistik på Adhiroha i Rishikesh — videoovervågning døgnet rundt, indhegnet område, lufthavnsafhentning inkluderet og særlig omsorg for kvinder, der rejser alene.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikkerhed og hygiejne | Yogaashrammet Adhiroha, Rishikesh",
    description: "Sikkerhed, hygiejne og rejselogistik på Adhiroha i Rishikesh — videoovervågning døgnet rundt, indhegnet område, lufthavnsafhentning inkluderet og særlig omsorg for kvinder, der rejser alene.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sikkerhed og hygiejne", url: DA }])
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
