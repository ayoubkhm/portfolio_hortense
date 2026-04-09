import type { Metadata } from "next";
import { getContent } from "@/lib/content";

const BASE = "https://hortensederuidiaz.fr";

interface SeoData {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  pages?: Record<string, { title?: string; description?: string }>;
}

const SEO_DEFAULTS: SeoData = {
  siteTitle: "Photographe Mariage & Drone Bordeaux | Hortense de Ruidiaz",
  siteDescription:
    "Photographe mariage & opératrice drone certifiée CATS à Bordeaux. Reportages photo et vidéo, vues aériennes. Devis gratuit en 24h.",
  ogImage: "/uploads/d7409ce5fcdb1328b9bf9f56513f81df.jpg",
  pages: {},
};

// Hardcoded defaults per page (used when no DB value exists)
const PAGE_DEFAULTS: Record<string, { title: string; description: string }> = {
  accueil: {
    title: "Photographe Mariage & Drone Bordeaux | Hortense de Ruidiaz",
    description: "Photographe mariage & opératrice drone certifiée CATS à Bordeaux. Reportages photo et vidéo, vues aériennes. Devis gratuit en 24h.",
  },
  mariage: {
    title: "Photographe Mariage Bordeaux — Tarifs dès 1 100 €",
    description: "Photographe mariage à Bordeaux. Galerie privée en ligne incluse. Reportage photo et vidéo de la cérémonie à la soirée. Tarifs de 1 100 € à 2 100 €. Devis gratuit.",
  },
  drone: {
    title: "Opératrice Drone Certifiée CATS — Bordeaux",
    description: "Prises de vue aériennes par drone à Bordeaux. Photos HD et vidéos 4K. Immobilier, suivi de chantier, événements. Pilote certifiée CATS. Devis gratuit.",
  },
  contact: {
    title: "Contact — Devis Gratuit Photo & Drone",
    description: "Contactez Hortense de Ruidiaz pour votre projet photo ou drone à Bordeaux. Formulaire en ligne, téléphone ou email. Tél. 06 16 28 22 70. Réponse sous 24h.",
  },
  "a-propos": {
    title: "À propos — Photographe & Drone Bordeaux",
    description: "Découvrez le parcours d'Hortense de Ruidiaz, photographe professionnelle et opératrice drone certifiée CATS à Bordeaux.",
  },
};

async function getSeoData(): Promise<SeoData> {
  return getContent("content_seo", SEO_DEFAULTS);
}

/** Returns the current OG image URL (full absolute URL). */
export async function getOgImageUrl(): Promise<string> {
  const seo = await getSeoData();
  return seo.ogImage.startsWith("http") ? seo.ogImage : `${BASE}${seo.ogImage}`;
}

/** Returns full Metadata for a given page slug, reading from DB with hardcoded fallbacks. */
export async function getPageMetadata(pageSlug: string): Promise<Metadata> {
  const seo = await getSeoData();
  const ogImage = seo.ogImage.startsWith("http") ? seo.ogImage : `${BASE}${seo.ogImage}`;

  const dbPage = seo.pages?.[pageSlug];
  const defaults = PAGE_DEFAULTS[pageSlug] || { title: seo.siteTitle, description: seo.siteDescription };

  const title = dbPage?.title || defaults.title;
  const description = dbPage?.description || defaults.description;
  const url = pageSlug === "accueil" ? BASE : `${BASE}/${pageSlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — Hortense de Ruidiaz` }],
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: url },
  };
}

/** Returns the page defaults (for admin UI placeholders). */
export { PAGE_DEFAULTS };
