"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

/**
 * Global click listener that auto-tracks important user interactions
 * via event delegation. Drop once in the layout — no per-component changes needed.
 */
export default function AutoTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";

        // Phone clicks
        if (href.startsWith("tel:")) {
          trackEvent({ action: "phone_click", category: "contact", label: href });
          return;
        }

        // Email clicks
        if (href.startsWith("mailto:")) {
          trackEvent({ action: "email_click", category: "contact", label: href });
          return;
        }

        // Social media clicks
        if (anchor.getAttribute("aria-label")?.match(/instagram|facebook|linkedin/i) ||
            href.match(/instagram\.com|facebook\.com|linkedin\.com/i)) {
          const platform = href.includes("instagram") ? "instagram"
            : href.includes("facebook") ? "facebook"
            : href.includes("linkedin") ? "linkedin"
            : "social";
          trackEvent({ action: "social_click", category: "engagement", label: platform });
          return;
        }

        // Floating contact button
        if (anchor.getAttribute("aria-label") === "Nous contacter") {
          trackEvent({ action: "cta_click", category: "engagement", label: "floating_contact" });
          return;
        }
      }

      if (button) {
        // Gallery category open (mariage gallery covers)
        const gallerySection = button.closest(".grid");
        if (gallerySection && button.querySelector("img") && button.querySelector("h3")) {
          const title = button.querySelector("h3")?.textContent || "";
          trackEvent({ action: "gallery_open", category: "gallery", label: title });
          return;
        }

        // FAQ expand/collapse
        const details = button.closest("details");
        if (details) {
          const summary = details.querySelector("summary");
          if (summary && (button === summary || summary.contains(button))) {
            const question = summary.textContent || "";
            trackEvent({ action: "faq_click", category: "engagement", label: question.slice(0, 80) });
            return;
          }
        }
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
