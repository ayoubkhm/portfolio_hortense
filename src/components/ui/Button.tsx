import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variants = {
  primary: "bg-gold text-white hover:bg-gold/90",
  secondary: "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white",
  outline: "bg-transparent border-2 border-sand text-charcoal hover:border-gold hover:text-gold",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase transition-all duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
