import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import DroneGallery from "./DroneGallery";
import Link from "next/link";
import { getContent, DRONE_DEFAULTS, DroneContent } from "@/lib/content";
import { STEP_VISUALS } from "./step-visuals";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prises de Vue Drone | Hortense de Ruidiaz",
  description:
    "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier et événements — pilote certifiée CATS, images en haute définition.",
};

export default async function DronePage() {
  const content = await getContent<DroneContent>("content_drone", DRONE_DEFAULTS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Prises de Vue Drone",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Hortense de Ruidiaz",
    },
    "areaServed": "Bordeaux, Nouvelle-Aquitaine",
    "description": "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier et événements.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
      />

      {/* Description */}
      <section className="pt-12 pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-warmgray leading-relaxed">
          {content.descriptionParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-sand/50 px-6 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <p className="text-charcoal text-sm">
              <strong>{content.catsCertificationText}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            {content.galleryHeading}
          </h2>
          <DroneGallery />
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
            {content.processHeading}
          </h2>
          <p className="text-warmgray text-center mb-16 max-w-xl mx-auto">
            {content.processSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {content.processSteps.map((step, i) => {
              const visual = STEP_VISUALS[i] || STEP_VISUALS[0];
              const stepNum = i + 1;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`relative flex h-24 w-24 items-center justify-center mb-5 ${visual.color}`}>
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="44" fill="none" stroke="#E8E0D4" strokeWidth="3" />
                      <circle
                        cx="48" cy="48" r="44"
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
          </div>
        </div>
      </section>

      <CTASection
        title={content.ctaTitle}
        subtitle={content.ctaSubtitle}
        buttonText={content.ctaButtonText}
        buttonHref="/contact"
      />
    </main>
  );
}
