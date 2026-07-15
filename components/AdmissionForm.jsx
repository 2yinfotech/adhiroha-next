"use client";

import { useEffect, useMemo, useState } from "react";

const COURSES = [
  { value: "200 Hour YTTC", label: "200 Hour Yoga Teacher Training", reg: 300, from: 1275, dur: "24 Days" },
  { value: "300 Hour YTTC", label: "300 Hour Yoga Teacher Training", reg: 500, from: 1500, dur: "30 Days" },
  { value: "500 Hour YTTC", label: "500 Hour Yoga Teacher Training", reg: 750, from: 2700, dur: "60 Days" },
  { value: "Sound Healing", label: "Sound Healing Teacher Training", reg: 300, from: 510, dur: "6 Days" },
  { value: "Yoga Retreat", label: "Yoga & Ayurveda Wellness Retreat", reg: 300, from: 510, dur: "6 Days" },
];
const RAZOR_PCT = 0.05;

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState("");
  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [gender, setGender] = useState("");
  const [acco, setAcco] = useState("");
  const [rooms, setRooms] = useState(null);
  const [room, setRoom] = useState("");
  const [form, setForm] = useState({ name: "", email: "", number: "", country: "", city: "" });
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  const courseInfo = useMemo(() => COURSES.find((c) => c.value === course), [course]);
  const batch = useMemo(() => batches.find((b) => String(b.id) === String(batchId)), [batches, batchId]);
  const reg = courseInfo?.reg || 0;
  const fee = +(reg * RAZOR_PCT).toFixed(2);
  const total = +(reg + fee).toFixed(2);

  // Fetch batch dates when a course is chosen
  useEffect(() => {
    if (!course) return;
    setLoadingBatches(true); setBatchId(""); setBatches([]);
    fetch(`/api/admission/batches?course=${encodeURIComponent(course)}`)
      .then((r) => r.json())
      .then((d) => setBatches(d.batches || []))
      .catch(() => setBatches([]))
      .finally(() => setLoadingBatches(false));
  }, [course]);

  // Fetch room availability when entering step 2 with a gender
  useEffect(() => {
    if (step !== 2 || !gender || !batch?.month) { setRooms(null); return; }
    setRoom(""); setAcco("");
    fetch(`/api/admission/rooms?month=${encodeURIComponent(batch.month)}&gender=${gender}`)
      .then((r) => r.json())
      .then(setRooms)
      .catch(() => setRooms({ availableRooms: [], doubleSharingBooked: true, tripleSharingBooked: true }));
  }, [step, gender, batch?.month]);

  const accoRooms = (type) => {
    if (!rooms) return [];
    const dbl = ["SATYA", "SHANTI", "SANKALPA", "BODHI"];
    return rooms.availableRooms.filter((r) => (type === "double" ? dbl.includes(r) : !dbl.includes(r)));
  };

  const canNext1 = course && batchId;
  const canNext2 = gender && acco && (room || acco === "triple");
  const canPay = form.name && /.+@.+\..+/.test(form.email) && form.number && form.country;

  async function pay() {
    setError(""); setPaying(true);
    try {
      const payload = {
        course, name: form.name, email: form.email, number: form.number,
        country: form.country, city: form.city, gender,
        acco: acco === "double" ? "Double Sharing" : "Triple Sharing",
        month: batch?.month, monthYear: batch?.monthYear, room: room || "N/A", batchId,
      };
      const res = await fetch("/api/admission/order", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error === "payment_not_configured") {
        setError("Registration recorded ✓ — but online payment isn't switched on yet. Our team will email you a secure payment link shortly.");
        setDone({ code: data.code, pending: true });
        setPaying(false);
        return;
      }
      if (!data.orderId) { setError("Could not start payment. Please try again or contact us."); setPaying(false); return; }
      const ok = await loadRazorpay();
      if (!ok) { setError("Payment library failed to load. Check your connection."); setPaying(false); return; }
      const rzp = new window.Razorpay({
        key: data.keyId, order_id: data.orderId, amount: data.amount, currency: data.currency,
        name: "Adhiroha Yoga Ashram", description: `${course} — Registration`,
        prefill: { name: form.name, email: form.email, contact: form.number },
        theme: { color: "#c99a63" },
        handler: async (r) => {
          const v = await fetch("/api/admission/verify", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...r, bookingId: data.bookingId, amount: total }),
          }).then((x) => x.json()).catch(() => ({ ok: false }));
          if (v.ok) setDone({ code: data.code, paymentId: r.razorpay_payment_id });
          else setError("Payment received but verification failed. Please contact us with your payment ID.");
          setPaying(false);
        },
        modal: { ondismiss: () => setPaying(false) },
      });
      rzp.open();
    } catch (e) {
      setError("Something went wrong. Please try again."); setPaying(false);
    }
  }

  if (done) {
    return (
      <section className="adm-wrap">
        <div className="adm-card adm-done">
          <div className="adm-tick">✓</div>
          <h2>{done.pending ? "Registration Received" : "You're Registered!"}</h2>
          <p>{done.pending
            ? "Your details are saved. We'll email you shortly to complete payment and confirm your seat."
            : "Your seat is reserved and a confirmation is on its way to your inbox."}</p>
          <div className="adm-ref">Reference: <b>{done.code}</b></div>
          <a className="adm-btn" href="/">Back to Home</a>
        </div>
      </section>
    );
  }

  return (
    <section className="adm-wrap">
      <div className="adm-head">
        <span className="adm-kicker">Adhiroha Admissions</span>
        <h1>Reserve Your Seat</h1>
        <p>Three simple steps — choose your course, pick your stay, and confirm. Your place is held the moment your registration is in.</p>
      </div>

      <div className="adm-steps">
        {["Course & Dates", "Stay", "Details & Pay"].map((label, i) => (
          <div key={label} className={`adm-step${step === i + 1 ? " on" : ""}${step > i + 1 ? " done" : ""}`}>
            <span className="adm-num">{step > i + 1 ? "✓" : i + 1}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="adm-card">
        {step === 1 && (
          <div className="adm-body">
            <h3 className="adm-h">Choose your course</h3>
            <div className="adm-courses">
              {COURSES.map((c) => (
                <button key={c.value} type="button"
                  className={`adm-course${course === c.value ? " sel" : ""}`}
                  onClick={() => setCourse(c.value)}>
                  <b>{c.label}</b>
                  <span>{c.dur} · from €{c.from}</span>
                  <em>Registration €{c.reg}</em>
                </button>
              ))}
            </div>

            {course && (
              <>
                <h3 className="adm-h">Pick a start date</h3>
                {loadingBatches ? <div className="adm-loading">Loading dates…</div> : (
                  batches.length ? (
                    <div className="adm-batches">
                      {batches.map((b) => (
                        <button key={b.id} type="button"
                          className={`adm-batch${String(batchId) === String(b.id) ? " sel" : ""}`}
                          onClick={() => setBatchId(b.id)}>
                          <b>{b.date_range}</b>
                          <span>{b.status || "Seats available"}</span>
                        </button>
                      ))}
                    </div>
                  ) : <div className="adm-loading">No upcoming dates listed — please contact us.</div>
                )}
              </>
            )}
            <div className="adm-actions">
              <button className="adm-btn" disabled={!canNext1} onClick={() => setStep(2)}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="adm-body">
            <h3 className="adm-h">Who's coming?</h3>
            <div className="adm-choice">
              {["male", "female"].map((g) => (
                <button key={g} type="button" className={`adm-pill${gender === g ? " sel" : ""}`}
                  onClick={() => setGender(g)}>{g[0].toUpperCase() + g.slice(1)}</button>
              ))}
            </div>

            {gender && (
              <>
                <h3 className="adm-h">Accommodation</h3>
                {!rooms ? <div className="adm-loading">Checking room availability…</div> : (
                  <div className="adm-choice">
                    <button type="button" disabled={rooms.tripleSharingBooked}
                      className={`adm-acco${acco === "triple" ? " sel" : ""}`} onClick={() => { setAcco("triple"); setRoom(""); }}>
                      <b>Triple Sharing</b><span>{rooms.tripleSharingBooked ? "Full" : "Included in fee"}</span>
                    </button>
                    <button type="button" disabled={rooms.doubleSharingBooked}
                      className={`adm-acco${acco === "double" ? " sel" : ""}`} onClick={() => { setAcco("double"); setRoom(""); }}>
                      <b>Double Sharing</b><span>{rooms.doubleSharingBooked ? "Full" : "Small supplement"}</span>
                    </button>
                  </div>
                )}
                {acco && accoRooms(acco).length > 0 && (
                  <>
                    <h3 className="adm-h">Pick a room <span className="adm-opt">(optional)</span></h3>
                    <div className="adm-rooms">
                      {accoRooms(acco).map((r) => (
                        <button key={r} type="button" className={`adm-room${room === r ? " sel" : ""}`}
                          onClick={() => setRoom(r)}>{r.charAt(0) + r.slice(1).toLowerCase()}</button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            <div className="adm-actions">
              <button className="adm-btn ghost" onClick={() => setStep(1)}>Back</button>
              <button className="adm-btn" disabled={!canNext2} onClick={() => setStep(3)}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="adm-body">
            <h3 className="adm-h">Your details</h3>
            <div className="adm-grid">
              <label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" /></label>
              <label>Phone / WhatsApp<input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} placeholder="+91…" /></label>
              <label>Country<input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" /></label>
              <label>City<input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" /></label>
            </div>

            <div className="adm-summary">
              <div className="adm-srow"><span>Course</span><b>{courseInfo?.label}</b></div>
              <div className="adm-srow"><span>Dates</span><b>{batch?.date_range}</b></div>
              <div className="adm-srow"><span>Accommodation</span><b>{acco === "double" ? "Double Sharing" : "Triple Sharing"}{room ? ` · ${room.charAt(0) + room.slice(1).toLowerCase()}` : ""}</b></div>
              <div className="adm-srow"><span>Registration fee</span><b>€{reg.toFixed(2)}</b></div>
              <div className="adm-srow small"><span>Payment gateway fee (5%)</span><b>€{fee.toFixed(2)}</b></div>
              <div className="adm-srow total"><span>Pay now</span><b>€{total.toFixed(2)}</b></div>
              <p className="adm-note">The balance (course fee minus registration) is paid on arrival at the ashram.</p>
            </div>

            {error && <div className="adm-error">{error}</div>}
            <div className="adm-actions">
              <button className="adm-btn ghost" onClick={() => setStep(2)} disabled={paying}>Back</button>
              <button className="adm-btn" onClick={pay} disabled={!canPay || paying}>
                {paying ? "Processing…" : `Pay €${total.toFixed(2)} & Reserve`}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
