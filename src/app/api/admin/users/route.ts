import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canManageUsers } from "@/lib/roles";
import { validatePassword } from "@/lib/password-validation";
import { logAudit } from "@/lib/audit";
import { checkRateLimit } from "@/lib/rate-limit";
import { ROLES_LIST } from "@/lib/roles";
import { RATE_LIMITS } from "@/lib/rate-limits-config";
import { getClientIp } from "@/lib/request-utils";

export async function GET(request: NextRequest) {
  const { error: authError, admin } = await requireAuth(request);
  if (authError) return authError;

  const roleError = requireRole(admin!, canManageUsers);
  if (roleError) return roleError;

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

  const allowed = await checkRateLimit(`create-user:${admin!.id}`, RATE_LIMITS.CREATE_USER.max, RATE_LIMITS.CREATE_USER.windowMs);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de créations d'utilisateurs. Réessayez plus tard." },
      { status: 429 }
    );
  }

  const { email, name, password, role } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ error: passwordError }, { status: 400 });
  }

  // Normalize email to prevent duplicates via case/+addressing
  const { normalizeEmail } = await import("@/lib/request-utils");
  const normalizedEmail = normalizeEmail(email);

  const existing = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 400 });
  }

  // New users default to "lecteur" — only proprietaire can set a role
  const adminRole = (role && ROLES_LIST.includes(role)) ? role : "lecteur";

  const hashedPassword = await bcrypt.hash(password, 10);
  const created = await prisma.admin.create({
    data: { email: normalizedEmail, name: name || "", password: hashedPassword, role: adminRole },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  const ip = getClientIp(request);
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
