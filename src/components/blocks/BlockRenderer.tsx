// Front-end renderers for all block types.
// Each render function takes the block's data and returns the section markup.
// The dispatcher <BlockRenderer block={...} /> at the bottom switches by type.
//
// Reuses existing primitive components (PageHero, CTASection, PricingCard,
// MariageCategoryGallery) where possible to avoid divergence with non-block pages.

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import PricingCard from "@/components/sections/PricingCard";
import CTASection from "@/components/sections/CTASection";
import MariageCategoryGallery from "@/app/mariage/MariageCategoryGallery";
import DroneGallery from "@/app/drone/DroneGallery";
import VideoHeroBlockView from "./VideoHeroBlockView";
import TrackedDownloadLink from "@/components/ui/TrackedDownloadLink";
import TrackedLink from "@/components/ui/TrackedLink";
import { getLockedRenderer } from "@/lib/blocks/locked-renderers";
import type {
  Block,
  HeroBlock,
  ParagraphsBlock,
  GalleryBlock,
  VideosBlock,
  PricingBlock,
  FaqBlock,
  SummaryBlock,
  StepsBlock,
  CertificationsBlock,
  CtaBlock,
  ImageTextBlock,
  QuoteBlock,
  LinkCardsBlock,
  TestimonialsBlock,
  LockedBlock,
} from "@/lib/blocks/types";

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroBlockView({ block }: { block: HeroBlock }) {
  return (
    <PageHero
      title={block.data.title}
      subtitle={block.data.subtitle}
      backgroundImage={block.data.backgroundImage || "/uploads/hortense-portrait.jpg"}
    />
  );
}

// ─── Paragraphs ──────────────────────────────────────────────────────────────
function ParagraphsBlockView({ block }: { block: ParagraphsBlock }) {
  if (block.data.paragraphs.length === 0) return null;
  return (
    <section className="pt-12 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-6 text-warmgray leading-relaxed">
        {block.data.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

// ─── Gallery (heading editable, photos managed externally) ──────────────────
function GalleryBlockView({ block }: { block: GalleryBlock }) {
  return (
    <section className="pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          {block.data.heading}
        </h2>
        {block.data.galleryRef === "mariage" && <MariageCategoryGallery />}
        {block.data.galleryRef === "drone" && <DroneGallery />}
      </div>
    </section>
  );
}

// ─── Videos ──────────────────────────────────────────────────────────────────
function VideosBlockView({ block }: { block: VideosBlock }) {
  if (block.data.videos.length === 0) return null;
  return (
    <section className="py-20 px-4 bg-sand">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          {block.data.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {block.data.videos.map((video) => (
            <div
              key={video.src}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-md"
            >
              <iframe
                src={video.src}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function PricingBlockView({ block }: { block: PricingBlock }) {
  if (block.data.plans.length === 0) return null;
  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
          {block.data.heading}
        </h2>
        {block.data.subtitle && (
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">
            {block.data.subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {block.data.plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
        {block.data.brochurePath && (
          <div className="text-center mt-12">
            <TrackedDownloadLink
              href={block.data.brochurePath}
              className="inline-flex items-center gap-2 bg-gold text-white py-3 px-8 rounded-full font-medium text-lg transition-colors hover:bg-gold/90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {block.data.brochureLabel || "Télécharger la plaquette"}
            </TrackedDownloadLink>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FaqBlockView({ block }: { block: FaqBlock }) {
  if (block.data.items.length === 0) return null;
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          {block.data.heading}
        </h2>
        <div className="space-y-4">
          {block.data.items.map((item, i) => (
            <details key={i} className="group rounded-xl border border-sand bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-charcoal font-medium">
                {item.question}
                <svg className="h-5 w-5 shrink-0 text-warmgray transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="px-6 pb-4 text-warmgray leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Summary (= Ce qu'il faut retenir) ──────────────────────────────────────
function SummaryBlockView({ block }: { block: SummaryBlock }) {
  if (block.data.items.length === 0) return null;
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl bg-sand/30 border border-sand p-8">
        <h2 className="font-serif text-2xl text-charcoal mb-4">{block.data.heading}</h2>
        <ul className="space-y-2 text-warmgray">
          {block.data.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Steps (process) ─────────────────────────────────────────────────────────
function StepsBlockView({ block }: { block: StepsBlock }) {
  if (block.data.steps.length === 0) return null;
  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
          {block.data.heading}
        </h2>
        {block.data.subtitle && (
          <p className="text-warmgray text-center mb-16 max-w-xl mx-auto">
            {block.data.subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {block.data.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative flex h-16 w-16 items-center justify-center mb-4 rounded-full bg-gold/10 text-gold font-serif text-2xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-charcoal mb-3 leading-snug">
                {step.title}
              </h3>
              <div className="h-px w-10 bg-sand mb-3" />
              <p className="text-sm text-warmgray leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ──────────────────────────────────────────────────────────
function CertificationsBlockView({ block }: { block: CertificationsBlock }) {
  if (block.data.items.length === 0) return null;
  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          {block.data.heading}
        </h2>
        <div className="space-y-6">
          {block.data.items.map((cert) => (
            <div key={cert.title} className="bg-sand rounded-2xl p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-charcoal mb-1">{cert.title}</h3>
                <p className="text-warmgray leading-relaxed">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CtaBlockView({ block }: { block: CtaBlock }) {
  // Light variant: cream background, used for secondary CTAs (e.g. linking
  // to an internal anchor like /#temoignages on the À propos page).
  if (block.data.style === "light") {
    return (
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {block.data.title}
          </h2>
          {block.data.subtitle && (
            <p className="text-warmgray leading-relaxed mb-8">{block.data.subtitle}</p>
          )}
          <TrackedLink
            href={block.data.buttonHref}
            className="inline-block bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-gold/90 transition-colors text-sm uppercase tracking-wide"
            eventLabel={block.data.buttonText}
          >
            {block.data.buttonText}
          </TrackedLink>
        </div>
      </section>
    );
  }
  // Default: dark, full-width CTASection
  return (
    <CTASection
      title={block.data.title}
      subtitle={block.data.subtitle}
      buttonText={block.data.buttonText}
      buttonHref={block.data.buttonHref}
    />
  );
}

// ─── Link cards (e.g. À propos « Expertise ») ───────────────────────────────
function LinkCardsBlockView({ block }: { block: LinkCardsBlock }) {
  if (block.data.cards.length === 0) return null;
  return (
    <section className="py-20 px-4 bg-sand">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          {block.data.heading}
        </h2>
        <div className={`grid grid-cols-1 gap-8 ${block.data.cards.length >= 2 ? "md:grid-cols-2" : ""}`}>
          {block.data.cards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="group bg-cream rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-2xl text-charcoal mb-4 group-hover:text-gold transition-colors">
                {card.title}
              </h3>
              <p className="text-warmgray leading-relaxed">{card.description}</p>
              <span className="inline-block mt-4 text-gold font-medium text-sm uppercase tracking-wide">
                {card.linkLabel} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Image + texte ───────────────────────────────────────────────────────────
function ImageTextBlockView({ block }: { block: ImageTextBlock }) {
  const imageOnLeft = block.data.imagePosition === "left";
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`grid gap-12 md:grid-cols-2 items-center ${imageOnLeft ? "" : "md:[direction:rtl]"}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:[direction:ltr]">
            {block.data.image && (
              <Image
                src={block.data.image}
                alt={block.data.heading || "Illustration"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
          <div className="md:[direction:ltr]">
            {block.data.heading && (
              <h2 className="font-serif text-3xl text-charcoal mb-6">{block.data.heading}</h2>
            )}
            <div className="space-y-4 text-warmgray leading-relaxed">
              {block.data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials (grille de citations clients) ─────────────────────────────
function TestimonialsBlockView({ block }: { block: TestimonialsBlock }) {
  if (block.data.items.length === 0) return null;
  return (
    <section id="temoignages" className="py-20 px-4 bg-sand">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
          {block.data.heading}
        </h2>
        {block.data.subheading && (
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">{block.data.subheading}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {block.data.items.map((t, i) => (
            <div key={i} className="bg-cream rounded-2xl p-8 shadow-sm h-full flex flex-col">
              <svg className="w-8 h-8 text-gold mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <blockquote className="text-warmgray italic leading-relaxed flex-grow mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-sand pt-4">
                <p className="font-serif text-charcoal font-semibold">{t.author}</p>
                {t.detail && <p className="text-warmgray text-sm">{t.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Locked (rendered by hardcoded code, not by data) ───────────────────────
// Locked renderers can be sync OR async (e.g. when they need to read from DB
// at request time). This is an async server component that awaits both cases.
async function LockedBlockView({ block }: { block: LockedBlock }) {
  const renderer = getLockedRenderer(block.data.rendererKey);
  if (!renderer) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[blocks] Unknown locked renderer: "${block.data.rendererKey}"`);
    }
    return null;
  }
  const rendered = await renderer.render();
  return <>{rendered}</>;
}

// ─── Quote ───────────────────────────────────────────────────────────────────
function QuoteBlockView({ block }: { block: QuoteBlock }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <svg className="w-10 h-10 mx-auto mb-4 text-gold/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
        <p className="font-serif text-xl md:text-2xl text-charcoal italic leading-relaxed">
          {block.data.text}
        </p>
        {block.data.author && (
          <p className="mt-6 text-sm uppercase tracking-widest text-warmgray">
            — {block.data.author}
            {block.data.role && <span className="text-warmgray/70">, {block.data.role}</span>}
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────
export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlockView block={block} />;
    case "video-hero":
      return <VideoHeroBlockView block={block} />;
    case "paragraphs":
      return <ParagraphsBlockView block={block} />;
    case "gallery":
      return <GalleryBlockView block={block} />;
    case "videos":
      return <VideosBlockView block={block} />;
    case "pricing":
      return <PricingBlockView block={block} />;
    case "faq":
      return <FaqBlockView block={block} />;
    case "summary":
      return <SummaryBlockView block={block} />;
    case "steps":
      return <StepsBlockView block={block} />;
    case "certifications":
      return <CertificationsBlockView block={block} />;
    case "cta":
      return <CtaBlockView block={block} />;
    case "image-text":
      return <ImageTextBlockView block={block} />;
    case "quote":
      return <QuoteBlockView block={block} />;
    case "link-cards":
      return <LinkCardsBlockView block={block} />;
    case "testimonials":
      return <TestimonialsBlockView block={block} />;
    case "locked":
      return <LockedBlockView block={block} />;
  }
}
