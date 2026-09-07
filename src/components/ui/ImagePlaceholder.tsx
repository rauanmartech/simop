import React from "react";

interface ImagePlaceholderProps {
  className?: string;
  /** Extra inline styles (useful for fixed widths/heights from parent) */
  style?: React.CSSProperties;
}

/**
 * Renders a gray rectangle with two diagonal lines forming an "X".
 * Used as a stand-in wherever real images used to appear.
 */
export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  className = "",
  style,
}) => {
  return (
    <div
      className={`relative w-full h-full bg-stone-200 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#9ca3af"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="#9ca3af"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};
