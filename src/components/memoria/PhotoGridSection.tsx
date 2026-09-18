"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, ImageIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MemoriaPhoto } from "@/types/memoria";
import { getPhotoUrl } from "@/lib/memoria";
import { PhotoLightboxModal } from "./PhotoLightboxModal";

interface PhotoGridSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sectionPrefix: string;
  photos: MemoriaPhoto[];
}

export const PhotoGridSection: React.FC<PhotoGridSectionProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  sectionPrefix,
  photos,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={title}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="space-y-8">
        {/* Caso não tenha nenhuma foto cadastrada para a seção */}
        {photos.length === 0 ? (
          <div className="clay-card p-10 sm:p-12 text-center bg-white border border-stone space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 mx-auto bg-ivory border border-stone flex items-center justify-center text-gold">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-night text-lg">
                Nenhuma fotografia cadastrada no momento
              </h3>
              <p className="text-xs text-stone-dark font-mono leading-relaxed">
                Os registros visuais desta seção estão sendo organizados no repositório digital.
              </p>
            </div>
          </div>
        ) : (
          /* Grid Fotográfico com suporte a clique e lightbox */
          <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6">
            
            {/* Foto 1: Destaque Principal Panorâmico (8 colunas no desktop se houver 2+, ou 12 se for única) */}
            {photos[0] && (
              <div
                onClick={() => setLightboxIndex(0)}
                className={`${
                  photos.length === 1 ? "col-span-12" : "col-span-12 lg:col-span-8"
                } group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold cursor-pointer`}
              >
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={getPhotoUrl(photos[0].storage_path)}
                    alt={photos[0].caption || `${sectionPrefix} Foto 1`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-night/0 group-hover:bg-night/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 bg-night/80 text-gold border border-gold/40">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-night/90 via-night/40 to-transparent flex items-center justify-between text-ivory text-xs font-mono">
                    <span className="truncate pr-2">
                      {photos[0].caption || `${sectionPrefix} • ${photos[0].reference_code || "Ref. 01"}`}
                    </span>
                    <span className="text-gold text-[10px] uppercase tracking-wider font-sans font-bold shrink-0">
                      Destaque
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Foto 2: Card Lateral */}
            {photos[1] && (
              <div
                onClick={() => setLightboxIndex(1)}
                className="col-span-12 sm:col-span-6 lg:col-span-4 group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold flex flex-col h-full cursor-pointer"
              >
                <div className="relative flex-1 w-full min-h-[260px] lg:min-h-0">
                  <img
                    src={getPhotoUrl(photos[1].storage_path)}
                    alt={photos[1].caption || `${sectionPrefix} Foto 2`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-night/0 group-hover:bg-night/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-night/80 text-gold border border-gold/40">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-night/90 to-transparent text-ivory text-[11px] font-mono">
                    <span className="truncate block">
                      {photos[1].caption || `${sectionPrefix} • ${photos[1].reference_code || "Ref. 02"}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Linha Inferior: Fotos 3 a 6 */}
            {photos.slice(2).map((photo, index) => {
              const actualIndex = index + 2;
              const photoNumber = actualIndex + 1;
              const refLabel = photo.reference_code || `Ref. ${String(photoNumber).padStart(2, "0")}`;

              return (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(actualIndex)}
                  className="col-span-6 md:col-span-3 group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <img
                      src={getPhotoUrl(photo.storage_path)}
                      alt={photo.caption || `${sectionPrefix} Foto ${photoNumber}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-night/0 group-hover:bg-night/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-night/80 text-gold border border-gold/40">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 bg-gradient-to-t from-night/90 to-transparent text-ivory text-[10px] sm:text-[11px] font-mono">
                      <span className="truncate block">
                        {photo.caption || `${sectionPrefix} • ${refLabel}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* CTA da Seção */}
        <div className="pt-4 flex justify-center">
          <Link
            href={`/memoria-e-eventos/${id}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-night text-ivory text-xs uppercase tracking-widest font-semibold border border-night hover:bg-gold hover:text-night hover:border-gold transition-all duration-200 shadow-sm"
          >
            <span>Ver mais</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightboxModal
        photos={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
};
