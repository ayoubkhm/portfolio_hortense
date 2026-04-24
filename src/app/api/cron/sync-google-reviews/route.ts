import { NextRequest, NextResponse } from "next/server";
import { syncReviews } from "@/lib/google-reviews";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function constantTimeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// GET (not POST) on purpose: middleware enforces CSRF Origin checks on
// state-changing methods, which cron jobs (no browser context) can't satisfy.
// The CRON_SECRET header replaces CSRF protection here. The op is effectively
// idempotent thanks to externalId-based dedup.
export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    console.error("[cron] CRON_SECRET not set — refusing to run");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const provided = request.headers.get("x-cron-secret");
  if (!provided || !constantTimeEqual(provided, expected)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await syncReviews();
    console.log(`[cron] sync-google-reviews: fetched=${result.fetched} inserted=${result.inserted} skipped=${result.skipped}`);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[cron] sync-google-reviews failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
