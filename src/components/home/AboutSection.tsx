import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface AboutSectionProps {
  heading?: string;
  paragraphs?: string[];
  portraitImage?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function AboutSection({
  heading = "À propos",
  paragraphs = [],
  portraitImage = "/uploads/hortense-portrait.jpg",
  ctaHref,
  ctaLabel = "En savoir plus sur Hortense",
}: AboutSectionProps) {
  return (
    <section id="about" className="bg-cream py-24">
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src={portraitImage}
                alt="Hortense de Ruidiaz — Photographe & Opératrice Drone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
                {heading}
              </h2>

              <div className="mt-6 space-y-4 leading-relaxed text-warmgray">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {ctaHref && (
                <Link
                  href={ctaHref}
                  className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-gold/90"
                >
                  {ctaLabel} &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
