import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Contact Us | Adhiroha Yoga School, Upper Tapovan, Rishikesh &mdash; WhatsApp, Email &amp; Map",
  description: undefined,
  alternates: { canonical: "/contact-us/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
