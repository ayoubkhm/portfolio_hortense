// Registry of all block types — used by the admin "+ Add block" picker
// and by the migration script to instantiate fresh blocks with sensible defaults.
//
// To add a new block type:
//  1. Add the type definition to types.ts
//  2. Add an entry here (label + defaultData)
//  3. Add a renderer to src/components/blocks/
//  4. Add an editor to src/components/admin/blocks/
//  5. Add a JSON-LD fragment to src/lib/blocks/jsonld.ts (if relevant for SEO)

import type { BlockType, BlockDataOf } from "./types";

export interface BlockTypeMeta<T extends BlockType> {
  type: T;
  label: string;
  description: string;
  // Returns a fresh data object with sensible defaults when adding via admin
  defaultData: () => BlockDataOf<T>;
}

// Use Record-with-discriminator-as-key, but TS doesn't infer well across the union;
// so we define each entry explicitly typed.

const HERO: BlockTypeMeta<"hero"> = {
  type: "hero",
  label: "Hero (en-tête)",
  description: "Bandeau d'en-tête avec image de fond, titre et sous-titre.",
  defaultData: () => ({
    title: "Titre de la page",
    subtitle: "Sous-titre",
    backgroundImage: "",
  }),
};

const VIDEO_HERO: BlockTypeMeta<"video-hero"> = {
  type: "video-hero",
  label: "Hero vidéo (plein écran)",
  description: "Bandeau plein écran avec vidéo de fond, titre, sous-titres et boutons. La vidéo est uploadée séparément depuis l'éditeur du bloc.",
  defaultData: () => ({
    title: "Hortense de Ruidiaz",
    subtitle: "Photographie et prises de vues aériennes par drone à Bordeaux",
    subSubtitle: "Pour les professionnels et les particuliers",
    buttons: [
      { label: "Mariage", href: "/mariage", variant: "solid" },
      { label: "Drone", href: "/drone", variant: "outline" },
    ],
  }),
};

const PARAGRAPHS: BlockTypeMeta<"paragraphs"> = {
  type: "paragraphs",
  label: "Paragraphes",
  description: "Bloc de texte libre, plusieurs paragraphes.",
  defaultData: () => ({
    paragraphs: ["Votre texte ici."],
  }),
};

const GALLERY: BlockTypeMeta<"gallery"> = {
  type: "gallery",
  label: "Galerie photos",
  description: "Galerie de catégories avec photos. Géré séparément depuis /admin/gallery.",
  defaultData: () => ({
    heading: "Galerie",
    galleryRef: "mariage",
  }),
};

const VIDEOS: BlockTypeMeta<"videos"> = {
  type: "videos",
  label: "Vidéos",
  description: "Grille de vidéos YouTube ou Vimeo intégrées.",
  defaultData: () => ({
    heading: "Vidéo",
    videos: [],
  }),
};

const PRICING: BlockTypeMeta<"pricing"> = {
  type: "pricing",
  label: "Tarifs",
  description: "Cartes de formules tarifaires avec prix et caractéristiques.",
  defaultData: () => ({
    heading: "Formules & Tarifs",
    subtitle: "",
    plans: [],
    brochurePath: "",
    brochureLabel: "Télécharger la plaquette",
  }),
};

const FAQ: BlockTypeMeta<"faq"> = {
  type: "faq",
  label: "FAQ (Questions fréquentes)",
  description: "Liste de questions/réponses dépliables. Génère du schema FAQPage pour le SEO.",
  defaultData: () => ({
    heading: "Questions fréquentes",
    items: [],
  }),
};

const SUMMARY: BlockTypeMeta<"summary"> = {
  type: "summary",
  label: "Liste de points (récap)",
  description: "Encadré avec des points clés à retenir, type \"Ce qu'il faut retenir\".",
  defaultData: () => ({
    heading: "Ce qu'il faut retenir",
    items: [],
  }),
};

const STEPS: BlockTypeMeta<"steps"> = {
  type: "steps",
  label: "Étapes / Processus",
  description: "Étapes numérotées d'un processus. Génère du schema HowTo pour le SEO.",
  defaultData: () => ({
    heading: "Comment ça se passe",
    subtitle: "",
    steps: [],
  }),
};

const CERTIFICATIONS: BlockTypeMeta<"certifications"> = {
  type: "certifications",
  label: "Certifications",
  description: "Liste de certifications/diplômes avec icône.",
  defaultData: () => ({
    heading: "Certifications",
    items: [],
  }),
};

const CTA: BlockTypeMeta<"cta"> = {
  type: "cta",
  label: "Call-to-action (CTA)",
  description: "Bloc d'appel à l'action avec titre et bouton.",
  defaultData: () => ({
    title: "Parlons de votre projet",
    subtitle: "",
    buttonText: "Me contacter",
    buttonHref: "/contact",
  }),
};

const IMAGE_TEXT: BlockTypeMeta<"image-text"> = {
  type: "image-text",
  label: "Image + texte",
  description: "Image et texte côte à côte.",
  defaultData: () => ({
    image: "",
    heading: "",
    paragraphs: ["Votre texte ici."],
    imagePosition: "left",
  }),
};

const LINK_CARDS: BlockTypeMeta<"link-cards"> = {
  type: "link-cards",
  label: "Cards avec liens",
  description: "Grille de cards cliquables (titre, description, lien). Idéal pour mettre en avant des prestations ou des sections internes.",
  defaultData: () => ({
    heading: "Mes prestations",
    cards: [
      { title: "Titre de la card", description: "Description courte.", href: "/", linkLabel: "Découvrir" },
    ],
  }),
};

const TESTIMONIALS: BlockTypeMeta<"testimonials"> = {
  type: "testimonials",
  label: "Témoignages clients",
  description: "Grille de citations de clients (avec auteur et détail). Génère du schema Review pour le SEO.",
  defaultData: () => ({
    heading: "Ce que disent nos clients",
    subheading: "",
    items: [],
  }),
};

const GOOGLE_REVIEWS: BlockTypeMeta<"google-reviews"> = {
  type: "google-reviews",
  label: "Avis Google (auto-syncés)",
  description: "Avis tirés automatiquement de la fiche Google Business Profile, mis à jour toutes les heures. Génère du schema Review + AggregateRating pour le SEO.",
  defaultData: () => ({
    heading: "Avis clients",
    subheading: "Vérifiés depuis ma fiche Google",
    gbpUrl: "https://maps.google.com/?cid=6877207829907698706",
  }),
};

const QUOTE: BlockTypeMeta<"quote"> = {
  type: "quote",
  label: "Citation / témoignage",
  description: "Citation mise en valeur, optionnellement avec nom d'auteur.",
  defaultData: () => ({
    text: "Une citation à mettre en valeur.",
    author: "",
    role: "",
  }),
};

const CROSS_LINK: BlockTypeMeta<"cross-link"> = {
  type: "cross-link",
  label: "Renvoi vers une page",
  description: "Bandeau avec titre, description et bouton renvoyant vers une autre page du site.",
  defaultData: () => ({
    heading: "Découvrez aussi",
    description: "Description courte de la prestation liée.",
    href: "/contact",
    linkText: "En savoir plus",
  }),
};

// Order in this array = order in the "+ Add block" menu in the admin
export const BLOCK_REGISTRY = [
  HERO,
  VIDEO_HERO,
  PARAGRAPHS,
  GALLERY,
  VIDEOS,
  PRICING,
  FAQ,
  SUMMARY,
  STEPS,
  CERTIFICATIONS,
  CTA,
  CROSS_LINK,
  IMAGE_TEXT,
  LINK_CARDS,
  TESTIMONIALS,
  GOOGLE_REVIEWS,
  QUOTE,
] as const;

// Lookup helper
export function getBlockMeta(type: BlockType): BlockTypeMeta<BlockType> {
  const meta = BLOCK_REGISTRY.find((b) => b.type === type);
  if (!meta) {
    throw new Error(`Unknown block type: ${type}`);
  }
  return meta as BlockTypeMeta<BlockType>;
}
