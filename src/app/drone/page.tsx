import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import DroneGallery from "./DroneGallery";
import Link from "next/link";
import { getContent, DRONE_DEFAULTS, DroneContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prises de Vue Drone | Hortense de Ruidiaz",
  description:
    "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier et événements — pilote certifiée CATS, images en haute définition.",
};

const STEP_VISUALS = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    color: "text-[#7EB5D6]",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
    color: "text-[#E8B87D]",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    color: "text-[#8DC49A]",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: "text-[#E08B8B]",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
      </svg>
    ),
    color: "text-[#A78BCA]",
  },
];

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
