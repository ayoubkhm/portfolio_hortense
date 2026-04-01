import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/lib/auth";
import { validatePassword } from "@/lib/password-validation";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token et mot de passe requis." },
        { status: 400 }
      );
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json(
        { error: passwordError },
        { status: 400 }
      );
    }

    const success = await resetPassword(token, password);

    if (!success) {
      return NextResponse.json(
        { error: "Lien expiré ou invalide. Veuillez refaire une demande." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
