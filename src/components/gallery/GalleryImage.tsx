"use client";

import Image from "next/image";
import { useGallery } from "./GalleryContext";

interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
  width?: number;
  height?: number;
}

export default function GalleryImage({
  src,
  alt,
  index,
  width = 600,
  height = 400,
}: GalleryImageProps) {
  const { openLightbox } = useGallery();

  return (
    <div
      className="masonry-grid-item rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => openLightbox(index)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
