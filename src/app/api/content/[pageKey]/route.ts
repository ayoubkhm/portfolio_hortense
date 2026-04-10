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
  APROPOS_DEFAULTS,
  MARIAGE_GALLERY_DEFAULTS,
  DRONE_GALLERY_DEFAULTS,
  CONTACT_DEFAULTS,
} from "@/lib/content";
import { asBlockPageContent, mariageContentToBlocks, droneContentToBlocks, aproposContentToBlocks, homepageContentToBlocks } from "@/lib/blocks/migrators";
import { SEO_DEFAULTS } from "@/lib/metadata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULTS: Record<string, any> = {
  content_homepage: HOMEPAGE_DEFAULTS,
  content_mariage: MARIAGE_DEFAULTS,
  content_drone: DRONE_DEFAULTS,
  content_apropos: APROPOS_DEFAULTS,
  content_mariage_gallery: MARIAGE_GALLERY_DEFAULTS,
  content_drone_gallery: DRONE_GALLERY_DEFAULTS,
  content_contact: CONTACT_DEFAULTS,
  content_theme: {},
  content_seo: SEO_DEFAULTS,
};

// Block-based pages: keys for which we return a normalized block shape
// instead of the legacy flat shape. The admin and the page expect blocks.
const BLOCK_BASED_KEYS = new Set(["content_mariage", "content_drone", "content_apropos", "content_homepage"]);

// Maps DB keys to legacy converters (for asBlockPageContent)
function legacyKeyHint(pageKey: string): "mariage" | "drone" | "apropos" | "homepage" {
  if (pageKey === "content_drone") return "drone";
  if (pageKey === "content_apropos") return "apropos";
  if (pageKey === "content_homepage") return "homepage";
  return "mariage";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  const { pageKey } = await params;

  if (!CONTENT_KEYS.includes(pageKey as typeof CONTENT_KEYS[number])) {
    return NextResponse.json({ error: "Clé inconnue." }, { status: 400 });
  }

  // Block-based pages: bypass the generic merge (which would mix old/new shapes
  // into a polluted object). Read raw stored value, normalize to blocks, return.
  if (BLOCK_BASED_KEYS.has(pageKey)) {
    const stored = await getContent<unknown>(pageKey, null);
    const hint = legacyKeyHint(pageKey);
    let fallback;
    if (pageKey === "content_drone") {
      fallback = { blocks: droneContentToBlocks(DRONE_DEFAULTS) };
    } else if (pageKey === "content_apropos") {
      fallback = { blocks: aproposContentToBlocks(APROPOS_DEFAULTS) };
    } else if (pageKey === "content_homepage") {
      fallback = { blocks: homepageContentToBlocks(HOMEPAGE_DEFAULTS) };
    } else {
      fallback = { blocks: mariageContentToBlocks(MARIAGE_DEFAULTS) };
    }
    const normalized = asBlockPageContent(stored, hint) ?? fallback;
    return NextResponse.json(normalized);
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
