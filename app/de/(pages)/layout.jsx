// German inner pages share the main site stylesheet + chrome, exactly like the
// English `(main)` route group. The German homepage ships its own self-contained
// styles (../_home), so it stays at app/de/page.jsx, outside this route group.
// Without this layout the inner pages load only their per-page styles.css and
// miss adhiroha.min.css — where the fonts and CSS variables (--cream, --rust,
// --ink, --line …) live — so every var(--…) resolves to nothing and the page
// renders unstyled.
import "../../(main)/adhiroha.min.css";
import "../../(main)/reveal-fallback.css";
import StickyHeader from "@/components/StickyHeader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function GermanPagesLayout({ children }) {
  return (
    <>
      {children}
      <StickyHeader />
      <FloatingWhatsApp />
    </>
  );
}
