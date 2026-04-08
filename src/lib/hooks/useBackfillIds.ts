"use client";

// Backfills missing stable IDs in admin content (e.g. gallery items, categories)
// the first time data loads. Used to enable @dnd-kit/sortable on data that
// wasn't authored with ids in mind.
//
// Pattern previously duplicated between MariageGalleryAdmin and DroneGalleryAdmin.

import { useEffect } from "react";

export function useBackfillIds<T>(
  data: T | null | undefined,
  needsBackfill: (data: T) => boolean,
  backfill: (data: T) => T,
  setData: (next: T) => void
): void {
  useEffect(() => {
    if (!data) return;
    if (needsBackfill(data)) {
      setData(backfill(data));
    }
    // setData / needsBackfill / backfill are intentionally not in deps:
    // we only want this to fire when `data` changes (i.e. on first load
    // or when an external change brings unfilled data).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
