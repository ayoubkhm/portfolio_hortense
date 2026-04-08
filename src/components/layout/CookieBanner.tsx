"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY);
    if (!choice) {
      setVisible(true);
    }
  }, []);

  function handleChoice(accepted: boolean) {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Bannière de consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-cream px-4 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:gap-6">
        <p className="font-sans text-sm leading-relaxed text-charcoal/90 sm:flex-1">
          Ce site utilise uniquement des cookies techniques nécessaires à son
          bon fonctionnement. Aucun cookie publicitaire ou de suivi n&apos;est
          utilisé.{" "}
          <Link
            href="/politique-confidentialite"
            className="underline underline-offset-2 transition-colors hover:text-gold"
          >
            En savoir plus
          </Link>
        </p>

        <div className="flex w-full shrink-0 gap-3 sm:w-auto">
          <button
            onClick={() => handleChoice(false)}
            className="flex-1 rounded-md border border-charcoal/20 bg-transparent px-5 py-2 font-sans text-sm font-medium text-charcoal transition-colors hover:border-charcoal/40 sm:flex-none"
          >
            Refuser tout
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="flex-1 rounded-md border border-gold bg-gold px-5 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-gold/90 sm:flex-none"
          >
            Accepter tout
          </button>
        </div>
      </div>
    </div>
  );
}
