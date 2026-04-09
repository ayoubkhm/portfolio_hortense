import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getContent, MARIAGE_DEFAULTS } from "@/lib/content";
import { buildJsonLd } from "@/lib/blocks/jsonld";
import { asBlockPageContent, mariageContentToBlocks } from "@/lib/blocks/migrators";
import { getPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("mariage");
}

export default async function MariagePage() {
  // Load content. Supports both legacy flat shape and new block shape:
  // asBlockPageContent() detects and converts on the fly. If DB is empty
  // entirely, fall back to converting MARIAGE_DEFAULTS.
  const stored = await getContent<unknown>("content_mariage", null);
  const blockContent =
    asBlockPageContent(stored) ?? { blocks: mariageContentToBlocks(MARIAGE_DEFAULTS) };

  // Page-level JSON-LD nodes (not tied to any block)
  const pageNodes = [
    {
      "@type": "WebPage",
      "@id": "https://hortensederuidiaz.fr/mariage#webpage",
      url: "https://hortensederuidiaz.fr/mariage",
      name: "Photographe Mariage Bordeaux",
      isPartOf: { "@id": "https://hortensederuidiaz.fr/#website" },
      datePublished: "2026-03-26",
      dateModified: "2026-04-08",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://hortensederuidiaz.fr/mariage#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hortensederuidiaz.fr" },
        { "@type": "ListItem", position: 2, name: "Mariage", item: "https://hortensederuidiaz.fr/mariage" },
      ],
    },
    {
      "@type": "Service",
      name: "Photographie de Mariage",
      serviceType: "Wedding Photography",
      provider: { "@id": "https://hortensederuidiaz.fr/#localbusiness" },
      areaServed: { "@type": "City", name: "Bordeaux" },
      description: "Photographe de mariage à Bordeaux. Reportage photo et vidéo complet.",
      serviceOutput: "Photos retouchées haute qualité sur clé USB, galerie privée en ligne, album photo optionnel",
    },
  ];

  const jsonLd = buildJsonLd(blockContent.blocks, pageNodes);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Render the first block (Hero) before the breadcrumbs, then the rest */}
      {blockContent.blocks.length > 0 && blockContent.blocks[0].type === "hero" && (
        <BlockRenderer block={blockContent.blocks[0]} />
      )}
      <Breadcrumbs items={[{ label: "Mariage" }]} />
      {blockContent.blocks
        .slice(blockContent.blocks[0]?.type === "hero" ? 1 : 0)
        .map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
    </main>
  );
}
