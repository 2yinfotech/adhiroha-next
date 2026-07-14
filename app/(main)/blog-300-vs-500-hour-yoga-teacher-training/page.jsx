import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "300 vs 500 Hour Yoga Teacher Training: Which Advanced Path Is Right for You? | Adhiroha Journal",
  description: undefined,
  alternates: { canonical: "/blog-300-vs-500-hour-yoga-teacher-training/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
