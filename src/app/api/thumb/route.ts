import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import { readFile, writeFile, mkdir } from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const CACHE_DIR = path.join(process.cwd(), ".thumb-cache");
const ALLOWED_WIDTHS = [400, 800, 1200];

// Ensure cache dir exists once at startup, not per-request
const cacheReady = mkdir(CACHE_DIR, { recursive: true }).catch(() => {});

const HEADERS = {
  "Content-Type": "image/webp",
  "Cache-Control": "public, max-age=31536000, immutable",
};

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  const w = parseInt(req.nextUrl.searchParams.get("w") || "800", 10);

  if (!src || !src.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Invalid src" }, { status: 400 });
  }

  const width = ALLOWED_WIDTHS.reduce((prev, curr) =>
    Math.abs(curr - w) < Math.abs(prev - w) ? curr : prev
  );

  const filename = path.basename(src);
  if (!/^[a-f0-9]+\.(jpg|jpeg|png|webp|avif)$/i.test(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const originalPath = path.join(UPLOAD_DIR, filename);
  const cacheFilename = `${path.parse(filename).name}_w${width}.webp`;
  const cachePath = path.join(CACHE_DIR, cacheFilename);

  // Try cache first (no TOCTOU — just read directly)
  try {
    const cached = await readFile(cachePath);
    return new NextResponse(new Uint8Array(cached), { headers: HEADERS });
  } catch {
    // Not cached yet — generate
  }

  try {
    const original = await readFile(originalPath);
    const resized = await sharp(original)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    await cacheReady;
    writeFile(cachePath, resized).catch(() => {}); // fire-and-forget cache write

    return new NextResponse(new Uint8Array(resized), { headers: HEADERS });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
