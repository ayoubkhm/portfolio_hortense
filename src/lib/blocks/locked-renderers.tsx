// Registry of "locked" sections — fully hardcoded React components that
// can't be edited via the admin. Hortense can only move or delete them.
//
// To add a new locked section:
//  1. Add an entry below with: rendererKey, label, description, render fn
//  2. The block stored in DB is just `{ type: "locked", data: { rendererKey } }`
//  3. The dev edits this file to change the content/visuals/structure.

import Image from "next/image";
import Link from "next/link";
import { DRONE_DEFAULTS, MARIAGE_DEFAULTS, APROPOS_DEFAULTS, getContent } from "@/lib/content";
import { STEP_VISUALS } from "@/app/drone/step-visuals";
import type { BlockPageContent } from "./types";
import { asBlockPageContent } from "./migrators";

export interface LockedRendererMeta {
  key: string;
  label: string;
  description: string;
  /**
   * Render the section. Can be sync or async — async is needed when the
   * renderer reads from the DB at request time (server component).
   */
  render: () => React.ReactNode | Promise<React.ReactNode>;
}

// ─── drone-process : "Comment ça se passe ?" ─────────────────────────────────
// Originally hardcoded in src/app/drone/page.tsx. Trop visuellement spécifique
// (icônes SVG, anneaux animés, couleurs par étape) pour être généralisable
// dans un éditeur admin. Le contenu textuel est lu depuis DRONE_DEFAULTS — un
// dev peut le modifier dans src/lib/content.ts.
const droneProcess: LockedRendererMeta = {
  key: "drone-process",
  label: "Drone — Comment ça se passe ?",
  description:
    "Section visuelle des 5 étapes du processus drone, avec icônes et anneaux animés. Contenu modifiable uniquement par le développeur (dans src/lib/content.ts → DRONE_DEFAULTS.processSteps).",
  render: () => (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
          {DRONE_DEFAULTS.processHeading}
        </h2>
        <p className="text-warmgray text-center mb-16 max-w-xl mx-auto">
          {DRONE_DEFAULTS.processSubtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {DRONE_DEFAULTS.processSteps.map((step, i) => {
            const visual = STEP_VISUALS[i] || STEP_VISUALS[0];
            const stepNum = i + 1;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`relative flex h-24 w-24 items-center justify-center mb-5 ${visual.color}`}>
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="44" fill="none" stroke="#E8E0D4" strokeWidth="3" />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray={`${stepNum * 0.2 * 2 * Math.PI * 44} ${2 * Math.PI * 44}`}
                    />
                  </svg>
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    {visual.icon}
                  </div>
                  <span className="absolute -top-1 -right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-white">
                    {stepNum}
                  </span>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-charcoal mb-3 leading-snug">
                  {step.title}
                </h3>
                <div className="h-px w-10 bg-sand mb-3" />
                <p className="text-sm text-warmgray leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-gold px-10 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-gold/80 hover:shadow-lg"
          >
            Demander un devis
          </Link>
          <p className="mt-3 text-sm text-warmgray">Devis gratuit · Réponse sous 24h</p>
        </div>
      </div>
    </section>
  ),
};

// ─── home-services : "Mes Services" sur la page d'accueil ────────────────────
// Auto-synced from the mariage and drone hero background images. If Hortense
// updates the hero of /mariage or /drone, the card on the home updates too.
const homeServices: LockedRendererMeta = {
  key: "home-services",
  label: "Accueil — Services preview",
  description:
    "Cards mariage / drone sur la page d'accueil. Les images sont automatiquement synchronisées avec les hero des pages /mariage et /drone (modifiez-les là-bas pour mettre à jour la home).",
  render: async () => {
    // Read the mariage and drone block-based content to find their hero
    // background images (so the cards stay in sync).
    const [mariageStored, droneStored] = await Promise.all([
      getContent<unknown>("content_mariage", null),
      getContent<unknown>("content_drone", null),
    ]);

    const findHeroImage = (stored: unknown, fallback: string): string => {
      if (!stored || typeof stored !== "object") return fallback;
      const blocks = (stored as { blocks?: unknown }).blocks;
      if (Array.isArray(blocks)) {
        const hero = blocks.find((b) => (b as { type?: string }).type === "hero") as
          | { data?: { backgroundImage?: string } }
          | undefined;
        return hero?.data?.backgroundImage || fallback;
      }
      // Legacy flat shape
      const flat = stored as { heroBackgroundImage?: string };
      return flat.heroBackgroundImage || fallback;
    };

    const mariageImg = findHeroImage(mariageStored, MARIAGE_DEFAULTS.heroBackgroundImage);
    const droneImg = findHeroImage(droneStored, DRONE_DEFAULTS.heroBackgroundImage);

    const services = [
      {
        title: "Photographie de Mariage",
        description:
          "Des clichés empreints d'émotion pour revivre chaque instant de votre plus beau jour. Un regard sensible et discret pour une couverture complète de votre célébration.",
        href: "/mariage",
        image: mariageImg,
        alt: "Photographie de mariage",
      },
      {
        title: "Prises de Vue Drone",
        description:
          "Des perspectives aériennes saisissantes pour sublimer vos événements, propriétés et projets. Une vision unique depuis le ciel pour des images spectaculaires.",
        href: "/drone",
        image: droneImg,
        alt: "Prise de vue aérienne par drone",
      },
    ];

    return (
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-charcoal md:text-4xl">
            Mes Services
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative block h-[400px] overflow-hidden rounded-2xl"
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/40" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                  <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">{service.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand/90">{service.description}</p>
                  <span className="mt-6 inline-block border-b-2 border-gold pb-1 text-sm font-semibold uppercase tracking-widest text-gold transition-colors duration-300 group-hover:border-white group-hover:text-white">
                    Découvrir
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  },
};

// ─── home-about-teaser : teaser de la bio sur l'accueil ─────────────────────
// Auto-synced from /a-propos. Hortense edits her bio in /admin/a-propos and
// the home teaser updates automatically.
const homeAboutTeaser: LockedRendererMeta = {
  key: "home-about-teaser",
  label: "Accueil — Teaser À propos",
  description:
    "Aperçu de la bio sur la page d'accueil (image + 1er paragraphe + bouton). Synchronisé automatiquement avec le bloc « Image + texte » de la page À propos.",
  render: async () => {
    const stored = await getContent<unknown>("content_apropos", null);
    const blockContent: BlockPageContent =
      asBlockPageContent(stored, "apropos") ?? { blocks: [] };

    // Find the first image-text block in the apropos content
    const imageTextBlock = blockContent.blocks.find(
      (b) => b.type === "image-text"
    ) as { data: { image: string; heading?: string; paragraphs: string[] } } | undefined;

    const heading = imageTextBlock?.data.heading || "Hortense de Ruidiaz";
    const firstParagraph =
      imageTextBlock?.data.paragraphs[0] ||
      APROPOS_DEFAULTS.bioParagraphs[0] ||
      "Photographe et opératrice drone à Bordeaux.";
    const portrait = imageTextBlock?.data.image || APROPOS_DEFAULTS.portraitImage;

    return (
      <section id="about" className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src={portrait}
                alt="Hortense de Ruidiaz — Photographe & Opératrice Drone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
                {heading}
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-warmgray">
                <p>{firstParagraph}</p>
              </div>
              <Link
                href="/a-propos"
                className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-gold/90"
              >
                En savoir plus sur Hortense &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  },
};

// ─── Registry ────────────────────────────────────────────────────────────────
export const LOCKED_RENDERERS: Record<string, LockedRendererMeta> = {
  "drone-process": droneProcess,
  "home-services": homeServices,
  "home-about-teaser": homeAboutTeaser,
};

export function getLockedRenderer(key: string): LockedRendererMeta | undefined {
  return LOCKED_RENDERERS[key];
}

export function listLockedRenderers(): LockedRendererMeta[] {
  return Object.values(LOCKED_RENDERERS);
}
