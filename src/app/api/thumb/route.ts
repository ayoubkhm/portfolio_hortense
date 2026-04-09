import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import { readFile, writeFile, mkdir, access } from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const CACHE_DIR = path.join(process.cwd(), ".thumb-cache");

const ALLOWED_WIDTHS = [400, 800, 1200];

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  const w = parseInt(req.nextUrl.searchParams.get("w") || "800", 10);

  if (!src || !src.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Invalid src" }, { status: 400 });
  }

  // Clamp to allowed widths
  const width = ALLOWED_WIDTHS.reduce((prev, curr) =>
    Math.abs(curr - w) < Math.abs(prev - w) ? curr : prev
  );

  // Validate filename: only hex + extension
  const filename = path.basename(src);
  if (!/^[a-f0-9]+\.(jpg|jpeg|png|webp|avif)$/i.test(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const originalPath = path.join(UPLOAD_DIR, filename);
  const cacheFilename = `${path.parse(filename).name}_w${width}.webp`;
  const cachePath = path.join(CACHE_DIR, cacheFilename);

  // Serve from cache if available
  try {
    await access(cachePath);
    const cached = await readFile(cachePath);
    return new NextResponse(new Uint8Array(cached), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // Not cached yet
  }

  // Read original and resize
  try {
    const original = await readFile(originalPath);
    const resized = await sharp(original)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    // Cache for next time
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cachePath, resized);

    return new NextResponse(new Uint8Array(resized), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
