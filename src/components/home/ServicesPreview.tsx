import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ServiceItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

interface ServicesPreviewProps {
  heading?: string;
  services?: ServiceItem[];
}

function ServiceCard({ title, description, imageSrc, imageAlt, href }: ServiceItem) {
  return (
    <a
      href={href}
      className="group relative block h-[400px] overflow-hidden rounded-2xl"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/40" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand/90">
          {description}
        </p>
        <span className="mt-6 inline-block border-b-2 border-gold pb-1 text-sm font-semibold uppercase tracking-widest text-gold transition-colors duration-300 group-hover:border-white group-hover:text-white">
          Découvrir
        </span>
      </div>
    </a>
  );
}

export default function ServicesPreview({
  heading = "Mes Services",
  services = [],
}: ServicesPreviewProps) {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-charcoal md:text-4xl">
            {heading}
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
