import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Safety & Hygiene at Our Rishikesh Ashram | Adhiroha",
  description:
    "How Adhiroha keeps students safe and well in Rishikesh — clean ensuite rooms, RO drinking water, hygienic sattvic kitchen and 24/7 on-site support.",
  alternates: { canonical: "/safety-hygiene-in-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Safety & Hygiene", url: "/safety-hygiene-in-rishikesh/" }])
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
