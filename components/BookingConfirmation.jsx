"use client";

import { useSearchParams } from "next/navigation";

// Post-registration confirmation, shown at /thank-you/ after the admission panel
// finishes. The old PHP panel redirected to thank-you.php?view_id=…&acco=…&room=…;
// this is the same idea with the booking details passed on the query string.
//
// Query params: code (booking reference, comma-separated for group bookings),
// name, course, dates, acco, paid (amount), method, payment (gateway id),
// balance, pending ("1" when the seat is held but payment is still to come).
export default function BookingConfirmation() {
  const sp = useSearchParams();

  const get = (k) => (sp.get(k) || "").trim();
  const codes = get("code").split(",").map((c) => c.trim()).filter(Boolean);
  const names = get("name").split(",").map((c) => c.trim()).filter(Boolean);
  const course = get("course");
  const dates = get("dates");
  const acco = get("acco");
  const balance = get("balance");
  const paid = get("paid");
  const method = get("method");
  const paymentId = get("payment");
  const pending = get("pending") === "1";

  // Landing here directly (no params) still needs to look intentional.
  const hasBooking = codes.length > 0 || !!course;

  return (
    <section className="pad band-cream" id="reach-us">
      <div className="wrap">

        <div className="ty-head reveal">
          <span className="kicker">{pending ? "Almost There" : "Booking Confirmed"}</span>
          <h2 className="sec-h wide">
            {pending ? "Your details are saved" : "Thank you — we have your registration"}
          </h2>
          <p className="body-p">
            {pending
              ? "Your place is held while we send you a secure payment link. Nothing more is needed from you right now — check your inbox shortly."
              : "Your seat is reserved and a confirmation email is on its way. Keep your booking reference safe; quote it in any message to us."}
          </p>
        </div>

        {hasBooking && (
          <div className="ty-receipt reveal">
            <div className="ty-receipt-head">
              <span className="kicker">Your Booking</span>
              {!pending && <span className="ty-paid">Paid</span>}
            </div>

            <dl className="ty-rows">
              {course && (<><dt>Course</dt><dd>{course}</dd></>)}
              {dates && (<><dt>Dates</dt><dd>{dates}</dd></>)}
              {acco && (<><dt>Accommodation</dt><dd>{acco}</dd></>)}
              {paid && (<><dt>Registration paid</dt><dd>€{paid}{method ? ` · ${method}` : ""}</dd></>)}
              {balance && (<><dt>Balance on arrival</dt><dd>€{balance}</dd></>)}
              {paymentId && (<><dt>Payment ID</dt><dd className="ty-mono">{paymentId}</dd></>)}
            </dl>

            {codes.length > 0 && (
              <div className="ty-codes">
                <span className="ty-codes-label">
                  Booking reference{codes.length > 1 ? "s" : ""}
                </span>
                {codes.map((c, i) => (
                  <div className="ty-code" key={c}>
                    <span>{names[i] || `Student ${i + 1}`}</span>
                    <b>{c}</b>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="ty-steps reveal">
          <div className="ty-step">
            <span className="ty-n">1</span>
            <h3>Check your inbox</h3>
            <p>Your confirmation email has your reference, dates and everything included
              in the fee. If it has not arrived, look in spam and then write to us.</p>
          </div>
          <div className="ty-step">
            <span className="ty-n">2</span>
            <h3>Plan your travel</h3>
            <p>Fly into Dehradun (Jolly Grant) — pickup is included. Delhi is about 250&nbsp;km
              away. Tell us your arrival time once your flights are booked.</p>
          </div>
          <div className="ty-step">
            <span className="ty-n">3</span>
            <h3>Settle the balance on arrival</h3>
            <p>{balance
              ? `The remaining €${balance} is paid at the ashram when you arrive — cash or card, whichever suits.`
              : "The remaining course fee is paid at the ashram when you arrive — cash or card, whichever suits."}</p>
          </div>
        </div>

        <div className="ty-split reveal">
          <div className="ty-card ty-card-main">
            <span className="kicker">Before You Fly</span>
            <h3>A few practical things to read</h3>
            <p>What to pack, how the days are structured, and the ashram rules everyone
              agrees to. Ten minutes now saves questions later.</p>
            <div className="actions">
              <a className="btn-primary" href="/yoga-ashram-in-india-code-of-conduct/">Code of Conduct</a>
              <a className="btn-ghost" href="/weather/">
                Weather &amp; Packing
                <svg width="18" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 5h17M14 1l4 4-4 4" /></svg>
              </a>
            </div>
          </div>

          <div className="ty-card">
            <span className="kicker">Questions?</span>
            <h3>Talk to us directly</h3>
            <p>Quote your booking reference and we will pick up right where you left off.
              WhatsApp is the fastest way to reach the ashram.</p>
            <div className="ty-contacts">
              <a className="ty-chip" href="https://api.whatsapp.com/send?phone=919999048900" target="_blank" rel="noopener noreferrer">
                <span className="ty-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z" /><path d="M9 10c.5 2.5 2.5 4.5 5 5l1.4-1.4a1 1 0 0 1 1-.2l1.6.6" /></svg></span>
                <span className="ty-tx"><b>+91-9999-048-900</b><i>WhatsApp · International</i></span>
              </a>
              <a className="ty-chip" href="mailto:info@adhiroha.com">
                <span className="ty-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M3 6l9 7 9-7" /></svg></span>
                <span className="ty-tx"><b>info@adhiroha.com</b><i>Email us anytime</i></span>
              </a>
              <a className="ty-chip" href="tel:+916397328721">
                <span className="ty-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h4l2 5-2.5 1.5a12 12 0 0 0 6 6L14 15l5 2v4a2 2 0 0 1-2 2C9 23 1 15 1 7a2 2 0 0 1 2-2z" /></svg></span>
                <span className="ty-tx"><b>+91-6397-328-721</b><i>Queries from India</i></span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
