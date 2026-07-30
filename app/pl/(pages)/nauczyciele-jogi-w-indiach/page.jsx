// Polish teachers page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, teacherSchemas, hreflangFor } from "@/lib/seo";

const PL = "/pl/nauczyciele-jogi-w-indiach/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Nasi Nauczyciele Jogi w Indiach | Aczarjowie Adhiroha, Riszikeś",
  description:
    "Poznaj 11 aczarjów jogi Adhiroha w Riszikeś — magistrów nauk jogicznych i doktorów naturopatii, z ponad 115 latami łącznego doświadczenia w nauczaniu.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Nasi Nauczyciele Jogi w Indiach | Aczarjowie Adhiroha, Riszikeś",
    description: "Poznaj 11 aczarjów jogi Adhiroha w Riszikeś — magistrów nauk jogicznych i doktorów naturopatii, z ponad 115 latami łącznego doświadczenia w nauczaniu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasi Nauczyciele Jogi w Indiach | Aczarjowie Adhiroha, Riszikeś",
    description: "Poznaj 11 aczarjów jogi Adhiroha w Riszikeś — magistrów nauk jogicznych i doktorów naturopatii, z ponad 115 latami łącznego doświadczenia w nauczaniu.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...teacherSchemas("pl"),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Nasi instruktorzy", url: PL }])
);

export default function Page() {
  return (
    <div lang="pl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
