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
  title: "Excursions & Cultural Life in Rishikesh | Adhiroha Yoga School",
  description:
    "The Ganga aarti, Himalayan waterfalls, Vashistha cave and the temples around Rishikesh. The excursions and cultural life included with every Adhiroha course.",
  alternates: { canonical: "/excursions-rishikesh/" }
});

const pageSchema = graph(
  breadcrumbSchema([{ name: "Excursions", url: "/excursions-rishikesh/" }])
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
