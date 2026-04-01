import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canManageUsers } from "@/lib/roles";
import { validatePassword } from "@/lib/password-validation";
import { logAudit } from "@/lib/audit";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError, admin } = await requireAuth(request);
  if (authError) return authError;

  const roleError = requireRole(admin!, canManageUsers);
  if (roleError) return roleError;

  const { id } = await params;
  const body = await request.json();
  const { name, password, role } = body;

  const target = await prisma.admin.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {};
  if (name !== undefined) updateData.name = name;
  if (role !== undefined) {
    const validRoles = ["lecteur", "createur", "proprietaire"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Rôle invalide." }, { status: 400 });
    }
    updateData.role = role;
  }
  if (password) {
    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }
    updateData.password = await bcrypt.hash(password, 10);
  }

  const updated = await prisma.admin.update({
    where: { id },
    data: updateData,
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  logAudit({
    adminId: admin!.id,
    adminEmail: admin!.email,
    action: "UPDATE_USER",
    resource: "admin",
    details: id,
    ipAddress: ip,
  });

  return NextResponse.json({ admin: updated });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError, admin } = await requireAuth(request);
  if (authError) return authError;

  const roleError = requireRole(admin!, canManageUsers);
  if (roleError) return roleError;

  const { id } = await params;

  const count = await prisma.admin.count();
  if (count <= 1) {
    return NextResponse.json({ error: "Impossible de supprimer le dernier administrateur." }, { status: 400 });
  }

  await prisma.admin.delete({ where: { id } });

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  logAudit({
    adminId: admin!.id,
    adminEmail: admin!.email,
    action: "DELETE_USER",
    resource: "admin",
    details: id,
    ipAddress: ip,
  });

  return NextResponse.json({ success: true });
}
