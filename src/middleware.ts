import { NextRequest, NextResponse } from "next/server";

const STATE_CHANGING_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

function normalizeHost(h: string): string {
  return h.replace(/^www\./, "").split(":")[0];
}

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const referer = request.headers.get("referer");

  // If Origin header is present, validate it matches (ignoring www prefix)
  if (origin) {
    try {
      const originUrl = new URL(origin);
      return normalizeHost(originUrl.host) === normalizeHost(host || "");
    } catch {
      return false;
    }
  }

  // No Origin header — fall back to Referer check
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return normalizeHost(refererUrl.host) === normalizeHost(host || "");
    } catch {
      return false;
    }
  }

  // No Origin AND no Referer — block the request
  // Legitimate browser requests always send at least one of these
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // CSRF protection: validate origin on state-changing API requests
  if (
    pathname.startsWith("/api") &&
    STATE_CHANGING_METHODS.includes(request.method)
  ) {
    if (!validateOrigin(request)) {
      return new NextResponse("Forbidden: origin mismatch", { status: 403 });
    }
  }

  // Protect /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
