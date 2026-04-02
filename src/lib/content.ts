import { prisma } from "@/lib/db";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroSubSubtitle: string;
  aboutHeading: string;
  aboutParagraphs: string[];
  aboutPortraitImage: string;
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
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
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
  aboutHeading: "À propos",
  aboutParagraphs: [
    "Moi, c'est Hortense. Passionnée par l'image et la nature, je réalise des prises de vues photo et vidéo, au sol comme par drone.",
    "Basée à Bordeaux, je me déplace sur toute la Gironde mais pas que… Je me rends disponible là où l'on a besoin de moi.",
    "J'accompagne aussi bien les particuliers que les professionnels dans leurs projets visuels : mariage, immobilier, architecture ou besoins techniques.",
    "Mon approche est à la fois discrète, efficace et attentive aux détails, avec toujours l'objectif de produire des images naturelles, utiles et de qualité.",
    "Que vous soyez un particulier ou une entreprise, mes prestations s'adaptent à vos besoins.",
  ],
  aboutPortraitImage: "/uploads/hortense-portrait.jpg",
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
  ctaTitle: "Un projet en vue ?",
  ctaSubtitle: "Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé.",
  ctaButtonText: "Me contacter",
};

export const CONTACT_DEFAULTS: ContactContent = {
  heroTitle: "Contact",
  heroSubtitle: "Parlons de votre projet",
  heroBackgroundImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80",
  email: "contact@hortensederuidiaz.com",
  phone: "06 16 28 22 70",
  location: "Bordeaux, France",
  availabilityText: "Disponible dans toute la Nouvelle-Aquitaine et au-delà pour vos projets.",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/",
};

// ─── Valid keys ──────────────────────────────────────────────────────────────

export const CONTENT_KEYS = [
  "content_homepage",
  "content_mariage",
  "content_mariage_gallery",
  "content_drone",
  "content_contact",
  "content_theme",
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
