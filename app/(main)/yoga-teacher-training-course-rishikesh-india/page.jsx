import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Yoga Teacher Training in India | 200, 300 & 500 Hour YTTC in Rishikesh | Adhiroha",
  description:
    "Yoga teacher training in India at Adhiroha, Rishikesh — Yoga Alliance certified 200, 300 & 500 hour residential courses. 3,000+ students from 70+ countries. All-inclusive fees, internationally recognised certification.",
  keywords: [
    "yoga teacher training in india",
    "yoga teacher training in rishikesh",
    "200 hour yoga teacher training india",
    "300 hour yoga teacher training",
    "500 hour yoga teacher training rishikesh",
    "yoga ttc india",
  ],
  alternates: { canonical: "/yoga-teacher-training-course-rishikesh-india/" },
  openGraph: {
    title: "Yoga Teacher Training in India | 200, 300 & 500 Hour YTTC in Rishikesh",
    description:
      "Yoga Alliance certified 200, 300 & 500 hour residential yoga teacher training in Rishikesh, India. All-inclusive, internationally recognised certification.",
    url: "/yoga-teacher-training-course-rishikesh-india/",
    type: "website",
  },
};

// Structured data: a Course node per YTTC (prices/days match the visible course
// pages), the FAQs parsed from this page's own markup, and breadcrumbs.
const pageSchema = graph(
  courseSchema({
    name: "200 Hour Yoga Teacher Training in Rishikesh, India",
    description:
      "Residential 200 hour Yoga Alliance certified yoga teacher training course in Rishikesh, India — the beginner-friendly foundation in asana, pranayama, anatomy, philosophy and teaching practice.",
    url: "/200-hour-yoga-teacher-training-course-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, Ashtanga Vinyasa and Yin yoga",
  }),
  courseSchema({
    name: "300 Hour Yoga Teacher Training in Rishikesh, India",
    description:
      "Residential 300 hour advanced yoga teacher training course in Rishikesh, India for 200-hour graduates, completing the RYT 500 pathway.",
    url: "/300-hour-yoga-teacher-training-course-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, Ashtanga Vinyasa and Alignment",
  }),
  courseSchema({
    name: "500 Hour Yoga Teacher Training in Rishikesh, India",
    description:
      "Residential 500 hour yoga teacher training course in Rishikesh, India — the complete 60-day immersion combining the 200 and 300 hour syllabus, from beginner to master level.",
    url: "/500-hour-yoga-teacher-training-course-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, Ashtanga, Yin and Alignment",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yoga Teacher Training in India", url: "/yoga-teacher-training-course-rishikesh-india/" }])
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
