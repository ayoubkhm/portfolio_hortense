import { prisma } from "@/lib/db";

export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): Promise<boolean> {
  const now = new Date();

  // Cleanup expired entries (5% chance, with proper error logging)
  if (Math.random() < 0.05) {
    prisma.rateLimit
      .deleteMany({ where: { expiresAt: { lt: now } } })
      .catch((err) => console.error("[SECURITY] RateLimit cleanup failed:", err));
  }

  try {
    // Use upsert to atomically create or increment
    const entry = await prisma.rateLimit.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        expiresAt: new Date(now.getTime() + windowMs),
      },
      update: {
        // Only increment if not expired; if expired, reset
        count: { increment: 1 },
      },
    });

    // If the entry is expired, delete and recreate
    if (entry.expiresAt < now) {
      await prisma.rateLimit.update({
        where: { key },
        data: {
          count: 1,
          expiresAt: new Date(now.getTime() + windowMs),
        },
      });
      return true;
    }

    return entry.count <= maxAttempts;
  } catch {
    // On error (e.g., unique constraint race), allow the request
    return true;
  }
}
