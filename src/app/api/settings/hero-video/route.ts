import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { saveFile } from "@/lib/upload";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canChangeSettings } from "@/lib/roles";

const DEFAULT_HERO_VIDEO = "/uploads/hero-video.mp4";
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "hero-video" },
    });

    return NextResponse.json(
      { path: setting?.value ?? DEFAULT_HERO_VIDEO },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/settings/hero-video error:", error);
    return NextResponse.json(
      { path: DEFAULT_HERO_VIDEO },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error: authError, admin } = await requireAuth(request);
    if (authError) return authError;

    const roleError = requireRole(admin!, canChangeSettings);
    if (roleError) return roleError;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 }
      );
    }

    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Type non autorisé. Formats acceptés : MP4, WebM." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fichier trop volumineux (max 50 MB)." },
        { status: 400 }
      );
    }

    const { filepath } = await saveFile(file);

    await prisma.siteSetting.upsert({
      where: { key: "hero-video" },
      update: { value: filepath },
      create: { key: "hero-video", value: filepath },
    });

    return NextResponse.json({ path: filepath }, { status: 200 });
  } catch (error) {
    console.error("POST /api/settings/hero-video error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload de la vidéo." },
      { status: 500 }
    );
  }
}
