import { NextRequest, NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  const admin = await getSessionAdmin(token);
  if (!admin) {
    return NextResponse.json({ error: "Session invalide." }, { status: 401 });
  }

  return NextResponse.json({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });
}
