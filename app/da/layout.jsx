// Root layout for every /da/ route. It renders the document itself, so
// <html lang="da"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("da");

export default function DanishRootLayout({ children }) {
  return <SiteShell lang="da">{children}</SiteShell>;
}
