import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Why the 500 Hour Yoga Teacher Training Is Worth Two Months of Your Life | Adhiroha Journal",
  description: undefined,
  alternates: { canonical: "/blog-500-hour-yoga-teacher-training-worth-it/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
