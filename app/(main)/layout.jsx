// Every page except the homepage shares the main site stylesheet. The homepage
// ships its own self-contained styles, so it lives outside this route group.
import "./adhiroha.min.css";
import "./reveal-fallback.css";
import StickyHeader from "@/components/StickyHeader";

export default function MainLayout({ children }) {
  return (
    <>
      {children}
      <StickyHeader />
    </>
  );
}
