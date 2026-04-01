import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingCard from "@/components/sections/PricingCard";
import CTASection from "@/components/sections/CTASection";
import MariageCategoryGallery from "./MariageCategoryGallery";
import { getContent, MARIAGE_DEFAULTS, MariageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photographie de Mariage | Hortense de Ruidiaz",
  description:
    "Photographe de mariage à Bordeaux. Capturer les émotions et les instants précieux de votre plus beau jour avec sensibilité et élégance.",
};

export default async function MariagePage() {
  const content = await getContent<MariageContent>("content_mariage", MARIAGE_DEFAULTS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Photographie de Mariage",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Hortense de Ruidiaz",
    },
    "areaServed": "Bordeaux, Nouvelle-Aquitaine",
    "description": "Photographe de mariage à Bordeaux. Capturer les émotions et les instants précieux de votre plus beau jour.",
    "offers": [
      { "@type": "Offer", "name": "Photo Standard", "price": "1100", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Photo Premium", "price": "1700", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Vidéo Standard", "price": "1600", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Vidéo Premium", "price": "2100", "priceCurrency": "EUR" },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <PageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
      />

      {/* Description */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-warmgray leading-relaxed">
          {content.descriptionParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Category Gallery */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            {content.galleryHeading}
          </h2>
          <MariageCategoryGallery />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            {content.videoSectionHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.videoEmbeds.map((video) => (
              <div
                key={video.src}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-md"
              >
                <iframe
                  src={video.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
            {content.pricingHeading}
          </h2>
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">
            {content.pricingSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.pricingPlans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
          {/* Download brochure button */}
          <div className="text-center mt-12">
            <a
              href={content.brochurePath}
              download
              className="inline-flex items-center gap-2 bg-gold text-white py-3 px-8 rounded-full font-medium text-lg transition-colors hover:bg-gold/90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger la plaquette
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={content.ctaTitle}
        subtitle={content.ctaSubtitle}
        buttonText={content.ctaButtonText}
        buttonHref="/contact"
      />
    </main>
  );
}
