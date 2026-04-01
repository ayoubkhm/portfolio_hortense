import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canManageMessages } from "@/lib/roles";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError, admin } = await requireAuth(request);
    if (authError) return authError;

    const roleError = requireRole(admin!, canManageMessages);
    if (roleError) return roleError;

    const { id } = await params;

    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });
    if (!submission) {
      return NextResponse.json(
        { error: "Soumission introuvable." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { read } = body;

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { read: Boolean(read) },
    });

    return NextResponse.json({ submission: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/contact/submissions/ error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la soumission." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError, admin } = await requireAuth(request);
    if (authError) return authError;

    const roleError = requireRole(admin!, canManageMessages);
    if (roleError) return roleError;

    const { id } = await params;

    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });
    if (!submission) {
      return NextResponse.json(
        { error: "Soumission introuvable." },
        { status: 404 }
      );
    }

    await prisma.contactSubmission.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/contact/submissions/ error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la soumission." },
      { status: 500 }
    );
  }
}
