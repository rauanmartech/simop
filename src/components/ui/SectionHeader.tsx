import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
  dark = false,
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  
  const titleColor = dark ? "text-ivory" : "text-night";
  const subtitleColor = dark ? "text-stone" : "text-blue-deep";
  const borderColor = dark ? "border-stone-dark/50" : "border-stone/50";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 border-b ${borderColor} pb-6 ${className}`}>
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
