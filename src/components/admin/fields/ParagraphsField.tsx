"use client";

interface ParagraphsFieldProps {
  label: string;
  value: string[];
  onChange: (paragraphs: string[]) => void;
}

export default function ParagraphsField({
  label,
  value,
  onChange,
}: ParagraphsFieldProps) {
  const updateParagraph = (index: number, text: string) => {
    const updated = [...value];
    updated[index] = text;
    onChange(updated);
  };

  const addParagraph = () => {
    onChange([...value, ""]);
  };

  const removeParagraph = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveParagraph = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    const updated = [...value];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
        {label}
      </label>
      <div className="space-y-3">
        {value.map((paragraph, index) => (
          <div key={index} className="flex gap-2 items-start">
            {/* Reorder buttons */}
            <div className="flex flex-col gap-0.5 pt-1">
              <button
                type="button"
                onClick={() => moveParagraph(index, -1)}
                disabled={index === 0}
                className="p-0.5 text-[#6B6560] hover:text-[#2C2C2C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Monter"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => moveParagraph(index, 1)}
                disabled={index === value.length - 1}
                className="p-0.5 text-[#6B6560] hover:text-[#2C2C2C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Descendre"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Textarea */}
            <div className="flex-1">
              <label className="block text-xs text-[#6B6560] mb-1">
                Paragraphe {index + 1}
              </label>
              <textarea
                value={paragraph}
                onChange={(e) => updateParagraph(index, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] placeholder-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all resize-vertical"
              />
            </div>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => removeParagraph(index)}
              className="mt-6 p-1 text-red-500 hover:text-red-700 transition-colors"
              title="Supprimer ce paragraphe"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addParagraph}
        className="mt-3 px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] transition-colors"
      >
        + Ajouter un paragraphe
      </button>
    </div>
  );
}
