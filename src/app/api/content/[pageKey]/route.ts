import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireRole } from "@/lib/api-auth";
import { canEditContent } from "@/lib/roles";
import { logAudit } from "@/lib/audit";
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
  content_theme: {},
};

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

  const { error: authError, admin } = await requireAuth(request);
  if (authError) return authError;

  const roleError = requireRole(admin!, canEditContent);
  if (roleError) return roleError;

  try {
    const body = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    await saveContent(pageKey, body);

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    logAudit({
      adminId: admin!.id,
      adminEmail: admin!.email,
      action: "UPDATE_CONTENT",
      resource: "content",
      details: pageKey,
      ipAddress: ip,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la sauvegarde." }, { status: 500 });
  }
}
