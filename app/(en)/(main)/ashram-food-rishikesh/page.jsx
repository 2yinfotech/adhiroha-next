import "./styles.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/seo";

// Split out of the 200/300/500 course pages, where this content was repeated
// word for word on all three. The course pages now carry a short, course-
// specific summary and link here instead.
export const metadata = withOpenGraph({
  title: "Sattvic Food at Our Rishikesh Ashram | Adhiroha Yoga School",
  description:
    "Three sattvic vegetarian meals a day at our Rishikesh ashram, cooked fresh for practice. What is served, how the kitchen works and how dietary needs are handled.",
  alternates: { canonical: "/ashram-food-rishikesh/" }
});

const pageSchema = graph(
  breadcrumbSchema([{ name: "Ashram Food", url: "/ashram-food-rishikesh/" }])
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
