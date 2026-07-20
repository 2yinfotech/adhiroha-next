// Course catalogue, fee tables and pricing rules for the student admission panel.
//
// Pure data + arithmetic, with no database or Node-only imports, so the browser
// bundle can show live prices while the API routes recompute the authoritative
// figures from this same source. Numbers are carried over verbatim from the old
// PHP panel's index.php (updateFees / getRegistrationFee / getBalanceFee).

/* ---------- Course identity ---------- */

// Maps the course value used in the UI and stored in `bookings.b_course` to the
// key used in the fee table below.
export const COURSE_TYPE_MAP = {
  "200 Hour YTTC": "200",
  "300 Hour YTTC": "300",
  "500 Hour YTTC": "500",
  "Sound Healing": "sound_healing",
  "Yoga Retreat": "yoga_retreat",
  Hatha: "hatha",
  Ashtanga: "ashtanga",
  Pranayama: "pranayama",
};

export const COURSE_DAYS = {
  200: 24, 300: 30, 500: 60,
  sound_healing: 6, yoga_retreat: 6, hatha: 14, ashtanga: 14, pranayama: 14,
};

// The five courses bookable online, in display order. Hatha/Ashtanga/Pranayama
// are booked through the management (the old panel alerted and reloaded), so
// they are priced here but deliberately not offered in the picker.
export const COURSES = {
  "200 Hour YTTC": { label: "200 Hour Yoga Teacher Training", short: "200 Hour YTTC", table: "rishikeshttc", type: "200" },
  "300 Hour YTTC": { label: "300 Hour Yoga Teacher Training", short: "300 Hour YTTC", table: "rishikeshttc", type: "300" },
  "500 Hour YTTC": { label: "500 Hour Yoga Teacher Training", short: "500 Hour YTTC", table: "rishikeshttc", type: "500" },
  "Sound Healing": { label: "Sound Healing Teacher Training", short: "Sound Healing TTC", table: "sound_healing_rishikesh" },
  "Yoga Retreat": { label: "Yoga & Ayurveda Wellness Retreat", short: "Yoga Retreat", table: "yoga_retreats" },
};

export const SPECIAL_COURSES = ["Hatha", "Ashtanga", "Pranayama"];

// Courses a bundle can be added to.
export const YOGA_TTC_COURSES = ["200 Hour YTTC", "300 Hour YTTC", "500 Hour YTTC", "Hatha", "Ashtanga", "Pranayama"];

// Programmes that can be bundled onto a teacher training.
//
// Sound Healing is the original combo from the PHP panel: it has a pre-agreed
// bundled price (`combo`) that is cheaper than booking both separately, and the
// difference is shown as a scholarship. The other two have no negotiated bundle
// price, so they are simply added at their published fee — no invented discount.
export const ADDONS = {
  "Sound Healing": {
    key: "Sound Healing", label: "Sound Healing TTC", feeKey: "sound_healing", days: 6,
    blurb: "A 6-day sound healing certification — singing bowls, gongs and mantra.",
    discounted: true,
  },
  "Yoga Retreat": {
    key: "Yoga Retreat", label: "Yoga & Ayurveda Wellness Retreat", feeKey: "yoga_retreat", days: 6,
    blurb: "A 6-day restorative retreat with Ayurvedic therapies and daily practice.",
  },
  "Sadhana Immersion": {
    key: "Sadhana Immersion", label: "Sadhana Immersion Programme", feeKey: "sadhana", days: 15,
    blurb: "A 15-day silent-practice immersion for a deeper personal sadhana.",
  },
};

// Courses where a specific room is assigned at booking time.
export const ROOM_TRACKED_COURSES = ["200 Hour YTTC", "300 Hour YTTC", "500 Hour YTTC"];

/* ---------- Fee table ---------- */
export const FEES = {
  200: {
    triple: { total: 1275, reg: 300, balance: 975, combo: 1875, separate: 1965, scholarship: 90 },
    double: { total: 1650, reg: 300, balance: 1350, combo: 2350, separate: 2445, scholarship: 95 },
  },
  300: {
    triple: { total: 1500, reg: 500, balance: 1000, combo: 2100, separate: 2190, scholarship: 90 },
    double: { total: 2000, reg: 500, balance: 1500, combo: 2700, separate: 2795, scholarship: 95 },
  },
  500: {
    triple: { total: 2790, reg: 750, balance: 2040, combo: 3270, separate: 3480, scholarship: 210 },
    double: { total: 3690, reg: 750, balance: 2940, combo: 4230, separate: 4485, scholarship: 255 },
  },
  sound_healing: {
    triple: { total: 690, reg: 300, balance: 390 },
    double: { total: 795, reg: 300, balance: 495 },
    single: { total: 795, reg: 300, balance: 495 },
  },
  yoga_retreat: {
    triple: { total: 510, reg: 300, balance: 210 },
    double: { total: 660, reg: 300, balance: 360 },
  },
  // Sadhana Immersion Programme — 15 days (fees from the course page).
  sadhana: {
    triple: { total: 699, reg: 300, balance: 399 },
    double: { total: 900, reg: 300, balance: 600 },
  },
  hatha: {
    triple: { total: 790, reg: 300, balance: 490, combo: 1390, separate: 1480, scholarship: 90 },
    double: { total: 1090, reg: 300, balance: 790, combo: 1790, separate: 1885, scholarship: 95 },
  },
  ashtanga: {
    triple: { total: 790, reg: 300, balance: 490, combo: 1390, separate: 1480, scholarship: 90 },
    double: { total: 1090, reg: 300, balance: 790, combo: 1790, separate: 1885, scholarship: 95 },
  },
  pranayama: {
    triple: { total: 790, reg: 300, balance: 490, combo: 1390, separate: 1480, scholarship: 90 },
    double: { total: 1090, reg: 300, balance: 790, combo: 1790, separate: 1885, scholarship: 95 },
  },
};

/* ---------- Payment gateways ---------- */
// Surcharge added on top of the registration fee, as shown on step 3.
export const GATEWAYS = {
  wise: { key: "wise", label: "Wise", pct: 0.03, note: "Bank transfer — lowest fee" },
  razorpay: { key: "razorpay", label: "Razorpay", pct: 0.05, note: "Cards, UPI & netbanking" },
  paypal: { key: "paypal", label: "PayPal", pct: 0.075, note: "Pay with your PayPal balance" },
};

// Wise links are per registration-fee amount (hard-coded in the old panel).
export const WISE_LINKS = {
  300: "https://wise.com/pay/r/IXNQtDlwmxjeCDY",
  500: "https://wise.com/pay/r/pcFuCbxg89g5H28",
  750: "https://wise.com/pay/r/u5iZ-SHWyxAr8M0",
};

export const PAYPAL_BUSINESS = "adhiroha@gmail.com";

/* ---------- Rooms ---------- */
export const DOUBLE_ROOMS = ["SATYA", "SHANTI", "SANKALPA", "BODHI"];
export const TRIPLE_ROOMS = ["ANUSHASANA", "SHADHNA", "BHAKTI", "ANANDA", "NIYAMA", "ABHYASA", "NIRVANA", "DHYANA"];
export const ROOMS = { double: DOUBLE_ROOMS, triple: TRIPLE_ROOMS };

export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* ---------- Pricing ---------- */

// What the two accommodation cards are called for a given course/batch.
// Sound Healing batches that start on the 1st of a month sell one tier up:
// the "triple" card becomes Double Sharing and the "double" card becomes Single.
export function tierLabels(course, isFirstBatch) {
  if (course === "Sound Healing" && isFirstBatch) {
    return { triple: "Double Sharing", double: "Single Private" };
  }
  return { triple: "Triple Sharing", double: "Double Sharing" };
}

// Fees for a whole booking. `sharing` is the card the user picked ("triple" or
// "double"); the actual price band is resolved via tier-shifting above.
// `addOns` is a list of ADDONS keys bundled onto the course.
//
// The balance is always `total - reg`, which holds for every band in FEES.
export function computeFees({
  course, sharing = "triple", numStudents = 1,
  addOns = [], addSoundHealing = false, isFirstBatch = false,
}) {
  const id = COURSE_TYPE_MAP[course];
  const n = Math.max(1, Number(numStudents) || 1);
  if (!id || !FEES[id]) return null;

  // Legacy callers passed a Sound Healing boolean.
  let picked = Array.isArray(addOns) ? addOns.filter((a) => ADDONS[a]) : [];
  if (addSoundHealing && !picked.includes("Sound Healing")) picked = [...picked, "Sound Healing"];
  // Bundles are only offered on teacher trainings.
  if (!YOGA_TTC_COURSES.includes(course)) picked = [];

  const tier = course === "Sound Healing" && isFirstBatch
    ? (sharing === "triple" ? "double" : "single")
    : sharing;
  const band = FEES[id][tier] || FEES[id].triple;

  // Sound Healing carries the negotiated combo price; it replaces the base.
  const combo = picked.includes("Sound Healing") && band.combo != null;

  let total, reg;
  if (combo) {
    const sh = FEES.sound_healing[sharing] || FEES.sound_healing.triple;
    total = band.combo;
    reg = band.reg + sh.reg;
  } else {
    total = band.total;
    reg = band.reg;
  }

  // Remaining add-ons are added at their published fee.
  const lines = [];
  for (const key of picked) {
    if (key === "Sound Healing" && combo) continue; // already folded into the combo
    const a = ADDONS[key];
    const ab = FEES[a.feeKey]?.[sharing] || FEES[a.feeKey]?.triple;
    if (!ab) continue;
    total += ab.total;
    reg += ab.reg;
    lines.push({ key, label: a.label, total: ab.total * n, reg: ab.reg * n });
  }

  return {
    courseId: id,
    tier,
    total: total * n,
    reg: reg * n,
    balance: (total - reg) * n,
    numStudents: n,
    addOns: picked,
    combo,
    // The main course on its own. NOTE: this is NOT `total - soundTotal` when a
    // combo is active — the combo total is already discounted, so subtracting
    // would understate the course price. Always use the raw band figures.
    mainTotal: band.total * n,
    mainReg: band.reg * n,
    // Extra add-on lines (everything except the folded-in Sound Healing combo).
    addOnLines: lines,
    // Combo-only figures, used for the "you save" callout.
    soundTotal: combo ? FEES.sound_healing[sharing].total * n : 0,
    soundReg: combo ? FEES.sound_healing[sharing].reg * n : 0,
    scholarship: combo ? (band.scholarship || 0) * n : 0,
    separate: combo ? (band.separate || 0) * n : 0,
    days: COURSE_DAYS[id] || 7,
  };
}

// Per-gateway breakdown of the amount charged today.
export function gatewayBreakdown(reg) {
  const out = {};
  for (const [key, g] of Object.entries(GATEWAYS)) {
    const fee = +(reg * g.pct).toFixed(2);
    out[key] = { ...g, fee, total: +(reg + fee).toFixed(2) };
  }
  return out;
}

// What's included in the fee, per course (from updateCourseFeeItems()).
export function inclusions(course) {
  const days = COURSE_DAYS[COURSE_TYPE_MAP[course]] || 7;
  const base = [`Stay for ${days} days`, "Breakfast, lunch & dinner"];
  if (course === "Sound Healing" || course === "Yoga Retreat") return base;
  return [...base, "Yoga session on the Ganga Ji ghat", "Pickup from Dehradun airport", "Weekly excursion"];
}
