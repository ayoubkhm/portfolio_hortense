import { prisma } from "@/lib/db";
import { GalleryProvider } from "./GalleryContext";
import GalleryImage from "./GalleryImage";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryGridProps {
  category?: string;
  showAll?: boolean;
}

export interface GalleryImageData {
  src: string;
  alt: string;
}

export async function getGalleryImages(
  category?: string
): Promise<GalleryImageData[]> {
  try {
    const mediaItems = await prisma.media.findMany({
      where: category ? { category } : undefined,
      orderBy: { sortOrder: "asc" },
    });

    return mediaItems.map((m) => ({
      src: m.filepath,
      alt: m.alt || m.filename,
    }));
  } catch {
    return [];
  }
}

export default async function GalleryGrid({
  category,
  showAll,
}: GalleryGridProps) {
  const images = await getGalleryImages(showAll ? undefined : category);

  return (
    <GalleryProvider>
      <div className="masonry-grid">
        {images.map((image, index) => (
          <GalleryImage
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            index={index}
            width={600}
            height={400}
          />
        ))}
      </div>
      <GalleryLightbox images={images} />
    </GalleryProvider>
  );
}
