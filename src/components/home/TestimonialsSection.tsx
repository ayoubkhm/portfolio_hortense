"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "Hortense a su capturer chaque émotion de notre mariage avec une sensibilité rare. Les photos sont magnifiques, naturelles et pleines de vie.",
    author: "Marie & Thomas",
    detail: "Mariage 2025",
  },
  {
    quote:
      "Un travail de drone exceptionnel pour notre projet immobilier. Images nettes, livrées rapidement. Très professionnelle.",
    author: "Agence Immobilière Bordeaux",
    detail: "",
  },
  {
    quote:
      "De la préparation à la soirée, Hortense a été discrète et attentive. Le résultat dépasse nos attentes.",
    author: "Sophie & Alexandre",
    detail: "Mariage 2024",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-sand">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-warmgray text-center mb-12 max-w-xl mx-auto">
            Découvrez les retours de couples et professionnels qui ont fait confiance à Hortense.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <blockquote className="text-warmgray leading-relaxed flex-grow mb-6">
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
