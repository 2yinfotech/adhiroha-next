// Portuguese sound-healing TTC page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PT = "/pt/formacao-em-terapia-sonora-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Formação em Terapia Sonora em Rishikesh | 6 Dias — Adhiroha",
  description:
    "Formação residencial de professor em terapia e cura sonora de seis dias em Rishikesh — taças cantantes tibetanas, gongos e ciência védica do som, níveis 1, 2 e 3. A partir de € 690 com tudo incluído.",
  alternates: {
    canonical: PT,
    languages: { pt: `${SITE}${PT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Formação em Terapia Sonora em Rishikesh | 6 Dias — Adhiroha",
    description: "Formação residencial de professor em terapia e cura sonora de seis dias em Rishikesh — taças cantantes tibetanas, gongos e ciência védica do som, níveis 1, 2 e 3. A partir de € 690 com tudo incluído.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formação de Professor em Terapia e Cura Sonora em Rishikesh",
    description: metadata.description,
    url: PT,
    price: 690,
    days: 6,
    styles: "Taças cantantes tibetanas, gongos, ciência védica do som, equilíbrio dos chakras, meditação",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formação em terapia sonora", url: PT }])
);

export default function Page() {
  return (
    <div lang="pt">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
