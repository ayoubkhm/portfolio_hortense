import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateFile, saveFile } from "@/lib/upload";

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where = category ? { category } : {};

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
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

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

    const validCategories = [
      "mariage",
      "drone-immobilier",
      "drone-chantier",
      "drone-evenement",
    ];

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Catégorie invalide. Valeurs acceptées: ${validCategories.join(", ")}` },
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

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error("POST /api/media error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload du média." },
      { status: 500 }
    );
  }
}
