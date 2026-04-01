import { NextRequest, NextResponse } from "next/server";

const STATE_CHANGING_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // Allow requests with no origin (server-side, curl, etc.)
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
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
