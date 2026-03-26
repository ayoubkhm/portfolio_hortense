import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingCard from "@/components/sections/PricingCard";
import CTASection from "@/components/sections/CTASection";
import DroneGallery from "./DroneGallery";

export const metadata: Metadata = {
  title: "Prises de Vue Drone | Hortense de Ruidiaz",
  description:
    "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier et événements — pilote certifiée, images en haute définition.",
};

const pricingPlans = [
  {
    title: "Immobilier",
    price: "À partir de 350 €",
    features: ["Photos HD", "Vidéo 4K", "Livraison 48h"],
  },
  {
    title: "Suivi Chantier",
    price: "À partir de 250 €/mois",
    features: ["Survol mensuel", "Photos comparatives", "Rapports visuels"],
    highlighted: true,
  },
  {
    title: "Événement",
    price: "Sur devis",
    features: ["Captation live", "Montage vidéo", "Photos aériennes"],
  },
];

export default function DronePage() {
  return (
    <main>
      {/* Hero */}
      <PageHero
        title="Prises de Vue Drone"
        subtitle="Des perspectives uniques vues du ciel"
        backgroundImage="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
      />

      {/* Description */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-warmgray leading-relaxed">
          <p className="text-lg">
            Pilote de drone certifiée, je propose des prises de vue aériennes
            professionnelles pour valoriser vos projets sous un angle inédit.
            Que ce soit pour l’immobilier, le suivi de chantier ou la couverture
            d’événements, le drone offre une perspective saisissante qui fait
            toute la différence.
          </p>
          <p>
            Basée dans la région bordelaise, j’interviens sur l’ensemble de la
            Nouvelle-Aquitaine. Chaque mission est réalisée dans le respect de
            la réglementation aérienne en vigueur, avec un matériel de dernière
            génération pour des rendus en haute définition.
          </p>
          <p>
            Photos HD, vidéos 4K, plans cinématographiques : je m’adapte à vos
            besoins pour fournir des visuels percutants qui mettent en valeur
            votre bien, votre chantier ou votre événement.
          </p>
        </div>
      </section>

      {/* Gallery with category tabs */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
            Réalisations Drone
          </h2>
          <DroneGallery />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
            Formules & Tarifs
          </h2>
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">
            Des prestations adaptées à chaque besoin, de l’immobilier au suivi de chantier.
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
        title="Un projet en vue ?"
        subtitle="Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé."
        buttonText="Demander un devis"
        buttonHref="/contact"
      />
    </main>
  );
}