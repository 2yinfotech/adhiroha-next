import RegistrationForm from "@/components/RegistrationForm";
import { getBooking, courseOptionsFor, isIndian, describeUploadRules } from "@/lib/registration";

// /registration/?view=<b_id>
//
// The booking id comes on the query string, matching the link format the old
// Registration.php used, so links already in circulation keep working. The
// booking is read on the server: nothing about it is trusted from the client,
// and the page renders nothing at all without a valid id.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Registration | Adhiroha",
  robots: { index: false, follow: false },
};

function Shell({ children }) {
  return (
    <div className="rg-page">
      <div className="rg-top">
        <img src="/img/adhiroha-logo-14.png" alt="Adhiroha" width="190" height="61" />
      </div>
      {children}
    </div>
  );
}

function Message({ title, body, kind = "warn" }) {
  return (
    <Shell>
      <div className="rg-state">
        <svg className={kind === "done" ? "rg-tick" : "rg-warn"} viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          {kind === "done" ? <path d="M8 12.5l2.6 2.6L16 9.5" /> : <path d="M12 7.5v5.5M12 16.5h.01" />}
        </svg>
        <h1 className="rg-h1">{title}</h1>
        <p>{body}</p>
      </div>
    </Shell>
  );
}

export default async function RegistrationPage({ searchParams }) {
  const sp = await searchParams;
  const id = sp?.view ?? sp?.b_id ?? "";

  if (!id) {
    return (
      <Message
        title="Registration link needed"
        body="This form opens from the personal link we send you after booking. If you do not have it to hand, write to info@adhiroha.com and we will send it again."
      />
    );
  }

  let booking = null;
  try {
    booking = await getBooking(id);
  } catch {
    // The connection failed rather than the booking being absent. Say so, so
    // nobody spends an afternoon looking for a booking that is actually there.
    return (
      <Message
        title="We cannot reach the booking system"
        body="This is a problem at our end, not with your link. Please try again in a few minutes, or write to info@adhiroha.com and we will sort it out."
      />
    );
  }

  if (!booking) {
    return (
      <Message
        title="We could not find that booking"
        body="The link may be incomplete or the booking reference may have changed. Please write to info@adhiroha.com and we will send you a fresh link."
      />
    );
  }

  if (String(booking.b_reg || "").toLowerCase() === "submited") {
    return (
      <Message
        kind="done"
        title="Already received"
        body={`Thank you, ${booking.b_name}. Your registration form is already with us. If something needs changing, write to info@adhiroha.com and we will update it for you.`}
      />
    );
  }

  const { options, selected } = courseOptionsFor(booking.b_course);

  return (
    <Shell>
      <div className="rg-wrap">
        <div className="rg-head">
          <span className="rg-kicker">Adhiroha Yoga School</span>
          <h1 className="rg-h1">Registration Form</h1>
          <p className="rg-sub">
            A few details before you arrive, {booking.b_name}. It takes about five minutes.
            Please have your ID{isIndian(booking.b_country) ? "" : " and visa"} ready to upload.
          </p>
        </div>

        <div className="rg-booking">
          <div className="rg-bk"><span>Booking</span><b>{booking.b_code || `#${booking.b_id}`}</b></div>
          <div className="rg-bk"><span>Name</span><b>{booking.b_name}</b></div>
          <div className="rg-bk"><span>Course</span><b>{booking.b_course}</b></div>
          {booking.b_month ? <div className="rg-bk"><span>Batch</span><b>{booking.b_month}</b></div> : null}
          {booking.b_acco ? <div className="rg-bk"><span>Accommodation</span><b>{booking.b_acco}</b></div> : null}
        </div>

        <RegistrationForm
          booking={{
            b_id: booking.b_id,
            b_name: booking.b_name,
            b_email: booking.b_email,
            b_gender: booking.b_gender,
            b_country: booking.b_country,
            b_number: booking.b_number,
            b_course: booking.b_course,
          }}
          courseOptions={options}
          selectedCourse={selected}
          indian={isIndian(booking.b_country)}
          uploadRules={describeUploadRules()}
        />
      </div>
    </Shell>
  );
}
