import { NextResponse } from "next/server";
import { COOKIE_NAME, cookieOptions } from "@/lib/crm/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
