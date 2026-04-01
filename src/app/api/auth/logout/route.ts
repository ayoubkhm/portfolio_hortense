import { NextResponse } from "next/server";
import { getSessionAdmin, deleteSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (token) {
      const admin = await getSessionAdmin(token);
      if (admin) {
        logAudit({
          adminId: admin.id,
          adminEmail: admin.email,
          action: "LOGOUT",
          resource: "auth",
        });
      }
    }
    await deleteSession();

    const response = NextResponse.json(
      { success: true, message: "Déconnexion réussie." },
      { status: 200 }
    );

    response.cookies.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || process.env.FORCE_SECURE_COOKIES === "true",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion." },
      { status: 500 }
    );
  }
}
