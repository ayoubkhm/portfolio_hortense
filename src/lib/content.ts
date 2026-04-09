import { prisma } from "@/lib/db";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroSubSubtitle: string;
  servicesHeading: string;
  services: {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
  }[];
}

export interface MariageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  descriptionParagraphs: string[];
  galleryHeading: string;
  videoSectionHeading: string;
  videoEmbeds: { src: string; title: string }[];
  pricingHeading: string;
  pricingSubtitle: string;
  pricingPlans: {
    title: string;
    price: string;
    features: string[];
    highlighted?: boolean;
  }[];
  faqHeading: string;
  faq: { question: string; answer: string }[];
  summaryHeading: string;
  summaryItems: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  brochurePath: string;
}

export interface DroneContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  descriptionParagraphs: string[];
  catsCertificationText: string;
  galleryHeading: string;
  processHeading: string;
  processSubtitle: string;
  processSteps: { title: string; description: string }[];
  faqHeading: string;
  faq: { question: string; answer: string }[];
  summaryHeading: string;
  summaryItems: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface AProposContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  portraitImage: string;
  bioHeading: string;
  bioParagraphs: string[];
  expertiseHeading: string;
  expertiseMariage: { title: string; description: string };
  expertiseDrone: { title: string; description: string };
  certificationsHeading: string;
  certifications: { title: string; description: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface MariageGalleryImage {
  // id is generated client-side on load if missing — needed by @dnd-kit
  // sortable to track items across reorders.
  id?: string;
  src: string;
  alt: string;
}

export interface MariageGalleryCategory {
  id?: string;
  title: string;
  /** @deprecated Cover is now always the first image of the category.
   *  Field kept for backwards compat with existing data; no longer read. */
  cover?: string;
  images: MariageGalleryImage[];
}

export interface MariageGalleryContent {
  categories: MariageGalleryCategory[];
}

// ─── Drone gallery ───────────────────────────────────────────────────────────
// Each drone item is a thumbnail (image) + an associated video. The thumbnail
// is what shows in the public masonry grid; clicking opens a modal with the
// video. Video is the goal but optional during the migration of existing photos
// uploaded before this gallery system existed (those items get an empty video
// string and show a "Vidéo bientôt disponible" placeholder until completed).
export interface DroneGalleryItem {
  id: string;
  thumbnail: string;
  /** Empty string = pas de vidéo encore (legacy import or in-progress) */
  video: string;
  alt: string;
}

export interface DroneGalleryContent {
  items: DroneGalleryItem[];
}

export interface ContactContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  email: string;
  phone: string;
  location: string;
  availabilityText: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
}

// ─── Defaults (current hardcoded values) ─────────────────────────────────────

export const HOMEPAGE_DEFAULTS: HomepageContent = {
  heroTitle: "Hortense de Ruidiaz",
  heroSubtitle: "Photographie et prises de vues aériennes par drone à Bordeaux",
  heroSubSubtitle: "Pour les professionnels et les particuliers",
  servicesHeading: "Mes Services",
  services: [
    {
      title: "Photographie de Mariage",
      description:
        "Des clichés empreints d'émotion pour revivre chaque instant de votre plus beau jour. Un regard sensible et discret pour une couverture complète de votre célébration.",
      imageSrc: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
      imageAlt: "Photographie de mariage",
      href: "/mariage",
    },
    {
      title: "Prises de Vue Drone",
      description:
        "Des perspectives aériennes saisissantes pour sublimer vos événements, propriétés et projets. Une vision unique depuis le ciel pour des images spectaculaires.",
      imageSrc: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      imageAlt: "Prise de vue aérienne par drone",
      href: "/drone",
    },
  ],
};

export const MARIAGE_DEFAULTS: MariageContent = {
  heroTitle: "Photographie de Mariage",
  heroSubtitle: "Des souvenirs qui traversent le temps",
  heroBackgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  descriptionParagraphs: [
    "Photographe de mariage à Bordeaux, je réalise des reportages photo et vidéo complets de votre journée, de la cérémonie à la soirée. Tarifs à partir de 1 100 €, avec séance couple et galerie privée en ligne incluses.",
    "Mon approche est discrète, afin de saisir des instants authentiques sans intervenir dans le déroulé de votre journée.",
    "J'accorde une attention particulière aux émotions, aux détails et à l'ambiance, pour vous livrer des images sincères et intemporelles.",
    "Chaque mariage est unique, c'est pourquoi je m'adapte à vos envies pour créer un reportage qui vous ressemble.",
  ],
  galleryHeading: "Galerie Mariage",
  videoSectionHeading: "Vidéo",
  videoEmbeds: [
    { src: "https://www.youtube.com/embed/uGpGmCb7eYw", title: "Vidéo mariage 1" },
    { src: "https://www.youtube.com/embed/CgpLznn2Jyg", title: "Vidéo mariage 2" },
    { src: "https://player.vimeo.com/video/1014040164", title: "Vidéo mariage 3" },
    { src: "https://www.youtube.com/embed/k7LedUvRet8", title: "Vidéo mariage 4" },
  ],
  pricingHeading: "Formules & Tarifs",
  pricingSubtitle: "Chaque formule est personnalisable selon vos envies et votre budget.",
  pricingPlans: [
    {
      title: "Photo Standard",
      price: "1 100 €",
      features: [
        "De la cérémonie au cocktail",
        "Séance couple comprise",
        "Photos triées et retouchées Haute Qualité envoyées sur clé USB",
        "Galerie privée en ligne pour les invités",
      ],
    },
    {
      title: "Photo Premium",
      price: "1 700 €",
      features: [
        "Des préparatifs au début de soirée dansante",
        "Séance couple comprise",
        "Photos triées et retouchées Haute Qualité envoyées sur clé USB",
        "Galerie privée en ligne pour les invités",
      ],
      highlighted: true,
    },
    {
      title: "Vidéo Standard",
      price: "1 600 €",
      features: [
        "De la cérémonie au cocktail",
        "Séance couple comprise",
        "Plan drone compris",
        "Réception de la vidéo par téléchargement privé",
        "3 à 5 minutes environ",
      ],
    },
    {
      title: "Vidéo Premium",
      price: "2 100 €",
      features: [
        "Des préparatifs au début de soirée dansante",
        "Séance couple comprise",
        "Plan drone compris",
        "Réception de la vidéo par téléchargement privé",
        "6 à 7 minutes environ",
      ],
      highlighted: true,
    },
  ],
  faqHeading: "Questions fréquentes",
  faq: [
    {
      question: "Combien coûte un photographe de mariage à Bordeaux ?",
      answer: "Les tarifs commencent à 1 100 € pour la formule Photo Standard (cérémonie au cocktail, séance couple, photos retouchées sur clé USB) et vont jusqu'à 2 100 € pour la formule Vidéo Premium (préparatifs à la soirée dansante, plan drone compris).",
    },
    {
      question: "Quand recevrai-je mes photos de mariage ?",
      answer: "Les photos triées et retouchées en haute qualité sont livrées sur clé USB sous 4 à 6 semaines après votre mariage. Une galerie privée en ligne est également mise à disposition pour vos invités.",
    },
    {
      question: "Vous déplacez-vous en dehors de Bordeaux ?",
      answer: "Oui, je me déplace dans toute la Nouvelle-Aquitaine et au-delà. Les frais de déplacement sont facturés dans leur totalité dès que la distance excède 50 kilomètres. Des frais d'hébergement peuvent s'appliquer au-delà de 2 heures de trajet.",
    },
    {
      question: "Proposez-vous aussi la vidéo de mariage ?",
      answer: "Oui, je propose des formules vidéo avec plan drone compris, de 1 600 € (Vidéo Standard, 3-5 min) à 2 100 € (Vidéo Premium, 6-7 min). La vidéo est livrée par téléchargement privé.",
    },
    {
      question: "Comment se déroule un reportage mariage ?",
      answer: "Je vous accompagne de manière discrète tout au long de la journée. Mon approche est naturelle et spontanée : je capture les émotions, les détails et l'ambiance sans intervenir dans le déroulé. Chaque reportage est unique et adapté à vos envies.",
    },
  ],
  summaryHeading: "Ce qu'il faut retenir",
  summaryItems: [
    "Photographe mariage à Bordeaux — tarifs de 1 100 € à 2 100 €",
    "Formules photo et vidéo avec plan drone compris",
    "Photos retouchées sur clé USB + galerie privée en ligne",
    "Livraison sous 4 à 6 semaines",
    "Disponible dans toute la Nouvelle-Aquitaine et au-delà",
  ],
  ctaTitle: "Racontez-moi votre histoire",
  ctaSubtitle: "Chaque mariage est unique. N'hésitez pas à me contacter pour en parler.",
  ctaButtonText: "Prendre contact",
  brochurePath: "/uploads/plaquette-mariage.pdf",
};

export const DRONE_DEFAULTS: DroneContent = {
  heroTitle: "Prises de Vue Drone",
  heroSubtitle: "Des perspectives uniques vues du ciel",
  heroBackgroundImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80",
  descriptionParagraphs: [
    "Opératrice drone certifiée CATS à Bordeaux, je réalise des prises de vues aériennes professionnelles pour l'immobilier, l'architecture, le suivi de chantier et les événements. Photo drone dès 100 €, vidéo dès 200 €.",
    "Mes services s'adressent notamment aux secteurs de l'immobilier, de l'architecture et du suivi de chantier, ainsi qu'à des usages spécifiques comme l'analyse ou l'observation (ex : activités sportives, courses hippiques).",
    "Chaque prestation est adaptée à vos besoins : mise en valeur d'un bien, suivi d'évolution, captation d'images précises ou création de contenus visuels.",
    "Sérieuse et réactive, je veille à fournir des images exploitables rapidement, dans le respect des contraintes techniques et réglementaires.",
  ],
  catsCertificationText: "Pilote certifiée CATS — Certificat d'Aptitude Théorique de Télépilote de drone",
  galleryHeading: "Réalisations Drone",
  processHeading: "Comment ça se passe ?",
  processSubtitle: "Un accompagnement de A à Z pour chaque mission drone.",
  processSteps: [
    {
      title: "Écoute de votre projet et conseils",
      description: "Première étape importante afin de vous proposer une prestation adaptée et personnalisée en fonction de vos objectifs et de votre projet.",
    },
    {
      title: "Étude de la mission et devis personnalisé",
      description: "En fonction de vos attentes, de la période envisagée, des lieux de tournage, de la sécurité, du contexte et du produit final souhaité.",
    },
    {
      title: "Préparation de la mission, autorisations",
      description: "Une bonne préparation de mission permet de répondre aux impératifs de sécurité et de qualité : météo, étude de la sécurité, repérage, autorisations…",
    },
    {
      title: "Réalisation de la mission et captation",
      description: "La mission est mise en place dans des conditions adaptées, suite à une préparation matérielle, repérage, sécurisation des lieux, captation vidéo ou/et photo…",
    },
    {
      title: "Postproduction et livraison des fichiers",
      description: "Nous vous livrons des fichiers numériques bruts ou un produit fini, prêt à l\u2019emploi, suite à différentes étapes de postproduction.",
    },
  ],
  faqHeading: "Questions fréquentes",
  faq: [
    {
      question: "Combien coûte une prestation drone à Bordeaux ?",
      answer: "Photo drone à partir de 100 €, vidéo drone à partir de 200 €. Le suivi de chantier est sur devis, adapté à la fréquence et à la durée du projet.",
    },
    {
      question: "Êtes-vous certifiée pour piloter un drone ?",
      answer: "Oui, je suis titulaire du CATS (Certificat d'Aptitude Théorique de Télépilote de drone). Chaque mission est réalisée dans le respect de la réglementation aérienne en vigueur.",
    },
    {
      question: "Dans quels domaines intervenez-vous ?",
      answer: "J'interviens pour l'immobilier, l'architecture, le suivi de chantier, les événements sportifs et culturels, ainsi que pour des besoins spécifiques comme l'observation ou l'analyse aérienne.",
    },
    {
      question: "Quel est le délai de livraison ?",
      answer: "Les fichiers numériques sont livrés sous 48h à 2 semaines selon la complexité de la prestation. Pour le suivi de chantier, les rapports visuels sont livrés après chaque survol.",
    },
    {
      question: "Intervenez-vous en dehors de Bordeaux ?",
      answer: "Oui, je me déplace dans toute la Gironde et la Nouvelle-Aquitaine. Les frais de déplacement sont inclus dans un rayon de 50 km autour de Bordeaux.",
    },
  ],
  summaryHeading: "Ce qu'il faut retenir",
  summaryItems: [
    "Pilote certifiée CATS — prises de vues aériennes professionnelles",
    "Photo drone dès 100 €, vidéo dès 200 €",
    "Immobilier, architecture, chantier, événements",
    "Livraison rapide sous 48h à 2 semaines",
    "Bordeaux, Gironde et Nouvelle-Aquitaine",
  ],
  ctaTitle: "Un projet en vue ?",
  ctaSubtitle: "Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé.",
  ctaButtonText: "Me contacter",
};

export const MARIAGE_GALLERY_DEFAULTS: MariageGalleryContent = {
  categories: [
    {
      title: "Préparatifs",
      cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      images: [
        { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", alt: "Préparatifs mariée" },
        { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Maquillage mariée" },
        { src: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=800&q=80", alt: "Robe de mariée" },
      ],
    },
    {
      title: "Photos de couple",
      cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      images: [
        { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Couple mariage" },
        { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Couple au coucher de soleil" },
      ],
    },
    {
      title: "Cérémonie",
      cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      images: [
        { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Cérémonie mariage" },
        { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80", alt: "Allée cérémonie" },
      ],
    },
    {
      title: "Cocktail",
      cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      images: [
        { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Cocktail mariage" },
        { src: "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=800&q=80", alt: "Verres de champagne" },
      ],
    },
  ],
};

export const DRONE_GALLERY_DEFAULTS: DroneGalleryContent = {
  items: [],
};

export const APROPOS_DEFAULTS: AProposContent = {
  heroTitle: "À propos",
  heroSubtitle: "Photographe professionnelle & opératrice drone certifiée à Bordeaux",
  heroBackgroundImage: "/uploads/hortense-portrait.jpg",
  portraitImage: "/uploads/hortense-portrait.jpg",
  bioHeading: "Hortense de Ruidiaz",
  bioParagraphs: [
    "Hortense de Ruidiaz est photographe professionnelle et opératrice drone certifiée, basée à Bordeaux. Passionnée par l'image et la lumière, elle accompagne chaque projet de photographie de mariage et de captation aérienne avec sensibilité et exigence.",
    "Certifiée CATS (Certificat d'Aptitude Théorique de Télépilote), elle propose des prestations complètes alliant photographie au sol et vues aériennes par drone, offrant ainsi des perspectives uniques sur chaque événement ou projet.",
    "Que ce soit pour un mariage, une collaboration immobilière ou un suivi de chantier, Hortense s'engage à livrer des images authentiques, soignées et fidèles à l'émotion du moment.",
  ],
  expertiseHeading: "Domaines d'expertise",
  expertiseMariage: {
    title: "Photographie de Mariage",
    description: "Reportage photo et vidéo complet, des préparatifs à la soirée dansante. Un regard discret et attentif pour capturer chaque émotion de votre journée.",
  },
  expertiseDrone: {
    title: "Captation Drone",
    description: "Opératrice drone certifiée CATS pour des prises de vues aériennes professionnelles : immobilier, événementiel, tourisme et projets créatifs.",
  },
  certificationsHeading: "Certifications & Formation",
  certifications: [
    {
      title: "CATS",
      description: "Certificat d'Aptitude Théorique de Télépilote — autorisation officielle pour le pilotage de drone professionnel en France.",
    },
    {
      title: "Formation audiovisuelle",
      description: "Diplômée de l'ISA — Institut Supérieur d'Audiovisuel (2019-2021). Formation complète en photographie, vidéo et production audiovisuelle.",
    },
    {
      title: "Assurance professionnelle",
      description: "[Placeholder — préciser l'assurance RC Pro et drone]",
    },
  ],
  ctaTitle: "Parlons de votre projet",
  ctaSubtitle: "Mariage, drone ou autre projet photo — contactez-moi pour un devis gratuit et personnalisé.",
  ctaButtonText: "Me contacter",
};

export const CONTACT_DEFAULTS: ContactContent = {
  heroTitle: "Contact",
  heroSubtitle: "Parlons de votre projet",
  heroBackgroundImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80",
  email: "contact@hortensederuidiaz.fr",
  phone: "06 16 28 22 70",
  location: "Bordeaux, France",
  availabilityText: "Disponible dans toute la Nouvelle-Aquitaine et au-delà pour vos projets.",
  instagramUrl: "https://instagram.com/hortense.wedding.pic",
  facebookUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/",
};

// ─── Valid keys ──────────────────────────────────────────────────────────────

export const CONTENT_KEYS = [
  "content_homepage",
  "content_mariage",
  "content_mariage_gallery",
  "content_drone",
  "content_drone_gallery",
  "content_apropos",
  "content_contact",
  "content_theme",
  "content_seo",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export async function getContent<T>(
  key: string,
  defaults: T
): Promise<T> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    if (!setting) return defaults;
    const stored = JSON.parse(setting.value) as Partial<T>;
    return { ...defaults, ...stored };
  } catch {
    return defaults;
  }
}

export async function saveContent(key: string, data: unknown): Promise<void> {
  const value = JSON.stringify(data);
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
