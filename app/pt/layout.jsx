// Root layout for every /pt/ route. It renders the document itself, so
// <html lang="pt"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("pt");

export default function PortugueseRootLayout({ children }) {
  return <SiteShell lang="pt">{children}</SiteShell>;
}
