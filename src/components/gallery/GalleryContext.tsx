"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface GalleryContextValue {
  isOpen: boolean;
  currentIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  next: () => void;
  prev: () => void;
  total: number;
  setTotal: (n: number) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  return (
    <GalleryContext.Provider
      value={{
        isOpen,
        currentIndex,
        openLightbox,
        closeLightbox,
        next,
        prev,
        total,
        setTotal,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery(): GalleryContextValue {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return ctx;
}
