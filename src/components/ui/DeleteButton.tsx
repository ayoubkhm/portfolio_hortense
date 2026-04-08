"use client";

// Trash icon button with optional native confirm() before firing onDelete.
// Replaces a heap of inline `if (confirm("...")) onDelete()` patterns + the
// duplicated heroicons trash SVG path.

import { useCallback } from "react";

interface DeleteButtonProps {
  onDelete: () => void;
  /** If provided, a window.confirm() with this message gates the deletion. */
  confirmMessage?: string;
  title?: string;
  className?: string;
  size?: "sm" | "md";
  /** "subtle" = small transparent button. "filled" = white bg, on dark contexts. */
  variant?: "subtle" | "filled";
  /** "trash" (default, heroicons) or "x" (close cross) */
  icon?: "trash" | "x";
  /** Stop event propagation on click — useful inside clickable parents (cards) */
  stopPropagation?: boolean;
}

const TRASH_PATH =
  "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0";
const X_PATH = "M6 18L18 6M6 6l12 12";

export default function DeleteButton({
  onDelete,
  confirmMessage,
  title = "Supprimer",
  className = "",
  size = "md",
  variant = "subtle",
  icon = "trash",
  stopPropagation = false,
}: DeleteButtonProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (stopPropagation) e.stopPropagation();
      if (confirmMessage && !window.confirm(confirmMessage)) return;
      onDelete();
    },
    [onDelete, confirmMessage, stopPropagation]
  );

  const padding = size === "sm" ? "p-1.5" : "p-1.5";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const stroke = variant === "filled" ? 2.5 : 1.5;

  const visualClasses =
    variant === "filled"
      ? "bg-white/95 hover:bg-red-500 text-red-600 hover:text-white rounded-full shadow-md"
      : "rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${padding} ${visualClasses} transition-colors shrink-0 ${className}`}
      title={title}
    >
      <svg className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon === "x" ? X_PATH : TRASH_PATH} />
      </svg>
    </button>
  );
}
