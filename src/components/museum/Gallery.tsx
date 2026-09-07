"use client";

import React, { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/types/museum";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <section id="galeria" className="py-12 border-t border-stone/60">
      <SectionHeader
        eyebrow="Registros Visuais"
        title="Galeria do Museu"
        subtitle="Exploração visual das instalações, detalhes arquitetônicos e peças do acervo."
      />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          // Dynamic span pattern for editorial feel
          const isLarge = index === 0 || index === 3;
          return (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`clay-card overflow-hidden group cursor-pointer relative ${
                isLarge ? "sm:col-span-2 lg:col-span-2 h-72 md:h-80" : "h-72 md:h-80"
              }`}
            >
              <img src={item.imagem} alt={item.legenda} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-night/30 group-hover:bg-night/50 transition-colors duration-300 flex items-end p-6">
                <div className="flex items-center justify-between w-full text-ivory">
                  <p className="text-sm font-medium opacity-90 line-clamp-1 group-hover:opacity-100 transition-opacity">
                    {item.legenda}
                  </p>
                  <div className="w-8 h-8 rounded-none bg-gold/80 text-night flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-night/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-ivory hover:text-gold transition-colors z-50 rounded-none bg-stone-dark/30 focus:outline-none"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 p-3 text-ivory hover:text-gold transition-colors z-50 rounded-none bg-stone-dark/30 focus:outline-none"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <img src={items[selectedIndex].imagem} alt={items[selectedIndex].legenda} className="w-auto h-auto max-w-full max-h-[70vh] object-contain shadow-2xl" />
            <p className="mt-4 text-center text-ivory text-sm md:text-base font-serif italic max-w-xl">
              {items[selectedIndex].legenda}
            </p>
            <span className="text-xs text-stone-dark mt-1 font-medium">
              {selectedIndex + 1} de {items.length}
            </span>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 p-3 text-ivory hover:text-gold transition-colors z-50 rounded-none bg-stone-dark/30 focus:outline-none"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
