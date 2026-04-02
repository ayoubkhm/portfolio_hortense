import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="bg-sand/30 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center gap-2 text-sm text-warmgray">
          <li>
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <svg className="h-3 w-3 text-warmgray/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              {item.href ? (
                <Link href={item.href} className="hover:text-gold transition-colors">{item.label}</Link>
              ) : (
                <span className="text-charcoal font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
