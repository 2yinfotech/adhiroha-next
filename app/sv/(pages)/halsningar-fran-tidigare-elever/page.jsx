// Swedish alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const SV = "/sv/halsningar-fran-tidigare-elever/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "En Hälsning från Våra Tidigare Elever | Adhiroha, Rishikesh",
  description:
    "Adhirohas utexaminerade beskriver med egna ord yogalärarutbildningen i Rishikesh, trädgården, eldaltaret, områdets fem element och lärarna bakom förvandlingen.",
  alternates: {
    canonical: SV,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "sv_SE", url: `${SITE}${SV}`,
    title: "En Hälsning från Våra Tidigare Elever | Adhiroha, Rishikesh",
    description: "Adhirohas utexaminerade beskriver med egna ord yogalärarutbildningen i Rishikesh, trädgården, eldaltaret, områdets fem element och lärarna bakom förvandlingen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "En Hälsning från Våra Tidigare Elever | Adhiroha, Rishikesh",
    description: "Adhirohas utexaminerade beskriver med egna ord yogalärarutbildningen i Rishikesh, trädgården, eldaltaret, områdets fem element och lärarna bakom förvandlingen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Hälsningar från tidigare elever", url: SV }])
);

export default function Page() {
  return (
    <div lang="sv">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
