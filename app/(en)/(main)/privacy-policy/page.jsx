import "./styles.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, hreflangFor } from "@/lib/seo";

export const metadata = withOpenGraph({
  title: "Privacy Policy | Adhiroha Yoga School, Rishikesh",
  description:
    "How Adhiroha Yoga School collects, uses and safeguards your personal information when you enquire about or enrol on a Yoga Teacher Training Course in Rishikesh.",
  alternates: { canonical: "/privacy-policy/", languages: hreflangFor("/privacy-policy/") }
});

const pageSchema = graph(
  breadcrumbSchema([{ name: "Privacy Policy", url: "/privacy-policy/" }])
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
