// Root layout for every /sv/ route. It renders the document itself, so
// <html lang="sv"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("sv");

export default function SwedishRootLayout({ children }) {
  return <SiteShell lang="sv">{children}</SiteShell>;
}
