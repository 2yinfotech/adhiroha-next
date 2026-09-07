// Every page except the homepage shares the main site stylesheet. The homepage
// ships its own self-contained styles, so it lives outside this route group.
import "./adhiroha.min.css";
import "./reveal-fallback.css";
import StickyHeader from "@/components/StickyHeader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
// Same in-page anchor handling the homepages have: scroll to the section
// without leaving a "#…" behind in the address bar.
import AnchorScroll from "@/components/AnchorScroll";

export default function MainLayout({ children }) {
  return (
    <>
      {children}
      <StickyHeader />
      <FloatingWhatsApp />
      <AnchorScroll />
    </>
  );
}
