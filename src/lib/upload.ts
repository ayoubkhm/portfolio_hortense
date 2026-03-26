import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
];
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Type non autorisé: ${file.type}. Formats acceptés: JPEG, PNG, WebP, AVIF, MP4, WebM`;
  }
  if (file.size > MAX_SIZE) {
    return `Fichier trop volumineux (max ${MAX_SIZE / 1024 / 1024}MB)`;
  }
  return null;
}

export async function saveFile(file: File): Promise<{ filename: string; filepath: string }> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name);
  const filename = `${crypto.randomBytes(16).toString("hex")}${ext}`;
  const filepath = `/uploads/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return { filename, filepath };
}

export async function deleteFile(filepath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), "public", filepath);
  try {
    await unlink(fullPath);
  } catch {
    // File might not exist
  }
}
