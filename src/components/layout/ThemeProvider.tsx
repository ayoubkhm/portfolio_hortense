"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ThemeProvider() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return; // Don't apply custom theme to admin pages

    fetch("/api/content/content_theme")
      .then((r) => r.json())
      .then((colors) => {
        if (!colors || typeof colors !== "object") return;
        const root = document.documentElement;
        const colorMap: Record<string, string> = {
          cream: "--color-cream",
          sand: "--color-sand",
          charcoal: "--color-charcoal",
          warmgray: "--color-warmgray",
          sage: "--color-sage",
          gold: "--color-gold",
        };
        for (const [key, cssVar] of Object.entries(colorMap)) {
          if (colors[key]) {
            root.style.setProperty(cssVar, colors[key]);
          }
        }
      })
      .catch(() => {});
  }, [isAdmin]);

  return null;
}
