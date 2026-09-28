// German Über uns page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DE = "/de/ueber-uns/";
const EN = "/about-us/";

export const metadata = {
  title: "Über Adhiroha | Yogaschule in Rishikesh, Indien",
  description: "Lerne Adhiroha kennen, eine Yoga-Alliance-zertifizierte Yogaschule in Upper Tapovan, Rishikesh, mit erfahrenen indischen Acharyas und kleinen Gruppen.",
  alternates: {
    canonical: DE,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Über Adhiroha | Yogaschule in Rishikesh, Indien", description: "Lerne Adhiroha kennen, eine Yoga-Alliance-zertifizierte Yogaschule in Upper Tapovan, Rishikesh, mit erfahrenen indischen Acharyas und kleinen Gruppen.",
    images: [{ url: "/img/adhiroha-og.jpg", width: 1200, height: 630, alt: "Adhiroha Yoga School" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über Adhiroha | Yogaschule in Rishikesh, Indien",
    description: "Lerne Adhiroha kennen, eine Yoga-Alliance-zertifizierte Yogaschule in Upper Tapovan, Rishikesh, mit erfahrenen indischen Acharyas und kleinen Gruppen.",
    images: ["/img/adhiroha-og.jpg"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Über uns", url: DE }])
);

export default function Page() {
  return (
    <div lang="de">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
