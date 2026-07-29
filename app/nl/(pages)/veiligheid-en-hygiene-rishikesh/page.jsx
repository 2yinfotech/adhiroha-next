// Dutch safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const NL = "/nl/veiligheid-en-hygiene-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Veiligheid en Hygiëne | Yoga-ashram Adhiroha, Rishikesh",
  description:
    "24/7 cameratoezicht, een ommuurd terrein, luchthavenpick-up inbegrepen en extra zorg voor vrouwen die alleen reizen — zo regelt Adhiroha veiligheid en hygiëne in Rishikesh.",
  alternates: {
    canonical: NL,
    languages: { nl: `${SITE}${NL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Veiligheid en Hygiëne | Yoga-ashram Adhiroha, Rishikesh",
    description: "24/7 cameratoezicht, een ommuurd terrein, luchthavenpick-up inbegrepen en extra zorg voor vrouwen die alleen reizen — zo regelt Adhiroha veiligheid en hygiëne in Rishikesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veiligheid en Hygiëne | Yoga-ashram Adhiroha, Rishikesh",
    description: "24/7 cameratoezicht, een ommuurd terrein, luchthavenpick-up inbegrepen en extra zorg voor vrouwen die alleen reizen — zo regelt Adhiroha veiligheid en hygiëne in Rishikesh.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Veiligheid en hygiëne", url: NL }])
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
