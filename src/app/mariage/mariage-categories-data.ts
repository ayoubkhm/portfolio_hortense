export interface CategoryData {
  title: string;
  cover: string;
  images: { src: string; alt: string }[];
}

export const categories: CategoryData[] = [
  {
    title: "Préparatifs",
    cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", alt: "Préparatifs mariée" },
      { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Maquillage mariée" },
      { src: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=800&q=80", alt: "Robe de mariée" },
      { src: "https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&q=80", alt: "Détails préparatifs" },
      { src: "https://images.unsplash.com/photo-1594552072238-5765e9b3dcac?w=800&q=80", alt: "Chaussures mariée" },
      { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Bouquet mariée" },
    ],
  },
  {
    title: "Photos de couple",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Couple mariage" },
      { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Couple au coucher de soleil" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", alt: "Couple en promenade" },
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", alt: "Portrait couple" },
      { src: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80", alt: "Couple enlacé" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Couple romantique" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80", alt: "Couple main dans la main" },
      { src: "https://images.unsplash.com/photo-1591604129939-f1efa4d99f7e?w=800&q=80", alt: "Couple forêt" },
    ],
  },
  {
    title: "Cérémonie",
    cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Cérémonie mariage" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80", alt: "Allée cérémonie" },
      { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80", alt: "Échange de voeux" },
      { src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80", alt: "Alliances" },
      { src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80", alt: "Sortie des mariés" },
      { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", alt: "Lieu de cérémonie" },
      { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80", alt: "Cérémonie en plein air" },
    ],
  },
  {
    title: "Photos de groupe",
    cover: "https://images.unsplash.com/photo-1529543544282-ea99407407c1?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1529543544282-ea99407407c1?w=800&q=80", alt: "Photo de groupe mariage" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80", alt: "Famille mariés" },
      { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80", alt: "Amis des mariés" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80", alt: "Groupe célébration" },
      { src: "https://images.unsplash.com/photo-1522057306606-8d84b0f4d7c5?w=800&q=80", alt: "Témoins et mariés" },
      { src: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800&q=80", alt: "Lancé de bouquet" },
    ],
  },
  {
    title: "Cocktail",
    cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Cocktail mariage" },
      { src: "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=800&q=80", alt: "Verres de champagne" },
      { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Décoration table" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "Fleurs table" },
      { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Repas mariage" },
      { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80", alt: "Cocktail détails" },
      { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Apéritif mariage" },
    ],
  },
  {
    title: "Soirée",
    cover: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80", alt: "Soirée dansante" },
      { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80", alt: "Piste de danse" },
      { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80", alt: "Première danse" },
      { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80", alt: "DJ mariage" },
      { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80", alt: "Fête mariage" },
      { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", alt: "Célébration soirée" },
    ],
  },
];
