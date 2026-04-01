import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canManageUsers } from "@/lib/roles";
import { validatePassword } from "@/lib/password-validation";
import { logAudit } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { error: authError } = await requireAuth(request);
  if (authError) return authError;

  const admins = await prisma.admin.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ admins });
}

export async function POST(request: NextRequest) {
  const { error: authError, admin } = await requireAuth(request);
  if (authError) return authError;

  const roleError = requireRole(admin!, canManageUsers);
  if (roleError) return roleError;

  const { email, name, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ error: passwordError }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 400 });
  }

  const { role } = await request.clone().json().catch(() => ({}));
  const validRoles = ["lecteur", "createur", "proprietaire"];
  const adminRole = validRoles.includes(role) ? role : "lecteur";

  const hashedPassword = await bcrypt.hash(password, 10);
  const created = await prisma.admin.create({
    data: { email, name: name || "", password: hashedPassword, role: adminRole },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  logAudit({
    adminId: admin!.id,
    adminEmail: admin!.email,
    action: "CREATE_USER",
    resource: "admin",
    details: email,
    ipAddress: ip,
  });

  return NextResponse.json({ admin: created }, { status: 201 });
}
