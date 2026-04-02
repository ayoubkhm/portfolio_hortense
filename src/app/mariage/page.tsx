import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PricingCard from "@/components/sections/PricingCard";
import CTASection from "@/components/sections/CTASection";
import MariageCategoryGallery from "./MariageCategoryGallery";
import { getContent, MARIAGE_DEFAULTS, MariageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photographe Mariage Bordeaux — Tarifs dès 1 100 €",
  description:
    "Photographe mariage à Bordeaux. Reportage photo et vidéo de la cérémonie à la soirée. Tarifs de 1 100 € à 2 100 €. Devis gratuit.",
  openGraph: {
    title: "Photographe Mariage Bordeaux — Tarifs dès 1 100 €",
    description:
      "Photographe mariage à Bordeaux. Reportage photo et vidéo de la cérémonie à la soirée. Tarifs de 1 100 € à 2 100 €. Devis gratuit.",
    url: "https://hortensederuidiaz.com/mariage",
    images: [
      {
        url: "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Photographe mariage Bordeaux — Hortense de Ruidiaz",
      },
    ],
  },
};

export default async function MariagePage() {
  const content = await getContent<MariageContent>("content_mariage", MARIAGE_DEFAULTS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://hortensederuidiaz.com" },
          { "@type": "ListItem", "position": 2, "name": "Mariage", "item": "https://hortensederuidiaz.com/mariage" },
        ],
      },
      {
        "@type": "Service",
        "name": "Photographie de Mariage",
        "serviceType": "Wedding Photography",
        "provider": { "@id": "https://hortensederuidiaz.com/#localbusiness" },
        "areaServed": { "@type": "City", "name": "Bordeaux" },
        "description": "Photographe de mariage à Bordeaux. Reportage photo et vidéo complet.",
        "offers": [
          { "@type": "Offer", "name": "Photo Standard", "price": "1100", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Photo Premium", "price": "1700", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Vidéo Standard", "price": "1600", "priceCurrency": "EUR" },
          { "@type": "Offer", "name": "Vidéo Premium", "price": "2100", "priceCurrency": "EUR" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Combien coûte un photographe de mariage à Bordeaux ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Les tarifs commencent à 1 100 \u20ac pour la formule Photo Standard (cérémonie au cocktail) et vont jusqu\u2019à 2 100 \u20ac pour la formule Vidéo Premium (préparatifs à la soirée dansante).",
            },
          },
          {
            "@type": "Question",
            "name": "Quand recevrai-je mes photos de mariage ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Les photos triées et retouchées en haute qualité sont livrées sur clé USB sous 4 à 6 semaines. Une galerie privée en ligne est mise à disposition pour les invités.",
            },
          },
          {
            "@type": "Question",
            "name": "Vous déplacez-vous en dehors de Bordeaux ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, je me déplace dans toute la Nouvelle-Aquitaine et au-delà. Les frais de déplacement sont facturés au-delà de 50 km.",
            },
          },
          {
            "@type": "Question",
            "name": "Proposez-vous aussi la vidéo de mariage ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, je propose des formules vidéo avec plan drone compris, de 1 600 \u20ac à 2 100 \u20ac selon la durée de couverture.",
            },
          },
        ],
      },
      ...content.videoEmbeds.map((video, i) => ({
        "@type": "VideoObject",
        "name": video.title || `Vidéo mariage ${i + 1}`,
        "description": "Reportage vidéo de mariage par Hortense de Ruidiaz, photographe à Bordeaux",
        "thumbnailUrl": `https://img.youtube.com/vi/${video.src.includes('youtube') ? video.src.split('/').pop() : ''}/maxresdefault.jpg`,
        "uploadDate": "2026-01-01",
        "contentUrl": video.src.replace('/embed/', '/watch?v=').replace('player.vimeo.com/video/', 'vimeo.com/'),
        "embedUrl": video.src,
      })),
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
      <Breadcrumbs items={[{ label: "Mariage" }]} />

      {/* Description */}
      <section className="pt-12 pb-20 px-4">
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

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Combien coûte un photographe de mariage à Bordeaux ?",
                a: "Les tarifs commencent à 1 100 € pour la formule Photo Standard (cérémonie au cocktail, séance couple, photos retouchées sur clé USB) et vont jusqu\u2019à 2 100 € pour la formule Vidéo Premium (préparatifs à la soirée dansante, plan drone compris)."
              },
              {
                q: "Quand recevrai-je mes photos de mariage ?",
                a: "Les photos triées et retouchées en haute qualité sont livrées sur clé USB sous 4 à 6 semaines après votre mariage. Une galerie privée en ligne est également mise à disposition pour vos invités."
              },
              {
                q: "Vous déplacez-vous en dehors de Bordeaux ?",
                a: "Oui, je me déplace dans toute la Nouvelle-Aquitaine et au-delà. Les frais de déplacement sont facturés dans leur totalité dès que la distance excède 50 kilomètres. Des frais d\u2019hébergement peuvent s\u2019appliquer au-delà de 2 heures de trajet."
              },
              {
                q: "Proposez-vous aussi la vidéo de mariage ?",
                a: "Oui, je propose des formules vidéo avec plan drone compris, de 1 600 € (Vidéo Standard, 3-5 min) à 2 100 € (Vidéo Premium, 6-7 min). La vidéo est livrée par téléchargement privé."
              },
              {
                q: "Comment se déroule un reportage mariage ?",
                a: "Je vous accompagne de manière discrète tout au long de la journée. Mon approche est naturelle et spontanée : je capture les émotions, les détails et l\u2019ambiance sans intervenir dans le déroulé. Chaque reportage est unique et adapté à vos envies."
              },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl border border-sand bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-charcoal font-medium">
                  {faq.q}
                  <svg className="h-5 w-5 shrink-0 text-warmgray transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="px-6 pb-4 text-warmgray leading-relaxed">{faq.a}</p>
              </details>
            ))}
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
