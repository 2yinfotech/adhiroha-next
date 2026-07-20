// PayPal REST (Orders v2) helper for the admission panel.
//
// Replaces the old panel's `_xclick` redirect, which sent the shopper to PayPal
// with the price in the query string and trusted whatever came back. Here the
// order is created server-side and captured server-side, so the amount is never
// client-controlled and a booking is only confirmed once PayPal reports the
// capture COMPLETED.
//
// Env: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENV ("live" | "sandbox").

const LIVE = "https://api-m.paypal.com";
const SANDBOX = "https://api-m.sandbox.paypal.com";

export function paypalBase() {
  return (process.env.PAYPAL_ENV || "live").toLowerCase() === "sandbox" ? SANDBOX : LIVE;
}

export function paypalConfigured() {
  return !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

// Access tokens last ~9 hours; cache until shortly before expiry.
let _token = null;
async function accessToken() {
  if (_token && _token.exp > Date.now() + 60_000) return _token.value;

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || "PayPal auth failed");

  _token = { value: data.access_token, exp: Date.now() + (data.expires_in || 32400) * 1000 };
  return _token.value;
}

export async function createPayPalOrder({ amount, currency = "EUR", reference, description }) {
  const token = await accessToken();
  const res = await fetch(`${paypalBase()}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: (reference || "adhiroha").slice(0, 256),
          description: (description || "Adhiroha registration fee").slice(0, 127),
          amount: { currency_code: currency, value: Number(amount).toFixed(2) },
        },
      ],
      application_context: {
        brand_name: "Adhiroha Yoga Ashram",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Could not create PayPal order");
  return data;
}

export async function capturePayPalOrder(orderId) {
  const token = await accessToken();
  const res = await fetch(`${paypalBase()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Could not capture PayPal payment");
  return data;
}

// Pulls the completed capture out of a capture response, or null if none is.
export function completedCapture(order) {
  const cap = order?.purchase_units?.[0]?.payments?.captures?.[0];
  if (!cap || cap.status !== "COMPLETED") return null;
  return {
    id: cap.id,
    amount: Number(cap.amount?.value || 0),
    currency: cap.amount?.currency_code || "",
  };
}
