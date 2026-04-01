"use client";

import { ReactNode } from "react";

interface ArrayFieldProps<T> {
  label: string;
  value: T[];
  onChange: (value: T[]) => void;
  renderItem: (item: T, index: number, update: (item: T) => void) => ReactNode;
  createItem: () => T;
  addLabel?: string;
}

export default function ArrayField<T>({
  label,
  value,
  onChange,
  renderItem,
  createItem,
  addLabel = "Ajouter",
}: ArrayFieldProps<T>) {
  const updateItem = (index: number, item: T) => {
    const updated = [...value];
    updated[index] = item;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...value, createItem()]);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
        {label}
      </label>
      <div className="space-y-3">
        {value.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] p-4"
          >
            {/* Header with number and delete */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#6B6560]">
                #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Supprimer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Item content */}
            {renderItem(item, index, (updated) => updateItem(index, updated))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-3 px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] transition-colors"
      >
        + {addLabel}
      </button>
    </div>
  );
}
