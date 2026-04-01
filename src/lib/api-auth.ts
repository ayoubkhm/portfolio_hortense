import { NextRequest, NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";

export async function requireAuth(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return { error: NextResponse.json({ error: "Non autorisé." }, { status: 401 }), admin: null };
  const admin = await getSessionAdmin(token);
  if (!admin) return { error: NextResponse.json({ error: "Session invalide." }, { status: 401 }), admin: null };
  return { error: null, admin };
}

export function requireRole(admin: { role: string }, check: (role: string) => boolean) {
  if (!check(admin.role)) {
    return NextResponse.json({ error: "Accès insuffisant." }, { status: 403 });
  }
  return null;
}
