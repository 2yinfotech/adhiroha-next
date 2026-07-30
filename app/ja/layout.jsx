// Root layout for every /ja/ route. It renders the document itself, so
// <html lang="ja"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("ja");

export default function JapaneseRootLayout({ children }) {
  return <SiteShell lang="ja">{children}</SiteShell>;
}
