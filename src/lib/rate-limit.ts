import { prisma } from "@/lib/db";

/**
 * Database-backed rate limiting.
 * Works across multiple server instances / serverless deployments.
 */
export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): Promise<boolean> {
  const now = new Date();

  // Clean up expired entries periodically (1% chance per request)
  if (Math.random() < 0.01) {
    prisma.rateLimit
      .deleteMany({ where: { expiresAt: { lt: now } } })
      .catch(() => {});
  }

  // Find existing rate limit entry
  const existing = await prisma.rateLimit.findFirst({
    where: { key, expiresAt: { gt: now } },
  });

  if (!existing) {
    // First request in window — create entry
    await prisma.rateLimit.create({
      data: {
        key,
        count: 1,
        expiresAt: new Date(now.getTime() + windowMs),
      },
    });
    return true;
  }

  if (existing.count >= maxAttempts) {
    return false; // Rate limited
  }

  // Increment counter
  await prisma.rateLimit.update({
    where: { id: existing.id },
    data: { count: existing.count + 1 },
  });

  return true;
}
