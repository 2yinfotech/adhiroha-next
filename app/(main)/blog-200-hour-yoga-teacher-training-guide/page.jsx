import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "The Complete Guide to Your 200 Hour Yoga Teacher Training in Rishikesh | Adhiroha Journal",
  description: undefined,
  alternates: { canonical: "/blog-200-hour-yoga-teacher-training-guide/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
