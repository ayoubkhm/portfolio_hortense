"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

// Hoisted regex patterns — avoid recompilation on every click
const SOCIAL_ARIA_RE = /instagram|facebook|linkedin/i;
const SOCIAL_HREF_RE = /instagram\.com|facebook\.com|linkedin\.com/i;

/**
 * Global click listener that auto-tracks interactions NOT already handled
 * by TrackedLink components (phone, email, social, gallery, FAQ, floating CTA).
 */
export default function AutoTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Skip elements already tracked by TrackedLink (they have their own onClick)
      if (target.closest("[data-tracked]")) return;

      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";

        if (href.startsWith("tel:")) {
          trackEvent({ action: "phone_click", category: "contact", label: href });
          return;
        }

        if (href.startsWith("mailto:")) {
          trackEvent({ action: "email_click", category: "contact", label: href });
          return;
        }

        if (SOCIAL_ARIA_RE.test(anchor.getAttribute("aria-label") || "") ||
            SOCIAL_HREF_RE.test(href)) {
          const platform = href.includes("instagram") ? "instagram"
            : href.includes("facebook") ? "facebook"
            : href.includes("linkedin") ? "linkedin"
            : "social";
          trackEvent({ action: "social_click", category: "engagement", label: platform });
          return;
        }

        if (anchor.getAttribute("aria-label") === "Nous contacter") {
          trackEvent({ action: "cta_click", category: "engagement", label: "floating_contact" });
          return;
        }
      }

      if (button) {
        const gallerySection = button.closest(".grid");
        if (gallerySection && button.querySelector("img") && button.querySelector("h3")) {
          const title = button.querySelector("h3")?.textContent || "";
          trackEvent({ action: "gallery_open", category: "gallery", label: title });
          return;
        }

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
