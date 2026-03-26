import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutSection() {
  return (
    <section id="about" className="bg-cream py-24">
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src="/uploads/hortense-portrait.jpg"
                alt="Hortense de Ruidiaz — Photographe & Opératrice Drone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
                À propos
              </h2>

              <div className="mt-6 space-y-4 leading-relaxed text-warmgray">
                <p>
                  Je suis Hortense de Ruidiaz, photographe et opératrice drone
                  basée à Bordeaux. Passionnée par l&apos;image depuis toujours,
                  je mets mon regard artistique au service de vos plus beaux
                  moments. Chaque instant mérite d&apos;être capturé avec
                  authenticité et émotion.
                </p>

                <p>
                  Spécialisée dans la photographie de mariage, je vous
                  accompagne tout au long de votre journée pour immortaliser ces
                  instants précieux avec sensibilité et discrétion. Mon approche
                  se veut naturelle, chaleureuse et attentive aux détails qui
                  font la singularité de votre histoire.
                </p>

                <p>
                  Pilote de drone certifiée, je propose également des prises de
                  vue aériennes qui offrent une perspective unique sur vos
                  événements, propriétés ou projets. Que ce soit pour un mariage
                  en plein air, un domaine viticole ou un projet immobilier, la
                  vue du ciel sublime chaque sujet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
