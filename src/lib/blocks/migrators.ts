// Converters from the legacy flat content schemas to the new block-based schema.
// Used by:
//   - The migration script (scripts/migrate-mariage-to-blocks.mjs)
//   - The /mariage page (as a runtime fallback if the DB still has the old shape)
//
// This is intentionally a 1-to-1 lossless conversion: every field of the old
// MariageContent maps to a corresponding block in the same order as it appeared
// on the old page.

import type { MariageContent, DroneContent, AProposContent, HomepageContent } from "@/lib/content";
import type { Block, BlockPageContent } from "./types";
import { newBlockId } from "./types";

export function mariageContentToBlocks(content: MariageContent): Block[] {
  const blocks: Block[] = [];

  // Hero
  blocks.push({
    id: newBlockId(),
    type: "hero",
    data: {
      title: content.heroTitle,
      subtitle: content.heroSubtitle,
      backgroundImage: content.heroBackgroundImage,
    },
  });

  // Description (paragraphes)
  if (content.descriptionParagraphs && content.descriptionParagraphs.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "paragraphs",
      data: {
        paragraphs: content.descriptionParagraphs,
      },
    });
  }

  // Gallery
  blocks.push({
    id: newBlockId(),
    type: "gallery",
    data: {
      heading: content.galleryHeading,
      galleryRef: "mariage",
    },
  });

  // Vidéos
  if (content.videoEmbeds && content.videoEmbeds.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "videos",
      data: {
        heading: content.videoSectionHeading,
        videos: content.videoEmbeds,
      },
    });
  }

  // Tarifs
  if (content.pricingPlans && content.pricingPlans.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "pricing",
      data: {
        heading: content.pricingHeading,
        subtitle: content.pricingSubtitle,
        plans: content.pricingPlans,
        brochurePath: content.brochurePath,
        brochureLabel: "Télécharger la plaquette",
      },
    });
  }

  // FAQ — supports old shape (no faq field) and new shape (faq field added in last commit)
  type WithOptionalFaq = MariageContent & {
    faq?: { question: string; answer: string }[];
    faqHeading?: string;
  };
  const faqContent = content as WithOptionalFaq;
  if (faqContent.faq && faqContent.faq.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "faq",
      data: {
        heading: faqContent.faqHeading || "Questions fréquentes",
        items: faqContent.faq,
      },
    });
  }

  // Summary — same: optional in old shape
  type WithOptionalSummary = MariageContent & {
    summaryItems?: string[];
    summaryHeading?: string;
  };
  const sumContent = content as WithOptionalSummary;
  if (sumContent.summaryItems && sumContent.summaryItems.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "summary",
      data: {
        heading: sumContent.summaryHeading || "Ce qu'il faut retenir",
        items: sumContent.summaryItems,
      },
    });
  }

  // CTA
  blocks.push({
    id: newBlockId(),
    type: "cta",
    data: {
      title: content.ctaTitle,
      subtitle: content.ctaSubtitle,
      buttonText: content.ctaButtonText,
      buttonHref: "/contact",
    },
  });

  return blocks;
}

// ─── Drone ───────────────────────────────────────────────────────────────────
// Same lossless approach as mariage. Special note: the "Comment ça se passe ?"
// section becomes a LOCKED block (rendererKey = "drone-process") because its
// rendering is too visually complex to expose in the admin editor. The data
// (titles, descriptions) is read from DRONE_DEFAULTS.processSteps inside the
// renderer — a dev edits content.ts to change it.
export function droneContentToBlocks(content: DroneContent): Block[] {
  const blocks: Block[] = [];

  // Hero
  blocks.push({
    id: newBlockId(),
    type: "hero",
    data: {
      title: content.heroTitle,
      subtitle: content.heroSubtitle,
      backgroundImage: content.heroBackgroundImage,
    },
  });

  // Description
  if (content.descriptionParagraphs && content.descriptionParagraphs.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "paragraphs",
      data: {
        paragraphs: content.descriptionParagraphs,
      },
    });
  }

  // Gallery (heading editable, photos managed via /admin/media for category=drone)
  blocks.push({
    id: newBlockId(),
    type: "gallery",
    data: {
      heading: content.galleryHeading,
      galleryRef: "drone",
    },
  });

  // Process steps → LOCKED "drone-process" block (visually complex)
  blocks.push({
    id: newBlockId(),
    type: "locked",
    data: { rendererKey: "drone-process" },
  });

  // FAQ (optional in old shape)
  type WithOptionalFaq = DroneContent & {
    faq?: { question: string; answer: string }[];
    faqHeading?: string;
  };
  const faqContent = content as WithOptionalFaq;
  if (faqContent.faq && faqContent.faq.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "faq",
      data: {
        heading: faqContent.faqHeading || "Questions fréquentes",
        items: faqContent.faq,
      },
    });
  }

  // Summary (optional in old shape)
  type WithOptionalSummary = DroneContent & {
    summaryItems?: string[];
    summaryHeading?: string;
  };
  const sumContent = content as WithOptionalSummary;
  if (sumContent.summaryItems && sumContent.summaryItems.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "summary",
      data: {
        heading: sumContent.summaryHeading || "Ce qu'il faut retenir",
        items: sumContent.summaryItems,
      },
    });
  }

  // CTA
  blocks.push({
    id: newBlockId(),
    type: "cta",
    data: {
      title: content.ctaTitle,
      subtitle: content.ctaSubtitle,
      buttonText: content.ctaButtonText,
      buttonHref: "/contact",
    },
  });

  return blocks;
}

// ─── À propos ────────────────────────────────────────────────────────────────
export function aproposContentToBlocks(content: AProposContent): Block[] {
  const blocks: Block[] = [];

  // Hero
  blocks.push({
    id: newBlockId(),
    type: "hero",
    data: {
      title: content.heroTitle,
      subtitle: content.heroSubtitle,
      backgroundImage: content.heroBackgroundImage,
    },
  });

  // Portrait + Bio → ImageText (image à gauche)
  blocks.push({
    id: newBlockId(),
    type: "image-text",
    data: {
      image: content.portraitImage,
      heading: content.bioHeading,
      paragraphs: content.bioParagraphs,
      imagePosition: "left",
    },
  });

  // Expertise → LinkCards
  blocks.push({
    id: newBlockId(),
    type: "link-cards",
    data: {
      heading: content.expertiseHeading,
      cards: [
        {
          title: content.expertiseMariage.title,
          description: content.expertiseMariage.description,
          href: "/mariage",
          linkLabel: "Découvrir les prestations",
        },
        {
          title: content.expertiseDrone.title,
          description: content.expertiseDrone.description,
          href: "/drone",
          linkLabel: "Découvrir les prestations",
        },
      ],
    },
  });

  // Certifications
  if (content.certifications && content.certifications.length > 0) {
    blocks.push({
      id: newBlockId(),
      type: "certifications",
      data: {
        heading: content.certificationsHeading,
        items: content.certifications,
      },
    });
  }

  // Témoignages CTA (light variant) — la section "Ce que disent nos clients"
  blocks.push({
    id: newBlockId(),
    type: "cta",
    data: {
      title: "Ce que disent nos clients",
      subtitle:
        "Couples, agences immobilières, professionnels du BTP — découvrez les retours de ceux qui ont fait confiance à Hortense pour leurs projets photo et drone.",
      buttonText: "Lire les témoignages",
      buttonHref: "/#temoignages",
      style: "light",
    },
  });

  // CTA finale (dark)
  blocks.push({
    id: newBlockId(),
    type: "cta",
    data: {
      title: content.ctaTitle,
      subtitle: content.ctaSubtitle,
      buttonText: content.ctaButtonText,
      buttonHref: "/contact",
      style: "dark",
    },
  });

  return blocks;
}

// ─── Homepage ────────────────────────────────────────────────────────────────
// The homepage has 4 sections in the legacy structure:
//   1. HeroSection (video) → video-hero block (editable)
//   2. ServicesPreview → LOCKED home-services (auto-synced from mariage/drone)
//   3. TestimonialsSection (currently hardcoded in code) → testimonials block
//      (we seed it with the existing 4 testimonials so they become editable)
//   4. AboutSection (auto-synced from a-propos) → LOCKED home-about-teaser
const HARDCODED_TESTIMONIALS = [
  {
    quote:
      "Hortense a su capturer chaque moment de notre mariage avec une sensibilité incroyable. Des préparatifs jusqu'à la soirée, elle s'est faite discrète tout en ne ratant aucun instant. Les photos sont naturelles, lumineuses et pleines d'émotion. On les regarde encore régulièrement !",
    author: "Camille & Julien",
    detail: "Mariage à Saint-Émilion, 2025",
  },
  {
    quote:
      "On hésitait à prendre la vidéo en plus de la photo, et on ne regrette absolument pas. Le film de notre mariage nous replonge à chaque visionnage dans l'ambiance de cette journée. Hortense a un vrai sens du storytelling.",
    author: "Laura & Maxime",
    detail: "Mariage au Château de la Rivière, 2025",
  },
  {
    quote:
      "Nous avons fait appel à Hortense pour des photos aériennes de plusieurs biens en vente. Résultat impeccable, images livrées en 48h, et un vrai plus pour nos annonces. Nous recommandons sans hésiter.",
    author: "Thomas B.",
    detail: "Directeur d'agence immobilière, Bordeaux",
  },
  {
    quote:
      "Le suivi de chantier par drone nous permet de documenter l'avancement de nos projets de manière professionnelle. Hortense est réactive, ponctuelle et ses images sont toujours exploitables immédiatement.",
    author: "Marie-Claire D.",
    detail: "Responsable de projets BTP, Mérignac",
  },
];

export function homepageContentToBlocks(content: HomepageContent): Block[] {
  return [
    // Hero vidéo (éditable)
    {
      id: newBlockId(),
      type: "video-hero",
      data: {
        title: content.heroTitle,
        subtitle: content.heroSubtitle,
        subSubtitle: content.heroSubSubtitle,
        buttons: [
          { label: "Mariage", href: "/mariage", variant: "solid" },
          { label: "Drone", href: "/drone", variant: "outline" },
        ],
      },
    },
    // Services preview (locked, auto-synced)
    {
      id: newBlockId(),
      type: "locked",
      data: { rendererKey: "home-services" },
    },
    // Testimonials (éditable, seedé avec les 4 hardcodés actuels)
    {
      id: newBlockId(),
      type: "testimonials",
      data: {
        heading: "Ce que disent nos clients",
        subheading: "Découvrez les retours de couples et professionnels qui ont fait confiance à Hortense.",
        items: HARDCODED_TESTIMONIALS,
      },
    },
    // About teaser (locked, auto-synced from a-propos)
    {
      id: newBlockId(),
      type: "locked",
      data: { rendererKey: "home-about-teaser" },
    },
  ];
}

/**
 * Detect whether a stored value is the legacy flat shape or the new block shape.
 * Returns the blocks (converting if needed). If the input is empty/invalid, returns null.
 *
 * The `pageKey` hint tells us which legacy converter to use when needed.
 */
export function asBlockPageContent(
  stored: unknown,
  pageKey: "mariage" | "drone" | "apropos" | "homepage" = "mariage"
): BlockPageContent | null {
  if (!stored || typeof stored !== "object") return null;
  // New shape: { blocks: [...] }
  if (Array.isArray((stored as { blocks?: unknown }).blocks)) {
    return stored as BlockPageContent;
  }
  // Legacy shape: convert based on the page key
  if (pageKey === "drone" && "heroTitle" in stored && "processSteps" in stored) {
    return { blocks: droneContentToBlocks(stored as DroneContent) };
  }
  if (pageKey === "apropos" && "heroTitle" in stored && "bioParagraphs" in stored) {
    return { blocks: aproposContentToBlocks(stored as AProposContent) };
  }
  if (pageKey === "homepage" && "heroTitle" in stored && "services" in stored) {
    return { blocks: homepageContentToBlocks(stored as HomepageContent) };
  }
  if (pageKey === "mariage" && "heroTitle" in stored && "pricingPlans" in stored) {
    return { blocks: mariageContentToBlocks(stored as MariageContent) };
  }
  return null;
}
