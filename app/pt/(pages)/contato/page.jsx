// Portuguese "Contato" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const PT = "/pt/contato/";
const EN = "/contact-us/";

export const metadata = {
  title: "Contato | Adhiroha, Escola de Yoga em Rishikesh",
  description:
    "Fale com o ashram de yoga Adhiroha em Upper Tapovan, Rishikesh. WhatsApp, e-mail ou formulário, quem responde é uma pessoa de verdade, normalmente em até um dia.",
  alternates: {
    canonical: PT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Contato | Adhiroha, Escola de Yoga em Rishikesh",
    description: "Fale com o ashram de yoga Adhiroha em Upper Tapovan, Rishikesh. WhatsApp, e-mail ou formulário, quem responde é uma pessoa de verdade, normalmente em até um dia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | Adhiroha, Escola de Yoga em Rishikesh",
    description: "Fale com o ashram de yoga Adhiroha em Upper Tapovan, Rishikesh. WhatsApp, e-mail ou formulário, quem responde é uma pessoa de verdade, normalmente em até um dia.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Contato", url: PT }])
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
