"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "Hortense a su capturer chaque moment de notre mariage avec une sensibilité incroyable. Des préparatifs jusqu'à la soirée, elle s'est faite discrète tout en ne ratant aucun instant. Les photos sont naturelles, lumineuses et pleines d'émotion. On les regarde encore régulièrement !",
    author: "Camille & Julien",
    detail: "Mariage à Saint-Émilion, 2025",
  },
  {
    quote:
      "On hésitait à prendre la vidéo en plus de la photo, et on ne regrette absolument pas. Le film de notre mariage nous replonge à chaque visionnage dans l'ambiance de cette journée. Hortense a un vrai sens du storytelling.",
    author: "Laura & Maxime",
    detail: "Mariage au Château de la Rivière, 2025",
  },
  {
    quote:
      "Nous avons fait appel à Hortense pour des photos aériennes de plusieurs biens en vente. Résultat impeccable, images livrées en 48h, et un vrai plus pour nos annonces. Nous recommandons sans hésiter.",
    author: "Thomas B.",
    detail: "Directeur d'agence immobilière, Bordeaux",
  },
  {
    quote:
      "Le suivi de chantier par drone nous permet de documenter l'avancement de nos projets de manière professionnelle. Hortense est réactive, ponctuelle et ses images sont toujours exploitables immédiatement.",
    author: "Marie-Claire D.",
    detail: "Responsable de projets BTP, Mérignac",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="temoignages" className="py-20 px-4 bg-sand">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">
            Découvrez les retours de couples et professionnels qui ont fait confiance à Hortense.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i}>
              <div className="bg-cream rounded-2xl p-8 shadow-sm h-full flex flex-col">
                {/* Quote icon */}
                <svg
                  className="w-8 h-8 text-gold mb-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>

                {/* Quote text */}
                <blockquote className="text-warmgray italic leading-relaxed flex-grow mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-sand pt-4">
                  <p className="font-serif text-charcoal font-semibold">
                    {t.author}
                  </p>
                  {t.detail && (
                    <p className="text-warmgray text-sm">{t.detail}</p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
