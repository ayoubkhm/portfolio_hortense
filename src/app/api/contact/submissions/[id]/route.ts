import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;

  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { token } });
    }
    return false;
  }
  return true;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

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
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

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
