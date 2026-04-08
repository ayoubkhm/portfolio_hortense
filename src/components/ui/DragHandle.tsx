"use client";

// Reusable drag handle button for any @dnd-kit/sortable card. Spread the
// sortable's `attributes` and `listeners` onto this component:
//
//   <DragHandle {...attributes} {...listeners} />

import type { ButtonHTMLAttributes } from "react";

type DragHandleProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function DragHandle({ className = "", ...props }: DragHandleProps) {
  return (
    <button
      type="button"
      title="Glisser pour réordonner"
      aria-label="Réordonner"
      className={`cursor-grab active:cursor-grabbing text-[#6B6560] hover:text-[#2C2C2C] p-1 -ml-1 shrink-0 ${className}`}
      {...props}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 4a1 1 0 100 2 1 1 0 000-2zM7 9a1 1 0 100 2 1 1 0 000-2zM7 14a1 1 0 100 2 1 1 0 000-2zM13 4a1 1 0 100 2 1 1 0 000-2zM13 9a1 1 0 100 2 1 1 0 000-2zM13 14a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    </button>
  );
}
