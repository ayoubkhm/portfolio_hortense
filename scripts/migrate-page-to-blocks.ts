/**
 * Migration script: convert a page's content from legacy flat shape to block-based shape.
 *
 * Usage:
 *   npx tsx scripts/migrate-page-to-blocks.ts --page=mariage --dry-run
 *   npx tsx scripts/migrate-page-to-blocks.ts --page=mariage
 *   npx tsx scripts/migrate-page-to-blocks.ts --page=drone --dry-run
 *   npx tsx scripts/migrate-page-to-blocks.ts --page=drone
 *   npx tsx scripts/migrate-page-to-blocks.ts --page=mariage --rollback
 *
 * Safety:
 *  - Idempotent: if the content is already block-shaped, the script is a no-op.
 *  - Backup: before writing, the legacy value is saved to `<key>_legacy`.
 *  - Dry-run: --dry-run prints the migration plan without touching the DB.
 *  - Rollback: --rollback copies the backup back into the live key.
 */

import { PrismaClient } from "@prisma/client";
import {
  mariageContentToBlocks,
  droneContentToBlocks,
  aproposContentToBlocks,
  homepageContentToBlocks,
  asBlockPageContent,
} from "../src/lib/blocks/migrators";
import {
  MARIAGE_DEFAULTS,
  DRONE_DEFAULTS,
  APROPOS_DEFAULTS,
  HOMEPAGE_DEFAULTS,
  type MariageContent,
  type DroneContent,
  type AProposContent,
  type HomepageContent,
} from "../src/lib/content";

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isRollback = args.includes("--rollback");
const pageArg = args.find((a) => a.startsWith("--page="))?.split("=")[1];

if (!pageArg || (pageArg !== "mariage" && pageArg !== "drone" && pageArg !== "apropos" && pageArg !== "homepage")) {
  console.error("Usage: --page=mariage|drone|apropos|homepage [--dry-run|--rollback]");
  process.exit(1);
}

type PageKey = "mariage" | "drone" | "apropos" | "homepage";
const page = pageArg as PageKey;

const KEY = `content_${page}`;
const BACKUP_KEY = `${KEY}_legacy`;

async function main() {
  if (isRollback) {
    return rollback();
  }

  console.log(`\n→ Reading ${KEY} from DB...`);
  const setting = await prisma.siteSetting.findUnique({ where: { key: KEY } });

  if (!setting) {
    console.log(`✗ No ${KEY} entry found in DB. Nothing to migrate.`);
    process.exit(0);
  }

  let stored: unknown;
  try {
    stored = JSON.parse(setting.value);
  } catch (e) {
    console.error(`✗ Failed to parse ${KEY} as JSON:`, e);
    process.exit(1);
  }

  // Idempotency check
  if (stored && typeof stored === "object" && Array.isArray((stored as { blocks?: unknown }).blocks)) {
    console.log(`✓ ${KEY} is already in block format. Nothing to migrate.`);
    console.log(`  ${(stored as { blocks: unknown[] }).blocks.length} blocks present.`);
    process.exit(0);
  }

  console.log(`→ Detected legacy flat shape. Converting...`);
  console.log(`  (Merging with defaults to preserve fields not yet in DB)`);

  // Merge with defaults so that fields recently added to the schema (e.g. faq,
  // summaryItems) but not yet saved by the user are preserved during migration.
  let blocks;
  if (page === "mariage") {
    const merged = { ...MARIAGE_DEFAULTS, ...(stored as Partial<MariageContent>) } as MariageContent;
    blocks = mariageContentToBlocks(merged);
  } else if (page === "drone") {
    const merged = { ...DRONE_DEFAULTS, ...(stored as Partial<DroneContent>) } as DroneContent;
    blocks = droneContentToBlocks(merged);
  } else if (page === "apropos") {
    const merged = { ...APROPOS_DEFAULTS, ...(stored as Partial<AProposContent>) } as AProposContent;
    blocks = aproposContentToBlocks(merged);
  } else {
    const merged = { ...HOMEPAGE_DEFAULTS, ...(stored as Partial<HomepageContent>) } as HomepageContent;
    blocks = homepageContentToBlocks(merged);
  }

  const newContent = { blocks };

  console.log(`\n  Generated ${blocks.length} blocks:`);
  blocks.forEach((b, i) => {
    const summary = (() => {
      switch (b.type) {
        case "hero":
          return b.data.title;
        case "video-hero":
          return b.data.title;
        case "testimonials":
          return `${b.data.heading} (${b.data.items.length} items)`;
        case "paragraphs":
          return `${b.data.paragraphs.length} paragraph(s)`;
        case "gallery":
          return `${b.data.heading} (${b.data.galleryRef})`;
        case "videos":
          return `${b.data.heading} (${b.data.videos.length} videos)`;
        case "pricing":
          return `${b.data.heading} (${b.data.plans.length} plans)`;
        case "faq":
          return `${b.data.heading} (${b.data.items.length} items)`;
        case "summary":
          return `${b.data.heading} (${b.data.items.length} items)`;
        case "steps":
          return `${b.data.heading} (${b.data.steps.length} steps)`;
        case "certifications":
          return `${b.data.heading} (${b.data.items.length} items)`;
        case "cta":
          return b.data.title;
        case "image-text":
          return b.data.heading || `${b.data.paragraphs.length} paragraph(s)`;
        case "quote":
          return b.data.text.slice(0, 60);
        case "link-cards":
          return `${b.data.heading} (${b.data.cards.length} cards)`;
        case "locked":
          return `LOCKED: ${b.data.rendererKey}`;
      }
    })();
    console.log(`    ${i + 1}. [${b.type}] ${summary}`);
  });

  // Sanity check
  if (!asBlockPageContent(newContent, page)) {
    console.error(`✗ Sanity check failed: converted output is not recognized as BlockPageContent`);
    process.exit(1);
  }

  if (isDryRun) {
    console.log(`\n[DRY RUN] No changes written. Run without --dry-run to commit.`);
    process.exit(0);
  }

  console.log(`\n→ Backing up legacy value to ${BACKUP_KEY}...`);
  await prisma.siteSetting.upsert({
    where: { key: BACKUP_KEY },
    update: { value: setting.value },
    create: { key: BACKUP_KEY, value: setting.value },
  });

  console.log(`→ Writing new block format to ${KEY}...`);
  await prisma.siteSetting.update({
    where: { key: KEY },
    data: { value: JSON.stringify(newContent) },
  });

  console.log(`\n✓ Migration complete.`);
  console.log(`  Legacy backup: ${BACKUP_KEY}`);
  console.log(`  Rollback command: npx tsx scripts/migrate-page-to-blocks.ts --page=${page} --rollback`);
}

async function rollback() {
  console.log(`\n→ Reading ${BACKUP_KEY} from DB...`);
  const backup = await prisma.siteSetting.findUnique({ where: { key: BACKUP_KEY } });

  if (!backup) {
    console.error(`✗ No backup found at ${BACKUP_KEY}. Cannot rollback.`);
    process.exit(1);
  }

  console.log(`→ Restoring ${KEY} from backup...`);
  await prisma.siteSetting.upsert({
    where: { key: KEY },
    update: { value: backup.value },
    create: { key: KEY, value: backup.value },
  });

  console.log(`✓ Rollback complete. ${KEY} restored to legacy format.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
