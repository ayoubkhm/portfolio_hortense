import Link from "next/link";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title,
  subtitle,
  buttonText = "Me contacter",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-charcoal py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sand text-lg mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}

        <Link
          href={buttonHref}
          className="inline-block bg-gold text-white py-3 px-8 rounded-full font-medium text-lg transition-colors hover:bg-gold/90"
        >
          {buttonText}
        </Link>
        <p className="mt-3 text-sm text-sand/70">Sans engagement · Réponse sous 24h</p>
      </div>
    </section>
  );
}