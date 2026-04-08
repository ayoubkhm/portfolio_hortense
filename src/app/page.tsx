import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getContent, HOMEPAGE_DEFAULTS } from "@/lib/content";
import { buildJsonLd } from "@/lib/blocks/jsonld";
import { asBlockPageContent, homepageContentToBlocks } from "@/lib/blocks/migrators";

export const dynamic = "force-dynamic";

export default async function Home() {
  const stored = await getContent<unknown>("content_homepage", null);
  const blockContent =
    asBlockPageContent(stored, "homepage") ?? { blocks: homepageContentToBlocks(HOMEPAGE_DEFAULTS) };

  // Page-level JSON-LD nodes (Organization, LocalBusiness, WebSite, WebPage).
  // The home page IS the root of the site so it carries the global business schemas.
  const pageNodes = [
    {
      "@type": "Organization",
      "@id": "https://hortensederuidiaz.fr/#organization",
      name: "Hortense de Ruidiaz",
      url: "https://hortensederuidiaz.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://hortensederuidiaz.fr/uploads/hortense-portrait.jpg",
      },
      description: "Photographe de mariage et opératrice drone certifiée CATS à Bordeaux",
      email: "contact@hortensederuidiaz.fr",
      telephone: "+33616282270",
      sameAs: [
        "https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/",
        "https://instagram.com/hortense.wedding.pic",
      ],
      founder: {
        "@type": "Person",
        name: "Hortense de Ruidiaz",
        jobTitle: "Photographe & Opératrice Drone",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://hortensederuidiaz.fr/#localbusiness",
      name: "Hortense de Ruidiaz",
      image: "https://hortensederuidiaz.fr/uploads/hortense-portrait.jpg",
      telephone: "+33616282270",
      email: "contact@hortensederuidiaz.fr",
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bordeaux",
        addressRegion: "Nouvelle-Aquitaine",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.8378,
        longitude: -0.5792,
      },
      areaServed: [
        { "@type": "City", name: "Bordeaux" },
        { "@type": "AdministrativeArea", name: "Gironde" },
        { "@type": "AdministrativeArea", name: "Nouvelle-Aquitaine" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://hortensederuidiaz.fr/#website",
      name: "Hortense de Ruidiaz",
      url: "https://hortensederuidiaz.fr",
      publisher: { "@id": "https://hortensederuidiaz.fr/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://hortensederuidiaz.fr/#webpage",
      url: "https://hortensederuidiaz.fr",
      name: "Photographe Mariage & Drone Bordeaux",
      isPartOf: { "@id": "https://hortensederuidiaz.fr/#website" },
      about: { "@id": "https://hortensederuidiaz.fr/#organization" },
      datePublished: "2026-03-26",
      dateModified: "2026-04-08",
    },
  ];

  const jsonLd = buildJsonLd(blockContent.blocks, pageNodes);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {blockContent.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </main>
  );
}
