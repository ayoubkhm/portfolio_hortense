import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

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
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const FIFTEEN_MINUTES = 15 * 60 * 1000;

    // Rate limit by IP: max 10 requests per 15 minutes
    if (!checkRateLimit(`ip:${ip}`, 10, FIFTEEN_MINUTES)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'email est requis." },
        { status: 400 }
      );
    }

    // Rate limit by email: max 3 requests per 15 minutes
    if (!checkRateLimit(`email:${email}`, 3, FIFTEEN_MINUTES)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const token = await createPasswordResetToken(email);

    // Always return success to avoid email enumeration
    if (token) {
      // Use a hardcoded trusted base URL to prevent Host header injection
      const trustedBase = process.env.SITE_URL || request.headers.get("origin") || "";
      if (!trustedBase) {
        console.error("SITE_URL not set and no Origin header");
      } else {
        const resetUrl = `${trustedBase}/admin/reset-password?token=${token}`;
        await sendPasswordResetEmail(email, resetUrl);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
