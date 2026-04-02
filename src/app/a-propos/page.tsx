import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "À propos — Hortense de Ruidiaz, Photographe & Drone Bordeaux",
  description:
    "Découvrez le parcours d'Hortense de Ruidiaz, photographe professionnelle et opératrice drone certifiée CATS à Bordeaux. Expérience, certifications et valeurs.",
  openGraph: {
    title: "À propos — Hortense de Ruidiaz, Photographe & Drone Bordeaux",
    description:
      "Découvrez le parcours d'Hortense de Ruidiaz, photographe professionnelle et opératrice drone certifiée CATS à Bordeaux.",
    url: "https://hortensederuidiaz.com/a-propos",
    images: [
      {
        url: "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Hortense de Ruidiaz — Photographe & Drone Bordeaux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const stats = [
  { value: "[X]+", label: "mariages couverts" },
  { value: "[X]", label: "ans d'expérience" },
  { value: "100%", label: "de clients satisfaits" },
  { value: "Nouvelle-Aquitaine", label: "et au-delà" },
];

const certifications = [
  {
    title: "CATS",
    description: "Certificat d'Aptitude Théorique de Télépilote — autorisation officielle pour le pilotage de drone professionnel en France.",
  },
  {
    title: "Formation photographe",
    description: "[Placeholder — préciser la formation et l'établissement]",
  },
  {
    title: "Assurance professionnelle",
    description: "[Placeholder — préciser l'assurance RC Pro et drone]",
  },
];

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://hortensederuidiaz.com/a-propos#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hortensederuidiaz.com" },
          { "@type": "ListItem", position: 2, name: "À propos", item: "https://hortensederuidiaz.com/a-propos" },
        ],
      },
      {
        "@type": "Person",
        "@id": "https://hortensederuidiaz.com/#person",
        name: "Hortense de Ruidiaz",
        jobTitle: "Photographe professionnelle & Opératrice drone certifiée",
        url: "https://hortensederuidiaz.com",
        image: "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        email: "contact@hortensederuidiaz.com",
        telephone: "+33616282270",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bordeaux",
          addressRegion: "Nouvelle-Aquitaine",
          addressCountry: "FR",
        },
        sameAs: ["https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/"],
        knowsAbout: [
          "Photographie de mariage",
          "Pilotage de drone professionnel",
          "Vidéo aérienne",
          "Photographie immobilière",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "CATS — Certificat d'Aptitude Théorique de Télépilote",
          recognizedBy: { "@type": "Organization", name: "DGAC" },
        },
        worksFor: {
          "@id": "https://hortensederuidiaz.com/#organization",
        },
      },
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
        title="À propos"
        subtitle="Photographe professionnelle & opératrice drone certifiée à Bordeaux"
        backgroundImage="/uploads/hortense-portrait.jpg"
      />

      {/* Portrait + Bio */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/uploads/hortense-portrait.jpg"
                  alt="Hortense de Ruidiaz, photographe et opératrice drone à Bordeaux"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-6 text-warmgray leading-relaxed">
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  Hortense de Ruidiaz
                </h2>
                <p>
                  Hortense de Ruidiaz est photographe professionnelle et opératrice drone certifiée, basée à Bordeaux. Forte de [X] années d&apos;expérience dans la photographie de mariage et la captation aérienne, elle accompagne chaque projet avec sensibilité et exigence.
                </p>
                <p>
                  Certifiée CATS (Certificat d&apos;Aptitude Théorique de Télépilote), elle propose des prestations complètes alliant photographie au sol et vues aériennes par drone, offrant ainsi des perspectives uniques sur chaque événement ou projet.
                </p>
                <p>
                  Avec plus de [X] mariages couverts et de nombreuses collaborations dans le domaine de l&apos;immobilier et de l&apos;événementiel, Hortense s&apos;engage à livrer des images authentiques, soignées et fidèles à l&apos;émotion du moment.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
              Domaines d&apos;expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                href="/mariage"
                className="group bg-cream rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-serif text-2xl text-charcoal mb-4 group-hover:text-gold transition-colors">
                  Photographie de Mariage
                </h3>
                <p className="text-warmgray leading-relaxed">
                  Reportage photo et vidéo complet, des préparatifs à la soirée dansante. Un regard discret et attentif pour capturer chaque émotion de votre journée.
                </p>
                <span className="inline-block mt-4 text-gold font-medium text-sm uppercase tracking-wide">
                  Découvrir les prestations &rarr;
                </span>
              </Link>
              <Link
                href="/drone"
                className="group bg-cream rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-serif text-2xl text-charcoal mb-4 group-hover:text-gold transition-colors">
                  Captation Drone
                </h3>
                <p className="text-warmgray leading-relaxed">
                  Opératrice drone certifiée CATS pour des prises de vues aériennes professionnelles : immobilier, événementiel, tourisme et projets créatifs.
                </p>
                <span className="inline-block mt-4 text-gold font-medium text-sm uppercase tracking-wide">
                  Découvrir les prestations &rarr;
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications & Formation */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
              Certifications & Formation
            </h2>
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="bg-sand rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-charcoal mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-warmgray leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="py-20 px-4 bg-sage/20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
              Chiffres clés
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl md:text-4xl text-gold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-warmgray text-sm uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-warmgray leading-relaxed mb-8">
              Couples, agences immobilières, professionnels du BTP&nbsp;— découvrez les retours de ceux qui ont fait confiance à Hortense pour leurs projets photo et drone.
            </p>
            <Link
              href="/#temoignages"
              className="inline-block bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-gold/90 transition-colors text-sm uppercase tracking-wide"
            >
              Lire les témoignages
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Parlons de votre projet"
        subtitle="Mariage, drone ou autre projet photo — contactez-moi pour un devis gratuit et personnalisé."
        buttonText="Me contacter"
        buttonHref="/contact"
      />
    </main>
  );
}
