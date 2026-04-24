import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { RATE_LIMITS } from "@/lib/rate-limits-config";
import { getClientIp, normalizeEmail } from "@/lib/request-utils";

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

    const normalizedEmail = normalizeEmail(email);

    // Rate limit by email: max 3 requests per 15 minutes
    const emailAllowed = await checkRateLimit(`reset-email:${normalizedEmail}`, RATE_LIMITS.PASSWORD_RESET_EMAIL.max, RATE_LIMITS.PASSWORD_RESET_EMAIL.windowMs);
    if (!emailAllowed) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const token = await createPasswordResetToken(normalizedEmail);

    // Always return success to avoid email enumeration
    if (token) {
      // Fail closed: never fall back to the request Origin/Host, which an
      // attacker can control via Host header injection and use to steal the
      // reset token by pointing the email at their own domain.
      const trustedBase = process.env.SITE_URL;
      if (!trustedBase) {
        console.error("[SECURITY] SITE_URL not set — password reset email not sent");
      } else {
        const resetUrl = `${trustedBase}/admin/reset-password?token=${token}`;
        const sent = await sendPasswordResetEmail(email, resetUrl);
        if (!sent) {
          // Resend is in sandbox: only the account owner (Hortense) can receive
          // emails. Other admins can't self-reset; they must ask the owner to
          // reset their password from /admin/users. Logged for visibility.
          console.warn(`[auth] Password reset email NOT delivered to ${email} (Resend sandbox or other failure — see prior log).`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Si un compte admin existe avec cet email, un lien de réinitialisation est envoyé. Si vous ne le recevez pas, contactez la propriétaire du site pour un reset manuel.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
