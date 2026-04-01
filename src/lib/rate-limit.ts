import { prisma } from "@/lib/db";

let requestCounter = 0;

export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): Promise<boolean> {
  const now = new Date();

  // Deterministic cleanup every 20 requests
  requestCounter++;
  if (requestCounter >= 20) {
    requestCounter = 0;
    prisma.rateLimit
      .deleteMany({ where: { expiresAt: { lt: now } } })
      .catch((err) => console.error("[SECURITY] RateLimit cleanup failed:", err));
  }

  try {
    const entry = await prisma.rateLimit.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        expiresAt: new Date(now.getTime() + windowMs),
      },
      update: {
        count: { increment: 1 },
      },
    });

    // If expired, reset
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
    return true;
  }
}
