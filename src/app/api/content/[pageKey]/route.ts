import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  getContent,
  saveContent,
  CONTENT_KEYS,
  HOMEPAGE_DEFAULTS,
  MARIAGE_DEFAULTS,
  DRONE_DEFAULTS,
  CONTACT_DEFAULTS,
} from "@/lib/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULTS: Record<string, any> = {
  content_homepage: HOMEPAGE_DEFAULTS,
  content_mariage: MARIAGE_DEFAULTS,
  content_drone: DRONE_DEFAULTS,
  content_contact: CONTACT_DEFAULTS,
  content_mariage_gallery: {},
};

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;
  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { token } });
    return false;
  }
  return true;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  const { pageKey } = await params;

  if (!CONTENT_KEYS.includes(pageKey as typeof CONTENT_KEYS[number])) {
    return NextResponse.json({ error: "Clé inconnue." }, { status: 400 });
  }

  const defaults = DEFAULTS[pageKey] || {};
  const content = await getContent(pageKey, defaults);
  return NextResponse.json(content);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  const { pageKey } = await params;

  if (!CONTENT_KEYS.includes(pageKey as typeof CONTENT_KEYS[number])) {
    return NextResponse.json({ error: "Clé inconnue." }, { status: 400 });
  }

  const authenticated = await isAuthenticated(request);
  if (!authenticated) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    await saveContent(pageKey, body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la sauvegarde." }, { status: 500 });
  }
}
