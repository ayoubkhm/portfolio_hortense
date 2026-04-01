import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-sans text-sm font-medium uppercase tracking-[0.3em] text-gold">
        Erreur 404
      </p>

      <h1 className="mt-4 font-serif text-5xl font-bold tracking-tight text-charcoal md:text-7xl">
        Page introuvable
      </h1>

      <div className="mx-auto mt-6 h-px w-16 bg-sand" />

      <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-warmgray">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
        Laissez-moi vous guider vers le bon chemin.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-block rounded-full bg-charcoal px-8 py-3 font-sans text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-charcoal/85"
        >
          Retour à l&apos;accueil
        </Link>

        <Link
          href="/contact"
          className="inline-block rounded-full border border-charcoal/20 px-8 py-3 font-sans text-sm font-medium tracking-wide text-charcoal transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          Me contacter
        </Link>
      </div>
    </main>
  );
}
