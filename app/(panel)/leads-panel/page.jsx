import { currentUser } from "@/lib/crm/auth";
import LoginForm from "./LoginForm";
import Panel from "./Panel";

// The panel reads live data and is gated on a cookie, so it can never be
// prerendered or cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * The gate.
 *
 * The check happens on the server, before anything renders: a signed-out
 * visitor is sent the login form and nothing else, so no lead data is ever in
 * the HTML for someone who is not signed in. Hiding the panel with CSS or a
 * client-side redirect would still have shipped the names and email addresses.
 */
export default async function Page() {
  const user = await currentUser();
  if (!user) return <LoginForm />;
  return <Panel user={{ name: user.u, email: user.e }} />;
}
