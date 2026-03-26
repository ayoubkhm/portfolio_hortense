import { prisma } from "@/lib/db";
import { getPlaceholders, type PlaceholderImage } from "@/lib/placeholders";
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
  let mediaItems: { filepath: string; alt: string; filename: string }[] = [];

  try {
    mediaItems = await prisma.media.findMany({
      where: category ? { category } : undefined,
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    // DB may not be available; fall through to placeholders
  }

  if (mediaItems.length > 0) {
    return mediaItems.map((m) => ({
      src: m.filepath,
      alt: m.alt || m.filename,
    }));
  }

  const placeholders: PlaceholderImage[] = getPlaceholders(category);
  return placeholders.map((p) => ({
    src: p.src,
    alt: p.alt,
  }));
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
