// Italian Galleria page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-gallery-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-gallery-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const IT = "/it/galleria-yoga-india/";
const EN = "/yoga-gallery-india/";

export const metadata = {
  title: "Galleria Yoga | L'Ashram Adhiroha, Rishikesh",
  description:
    "181 foto autentiche dell'ashram Adhiroha a Upper Tapovan, Rishikesh, la shala, le camere, il cibo, le cerimonie e le persone.",
  alternates: {
    canonical: IT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Galleria Yoga | L'Ashram Adhiroha, Rishikesh",
    description: "181 foto autentiche dell'ashram Adhiroha a Upper Tapovan, Rishikesh, la shala, le camere, il cibo, le cerimonie e le persone.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galleria Yoga | L'Ashram Adhiroha, Rishikesh",
    description: "181 foto autentiche dell'ashram Adhiroha a Upper Tapovan, Rishikesh, la shala, le camere, il cibo, le cerimonie e le persone.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Galleria", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
