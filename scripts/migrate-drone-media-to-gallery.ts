/**
 * Migration script: import existing drone Media rows into content_drone_gallery.
 *
 * The drone gallery used to be backed by the Media table directly (rows with
 * category='drone'). It now uses a SiteSetting JSON (`content_drone_gallery`)
 * with items containing thumbnail + video + alt. This script imports the old
 * Media rows as items, preserving the photos (Media rows are NOT deleted).
 *
 * Usage:
 *   npx tsx scripts/migrate-drone-media-to-gallery.ts --dry-run
 *   npx tsx scripts/migrate-drone-media-to-gallery.ts
 *   npx tsx scripts/migrate-drone-media-to-gallery.ts --rollback
 *
 * Safety:
 *  - Idempotent: skips if content_drone_gallery already has items
 *  - Backup: existing content_drone_gallery (if any) is saved to
 *    content_drone_gallery_legacy before write
 *  - Media table is NOT touched
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isRollback = args.includes("--rollback");

const KEY = "content_drone_gallery";
const BACKUP_KEY = "content_drone_gallery_legacy";

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function main() {
  if (isRollback) return rollback();

  console.log(`\n→ Reading current ${KEY} value...`);
  const existing = await prisma.siteSetting.findUnique({ where: { key: KEY } });
  let existingItems: unknown[] = [];
  if (existing) {
    try {
      const parsed = JSON.parse(existing.value);
      if (parsed && Array.isArray(parsed.items)) {
        existingItems = parsed.items;
      }
    } catch {
      /* ignore */
    }
  }

  if (existingItems.length > 0) {
    console.log(`✓ ${KEY} already has ${existingItems.length} item(s). Skipping import.`);
    console.log(`  (Run --rollback to restore from backup if needed.)`);
    process.exit(0);
  }

  console.log(`→ Reading drone Media rows...`);
  const mediaRows = await prisma.media.findMany({
    where: { category: "drone" },
    orderBy: { createdAt: "asc" },
  });

  if (mediaRows.length === 0) {
    console.log(`✗ No drone Media rows found. Nothing to import.`);
    process.exit(0);
  }

  console.log(`  Found ${mediaRows.length} drone media row(s).`);

  const items = mediaRows.map((m) => ({
    id: newId(),
    thumbnail: m.filepath,
    video: "", // empty = pas de vidéo encore, à compléter par Hortense
    alt: m.alt || m.filename || "",
  }));

  console.log(`\n  Generated ${items.length} drone gallery items:`);
  items.forEach((it, i) => {
    console.log(`    ${i + 1}. ${it.thumbnail}  (alt: "${it.alt || '(empty)'}")`);
  });

  const newContent = { items };

  if (isDryRun) {
    console.log(`\n[DRY RUN] No changes written. Run without --dry-run to commit.`);
    process.exit(0);
  }

  // Backup existing value (even if empty, helps with rollback)
  if (existing) {
    console.log(`\n→ Backing up existing ${KEY} to ${BACKUP_KEY}...`);
    await prisma.siteSetting.upsert({
      where: { key: BACKUP_KEY },
      update: { value: existing.value },
      create: { key: BACKUP_KEY, value: existing.value },
    });
  }

  console.log(`→ Writing new ${KEY}...`);
  await prisma.siteSetting.upsert({
    where: { key: KEY },
    update: { value: JSON.stringify(newContent) },
    create: { key: KEY, value: JSON.stringify(newContent) },
  });

  console.log(`\n✓ Migration complete.`);
  if (existing) {
    console.log(`  Legacy backup: ${BACKUP_KEY}`);
    console.log(`  Rollback command: npx tsx scripts/migrate-drone-media-to-gallery.ts --rollback`);
  }
  console.log(`  Note: existing Media rows (category=drone) are intact and not modified.`);
}

async function rollback() {
  console.log(`\n→ Reading ${BACKUP_KEY} from DB...`);
  const backup = await prisma.siteSetting.findUnique({ where: { key: BACKUP_KEY } });

  if (!backup) {
    console.error(`✗ No backup found at ${BACKUP_KEY}.`);
    console.error(`  If you want to clear the gallery instead, manually delete ${KEY} from DB.`);
    process.exit(1);
  }

  console.log(`→ Restoring ${KEY} from backup...`);
  await prisma.siteSetting.upsert({
    where: { key: KEY },
    update: { value: backup.value },
    create: { key: KEY, value: backup.value },
  });

  console.log(`✓ Rollback complete.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
