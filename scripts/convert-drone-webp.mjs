import sharp from "sharp";
import { readdir, stat, mkdir, rename } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DRONE_DIR = join(__dirname, "..", "public", "uploads", "drone");
const BACKUP_DIR = join(DRONE_DIR, "backup");
const QUALITY = 80;

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  await mkdir(BACKUP_DIR, { recursive: true });

  const files = (await readdir(DRONE_DIR)).filter(
    (f) => extname(f).toLowerCase() === ".png"
  );

  if (files.length === 0) {
    console.log("No PNG files found.");
    return;
  }

  console.log(`Found ${files.length} PNG files to convert.\n`);
  console.log(
    "File".padEnd(40) +
      "Original".padEnd(15) +
      "WebP".padEnd(15) +
      "Reduction"
  );
  console.log("-".repeat(85));

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of files) {
    const srcPath = join(DRONE_DIR, file);
    const baseName = basename(file, extname(file));
    const webpPath = join(DRONE_DIR, `${baseName}.webp`);
    const backupPath = join(BACKUP_DIR, file);

    const origSize = (await stat(srcPath)).size;
    totalOriginal += origSize;

    await sharp(srcPath).webp({ quality: QUALITY }).toFile(webpPath);

    const webpSize = (await stat(webpPath)).size;
    totalWebp += webpSize;

    await rename(srcPath, backupPath);

    const reduction = ((1 - webpSize / origSize) * 100).toFixed(1);
    console.log(
      baseName.padEnd(40) +
        formatSize(origSize).padEnd(15) +
        formatSize(webpSize).padEnd(15) +
        `${reduction}%`
    );
  }

  console.log("-".repeat(85));
  console.log(
    "TOTAL".padEnd(40) +
      formatSize(totalOriginal).padEnd(15) +
      formatSize(totalWebp).padEnd(15) +
      `${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`
  );
  console.log(`\nOriginal PNGs backed up to: ${BACKUP_DIR}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
