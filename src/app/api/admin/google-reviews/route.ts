import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { protectedHandler } from "@/lib/api-handler";
import { canEditContent } from "@/lib/roles";
import { syncReviews } from "@/lib/google-reviews";

export const GET = protectedHandler(
  async () => {
    const reviews = await prisma.googleReview.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ reviews });
  },
  { roleCheck: canEditContent }
);

// Manual "Sync now" trigger from the admin UI.
export const POST = protectedHandler(
  async () => {
    try {
      const result = await syncReviews();
      return NextResponse.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },
  { roleCheck: canEditContent, audit: { action: "SYNC_GOOGLE_REVIEWS", resource: "google-reviews" } }
);
