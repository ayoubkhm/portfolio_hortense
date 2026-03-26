"use client";

interface Category {
  label: string;
  value: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onChange: (cat: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((cat) => {
        const isActive = cat.value === activeCategory;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`
              relative px-5 py-2 text-sm font-sans font-medium rounded-full
              transition-all duration-300 ease-in-out
              ${isActive ? "text-gold" : "text-warmgray hover:text-charcoal"}
            `}
          >
            {cat.label}
            <span
              className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold
                transition-all duration-300 ease-in-out
                ${isActive ? "w-3/4 opacity-100" : "w-0 opacity-0"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}
