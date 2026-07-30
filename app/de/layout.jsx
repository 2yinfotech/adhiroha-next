// Root layout for every /de/ route. It renders the document itself, so
// <html lang="de"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("de");

export default function GermanRootLayout({ children }) {
  return <SiteShell lang="de">{children}</SiteShell>;
}
