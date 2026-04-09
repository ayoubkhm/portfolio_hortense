// Block type system — discriminated union of all possible block types.
// Each block has: a stable id, a discriminator (type), and typed data.
// New block types are added here AND in registry.ts (for the catalog) AND in
// the corresponding renderer/editor folders.

export interface BlockBase<T extends string, D> {
  id: string;
  type: T;
  data: D;
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export type HeroBlock = BlockBase<
  "hero",
  {
    title: string;
    subtitle?: string;
    backgroundImage: string;
  }
>;

// ─── Video Hero (full-screen video background, like the homepage) ───────────
// The video file itself is uploaded via /api/settings/hero-video and stored
// in a separate SiteSetting (not in the block data) to keep backwards compat
// with the existing upload flow.
export type VideoHeroBlock = BlockBase<
  "video-hero",
  {
    title: string;
    subtitle?: string;
    subSubtitle?: string;
    buttons?: { label: string; href: string; variant: "solid" | "outline" }[];
  }
>;

// ─── Paragraphes (texte libre) ───────────────────────────────────────────────
export type ParagraphsBlock = BlockBase<
  "paragraphs",
  {
    paragraphs: string[];
  }
>;

// ─── Galerie (locked pour le POC, référence externe) ────────────────────────
export type GalleryBlock = BlockBase<
  "gallery",
  {
    heading: string;
    // The actual photos are managed externally:
    //   - "mariage" → src/app/mariage/MariageCategoryGallery.tsx (categories from /admin/gallery)
    //   - "drone"   → src/app/drone/DroneGallery.tsx (media uploaded with category=drone)
    galleryRef: "mariage" | "drone";
  }
>;

// ─── Vidéos embeds ───────────────────────────────────────────────────────────
export type VideosBlock = BlockBase<
  "videos",
  {
    heading: string;
    videos: { src: string; title: string }[];
  }
>;

// ─── Tarifs ──────────────────────────────────────────────────────────────────
export interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export type PricingBlock = BlockBase<
  "pricing",
  {
    heading: string;
    subtitle: string;
    plans: PricingPlan[];
    brochurePath?: string;
    brochureLabel?: string;
  }
>;

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export type FaqBlock = BlockBase<
  "faq",
  {
    heading: string;
    items: { question: string; answer: string }[];
  }
>;

// ─── Liste de points (= Ce qu'il faut retenir) ──────────────────────────────
export type SummaryBlock = BlockBase<
  "summary",
  {
    heading: string;
    items: string[];
  }
>;

// ─── Étapes de processus ─────────────────────────────────────────────────────
export type StepsBlock = BlockBase<
  "steps",
  {
    heading: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  }
>;

// ─── Certifications ──────────────────────────────────────────────────────────
export type CertificationsBlock = BlockBase<
  "certifications",
  {
    heading: string;
    items: { title: string; description: string }[];
  }
>;

// ─── CTA (call to action) ────────────────────────────────────────────────────
export type CtaBlock = BlockBase<
  "cta",
  {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonHref: string;
    /** Visual style. "dark" = full-width charcoal section (default).
     *  "light" = subtle cream section, useful as a secondary CTA. */
    style?: "dark" | "light";
  }
>;

// ─── Image avec texte (côte à côte) ──────────────────────────────────────────
export type ImageTextBlock = BlockBase<
  "image-text",
  {
    image: string;
    imageAlt?: string;
    heading?: string;
    paragraphs: string[];
    imagePosition: "left" | "right";
  }
>;

// ─── Citation / témoignage ───────────────────────────────────────────────────
export type QuoteBlock = BlockBase<
  "quote",
  {
    text: string;
    author?: string;
    role?: string;
  }
>;

// ─── Témoignages (grille de citations clients) ───────────────────────────────
export type TestimonialsBlock = BlockBase<
  "testimonials",
  {
    heading: string;
    subheading?: string;
    items: { quote: string; author: string; detail?: string }[];
  }
>;

// ─── Cards avec liens (style « Expertise » de la page À propos) ─────────────
export type LinkCardsBlock = BlockBase<
  "link-cards",
  {
    heading: string;
    cards: {
      title: string;
      description: string;
      href: string;
      linkLabel: string;
    }[];
  }
>;

// ─── Cross-link (bandeau renvoi vers une autre page) ────────────────────────
export type CrossLinkBlock = BlockBase<
  "cross-link",
  {
    heading: string;
    description: string;
    href: string;
    linkText: string;
  }
>;

// ─── Locked / Section non modifiable ─────────────────────────────────────────
// A "locked" block is rendered by code, not by data. The block stores only
// a `rendererKey` that maps to a hardcoded renderer in
// src/lib/blocks/locked-renderers.tsx. The admin shows a read-only card.
//
// Hortense can move or delete a locked block, but can't edit its content
// (she has to contact the dev). The dev edits the renderer's JSX directly.
export type LockedBlock = BlockBase<
  "locked",
  {
    rendererKey: string;
  }
>;

// ─── Union de tous les types ────────────────────────────────────────────────
export type Block =
  | HeroBlock
  | VideoHeroBlock
  | ParagraphsBlock
  | GalleryBlock
  | VideosBlock
  | PricingBlock
  | FaqBlock
  | SummaryBlock
  | StepsBlock
  | CertificationsBlock
  | CtaBlock
  | ImageTextBlock
  | QuoteBlock
  | LinkCardsBlock
  | TestimonialsBlock
  | CrossLinkBlock
  | LockedBlock;

export type BlockType = Block["type"];

// Helper pour extraire le type de data d'un type de bloc
export type BlockDataOf<T extends BlockType> = Extract<Block, { type: T }>["data"];

// Format de stockage en DB pour une page block-based
export interface BlockPageContent {
  blocks: Block[];
}

// ─── ID generator ────────────────────────────────────────────────────────────
// crypto.randomUUID() est dispo côté serveur (Node 19+) et côté client (navigateurs modernes).
export function newBlockId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback ultra-simple si jamais
  return `block_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
