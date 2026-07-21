import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Code of Conduct & Policies | Adhiroha, Rishikesh",
  description:
    "Read the code of conduct, ashram rules, refund and cancellation policies for yoga teacher training courses at Adhiroha in Rishikesh, India.",
  alternates: { canonical: "/yoga-ashram-in-india-code-of-conduct/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Code of Conduct", url: "/yoga-ashram-in-india-code-of-conduct/" }])
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
