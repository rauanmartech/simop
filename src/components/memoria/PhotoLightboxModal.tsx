"use client";

import React, { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Camera, Tag, User } from "lucide-react";
import { MemoriaPhoto } from "@/types/memoria";
import { getPhotoUrl } from "@/lib/memoria";

interface PhotoLightboxModalProps {
  photos: MemoriaPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOpen = currentIndex !== null && Boolean(photos) && photos.length > 0;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || !photos || photos.length === 0) return;
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  }, [currentIndex, photos, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || !photos || photos.length === 0) return;
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, photos, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!mounted || !isOpen || currentIndex === null) {
    return null;
  }

  const currentPhoto = photos[currentIndex];
  const imageUrl = currentPhoto ? getPhotoUrl(currentPhoto.storage_path) : "";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-night/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="w-full max-w-7xl flex items-center justify-between z-50 text-ivory pt-1 sm:pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-xs font-mono text-gold">
          <Camera className="w-4 h-4" />
          <span>
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-none bg-stone-dark/40 hover:bg-gold hover:text-night text-ivory transition-all duration-200 focus:outline-none border border-stone-dark/50"
          aria-label="Fechar visualização"
          title="Fechar (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Area with Natural Aspect Ratio */}
      <div
        className="relative w-full max-w-7xl flex-1 flex items-center justify-center my-2 sm:my-4 px-2 sm:px-12 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Anterior */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-50 p-2.5 sm:p-3.5 rounded-none bg-night/80 text-ivory hover:text-gold border border-gold/30 hover:border-gold transition-all duration-200 focus:outline-none backdrop-blur-sm shadow-xl"
            aria-label="Fotografia anterior"
            title="Anterior (seta esquerda)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Container da Imagem que Respeita as Proporções Reais */}
        <div className="flex items-center justify-center max-w-full max-h-[75vh] min-h-0 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={currentPhoto.caption || currentPhoto.reference_code || "Fotografia do acervo"}
              className="w-auto h-auto max-w-[88vw] max-h-[74vh] object-contain shadow-2xl border border-stone-dark/40 transition-all duration-300"
            />
          ) : (
            <div className="p-12 text-stone-dark font-mono text-sm">Imagem indisponível</div>
          )}
        </div>

        {/* Botão Próximo */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-50 p-2.5 sm:p-3.5 rounded-none bg-night/80 text-ivory hover:text-gold border border-gold/30 hover:border-gold transition-all duration-200 focus:outline-none backdrop-blur-sm shadow-xl"
            aria-label="Próxima fotografia"
            title="Próxima (seta direita)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div
        className="w-full max-w-4xl bg-night/90 border border-stone-dark/40 p-4 sm:p-5 text-ivory space-y-2 z-50 text-center sm:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm sm:text-base font-serif italic text-ivory leading-relaxed">
            {currentPhoto.caption || "Fotografia sem legenda cadastrada."}
          </p>

          {currentPhoto.reference_code && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold text-[11px] font-mono shrink-0 self-start sm:self-auto">
              <Tag className="w-3 h-3" />
              <span>{currentPhoto.reference_code}</span>
            </div>
          )}
        </div>

        {currentPhoto.photographer && (
          <div className="flex items-center gap-1.5 text-xs text-stone font-mono pt-1">
            <User className="w-3.5 h-3.5 text-gold" />
            <span>Fotografia por: {currentPhoto.photographer}</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
