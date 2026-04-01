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
  if (buffer.length < 12) return false;

  switch (mimetype) {
    case "image/jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png":
      return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    case "image/webp":
      // RIFF....WEBP
      return buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46
        && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;
    case "image/avif":
      // ....ftypavif or ....ftypavis
      return buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70;
    case "video/mp4":
      // ....ftyp at offset 4
      return buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70;
    case "video/webm":
      // WebM starts with EBML header: 0x1A 0x45 0xDF 0xA3
      return buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3;
    default:
      return false; // Reject unknown types
  }
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
