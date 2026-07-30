import { Suspense } from "react";
import "./styles.css";
import "./thankyou.css";
import { BEFORE, AFTER } from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import BookingConfirmation from "@/components/BookingConfirmation";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Booking Confirmed | Adhiroha Yoga School, Rishikesh",
  description:
    "Your place on a yoga teacher training at Adhiroha Yoga School in Rishikesh is reserved. Here is your booking reference and what happens next.",
  alternates: { canonical: "/thank-you/" },
  // A per-booking confirmation page has no search value and must not be indexed.
  robots: { index: false, follow: true },
};

const pageSchema = graph(breadcrumbSchema([{ name: "Booking Confirmed", url: "/thank-you/" }]));

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: BEFORE }} />
      {/* Reads the booking details from the query string, so it must be client-side
          and wrapped in Suspense for static rendering. */}
      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <BookingConfirmation />
      </Suspense>
      <div dangerouslySetInnerHTML={{ __html: AFTER }} />
      <PageScripts code={scripts} />
    </>
  );
}
