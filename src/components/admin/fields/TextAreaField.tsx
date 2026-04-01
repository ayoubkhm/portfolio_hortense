"use client";

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] placeholder-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all resize-vertical"
      />
    </div>
  );
}
