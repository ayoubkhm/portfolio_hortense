export const PARENT_CATEGORIES = [
  { value: "mariage", label: "Mariage" },
  { value: "drone", label: "Drone" },
  { value: "autre", label: "Autre" },
] as const;

export const SUB_CATEGORIES: Record<string, { value: string; label: string }[]> = {
  mariage: [
    { value: "preparatifs", label: "Préparatifs" },
    { value: "photos-de-couple", label: "Photos de couple" },
    { value: "ceremonie", label: "Cérémonie" },
    { value: "photos-de-groupe", label: "Photos de groupe" },
    { value: "cocktail", label: "Cocktail" },
    { value: "soiree", label: "Soirée" },
    { value: "video", label: "Vidéo" },
  ],
  drone: [
    { value: "immobilier", label: "Immobilier" },
    { value: "architecture", label: "Architecture" },
    { value: "chantier", label: "Suivi de chantier" },
    { value: "evenement", label: "Événement" },
    { value: "paysage", label: "Paysage" },
    { value: "sport", label: "Sport" },
  ],
  autre: [
    { value: "portrait", label: "Portrait" },
    { value: "video", label: "Vidéo" },
    { value: "document", label: "Document" },
  ],
};

export const VALID_SERVICES = ["Mariage", "Drone", "Autre"] as const;
