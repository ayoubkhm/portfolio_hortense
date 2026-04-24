import crypto from "crypto";
import { prisma } from "./db";

// Google Places API Legacy Place Details — accepts cid= directly, which works
// for Service Area Businesses (the New Places API search endpoints don't index
// SABs and return empty for Hortense).
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

interface GoogleReviewRaw {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number; // Unix seconds
  language?: string;
}

interface PlaceDetailsResponse {
  status: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReviewRaw[];
  };
}

/** sha256(authorName + ":" + isoPublishedAt) — stable, deterministic dedup key. */
function buildExternalId(authorName: string, publishedAt: Date): string {
  return crypto
    .createHash("sha256")
    .update(`${authorName}:${publishedAt.toISOString()}`)
    .digest("hex");
}

/**
 * Fetch the latest Google reviews for the configured place via the Legacy
 * Place Details API. Returns at most 5 reviews (Google's hard cap), sorted
 * newest first. Throws if the API call or env vars fail.
 */
export async function fetchLatestReviews(): Promise<GoogleReviewRaw[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const cid = process.env.GOOGLE_PLACE_CID;

  if (!apiKey) throw new Error("GOOGLE_MAPS_API_KEY not set");
  if (!cid) throw new Error("GOOGLE_PLACE_CID not set");

  const params = new URLSearchParams({
    cid,
    fields: "reviews,rating,user_ratings_total,name",
    reviews_sort: "newest",
    language: "fr",
    key: apiKey,
  });

  const res = await fetch(`${PLACE_DETAILS_URL}?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Place Details HTTP ${res.status}`);
  }

  const data = (await res.json()) as PlaceDetailsResponse;

  if (data.status !== "OK") {
    throw new Error(`Place Details status=${data.status} ${data.error_message || ""}`);
  }

  return data.result?.reviews ?? [];
}

/**
 * Sync newest Google reviews into the DB. Inserts new ones, leaves existing
 * untouched (so the admin's `hidden` toggle and the `createdAt` are preserved).
 * Idempotent — safe to call repeatedly from a cron.
 */
export async function syncReviews(): Promise<{ fetched: number; inserted: number; skipped: number }> {
  const reviews = await fetchLatestReviews();
  let inserted = 0;
  let skipped = 0;

  for (const r of reviews) {
    const publishedAt = new Date(r.time * 1000);
    const externalId = buildExternalId(r.author_name, publishedAt);

    try {
      await prisma.googleReview.create({
        data: {
          externalId,
          authorName: r.author_name,
          authorPhoto: r.profile_photo_url || "",
          authorUrl: r.author_url || "",
          rating: r.rating,
          text: r.text,
          language: r.language || "fr",
          publishedAt,
        },
      });
      inserted++;
    } catch (err) {
      // Unique constraint violation on externalId = already in DB. Skip silently.
      // Any other error: rethrow so the caller can log it.
      if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
        skipped++;
      } else {
        throw err;
      }
    }
  }

  return { fetched: reviews.length, inserted, skipped };
}

/** Public read: visible reviews only, newest first. */
export async function getVisibleReviews(minRating?: number) {
  return prisma.googleReview.findMany({
    where: {
      hidden: false,
      ...(minRating ? { rating: { gte: minRating } } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });
}

/** Aggregate stats across all visible reviews — used for AggregateRating JSON-LD. */
export async function getAggregateStats(minRating?: number) {
  const reviews = await getVisibleReviews(minRating);
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    count: reviews.length,
    average: sum / reviews.length,
  };
}
