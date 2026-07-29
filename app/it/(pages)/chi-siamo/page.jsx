// Italian Chi Siamo page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/chi-siamo/";
const EN = "/about-us/";

export const metadata = {
  title: "Chi è Adhiroha | Scuola di Yoga a Rishikesh, India",
  description:
    "Scopri Adhiroha — un ashram yoga certificato Yoga Alliance a Upper Tapovan, Rishikesh, con 20.000 mq di campus e oltre 3.000 studenti formati da più di 70 paesi.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Chi è Adhiroha | Scuola di Yoga a Rishikesh, India",
    description: "Scopri Adhiroha — un ashram yoga certificato Yoga Alliance a Upper Tapovan, Rishikesh, con 20.000 mq di campus e oltre 3.000 studenti formati da più di 70 paesi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi è Adhiroha | Scuola di Yoga a Rishikesh, India",
    description: "Scopri Adhiroha — un ashram yoga certificato Yoga Alliance a Upper Tapovan, Rishikesh, con 20.000 mq di campus e oltre 3.000 studenti formati da più di 70 paesi.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Chi Siamo", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
