import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  separator?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
  dark = false,
  separator = true,
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  
  const titleColor = dark ? "text-ivory" : "text-night";
  const subtitleColor = dark ? "text-stone" : "text-blue-deep";
  const borderClass = separator ? (dark ? "border-b border-stone-dark/50 pb-6" : "border-b border-stone/50 pb-6") : "";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 ${borderClass} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-gold rounded-none" />
          <span className="text-xs uppercase tracking-widest font-semibold text-gold">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg max-w-2xl font-normal leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
