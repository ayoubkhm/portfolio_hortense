import { NextRequest, NextResponse } from "next/server";
import { canEditContent } from "@/lib/roles";
import { protectedHandler } from "@/lib/api-handler";
import { sanitizeContent, validateContentSize } from "@/lib/content-sanitizer";
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

export const PUT = protectedHandler(
  async (request, { params }) => {
    const pageKey = params?.pageKey;

    if (!pageKey || !CONTENT_KEYS.includes(pageKey as typeof CONTENT_KEYS[number])) {
      return NextResponse.json({ error: "Clé inconnue." }, { status: 400 });
    }

    const body = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    if (!validateContentSize(body)) {
      return NextResponse.json({ error: "Contenu trop volumineux." }, { status: 400 });
    }
    const sanitized = sanitizeContent(body);
    await saveContent(pageKey, sanitized);

    return NextResponse.json({ success: true });
  },
  {
    roleCheck: canEditContent,
    audit: { action: "UPDATE_CONTENT", resource: "content" },
  }
);
