import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, createSession, setSessionCookie } from "@/lib/auth";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

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
    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    if (!checkRateLimit(`login:${email}`, 5, FIFTEEN_MINUTES)) {
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
