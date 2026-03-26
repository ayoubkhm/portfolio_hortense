import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingCard from "@/components/sections/PricingCard";
import CTASection from "@/components/sections/CTASection";
import { GalleryProvider } from "@/components/gallery/GalleryContext";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { getPlaceholders } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Photographie de Mariage | Hortense de Ruidiaz",
  description:
    "Photographe de mariage à Bordeaux. Capturer les émotions et les instants précieux de votre plus beau jour avec sensibilité et élégance.",
};

const pricingPlans = [
  {
    title: "Essentiel",
    price: "À partir de 1 000 €",
    features: [
      "Couverture 6h",
      "300+ photos retouchées",
      "Galerie privée en ligne",
    ],
  },
  {
    title: "Complet",
    price: "À partir de 1 800 €",
    features: [
      "Couverture journée complète",
      "500+ photos retouchées",
      "Galerie privée",
      "Album photo 30x30",
      "Séance engagement offerte",
    ],
    highlighted: true,
  },
  {
    title: "Sur Mesure",
    price: "Sur devis",
    features: [
      "Drone en supplément",
      "Second photographe",
      "Couverture multi-jours",
    ],
  },
];

export default function MariagePage() {
  const images = getPlaceholders("mariage");

  return (
    <main>
      {/* Hero */}
      <PageHero
        title="Photographie de Mariage"
        subtitle="Des souvenirs qui traversent le temps"
        backgroundImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      />

      {/* Description */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-warmgray leading-relaxed">
          <p className="text-lg">
            Votre mariage est une histoire unique, et chaque détail compte. De la
            douceur des préparatifs à l’émotion de la cérémonie, en passant par la
            joie des célébrations, je m’attache à capturer ces instants avec
            authenticité et sensibilité.
          </p>
          <p>
            Mon approche est discrète et naturelle : je vous accompagne tout au
            long de la journée pour saisir les regards complices, les rires
            spontanés et les larmes de bonheur. Chaque cliché raconte un moment
            de votre histoire, avec une esthétique intemporelle et chaleureuse.
          </p>
          <p>
            Basée à Bordeaux, j’interviens dans toute la Nouvelle-Aquitaine et
            au-delà. Rencontrons-nous pour échanger autour de votre projet et
            créer ensemble les souvenirs de votre plus beau jour.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            Galerie Mariage
          </h2>
          <GalleryProvider>
            <GalleryGrid category="mariage" />
            <GalleryLightbox
              images={images.map((img) => ({ src: img.src, alt: img.alt }))}
            />
          </GalleryProvider>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
            Formules & Tarifs
          </h2>
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">
            Chaque formule est personnalisable selon vos envies et votre budget.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Racontez-moi votre histoire"
        subtitle="Chaque mariage est unique. Discutons du vôtre autour d’un café ou en visio."
        buttonText="Prendre contact"
        buttonHref="/contact"
      />
    </main>
  );
}