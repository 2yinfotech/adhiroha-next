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
  title: "Ashram Accommodation in Rishikesh | Rooms & Facilities | Adhiroha",
  description:
    "Where you stay during a yoga teacher training in Rishikesh: ensuite twin and triple rooms, hot water, the shala, library and gardens across three green acres.",
  alternates: { canonical: "/ashram-accommodation-rishikesh/" }
});

const pageSchema = graph(
  breadcrumbSchema([{ name: "Ashram Accommodation", url: "/ashram-accommodation-rishikesh/" }])
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
