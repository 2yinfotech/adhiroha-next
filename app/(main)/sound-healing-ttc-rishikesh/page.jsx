import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Sound Healing &amp; Therapy Teacher Training Course in Rishikesh | Adhiroha",
  description: undefined,
  alternates: { canonical: "/sound-healing-ttc-rishikesh/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
