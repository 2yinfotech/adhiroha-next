import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Blog | The Adhiroha Journal &mdash; Yoga Teacher Training, Honestly Written",
  description: undefined,
  alternates: { canonical: "/blogs/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
