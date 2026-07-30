// Root layout for every /it/ route. It renders the document itself, so
// <html lang="it"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("it");

export default function ItalianRootLayout({ children }) {
  return <SiteShell lang="it">{children}</SiteShell>;
}
