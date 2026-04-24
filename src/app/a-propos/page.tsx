import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getContent, APROPOS_DEFAULTS } from "@/lib/content";
import { buildJsonLd } from "@/lib/blocks/jsonld";
import { asBlockPageContent, aproposContentToBlocks } from "@/lib/blocks/migrators";
import { getPageMetadata, getOgImageUrl } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("a-propos");
}

export default async function AProposPage() {
  const stored = await getContent<unknown>("content_apropos", null);
  const blockContent =
    asBlockPageContent(stored, "apropos") ?? { blocks: aproposContentToBlocks(APROPOS_DEFAULTS) };
  const ogImage = await getOgImageUrl();

  // Page-level JSON-LD nodes (not tied to any block)
  const pageNodes = [
    {
      "@type": "BreadcrumbList",
      "@id": "https://hortensederuidiaz.fr/a-propos#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hortensederuidiaz.fr" },
        { "@type": "ListItem", position: 2, name: "À propos", item: "https://hortensederuidiaz.fr/a-propos" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://hortensederuidiaz.fr/#person",
      name: "Hortense de Ruidiaz",
      jobTitle: "Photographe professionnelle & Opératrice drone certifiée",
      url: "https://hortensederuidiaz.fr",
      image: ogImage,
      email: "contact@hortensederuidiaz.fr",
      telephone: "+33616282270",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bordeaux",
        addressRegion: "Nouvelle-Aquitaine",
        addressCountry: "FR",
      },
      sameAs: [
        "https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/",
        "https://instagram.com/hortense.wedding.pic",
      ],
      knowsAbout: [
        "Photographie de mariage",
        "Pilotage de drone professionnel",
        "Vidéo aérienne",
        "Photographie immobilière",
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "CATS — Certificat d'Aptitude Théorique de Télépilote",
        recognizedBy: { "@type": "Organization", name: "DGAC" },
      },
      worksFor: { "@id": "https://hortensederuidiaz.fr/#organization" },
    },
  ];

  const jsonLd = await buildJsonLd(blockContent.blocks, pageNodes);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {blockContent.blocks.length > 0 && blockContent.blocks[0].type === "hero" && (
        <BlockRenderer block={blockContent.blocks[0]} />
      )}
      <Breadcrumbs items={[{ label: "À propos" }]} />
      {blockContent.blocks
        .slice(blockContent.blocks[0]?.type === "hero" ? 1 : 0)
        .map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
    </main>
  );
}
