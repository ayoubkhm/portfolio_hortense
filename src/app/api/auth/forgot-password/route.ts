import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'email est requis." },
        { status: 400 }
      );
    }

    const token = await createPasswordResetToken(email);

    // Always return success to avoid email enumeration
    if (token) {
      const baseUrl = request.headers.get("origin") || request.headers.get("host") || "";
      const protocol = baseUrl.startsWith("http") ? "" : "https://";
      const resetUrl = `${protocol}${baseUrl}/admin/reset-password?token=${token}`;

      await sendPasswordResetEmail(email, resetUrl);
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
