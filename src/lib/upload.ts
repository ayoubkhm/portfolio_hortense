import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
};
const ALLOWED_TYPES = Object.keys(MIME_TO_EXT);
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

function validateMagicBytes(buffer: Buffer, mimetype: string): boolean {
  const signatures: Record<string, number[]> = {
    "image/jpeg": [0xff, 0xd8, 0xff],
    "image/png": [0x89, 0x50, 0x4e, 0x47],
    "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF
    "video/mp4": [0x00, 0x00, 0x00], // ftyp at offset 4
  };
  const sig = signatures[mimetype];
  if (!sig) return true; // Skip check for types without known signature
  return sig.every((byte, i) => buffer[i] === byte);
}

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

  const ext = MIME_TO_EXT[file.type];
  if (!ext) throw new Error("Type de fichier non supporté");

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!validateMagicBytes(buffer, file.type)) {
    throw new Error("Le contenu du fichier ne correspond pas au type MIME déclaré");
  }

  const filename = `${crypto.randomBytes(16).toString("hex")}${ext}`;
  const filepath = `/uploads/${filename}`;

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
