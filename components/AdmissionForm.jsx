"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  COURSES, YOGA_TTC_COURSES, ROOM_TRACKED_COURSES, ADDONS, FEES,
  computeFees, gatewayBreakdown, tierLabels, inclusions,
} from "@/lib/admission-fees";

const COURSE_LIST = Object.entries(COURSES).map(([value, c]) => ({ value, ...c }));
const MAX_STUDENTS = 3;

// Accommodation photography (public/img/remote).
const ACCO_IMG = {
  triple: "/img/remote/img_tion-1.webp",
  double: "/img/remote/img_tion2.webp",
};

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

const emptyStudent = () => ({
  name: "", gender: "", email: "", number: "", country: "", city: "", source: "", refCode: "",
});

const eur = (n) => "€" + Number(n || 0).toLocaleString("en-IE", { maximumFractionDigits: 2 });
const eur2 = (n) =>
  "€" + Number(n || 0).toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Display-only: force every batch date range to the short "1st Sep 2026" month
// form so YTTC, Sound Healing, Retreat and Sadhana all read consistently. The
// stored/emailed strings are left untouched.
function fmtRange(range) {
  if (!range) return range;
  return String(range)
    .replace(
      /(January|February|March|April|May|June|July|August|September|October|November|December)/gi,
      (m) => m.slice(0, 3)
    )
    .replace(/\bSept\b/gi, "Sep");
}

// Short label used for each bundle's "… Dates" row in the summary.
const ADDON_DATES_LABEL = {
  "Sound Healing": "Sound Healing",
  "Yoga Retreat": "Retreat",
  "Sadhana Immersion": "Sadhana",
};

const SHORT3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ordinalDay(n) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function parseDisplayDate(s) {
  if (!s) return null;
  const m = String(s).match(/(\d{1,2})\D*?([A-Za-z]{3,})\.?\s+(\d{4})/);
  if (!m) return null;
  const mi = SHORT3.findIndex((x) => x.toLowerCase() === m[2].slice(0, 3).toLowerCase());
  if (mi < 0) return null;
  return new Date(Date.UTC(Number(m[3]), mi, Number(m[1])));
}
function fmtDate(d) {
  return `${ordinalDay(d.getUTCDate())} ${SHORT3[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
// Retreat / Sadhana have no separate batch list: they run the days immediately
// after the chosen course checkout, so their range is derived from that date —
// and rendered in the same short "24th Sep 2026" form as everything else.
function addonDateRange(batch, days) {
  const startStr = batch?.end_date || (batch?.date_range || "").split(" - ")[1];
  const start = parseDisplayDate(startStr);
  if (!start || !days) return null;
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + (days - 1));
  return `${fmtDate(start)} - ${fmtDate(end)}`;
}

function loadScript(src, marker) {
  return new Promise((resolve) => {
    if (marker()) return resolve(true);
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(marker()));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(marker());
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const loadRazorpay = () =>
  loadScript("https://checkout.razorpay.com/v1/checkout.js", () => !!window.Razorpay);

const loadPayPal = () =>
  loadScript(
    `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&currency=EUR&intent=capture&components=buttons`,
    () => !!window.paypal
  );

export default function AdmissionForm() {
  /* ---------- wizard ---------- */
  const [step, setStep] = useState(1);
  const topRef = useRef(null);

  /* ---------- step 1: course, batch, students ---------- */
  const [course, setCourse] = useState("");
  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [students, setStudents] = useState([emptyStudent()]);
  const [openStudent, setOpenStudent] = useState(0);
  const studentsRef = useRef(null);

  /* ---------- step 2: accommodation ---------- */
  const [addOns, setAddOns] = useState([]);
  const [comboBatch, setComboBatch] = useState(null);
  const [sharing, setSharing] = useState("");
  const [rooms, setRooms] = useState(null);

  /* ---------- step 3: payment ---------- */
  const [registering, setRegistering] = useState(false);
  const [saving, setSaving] = useState(false);
  const [payingWith, setPayingWith] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  // Booking rows are written once; retrying with another gateway reuses them.
  const registered = useRef(null);
  const paypalBox = useRef(null);
  const paypalRendered = useRef(false);

  const batch = useMemo(
    () => batches.find((b) => String(b.id) === String(batchId)) || null,
    [batches, batchId]
  );
  // Bundles are only offered on teacher trainings.
  const canBundle = YOGA_TTC_COURSES.includes(course);
  const activeAddOns = useMemo(() => (canBundle ? addOns : []), [canBundle, addOns]);
  // Availability is still checked for these courses so a fully-booked sharing
  // option can be disabled — students no longer pick a specific room.
  const availabilityTracked = ROOM_TRACKED_COURSES.includes(course);
  const labels = tierLabels(course, batch?.isFirstBatch);
  const leadGender = students[0]?.gender || "";

  const fees = useMemo(() => {
    if (!course || !sharing) return null;
    return computeFees({
      course, sharing, numStudents: students.length,
      addOns: activeAddOns, isFirstBatch: batch?.isFirstBatch,
    });
  }, [course, sharing, students.length, activeAddOns, batch?.isFirstBatch]);

  // Price both cards on step 2 without committing to a sharing type.
  const previewFees = useCallback(
    (which) =>
      course
        ? computeFees({
            course, sharing: which, numStudents: students.length,
            addOns: activeAddOns, isFirstBatch: batch?.isFirstBatch,
          })
        : null,
    [course, students.length, activeAddOns, batch?.isFirstBatch]
  );

  const gateways = useMemo(() => (fees ? gatewayBreakdown(fees.reg) : null), [fees]);

  /* ---------- load batches when the course changes ---------- */
  useEffect(() => {
    if (!course) { setBatches([]); return; }
    let cancelled = false;
    setLoadingBatches(true); setBatchId(""); setBatches([]);
    fetch(`/api/admission/batches?course=${encodeURIComponent(course)}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setBatches(d.batches || []); })
      .catch(() => { if (!cancelled) setBatches([]); })
      .finally(() => { if (!cancelled) setLoadingBatches(false); });
    return () => { cancelled = true; };
  }, [course]);

  // Bundles aren't offered on Sound Healing / Yoga Retreat as the main course.
  useEffect(() => { if (!canBundle) setAddOns([]); }, [canBundle]);

  /* ---------- resolve the paired Sound Healing batch for the combo ---------- */
  useEffect(() => {
    if (!activeAddOns.includes("Sound Healing") || !course || !batchId) { setComboBatch(null); return; }
    let cancelled = false;
    fetch(`/api/admission/batches?course=${encodeURIComponent(course)}&comboFor=${encodeURIComponent(batchId)}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setComboBatch(d.comboBatch || null); })
      .catch(() => { if (!cancelled) setComboBatch(null); });
    return () => { cancelled = true; };
  }, [activeAddOns, course, batchId]);

  /* ---------- sharing availability (step 2) ---------- */
  useEffect(() => {
    if (step !== 2 || !leadGender || !batch?.month || !availabilityTracked) { setRooms(null); return; }
    let cancelled = false;
    setRooms(null);
    fetch(`/api/admission/rooms?month=${encodeURIComponent(batch.month)}&gender=${leadGender}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setRooms(d); })
      .catch(() => {
        if (!cancelled) setRooms({ availableRooms: [], doubleSharingBooked: false, tripleSharingBooked: false });
      });
    return () => { cancelled = true; };
  }, [step, leadGender, batch?.month, availabilityTracked]);

  /* ---------- students ---------- */
  const setStudent = (i, patch) =>
    setStudents((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const addStudent = () => {
    if (students.length >= MAX_STUDENTS) return;
    setStudents((prev) => [...prev, emptyStudent()]);
    setOpenStudent(students.length);
  };

  const removeStudent = (i) => {
    setStudents((prev) => prev.filter((_, idx) => idx !== i));
    setOpenStudent(0);
  };

  const studentComplete = (s) =>
    s.name.trim() && s.gender && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email) &&
    s.number.trim() && s.country.trim() && s.city.trim();

  const step1Ok = course && batchId && students.length > 0 && students.every(studentComplete);
  const step2Ok = !!sharing;

  const goto = (n) => {
    setError(""); setNotice(""); setStep(n);
    // Keep the wizard header in view when switching steps on a phone.
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  /* ---------- registration ---------- */

  // The booking selection, as sent to every payment endpoint. The server
  // re-prices from this — no amount is ever sent from the browser.
  const selection = () => ({
    course, batchId, sharing,
    addOns: activeAddOns,
    numStudents: students.length,
  });

  // Only one bundle may be added at a time — picking another replaces it,
  // clicking the selected one clears it.
  const toggleAddOn = (key) =>
    setAddOns((prev) => (prev.includes(key) ? [] : [key]));

  // Once a booking is done, hand off to /thank-you/ with the details on the query
  // string — the same pattern the old PHP panel used (thank-you.php?view_id=…).
  function goToThankYou({ codes, paid, method, paymentId, pending }) {
    const q = new URLSearchParams();
    if (codes?.length) q.set("code", codes.join(","));
    q.set("name", students.map((s) => s.name).join(","));
    q.set("course", COURSES[course]?.label + activeAddOns.map((k) => ` + ${ADDONS[k].label}`).join(""));
    if (batch?.date_range) q.set("dates", batch.date_range);
    q.set("acco", labels[sharing]);
    if (fees) q.set("balance", String(fees.balance));
    if (paid != null) q.set("paid", Number(paid).toFixed(2));
    if (method) q.set("method", method);
    if (paymentId) q.set("payment", paymentId);
    if (pending) q.set("pending", "1");
    window.location.assign(`/thank-you/?${q.toString()}`);
  }

  // Writes the pending bookings on the first call — that happens as soon as the
  // student details are in, so an abandoned checkout is still followed up — and
  // on every later call just refreshes those same rows with the current
  // accommodation and amounts. Returns { bookingIds, codes }.
  async function ensureRegistered() {
    const res = await fetch("/api/admission/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...selection(),
        students,
        bookingIds: registered.current?.bookingIds,
        codes: registered.current?.codes,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "We couldn't save your registration.");
    registered.current = data;
    return data;
  }

  // Continue buttons: save (step 1) or update (step 2) before moving on. A
  // failure keeps the student on the step with the reason, rather than walking
  // them to a payment screen for a booking that was never written.
  async function continueTo(next) {
    setError(""); setNotice(""); setSaving(true);
    try {
      await ensureRegistered();
      goto(next);
    } catch (e) {
      setError(e?.message || "We couldn't save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  /* ---------- Wise / Razorpay ---------- */
  async function pay(gateway) {
    setError(""); setNotice(""); setPayingWith(gateway); setRegistering(true);
    try {
      const reg = await ensureRegistered();
      setRegistering(false);

      const res = await fetch("/api/admission/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selection(), gateway, bookingIds: reg.bookingIds, codes: reg.codes }),
      });
      const data = await res.json();

      // Wise is a hosted payment link.
      if (data.redirect) { window.location.href = data.redirect; return; }

      // Payment could not be started at all. Stay on the panel and say so
      // plainly — redirecting to the thank-you page here would read as a
      // confirmation for someone who has not actually paid.
      if (data.error === "payment_not_configured" || data.error === "wise_unavailable") {
        setError(
          (data.message || "That payment method isn't available right now.") +
            ` Your details are saved under reference ${reg.codes.join(", ")} — ` +
            "please try another method, or contact us and we'll send you a payment link."
        );
        setPayingWith("");
        return;
      }
      if (!data.orderId) {
        setError(
          data.error === "order_failed"
            ? "The payment gateway declined to start this order. Please try another method or contact us."
            : data.error || "Could not start payment. Please try again."
        );
        setPayingWith("");
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) {
        setError("The payment library couldn't load. Please check your connection and try again.");
        setPayingWith("");
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "Adhiroha Yoga Ashram",
        description: `${course} — Registration Fee`,
        prefill: { name: students[0].name, email: students[0].email, contact: students[0].number },
        theme: { color: "#ed1c25" }, // Adhiroha brand red
        handler: async (r) => {
          const v = await fetch("/api/admission/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...r, ...selection(),
              bookingIds: reg.bookingIds,
              students: students.map((s, i) => ({ ...s, code: reg.codes[i] })),
            }),
          }).then((x) => x.json()).catch(() => ({ ok: false }));

          if (v.ok) {
            goToThankYou({
              codes: reg.codes, paid: gateways.razorpay.total,
              method: "Razorpay", paymentId: v.paymentId,
            });
            return;
          }
          setError("Your payment went through, but we couldn't verify it automatically. Please contact us with your payment ID — your seat is safe.");
          setPayingWith("");
        },
        modal: {
          ondismiss: () => {
            setPayingWith("");
            setNotice("Payment cancelled — your details are saved, you can pay any time.");
          },
        },
      });
      rzp.open();
    } catch (e) {
      setRegistering(false); setPayingWith("");
      setError(e?.message || "Something went wrong. Please try again.");
    }
  }

  /* ---------- PayPal buttons (Orders v2, captured server-side) ---------- */
  useEffect(() => {
    if (step !== 3 || !fees || !PAYPAL_CLIENT_ID || paypalRendered.current) return;
    let cancelled = false;

    (async () => {
      const ok = await loadPayPal();
      if (!ok || cancelled || !paypalBox.current) return;
      paypalRendered.current = true;
      paypalBox.current.innerHTML = "";

      window.paypal
        .Buttons({
          // PayPal's own brand blue, to match the other gateway buttons.
          style: { layout: "vertical", color: "blue", shape: "pill", label: "paypal", height: 46 },

          // Register the students, then ask our server to create the order.
          createOrder: async () => {
            setError("");
            const reg = await ensureRegistered();
            const res = await fetch("/api/admission/paypal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "create", ...selection(), codes: reg.codes }),
            });
            const data = await res.json();
            if (!data.orderID) throw new Error(data.message || "Could not start PayPal checkout.");
            return data.orderID;
          },

          // Capture on our server so the booking is only confirmed once PayPal
          // reports COMPLETED for the expected amount.
          onApprove: async (data) => {
            const reg = registered.current;
            const res = await fetch("/api/admission/paypal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "capture", orderID: data.orderID, ...selection(),
                bookingIds: reg?.bookingIds || [],
                students: students.map((s, i) => ({ ...s, code: reg?.codes?.[i] })),
              }),
            });
            const out = await res.json();
            if (out.ok) {
              goToThankYou({
                codes: reg?.codes || [], paid: gateways.paypal.total,
                method: "PayPal", paymentId: out.paymentId,
              });
              return;
            }
            setError(out.message || "PayPal payment could not be completed. Please try again.");
          },

          onCancel: () => setNotice("PayPal payment cancelled — your details are saved, you can pay any time."),
          onError: (err) => setError(String(err?.message || "PayPal could not be loaded. Please try another method.")),
        })
        .render(paypalBox.current)
        .catch(() => setError("PayPal buttons could not be displayed. Please try another method."));
    })();

    return () => { cancelled = true; };
  }, [step, fees]);

  // Re-render the PayPal buttons if the amount changes (they capture it at click).
  useEffect(() => { paypalRendered.current = false; }, [fees?.reg]);


  /* ============================================================
     Wizard
     ============================================================ */
  return (
    <section className="adm-wrap" ref={topRef}>
      <header className="adm-head">
        <span className="adm-kicker">Adhiroha Admissions</span>
        <h1>Reserve your Seat</h1>
        <p>Choose your course and dates, tell us who's coming, pick your stay — and secure your place with the registration fee.</p>
      </header>

      <ol className="adm-steps">
        {["Course", "Accommodation", "Payment"].map((label, i) => {
          const n = i + 1;
          const state = step === n ? " on" : step > n ? " done" : "";
          const reachable = n < step || (n === 2 && step1Ok) || (n === 3 && step1Ok && step2Ok);
          return (
            <li key={label} className={`adm-step${state}`}>
              <button
                type="button"
                disabled={!reachable || n === step || saving}
                // Jumping forward from the stepper has to save/refresh the
                // booking just like the Continue button does.
                onClick={() => (n > step ? continueTo(n) : goto(n))}
              >
                <span className="adm-num">{step > n ? "✓" : n}</span>
                <span className="adm-slabel">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="adm-card">
        {/* ══════════════ STEP 1 ══════════════ */}
        {step === 1 && (
          <div className="adm-body">
            <div className="adm-grid">
              <label>
                <span>Course or Retreat</span>
                <select value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="">Select a Course</option>
                  {COURSE_LIST.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Start Date</span>
                <select
                  value={batchId}
                  disabled={!course || loadingBatches || !batches.length}
                  onChange={(e) => {
                    setBatchId(e.target.value);
                    // The student form only appears once a batch is chosen, so
                    // bring it into view rather than leaving it below the fold.
                    if (e.target.value) {
                      setTimeout(
                        () => studentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                        120
                      );
                    }
                  }}
                >
                  <option value="">
                    {!course ? "Choose a Course First"
                      : loadingBatches ? "Loading Dates…"
                      : batches.length ? "Select a Batch"
                      : "No Dates Listed"}
                  </option>
                  {batches.map((b) => {
                    const sold = String(b.status || "").toLowerCase() === "sold";
                    return (
                      <option key={b.id} value={b.id} disabled={sold}>
                        {fmtRange(b.date_range)}{sold ? " — fully booked" : ""}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            {course && !loadingBatches && !batches.length && (
              <p className="adm-hint">
                No dates are listed right now — please <a href="/contact-us/">contact us</a> and we'll help.
              </p>
            )}

            <p className="adm-hint">
              Looking for a 14-day Hatha, Ashtanga or Pranayama intensive? Those are arranged
              personally — call <a href="tel:+919999048900">+91 9999 048 900</a> or email{" "}
              <a href="mailto:info@adhiroha.com">info@adhiroha.com</a>.
            </p>

            {course && (
              <div className="adm-incl">
                <b>Your Fee Includes</b>
                <ul>{inclusions(course).map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            )}

            {course && batchId && (
              <>
                <h2 className="adm-h" ref={studentsRef}>
                  Student Details
                  <span className="adm-opt">{students.length} of {MAX_STUDENTS}</span>
                </h2>

                <div className="adm-students">
                  {students.map((s, i) => {
                    const open = openStudent === i;
                    const ok = studentComplete(s);
                    return (
                      <div key={i} className={`adm-student${open ? " open" : ""}`}>
                        <div className="adm-shead">
                          <button
                            type="button"
                            className="adm-stoggle"
                            aria-expanded={open}
                            onClick={() => setOpenStudent(open ? -1 : i)}
                          >
                            <span className={`adm-sdot${ok ? " ok" : ""}`}>{ok ? "✓" : i + 1}</span>
                            <span className="adm-sname">{s.name.trim() || `Student #${i + 1}`}</span>
                            <span className="adm-schev" aria-hidden="true">{open ? "−" : "+"}</span>
                          </button>
                          {students.length > 1 && (
                            <button type="button" className="adm-sremove" onClick={() => removeStudent(i)}
                              aria-label={`Remove student ${i + 1}`}>Remove</button>
                          )}
                        </div>

                        {open && (
                          <div className="adm-sbody">
                            <div className="adm-grid">
                              <label>
                                <span>Full Name</span>
                                <input value={s.name} autoComplete="name"
                                  onChange={(e) => setStudent(i, { name: e.target.value })}
                                  placeholder="As on your passport" />
                              </label>
                              <label>
                                <span>Gender</span>
                                <select value={s.gender} onChange={(e) => setStudent(i, { gender: e.target.value })}>
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </label>
                              <label>
                                <span>Email</span>
                                <input type="email" inputMode="email" autoComplete="email" value={s.email}
                                  onChange={(e) => setStudent(i, { email: e.target.value })}
                                  placeholder="you@email.com" />
                              </label>
                              <label>
                                <span>WhatsApp Number</span>
                                <input type="tel" inputMode="tel" autoComplete="tel" value={s.number}
                                  onChange={(e) => setStudent(i, { number: e.target.value })}
                                  placeholder="+91 99999 00000" />
                              </label>
                              <label>
                                <span>Country</span>
                                <input value={s.country} autoComplete="country-name"
                                  onChange={(e) => setStudent(i, { country: e.target.value })}
                                  placeholder="Country" />
                              </label>
                              <label>
                                <span>City</span>
                                <input value={s.city} autoComplete="address-level2"
                                  onChange={(e) => setStudent(i, { city: e.target.value })}
                                  placeholder="City" />
                              </label>
                              <label>
                                <span>How Did You Hear About Us?</span>
                                <select
                                  value={s.source}
                                  onChange={(e) =>
                                    setStudent(i, {
                                      source: e.target.value,
                                      refCode: e.target.value === "Referral" ? s.refCode : "",
                                    })
                                  }
                                >
                                  <option value="">Select Source</option>
                                  <option value="Google">Google</option>
                                  <option value="Social Media">Social Media</option>
                                  <option value="Referral">Referral</option>
                                </select>
                              </label>
                              {s.source === "Referral" && (
                                <label>
                                  <span>Referral Code</span>
                                  <input value={s.refCode}
                                    onChange={(e) => setStudent(i, { refCode: e.target.value })}
                                    placeholder="Enter referral code" />
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {students.length < MAX_STUDENTS && (
                  <button type="button" className="adm-add" onClick={addStudent}>
                    + Add Another Student
                  </button>
                )}
              </>
            )}

            {error && <div className="adm-error">{error}</div>}

            <div className="adm-actions">
              <button className="adm-btn" disabled={!step1Ok || saving} onClick={() => continueTo(2)}>
                {saving ? "Saving…" : "Continue"}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2 ══════════════ */}
        {step === 2 && (
          <div className="adm-body">
            {canBundle && (
              <>
                <h2 className="adm-h">
                  Add to Your Training
                  <span className="adm-opt">Optional</span>
                </h2>
                <div className="adm-addons">
                  {Object.values(ADDONS).map((a) => {
                    const on = addOns.includes(a.key);
                    const band = previewFees(sharing || "triple");
                    const price = FEES[a.feeKey]?.[sharing || "triple"]?.total;
                    return (
                      <label key={a.key} className={`adm-addon${on ? " on" : ""}`}>
                        <input type="checkbox" checked={on} onChange={() => toggleAddOn(a.key)} />
                        <span className="adm-addonbody">
                          <b>{a.label}</b>
                          <em>{a.blurb}</em>
                          <span className="adm-addonprice">
                            {a.days} days · +{eur(price)} per person
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {activeAddOns.length > 0 && (
                  <p className="adm-combodates">
                    {activeAddOns.map((k) => {
                      const label = ADDON_DATES_LABEL[k] || ADDONS[k].label;
                      if (k === "Sound Healing") {
                        return (
                          <span key={k} style={{ display: "block" }}>
                            {label} Dates:{" "}
                            <b>{comboBatch ? fmtRange(comboBatch.date_range) : "finding the matching batch…"}</b>
                          </span>
                        );
                      }
                      const range = addonDateRange(batch, ADDONS[k].days);
                      return range ? (
                        <span key={k} style={{ display: "block" }}>
                          {label} Dates: <b>{range}</b>
                        </span>
                      ) : null;
                    })}
                  </p>
                )}
              </>
            )}

            <h2 className="adm-h">Choose Your Accommodation</h2>
            {availabilityTracked && !rooms && leadGender && <div className="adm-loading">Checking availability…</div>}

            <div className="adm-accos">
              {["triple", "double"].map((which) => {
                const f = previewFees(which);
                if (!f) return null;
                const full = availabilityTracked && rooms
                  ? which === "triple" ? rooms.tripleSharingBooked : rooms.doubleSharingBooked
                  : false;
                return (
                  <button
                    key={which}
                    type="button"
                    disabled={full}
                    className={`adm-acco${sharing === which ? " sel" : ""}${full ? " full" : ""}`}
                    aria-pressed={sharing === which}
                    onClick={() => setSharing(which)}
                  >
                    <img className="adm-accoimg" src={ACCO_IMG[which]} alt={`${labels[which]} room at Adhiroha`} loading="lazy" />
                    <span className="adm-accobody">
                      <span className="adm-accohead">
                        <b>{labels[which]}</b>
                        {full && <em className="adm-fullbadge">Fully booked</em>}
                      </span>
                      <span className="adm-fees">
                        <span className="adm-feerow"><span>Total Fees</span><b>{eur(f.total)}</b></span>
                        <span className="adm-feerow"><span>Registration Now</span><b>{eur(f.reg)}</b></span>
                        <span className="adm-feerow muted"><span>Balance on Arrival</span><b>{eur(f.balance)}</b></span>
                        {f.combo && (
                          <span className="adm-combobox">
                            <span className="adm-combolabel">Course + Sound Healing Bundle</span>
                            <span className="adm-feerow"><span>Booked Separately</span><b><s>{eur(f.separate)}</s></b></span>
                            <span className="adm-feerow save"><span>You Save</span><b>{eur(f.scholarship)}</b></span>
                          </span>
                        )}
                      </span>
                      {students.length > 1 && <span className="adm-forn">For {students.length} Students</span>}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && <div className="adm-error">{error}</div>}

            <div className="adm-actions">
              <button className="adm-btn ghost" onClick={() => goto(1)} disabled={saving}>Back</button>
              <button className="adm-btn" disabled={!step2Ok || saving} onClick={() => continueTo(3)}>
                {saving ? "Saving…" : "Continue"}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 3 ══════════════ */}
        {step === 3 && fees && gateways && (
          <div className="adm-body">
            <h2 className="adm-h">Admission Details</h2>
            <div className="adm-summary">
              <div className="adm-srow">
                <span>Course</span>
                <b>
                  {COURSES[course]?.label}
                  {fees.addOns.map((k) => ` + ${ADDONS[k].label}`).join("")}
                </b>
              </div>
              <div className="adm-srow"><span>{activeAddOns.length ? "YTTC Dates" : "Dates"}</span><b>{fmtRange(batch?.date_range)}</b></div>
              {activeAddOns.map((k) => {
                const range = k === "Sound Healing"
                  ? (comboBatch ? fmtRange(comboBatch.date_range) : null)
                  : addonDateRange(batch, ADDONS[k].days);
                if (!range) return null;
                return (
                  <div className="adm-srow" key={k}>
                    <span>{ADDON_DATES_LABEL[k] || ADDONS[k].label} Dates</span><b>{range}</b>
                  </div>
                );
              })}
              <div className="adm-srow"><span>Accommodation</span><b>{labels[sharing]}</b></div>
              <div className="adm-srow">
                <span>Student{students.length > 1 ? "s" : ""}</span>
                <b>{students.map((s) => s.name).join(", ")}</b>
              </div>
            </div>

            {/* Full fee structure, as on the old panel */}
            <h2 className="adm-h">Fee Structure</h2>
            <div className="adm-feestruct">
              <div className="adm-fsgroup">
                <h3>{COURSES[course]?.label} — {labels[sharing]}</h3>
                <div className="adm-srow"><span>Total Fees</span><b>{eur(fees.mainTotal)}</b></div>
                <div className="adm-srow"><span>Registration Fee</span><b>{eur(fees.mainReg)}</b></div>
              </div>

              {/* Sound Healing is priced as a discounted bundle with the course. */}
              {fees.combo && (
                <div className="adm-fsgroup">
                  <h3>Sound Healing TTC</h3>
                  <div className="adm-srow"><span>Total Fees</span><b>{eur(fees.soundTotal)}</b></div>
                  <div className="adm-srow"><span>Registration Fee</span><b>{eur(fees.soundReg)}</b></div>
                </div>
              )}

              {/* Other add-ons are charged at their published fee. */}
              {fees.addOnLines.map((l) => (
                <div className="adm-fsgroup" key={l.key}>
                  <h3>{l.label}</h3>
                  <div className="adm-srow"><span>Total Fees</span><b>{eur(l.total)}</b></div>
                  <div className="adm-srow"><span>Registration Fee</span><b>{eur(l.reg)}</b></div>
                </div>
              ))}

              {fees.combo && (
                <div className="adm-fsgroup">
                  <h3>Course + Sound Healing Together</h3>
                  <div className="adm-srow"><span>Booked Separately</span><b><s>{eur(fees.separate)}</s></b></div>
                  <div className="adm-srow"><span>Scholarship Amount</span><b className="adm-save">− {eur(fees.scholarship)}</b></div>
                </div>
              )}

              <div className="adm-fsgroup adm-fstotal">
                <h3>Your Total</h3>
                <div className="adm-srow"><span>Total Fees</span><b>{eur(fees.total)}</b></div>
                <div className="adm-srow"><span>Total Registration Fees</span><b>{eur(fees.reg)}</b></div>
                {students.length > 1 && (
                  <div className="adm-srow"><span>Students</span><b>{students.length}</b></div>
                )}
              </div>
              <p className="adm-balanceline">
                Balance Fees <b>{eur(fees.balance)}</b> to be paid upon arrival.
              </p>
            </div>

            <h2 className="adm-h">How Would You Like to Pay?</h2>
            <p className="adm-hint">
              The registration fee secures your seat. Each method adds the card or transfer
              charge shown below.
            </p>

            <div className="adm-pays">
              {["wise", "razorpay"].map((key) => {
                const g = gateways[key];
                const busy = payingWith === key;
                return (
                  <div key={key} className={`adm-pay adm-pay-${key}`}>
                    <div className="adm-payhead">
                      <b>{g.label}</b>
                      <em>{g.note}</em>
                    </div>
                    <div className="adm-feerow"><span>Registration Fee</span><b>{eur2(fees.reg)}</b></div>
                    <div className="adm-feerow muted">
                      <span>{g.label} Fee ({+(g.pct * 100).toFixed(1)}%)</span>
                      <b>{eur2(g.fee)}</b>
                    </div>
                    <div className="adm-feerow strong"><span>Total Today</span><b>{eur2(g.total)}</b></div>
                    <button type="button" className={`adm-btn pay brand-${key}`}
                      disabled={!!payingWith || registering} onClick={() => pay(key)}>
                      {busy ? (registering ? "Saving…" : "Opening…") : `Pay ${eur2(g.total)}`}
                    </button>
                  </div>
                );
              })}

              {/* PayPal — rendered by the PayPal JS SDK, captured on our server */}
              <div className="adm-pay adm-pay-paypal">
                <div className="adm-payhead">
                  <b>{gateways.paypal.label}</b>
                  <em>{gateways.paypal.note}</em>
                </div>
                <div className="adm-feerow"><span>Registration Fee</span><b>{eur2(fees.reg)}</b></div>
                <div className="adm-feerow muted">
                  <span>PayPal Fee ({+(gateways.paypal.pct * 100).toFixed(1)}%)</span>
                  <b>{eur2(gateways.paypal.fee)}</b>
                </div>
                <div className="adm-feerow strong"><span>Total Today</span><b>{eur2(gateways.paypal.total)}</b></div>
                {PAYPAL_CLIENT_ID
                  ? <div className="adm-paypalbox" ref={paypalBox} />
                  : <p className="adm-paypaloff">PayPal isn't switched on yet — please use Wise or Razorpay.</p>}
              </div>
            </div>

            {notice && <div className="adm-notice">{notice}</div>}
            {error && <div className="adm-error">{error}</div>}

            <div className="adm-actions">
              <button className="adm-btn ghost" onClick={() => goto(2)} disabled={!!payingWith}>Back</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
