import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/labs/:path*"],
};

export function middleware(req: NextRequest) {
  // If user DOES have your Firebase cookie → allow
  const token = req.cookies.get("firebaseAuthToken");
  if (token) return NextResponse.next();

  // Otherwise → redirect to login
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}
