export interface PlaceholderImage {
  src: string;
  alt: string;
  category: string;
  video?: string;
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
    { src: "/uploads/drone/atelier-des-citerne.png", alt: "Atelier des Citernes — vue aérienne", category: "drone-immobilier" },
    { src: "/uploads/drone/latelier-des-citerne.png", alt: "L'Atelier des Citernes — vue drone", category: "drone-immobilier" },
    { src: "/uploads/drone/saint-ouen.png", alt: "Saint-Ouen — vue aérienne", category: "drone-immobilier" },
    { src: "/uploads/drone/saint-ouen-2.png", alt: "Saint-Ouen — perspective drone", category: "drone-immobilier" },
  ],
  "drone-chantier": [
    { src: "/uploads/drone/ecole-marseille.png", alt: "École Marseille — suivi de chantier", category: "drone-chantier" },
    { src: "/uploads/drone/ecole-marseille-2.png", alt: "École Marseille — vue aérienne 2", category: "drone-chantier" },
    { src: "/uploads/drone/ecole-marseille-3.png", alt: "École Marseille — vue aérienne 3", category: "drone-chantier" },
    { src: "/uploads/drone/marseille-.png", alt: "Marseille — vue drone", category: "drone-chantier" },
  ],
  "drone-evenement": [
    { src: "/uploads/drone/islande.png", alt: "Islande — paysage aérien", category: "drone-evenement" },
    { src: "/uploads/drone/islande-2.png", alt: "Islande — vue drone", category: "drone-evenement" },
    { src: "/uploads/drone/labenne.png", alt: "Labenne — vue aérienne", category: "drone-evenement" },
    { src: "/uploads/drone/labenne-2.png", alt: "Labenne — perspective drone", category: "drone-evenement" },
    { src: "/uploads/drone/pyrenee.png", alt: "Pyrénées — panorama drone", category: "drone-evenement" },
  ],
};

export function getPlaceholders(category?: string): PlaceholderImage[] {
  if (category && placeholders[category]) {
    return placeholders[category];
  }
  return Object.values(placeholders).flat();
}
