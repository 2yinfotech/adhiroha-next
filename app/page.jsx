import "./_home/styles.css";
import content from "./_home/content";
import scripts from "./_home/scripts";
import PageScripts from "@/components/PageScripts";
import StickyHeader from "@/components/StickyHeader";

export const metadata = {
  title: "Adhiroha Yoga School",
  description: undefined,
  alternates: { canonical: "/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* Same dedicated header-scroll handler the sub-pages use, so the homepage
          header reliably gets its scrolled background and hides on scroll-down
          even if the page's own inline script blob fails to run. */}
      <StickyHeader />
      <PageScripts code={scripts} />
    </>
  );
}
