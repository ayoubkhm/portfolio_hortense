export interface PlaceholderImage {
  src: string;
  alt: string;
  category: string;
}

export const placeholders: Record<string, PlaceholderImage[]> = {
  mariage: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Couple mariage", category: "mariage" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Cérémonie mariage", category: "mariage" },
    { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Décoration mariage", category: "mariage" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Bouquet mariée", category: "mariage" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Couple au coucher de soleil", category: "mariage" },
    { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Préparatifs mariage", category: "mariage" },
  ],
  "drone-immobilier": [
    { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", alt: "Vue aérienne propriété", category: "drone-immobilier" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", alt: "Maison vue du ciel", category: "drone-immobilier" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", alt: "Villa aérienne", category: "drone-immobilier" },
  ],
  "drone-chantier": [
    { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", alt: "Chantier vue aérienne", category: "drone-chantier" },
    { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80", alt: "Suivi de chantier", category: "drone-chantier" },
    { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", alt: "Construction aérienne", category: "drone-chantier" },
  ],
  "drone-evenement": [
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", alt: "Événement vue aérienne", category: "drone-evenement" },
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", alt: "Festival aérien", category: "drone-evenement" },
    { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80", alt: "Concert vue drone", category: "drone-evenement" },
  ],
};

export function getPlaceholders(category?: string): PlaceholderImage[] {
  if (category && placeholders[category]) {
    return placeholders[category];
  }
  return Object.values(placeholders).flat();
}
