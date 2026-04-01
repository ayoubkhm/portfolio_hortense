import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateFile, saveFile } from "@/lib/upload";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canEditContent } from "@/lib/roles";
import { logAudit } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Support filtering by parent category (e.g. "drone" matches "drone", "drone/immobilier", etc.)
    const where = category
      ? {
          OR: [
            { category },
            { category: { startsWith: `${category}/` } },
          ],
        }
      : {};

    const media = await prisma.media.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ media }, { status: 200 });
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des médias." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError, admin } = await requireAuth(request);
    if (authError) return authError;

    const roleError = requireRole(admin!, canEditContent);
    if (roleError) return roleError;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;
    const alt = (formData.get("alt") as string) || "";

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "La catégorie est requise." },
        { status: 400 }
      );
    }

    // Category format: "mariage" or "mariage/preparatifs" or "drone/immobilier"
    const parentCategory = category.split("/")[0];
    const validParents = ["mariage", "drone", "autre"];

    if (!validParents.includes(parentCategory)) {
      return NextResponse.json(
        { error: `Catégorie parente invalide. Valeurs acceptées : ${validParents.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate category format: only lowercase letters, numbers, hyphens, and one optional slash
    const categoryRegex = /^[a-z]+(\/?[a-z0-9\-]+)?$/;
    if (!categoryRegex.test(category)) {
      return NextResponse.json(
        { error: "Format de catégorie invalide. Utilisez uniquement des lettres minuscules, chiffres et tirets." },
        { status: 400 }
      );
    }

    // Also limit length
    if (category.length > 50) {
      return NextResponse.json(
        { error: "Catégorie trop longue (max 50 caractères)." },
        { status: 400 }
      );
    }

    const validationError = validateFile(file);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const { filename, filepath } = await saveFile(file);

    const maxSortOrder = await prisma.media.aggregate({
      _max: { sortOrder: true },
      where: { category },
    });

    const sortOrder = (maxSortOrder._max.sortOrder ?? -1) + 1;

    const media = await prisma.media.create({
      data: {
        filename,
        filepath,
        mimetype: file.type,
        category,
        alt,
        sortOrder,
      },
    });

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    logAudit({
      adminId: admin!.id,
      adminEmail: admin!.email,
      action: "UPLOAD_MEDIA",
      resource: "media",
      details: filename,
      ipAddress: ip,
    });

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error("POST /api/media error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload du média." },
      { status: 500 }
    );
  }
}
