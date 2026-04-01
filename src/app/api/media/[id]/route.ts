import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteFile } from "@/lib/upload";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canEditContent } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError, admin } = await requireAuth(request);
    if (authError) return authError;

    const roleError = requireRole(admin!, canEditContent);
    if (roleError) return roleError;

    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { error: "Média introuvable." },
        { status: 404 }
      );
    }

    await deleteFile(media.filepath);

    await prisma.media.delete({ where: { id } });

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    logAudit({
      adminId: admin!.id,
      adminEmail: admin!.email,
      action: "DELETE_MEDIA",
      resource: "media",
      details: id,
      ipAddress: ip,
    });

    return NextResponse.json(
      { success: true, message: "Média supprimé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/media/ error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du média." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError, admin } = await requireAuth(request);
    if (authError) return authError;

    const roleError = requireRole(admin!, canEditContent);
    if (roleError) return roleError;

    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { error: "Média introuvable." },
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
      const parentCategory = String(category).split("/")[0];
      const validParents = ["mariage", "drone", "autre"];
      if (!validParents.includes(parentCategory)) {
        return NextResponse.json(
          { error: "Catégorie invalide. Doit commencer par mariage, drone ou autre." },
          { status: 400 }
        );
      }

      // Validate category format: only lowercase letters, numbers, hyphens, and one optional slash
      const categoryStr = String(category);
      const categoryRegex = /^[a-z]+(\/?[a-z0-9\-]+)?$/;
      if (!categoryRegex.test(categoryStr)) {
        return NextResponse.json(
          { error: "Format de catégorie invalide. Utilisez uniquement des lettres minuscules, chiffres et tirets." },
          { status: 400 }
        );
      }

      if (categoryStr.length > 50) {
        return NextResponse.json(
          { error: "Catégorie trop longue (max 50 caractères)." },
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

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    logAudit({
      adminId: admin!.id,
      adminEmail: admin!.email,
      action: "UPDATE_MEDIA",
      resource: "media",
      details: id,
      ipAddress: ip,
    });

    return NextResponse.json({ media: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/media/ error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du média." },
      { status: 500 }
    );
  }
}
