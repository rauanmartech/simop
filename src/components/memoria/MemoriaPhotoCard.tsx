"use client";

import React, { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eye } from "lucide-react";
import { MemoriaPhoto } from "@/types/memoria";
import { getPhotoUrl } from "@/lib/memoria";

interface MemoriaPhotoCardProps {
  photo: MemoriaPhoto;
  aspectRatio?: string;
  showCaption?: boolean;
  onClick?: () => void;
}

export const MemoriaPhotoCard: React.FC<MemoriaPhotoCardProps> = ({
  photo,
  aspectRatio = "aspect-[4/3]",
  showCaption = true,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getPhotoUrl(photo.storage_path);

  return (
    <div
      onClick={onClick}
      className={`clay-card group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold ${
        onClick ? "cursor-pointer" : ""
      } ${aspectRatio}`}
    >
      {imageUrl && !hasError ? (
        <img
          src={imageUrl}
          alt={photo.caption || photo.reference_code || "Fotografia do acervo"}
          loading="lazy"
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <ImagePlaceholder className="transition-transform duration-500 group-hover:scale-105" />
      )}

      {/* Overlay de visualização no hover */}
      <div className="absolute inset-0 bg-night/0 group-hover:bg-night/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-night/80 text-gold border border-gold/40">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Legenda e identificador */}
      {showCaption && (
        <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-night/90 via-night/50 to-transparent flex items-end justify-between gap-2 text-ivory text-[11px] font-mono pointer-events-none">
          <span className="line-clamp-1 opacity-95">
            {photo.caption || photo.reference_code || "Fotografia"}
          </span>
          {photo.reference_code && photo.caption && (
            <span className="text-gold text-[10px] uppercase tracking-wider shrink-0">
              {photo.reference_code}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
