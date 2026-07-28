// Italian Codice di Condotta page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/codice-di-condotta/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Codice di Condotta e Politiche | Adhiroha, Rishikesh",
  description:
    "Consulta il codice di condotta, le regole dell'ashram e le politiche di rimborso e cancellazione della formazione insegnanti di yoga presso Adhiroha, Rishikesh, India.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Codice di Condotta e Politiche | Adhiroha, Rishikesh",
    description: "Consulta il codice di condotta, le regole dell'ashram e le politiche di rimborso e cancellazione della formazione insegnanti di yoga presso Adhiroha, Rishikesh, India.",
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Codice di Condotta", url: IT }])
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
