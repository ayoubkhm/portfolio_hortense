import Link from "next/link";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col transition-transform hover:-translate-y-1 ${
        highlighted
          ? "bg-gold text-white shadow-lg scale-[1.02]"
          : "bg-sand text-charcoal"
      }`}
    >
      <h3 className="font-serif text-2xl mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-6">{price}</p>
      <hr
        className={`mb-6 ${highlighted ? "border-white/30" : "border-warmgray/30"}`}
      />
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${highlighted ? "text-white" : "text-sage"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className={highlighted ? "text-white/90" : "text-warmgray"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={`block text-center py-3 px-6 rounded-full font-medium transition-colors ${
          highlighted
            ? "bg-white text-gold hover:bg-cream"
            : "bg-charcoal text-white hover:bg-charcoal/90"
        }`}
      >
        Demander un devis
      </Link>
    </div>
  );
}