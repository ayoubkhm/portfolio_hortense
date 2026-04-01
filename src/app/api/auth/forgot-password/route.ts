import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { RATE_LIMITS } from "@/lib/rate-limits-config";
import { getClientIp } from "@/lib/request-utils";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Rate limit by IP: max 10 requests per 15 minutes
    const ipAllowed = await checkRateLimit(`reset-ip:${ip}`, RATE_LIMITS.PASSWORD_RESET_IP.max, RATE_LIMITS.PASSWORD_RESET_IP.windowMs);
    if (!ipAllowed) {
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
    const emailAllowed = await checkRateLimit(`reset-email:${email}`, RATE_LIMITS.PASSWORD_RESET_EMAIL.max, RATE_LIMITS.PASSWORD_RESET_EMAIL.windowMs);
    if (!emailAllowed) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const token = await createPasswordResetToken(email);

    // Always return success to avoid email enumeration
    if (token) {
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
