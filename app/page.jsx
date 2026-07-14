import "./_home/styles.css";
import content from "./_home/content";
import scripts from "./_home/scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Adhiroha Yoga School",
  description: undefined,
  alternates: { canonical: "/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
