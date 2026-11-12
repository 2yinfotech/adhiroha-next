import { montserrat, playfair } from "../_landing/fonts";
import "../yoga-training-rishikesh/styles.css";
import { buildLanding, landingMetadata } from "../_landing/build";

/**
 * Ad-group landing page, built from /yoga-training-rishikesh/ with this ad
 * group's keywords written in. See app/(lp)/_landing/ for the copy and for why
 * it is generated rather than copied; the render below mirrors the original
 * page.jsx, whose comments explain the script concatenation.
 */

export const metadata = landingMetadata("500-hour-yoga-teacher-training-india");

const { content, scripts } = buildLanding("500-hour-yoga-teacher-training-india");

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
