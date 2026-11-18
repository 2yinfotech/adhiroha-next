import "./styles.css";
import { withOpenGraph } from "@/lib/root-metadata";
import rawContent from "./content";
import { withBatchTable, upcomingBatches } from "@/lib/batches";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

// The batch table is rendered here, not by scripts.js after load, so the
// dates are in the HTML. Revalidated daily so the months roll forward.
export const revalidate = 86400;
const content = rawContent;
const renderedContent = () => withBatchTable(rawContent, "200", "en");

const sections = [
  { label: "Intro", target: "top" },
  { label: "Fees", target: "course-glance" },
  { label: "Subject", target: "curriculum" },
  { label: "Daily Schedule", target: "daily-rhythm" },
  { label: "Amenities", target: "amenities" },
  { label: "Accommodation", target: "accommodation" },
  { label: "Teachers", target: "your-teachers" },
  { label: "Surrounding", target: "finding-us" },
  { label: "Contact Us", target: "begin" }
];

export const metadata = withOpenGraph({
  title: "200 Hour Yoga Teacher Training in Rishikesh | RYT 200",
  description:
    "Yoga Alliance registered 200 hour yoga teacher training in Rishikesh. 24 days, small groups, residential Himalayan stay, all meals and excursions included.",
  alternates: { canonical: "/200-hour-yoga-teacher-training-course-rishikesh/", languages: hreflangFor("/200-hour-yoga-teacher-training-course-rishikesh/") }
}, { type: "article" });

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = () => graph(
  ...studentVideoSchemas(),
    courseSchema({
    batches: upcomingBatches("200", 6),
      name: "200 Hour Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/200-hour-yoga-teacher-training-course-rishikesh/",
      price: 1275,
      days: 24,
      styles: "Hatha yoga, Ashtanga vinyasa, pranayama, meditation, yoga philosophy, anatomy, teaching methodology",
    ...courseFacts("/200-hour-yoga-teacher-training-course-rishikesh/")}),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "200 Hour Yoga Teacher Training", url: "/200-hour-yoga-teacher-training-course-rishikesh/" }])
);


export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema()} />
      <div dangerouslySetInnerHTML={{ __html: renderedContent() }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </>
  );
}
