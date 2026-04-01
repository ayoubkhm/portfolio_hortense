import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, createSession, setSessionCookie } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { checkRateLimit } from "@/lib/rate-limit";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'email est requis." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Le mot de passe est requis." },
        { status: 400 }
      );
    }

    // Rate limit by email: max 5 attempts per 15 minutes
    const allowed = await checkRateLimit(`login:${email}`, 5, FIFTEEN_MINUTES);
    if (!allowed) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const { valid, adminId } = await verifyAdmin(email, password);

    if (!valid || !adminId) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    logAudit({
      adminId,
      adminEmail: email,
      action: "LOGIN",
      resource: "auth",
      details: email,
      ipAddress: ip,
    });

    const token = await createSession(adminId);
    const cookie = setSessionCookie(token);

    const response = NextResponse.json(
      { success: true, message: "Connexion réussie." },
      { status: 200 }
    );

    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      maxAge: cookie.maxAge,
      path: cookie.path,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
