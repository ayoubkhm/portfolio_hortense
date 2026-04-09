import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getContent, DRONE_DEFAULTS } from "@/lib/content";
import { buildJsonLd } from "@/lib/blocks/jsonld";
import { asBlockPageContent, droneContentToBlocks } from "@/lib/blocks/migrators";
import { getPageMetadata } from "@/lib/metadata";
import CrossLinkBanner from "@/components/sections/CrossLinkBanner";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("drone");
}

export default async function DronePage() {
  const stored = await getContent<unknown>("content_drone", null);
  const blockContent =
    asBlockPageContent(stored, "drone") ?? { blocks: droneContentToBlocks(DRONE_DEFAULTS) };

  // Page-level JSON-LD nodes (not tied to any block)
  const pageNodes = [
    {
      "@type": "WebPage",
      "@id": "https://hortensederuidiaz.fr/drone#webpage",
      url: "https://hortensederuidiaz.fr/drone",
      name: "Opératrice Drone Certifiée CATS Bordeaux",
      isPartOf: { "@id": "https://hortensederuidiaz.fr/#website" },
      datePublished: "2026-03-26",
      dateModified: "2026-04-08",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://hortensederuidiaz.fr/drone#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hortensederuidiaz.fr" },
        { "@type": "ListItem", position: 2, name: "Drone", item: "https://hortensederuidiaz.fr/drone" },
      ],
    },
    {
      "@type": "Service",
      name: "Prises de Vue Drone",
      serviceType: "Drone Photography & Videography",
      provider: { "@id": "https://hortensederuidiaz.fr/#localbusiness" },
      areaServed: { "@type": "City", name: "Bordeaux" },
      description: "Prises de vue aériennes par drone à Bordeaux. Immobilier, suivi de chantier et événements.",
      serviceOutput: "Photos HD et vidéos 4K aériennes, fichiers numériques livrés sous 48h",
    },
    // HowTo for the locked drone-process section. The schema mirrors the
    // hardcoded JSX in src/lib/blocks/locked-renderers.tsx → drone-process,
    // which reads its data from DRONE_DEFAULTS.processSteps.
    {
      "@type": "HowTo",
      name: "Comment réserver une prestation drone à Bordeaux",
      description: "Les étapes pour réaliser une mission de prise de vue aérienne par drone avec Hortense de Ruidiaz.",
      step: DRONE_DEFAULTS.processSteps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.description,
      })),
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
      <Breadcrumbs items={[{ label: "Drone" }]} />
      {blockContent.blocks
        .slice(blockContent.blocks[0]?.type === "hero" ? 1 : 0)
        .map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      <CrossLinkBanner
        heading="Vous préparez votre mariage ?"
        description="Immortalisez chaque instant de votre plus beau jour avec un reportage photo sur-mesure."
        href="/mariage"
        linkText="Découvrir les prestations mariage"
      />
    </main>
  );
}
