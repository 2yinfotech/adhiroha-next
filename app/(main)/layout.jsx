// Every page except the homepage shares the main site stylesheet. The homepage
// ships its own self-contained styles, so it lives outside this route group.
import "./adhiroha.min.css";
import "./reveal-fallback.css";

export default function MainLayout({ children }) {
  return children;
}
