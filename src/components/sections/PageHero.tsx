import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sand text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
