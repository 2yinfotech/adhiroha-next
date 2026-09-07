// Polish inner pages share the main site stylesheet + chrome, exactly like the
// English `(main)` route group. The Polish homepage ships its own self-contained
// styles (../_home), so it stays at app/pl/page.jsx, outside this route group.
// Without this layout the inner pages load only their per-page styles.css and
// miss adhiroha.min.css — where the fonts and CSS variables (--cream, --rust,
// --ink, --line …) live — so every var(--…) resolves to nothing and the page
// renders unstyled.
import "../../(en)/(main)/adhiroha.min.css";
import "../../(en)/(main)/reveal-fallback.css";
import StickyHeader from "@/components/StickyHeader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
// Same in-page anchor handling the homepages have: scroll to the section
// without leaving a "#…" behind in the address bar.
import AnchorScroll from "@/components/AnchorScroll";

export default function PolishPagesLayout({ children }) {
  return (
    <>
      {children}
      <StickyHeader />
      <FloatingWhatsApp />
      <AnchorScroll />
    </>
  );
}
