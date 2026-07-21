import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Yoga Gallery | The Adhiroha Ashram, Rishikesh",
  description:
    "See the Adhiroha ashram in Rishikesh — the yoga shala, rooms, dining hall, Ganga ghat sessions and Himalayan surroundings, in photographs.",
  alternates: { canonical: "/yoga-gallery-india/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Gallery", url: "/yoga-gallery-india/" }])
);


export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
