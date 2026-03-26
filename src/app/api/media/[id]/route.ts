import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteFile } from "@/lib/upload";

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: "Non autoris\u00e9." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { error: "M\u00e9dia introuvable." },
        { status: 404 }
      );
    }

    await deleteFile(media.filepath);

    await prisma.media.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "M\u00e9dia supprim\u00e9." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/media/ error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du m\u00e9dia." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: "Non autoris\u00e9." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { error: "M\u00e9dia introuvable." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { alt, category, sortOrder, featured } = body;

    const updateData: Record<string, unknown> = {};

    if (alt !== undefined) {
      updateData.alt = String(alt);
    }

    if (category !== undefined) {
      const validCategories = [
        "mariage",
        "drone-immobilier",
        "drone-chantier",
        "drone-evenement",
      ];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: "Cat\u00e9gorie invalide." },
          { status: 400 }
        );
      }
      updateData.category = category;
    }

    if (sortOrder !== undefined) {
      updateData.sortOrder = Number(sortOrder);
    }

    if (featured !== undefined) {
      updateData.featured = Boolean(featured);
    }

    const updated = await prisma.media.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ media: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/media/ error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise \u00e0 jour du m\u00e9dia." },
      { status: 500 }
    );
  }
}
