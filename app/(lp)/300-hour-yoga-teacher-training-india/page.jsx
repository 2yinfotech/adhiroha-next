import { Montserrat, Playfair_Display } from "next/font/google";
import "../yoga-training-rishikesh/styles.css";
import { buildLanding, landingMetadata } from "../_landing/build";

/**
 * Ad-group landing page, built from /yoga-training-rishikesh/ with this ad
 * group's keywords written in. See app/(lp)/_landing/ for the copy and for why
 * it is generated rather than copied; the render below mirrors the original
 * page.jsx, whose comments explain the script concatenation.
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

export const metadata = landingMetadata("300-hour-yoga-teacher-training-india");

const { content, scripts } = buildLanding("300-hour-yoga-teacher-training-india");

export default function Page() {
  return (
    <div className={`${montserrat.variable} ${playfair.variable}`}>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `${content}\n<script>${scripts.replace(/<\//g, "<\\/")}</script>`,
        }}
      />
    </div>
  );
}
