import { Montserrat, Playfair_Display } from "next/font/google";
import "./styles.css";
import content from "./content";
import scripts from "./scripts";

/**
 * Yoga Training in Rishikesh — paid-campaign landing page.
 *
 * A port of the standalone yoga-training-rishikesh.php document: same copy,
 * same layout, same compiled-Tailwind stylesheet, same two-step enquiry modal.
 * It sits under app/(lp)/ with the other ads pages, so it inherits that
 * layout's noindex, its GTM container, the consent banner and the Meta pixel,
 * and it renders none of the site chrome.
 *
 * Two things are deliberately not like the original:
 *
 *   · The fonts are self-hosted through next/font instead of two render-blocking
 *     requests to fonts.googleapis.com. The generated family names arrive as the
 *     CSS variables the stylesheet now names first in every stack.
 *
 *   · There is deliberately no <link rel="preload"> for the hero. One was tried
 *     and removed: React 19 hoists a rendered <link> into <head> on the server
 *     while the client tree still holds it in the body, which is a hydration
 *     mismatch. It bought nothing anyway — the first carousel slide is the
 *     second <img> in the document, is not lazy, and already carries
 *     fetchpriority="high", so the preload scanner reaches it immediately.
 *
 *   · The page's own script is appended to the end of the markup blob rather
 *     than run through <PageScripts>. PageScripts runs inside a useEffect, so
 *     nothing would be bound until React had hydrated — and every call to
 *     action here is an inline onclick="openModal()", so a visitor tapping
 *     "Enquire Now" during those seconds would get nothing at all. Inside the
 *     blob it executes during parse, exactly as it did at the end of the .php's
 *     <body>, and every element it looks up already exists.
 *
 *     It is concatenated into the same dangerouslySetInnerHTML string instead of
 *     being rendered as its own <script> element for a specific reason: a script
 *     node in the returned tree made React report a hydration mismatch on every
 *     load ("some attributes of the server rendered HTML didn't match the client
 *     properties"). Server, client and module were verified byte-identical, so
 *     the content was never the problem — removing the script node from the tree
 *     is what silences it. Concatenated here, React never tracks the node.
 */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Yoga Training in Rishikesh | Adhiroha Yoga Ashram",
  description:
    "Join Adhiroha for the best yoga teacher training in Rishikesh. Our internationally certified yoga courses in Rishikesh offer transformative experiences.",
  // No canonical and no hreflang on purpose: the layout marks this page
  // noindex, so it must not advertise itself as a page worth indexing.
};

export default function Page() {
  return (
    <div className={`${montserrat.variable} ${playfair.variable}`}>
      {/* The script closes the blob, so every id it looks up is already parsed.
          `</` is escaped because an unescaped closing tag inside the source
          would end the <script> element early and dump the rest as text. */}
      {/* suppressHydrationWarning because this subtree is deliberately touched
          outside React: the script above runs during parse and initialises the
          carousel — a transform on the track, an .active class on an indicator —
          before hydration begins. React's development-only check re-reads the
          DOM for a dangerouslySetInnerHTML node and reports those edits as a
          mismatch. Server, client and module were verified byte-identical, and
          a production build emits no warning at all; this silences the dev
          false positive without changing what ships. */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `${content}\n<script>${scripts.replace(/<\//g, "<\\/")}</script>`,
        }}
      />
    </div>
  );
}
