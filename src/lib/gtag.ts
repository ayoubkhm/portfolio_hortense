// Thin wrapper around gtag() so components can fire GA4 events
// without worrying whether the script is loaded.

type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (!w.gtag) return;
  w.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
