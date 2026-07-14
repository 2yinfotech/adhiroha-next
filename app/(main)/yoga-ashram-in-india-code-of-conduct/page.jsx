import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Code of Conduct &amp; Policies | Adhiroha Yoga Ashram in Rishikesh, India",
  description: undefined,
  alternates: { canonical: "/yoga-ashram-in-india-code-of-conduct/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
