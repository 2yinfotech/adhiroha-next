// Root layout for every /es/ route. It renders the document itself, so
// <html lang="es"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("es");

export default function SpanishRootLayout({ children }) {
  return <SiteShell lang="es">{children}</SiteShell>;
}
