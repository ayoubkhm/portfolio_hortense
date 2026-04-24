// JSON-LD aggregator for block-based pages.
//
// Each block type can contribute zero or more JSON-LD fragments to the
// page-level @graph. This guarantees that what's visible on the page
// (the blocks) and what's indexable by search engines stay in sync.
//
// If a block type isn't relevant for SEO (e.g. paragraphs, gallery), it
// just doesn't contribute anything.

import type { Block } from "./types";
import { getVisibleReviews, getAggregateStats } from "@/lib/google-reviews";

// A JSON-LD entity (Schema.org node). Loose typing on purpose — JSON-LD is
// fundamentally a string-keyed object graph.
type JsonLdNode = Record<string, unknown>;

/**
 * Build JSON-LD fragments for a google-reviews block by reading from DB.
 * Async because we hit Prisma. Kept separate from the sync blockToJsonLd()
 * so the rest stays cheap.
 */
async function googleReviewsToJsonLd(minRating?: number): Promise<JsonLdNode[]> {
  const reviews = await getVisibleReviews(minRating);
  if (reviews.length === 0) return [];

  const nodes: JsonLdNode[] = reviews.map((r) => ({
    "@type": "Review",
    reviewBody: r.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Person", name: r.authorName },
    datePublished: r.publishedAt.toISOString(),
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": "https://hortensederuidiaz.fr/#localbusiness",
      name: "Hortense de Ruidiaz",
    },
  }));

  const stats = await getAggregateStats(minRating);
  if (stats) {
    nodes.push({
      "@type": "AggregateRating",
      "@id": "https://hortensederuidiaz.fr/#aggregaterating",
      itemReviewed: { "@id": "https://hortensederuidiaz.fr/#localbusiness" },
      ratingValue: stats.average.toFixed(1),
      reviewCount: stats.count,
      bestRating: 5,
      worstRating: 1,
    });
  }

  return nodes;
}

/**
 * Build the @graph fragments contributed by a single block.
 * Returns an array (some blocks may contribute multiple nodes; most contribute 0 or 1).
 */
function blockToJsonLd(block: Block): JsonLdNode[] {
  switch (block.type) {
    // ─── FAQ → FAQPage ──────────────────────────────────────────────────────
    case "faq": {
      if (block.data.items.length === 0) return [];
      return [
        {
          "@type": "FAQPage",
          mainEntity: block.data.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ];
    }

    // ─── Steps → HowTo ──────────────────────────────────────────────────────
    case "steps": {
      if (block.data.steps.length === 0) return [];
      return [
        {
          "@type": "HowTo",
          name: block.data.heading,
          description: block.data.subtitle || undefined,
          step: block.data.steps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.title,
            text: step.description,
          })),
        },
      ];
    }

    // ─── Pricing → Offer (au sein du Service de la page) ───────────────────
    // Renvoyé tel quel, le merge sera fait au niveau page-level si un Service existe.
    case "pricing": {
      if (block.data.plans.length === 0) return [];
      return [
        {
          "@type": "OfferCatalog",
          name: block.data.heading,
          itemListElement: block.data.plans.map((plan) => ({
            "@type": "Offer",
            name: plan.title,
            price: plan.price.replace(/[^\d]/g, ""), // "1 100 €" → "1100"
            priceCurrency: "EUR",
          })),
        },
      ];
    }

    // ─── Quote / témoignage → Review ────────────────────────────────────────
    case "quote": {
      if (!block.data.text) return [];
      return [
        {
          "@type": "Review",
          reviewBody: block.data.text,
          author: block.data.author
            ? { "@type": "Person", name: block.data.author }
            : undefined,
          itemReviewed: {
            "@type": "LocalBusiness",
            "@id": "https://hortensederuidiaz.fr/#localbusiness",
            name: "Hortense de Ruidiaz",
          },
        },
      ];
    }

    // ─── Testimonials → Reviews (one per item) ──────────────────────────────
    case "testimonials": {
      if (block.data.items.length === 0) return [];
      return block.data.items.map((item) => ({
        "@type": "Review",
        reviewBody: item.quote,
        author: { "@type": "Person", name: item.author },
        ...(item.detail ? { description: item.detail } : {}),
        itemReviewed: {
          "@type": "LocalBusiness",
          "@id": "https://hortensederuidiaz.fr/#localbusiness",
          name: "Hortense de Ruidiaz",
        },
      }));
    }

    // google-reviews is handled async at the page level via aggregateBlockJsonLd
    // — return [] here since blockToJsonLd is sync.
    case "google-reviews":
      return [];

    // ─── Pas de schema dédié pour ces blocs ─────────────────────────────────
    case "hero":
    case "video-hero":
    case "paragraphs":
    case "gallery":
    case "videos":
    case "summary":
    case "certifications":
    case "cta":
    case "image-text":
    case "link-cards":
    case "cross-link":
    case "locked":
      // Locked blocks could in theory contribute SEO via their hardcoded
      // renderer, but for now we keep them schema-free. If needed, the page
      // can pass page-level nodes that describe the locked content.
      return [];
  }
}

/**
 * Aggregate JSON-LD from all blocks of a page.
 * Returns the @graph array (without the wrapping @context).
 *
 * Async because google-reviews blocks need to read from DB. All other block
 * types resolve synchronously inside blockToJsonLd().
 *
 * Pass `pageNodes` to include page-level nodes (WebPage, BreadcrumbList, etc.)
 * that aren't tied to any block.
 */
export async function aggregateBlockJsonLd(blocks: Block[], pageNodes: JsonLdNode[] = []): Promise<JsonLdNode[]> {
  const syncNodes = blocks.flatMap(blockToJsonLd);

  const googleReviewBlocks = blocks.filter((b): b is Extract<Block, { type: "google-reviews" }> => b.type === "google-reviews");
  const asyncNodes = (
    await Promise.all(googleReviewBlocks.map((b) => googleReviewsToJsonLd(b.data.minRating)))
  ).flat();

  return [...pageNodes, ...syncNodes, ...asyncNodes];
}

/**
 * Build the full JSON-LD object ready to inject in <script>.
 */
export async function buildJsonLd(blocks: Block[], pageNodes: JsonLdNode[] = []): Promise<{
  "@context": string;
  "@graph": JsonLdNode[];
}> {
  return {
    "@context": "https://schema.org",
    "@graph": await aggregateBlockJsonLd(blocks, pageNodes),
  };
}
