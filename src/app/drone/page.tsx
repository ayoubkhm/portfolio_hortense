import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import DroneGallery from "./DroneGallery";
import Link from "next/link";
import { getContent, DRONE_DEFAULTS, DroneContent } from "@/lib/content";
import { STEP_VISUALS } from "./step-visuals";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Opératrice Drone Certifiée CATS — Bordeaux",
  description:
    "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier, événements. Pilote certifiée CATS. Devis gratuit.",
  openGraph: {
    title: "Opératrice Drone Certifiée CATS — Bordeaux",
    description:
      "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier, événements. Pilote certifiée CATS. Devis gratuit.",
    url: "https://hortensederuidiaz.com/drone",
    images: [
      {
        url: "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Opératrice drone Bordeaux — Hortense de Ruidiaz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function DronePage() {
  const content = await getContent<DroneContent>("content_drone", DRONE_DEFAULTS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://hortensederuidiaz.com" },
          { "@type": "ListItem", "position": 2, "name": "Drone", "item": "https://hortensederuidiaz.com/drone" },
        ],
      },
      {
        "@type": "Service",
        "name": "Prises de Vue Drone",
        "serviceType": "Drone Photography & Videography",
        "provider": { "@id": "https://hortensederuidiaz.com/#localbusiness" },
        "areaServed": { "@type": "City", "name": "Bordeaux" },
        "description": "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier et événements.",
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Combien coûte une prestation drone ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Photo drone à partir de 100 \u20ac, vidéo drone à partir de 200 \u20ac. Suivi de chantier sur devis.",
            },
          },
          {
            "@type": "Question",
            "name": "Êtes-vous certifiée pour piloter un drone ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, je suis titulaire du CATS (Certificat d\u2019Aptitude Théorique de Télépilote).",
            },
          },
          {
            "@type": "Question",
            "name": "Dans quels domaines intervenez-vous ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Immobilier, architecture, suivi de chantier, événements sportifs et culturels.",
            },
          },
        ],
      },
    ],
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
      <Breadcrumbs items={[{ label: "Drone" }]} />

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

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Combien coûte une prestation drone à Bordeaux ?",
                a: "Photo drone à partir de 100 €, vidéo drone à partir de 200 €. Le suivi de chantier est sur devis, adapté à la fréquence et à la durée du projet."
              },
              {
                q: "Êtes-vous certifiée pour piloter un drone ?",
                a: "Oui, je suis titulaire du CATS (Certificat d\u2019Aptitude Théorique de Télépilote de drone). Chaque mission est réalisée dans le respect de la réglementation aérienne en vigueur."
              },
              {
                q: "Dans quels domaines intervenez-vous ?",
                a: "J\u2019interviens pour l\u2019immobilier, l\u2019architecture, le suivi de chantier, les événements sportifs et culturels, ainsi que pour des besoins spécifiques comme l\u2019observation ou l\u2019analyse aérienne."
              },
              {
                q: "Quel est le délai de livraison ?",
                a: "Les fichiers numériques sont livrés sous 48h à 2 semaines selon la complexité de la prestation. Pour le suivi de chantier, les rapports visuels sont livrés après chaque survol."
              },
              {
                q: "Intervenez-vous en dehors de Bordeaux ?",
                a: "Oui, je me déplace dans toute la Gironde et la Nouvelle-Aquitaine. Les frais de déplacement sont inclus dans un rayon de 50 km autour de Bordeaux."
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

      <CTASection
        title={content.ctaTitle}
        subtitle={content.ctaSubtitle}
        buttonText={content.ctaButtonText}
        buttonHref="/contact"
      />
    </main>
  );
}
