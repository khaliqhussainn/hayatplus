import { NextResponse } from "next/server";
import { checkAdminPassword, issueSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: Request) {
  let body: { password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await issueSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "Admin login is not configured (ADMIN_PASSWORD missing)" },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
