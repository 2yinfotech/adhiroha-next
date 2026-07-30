// Root layout for every /nl/ route. It renders the document itself, so
// <html lang="nl"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("nl");

export default function DutchRootLayout({ children }) {
  return <SiteShell lang="nl">{children}</SiteShell>;
}
