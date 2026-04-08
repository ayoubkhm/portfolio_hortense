"use client";

// Centralizes the @dnd-kit/sortable boilerplate that was duplicated across
// every sortable card in the codebase: useSortable + style transform +
// dragging opacity.

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";

export function useSortableStyle(id: string) {
  const sortable = useSortable({ id });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
    opacity: sortable.isDragging ? 0.5 : 1,
  };
  return { ...sortable, style };
}
