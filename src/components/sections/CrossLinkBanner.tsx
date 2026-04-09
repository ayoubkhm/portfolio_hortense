import Link from "next/link";

interface CrossLinkBannerProps {
  heading: string;
  description: string;
  href: string;
  linkText: string;
}

export default function CrossLinkBanner({ heading, description, href, linkText }: CrossLinkBannerProps) {
  return (
    <section className="bg-sand/30 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-2xl text-charcoal mb-3">{heading}</h2>
        <p className="text-warmgray mb-6">{description}</p>
        <Link
          href={href}
          className="inline-block rounded-full border-2 border-gold px-8 py-3 text-sm font-medium uppercase tracking-wide text-gold transition-all hover:bg-gold hover:text-white"
        >
          {linkText} &rarr;
        </Link>
      </div>
    </section>
  );
}
