import { notFound } from "next/navigation";
import { currentUser } from "@/lib/crm/auth";
import Panel from "./Panel";

// The panel reads live data and is gated on a cookie, so it can never be
// prerendered or cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * The gate.
 *
 * There is no login form here any more — the panel is opened with the access
 * link (/api/leads-panel/key/?k=…), which leaves a 90-day cookie behind, so
 * this page opens straight into the leads for anyone who has been through it.
 *
 * Anyone else gets a plain 404. Not a login form, and not an "access denied"
 * page: both would confirm that something is here worth getting into. A 404 is
 * what every other URL that does not exist returns, so the panel simply is not
 * discoverable without the link.
 *
 * The check happens on the server, before anything renders, so no lead data is
 * ever in the HTML for someone who should not have it. LoginForm.jsx and
 * /api/leads-panel/login/ are still here, unused, for whenever real accounts
 * are wanted again — `crm_users` and the password checking never went away.
 */
export default async function Page() {
  const user = await currentUser();
  if (!user) notFound();
  return <Panel user={{ name: user.u, email: user.e }} />;
}
