import React from "react";

interface CategoryTagProps {
  label: string;
  variant?: "default" | "alternative" | "highlight";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
  label,
  variant = "default",
  size = "sm",
  className = "",
  onClick,
  active = false,
}) => {
  const baseStyles =
    "inline-flex items-center font-semibold rounded-none transition-colors duration-200 uppercase tracking-widest";

  const sizeStyles = {
    sm: "px-3 py-1 text-[11px]",
    md: "px-4 py-1.5 text-xs",
  };

  const variantStyles = {
    default: active
      ? "bg-gold text-night shadow-sm"
      : "bg-blue-light/80 text-night hover:bg-blue-light",
    alternative: active
      ? "bg-blue-deep text-ivory"
      : "bg-stone/80 text-blue-deep hover:bg-stone",
    highlight: "bg-gold text-night font-bold shadow-sm",
  };

  const clickableStyles = onClick ? "cursor-pointer select-none" : "";

  return (
    <span
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${clickableStyles} ${className}`}
    >
      {label}
    </span>
  );
};
