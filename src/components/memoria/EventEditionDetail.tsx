import React from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  ExternalLink,
  Camera,
  Layers,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MemoriaEventEdition, MemoriaEventType, MemoriaPhoto } from "@/types/memoria";
import { EditionsSidebar } from "./EditionsSidebar";
import { MemoriaPhotoCard } from "./MemoriaPhotoCard";

interface EventEditionDetailProps {
  eventType: MemoriaEventType;
  edition: MemoriaEventEdition;
  allEditions: MemoriaEventEdition[];
  photos: MemoriaPhoto[];
}

export const EventEditionDetail: React.FC<EventEditionDetailProps> = ({
  eventType,
  edition,
  allEditions,
  photos,
}) => {
  const eventLabel =
    eventType === "semana_de_museus" ? "Semana de Museus" : "Primavera de Museus";

  const editionHeading = edition.edition_number
    ? `${edition.edition_number}ª ${eventLabel} (${edition.year})`
    : `${eventLabel} ${edition.year}`;

  return (
    <div className="space-y-12 pb-20 pt-6">
      {/* 0. Top Bar / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/memoria-e-eventos"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-dark hover:text-gold transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Memória e Eventos</span>
        </Link>
      </div>

      {/* 1. Header Editorial / Hero */}
      <section className="relative overflow-hidden bg-night text-ivory border-y border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {eventLabel} • Edição {edition.year}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ivory tracking-tight leading-tight">
              {editionHeading}
            </h1>

            {edition.title && (
              <p className="text-lg sm:text-xl text-gold font-serif italic">
                “{edition.title}”
              </p>
            )}

            {edition.subtitle && (
              <p className="text-sm sm:text-base text-stone font-light leading-relaxed max-w-3xl">
                {edition.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Layout: Conteúdo Principal + Menu Lateral Direito Compacto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Coluna Principal de Conteúdo (8 ou 9 colunas) */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-12">
            
            {/* Texto / Descrição da Edição */}
            {edition.description && (
              <section className="clay-card p-6 md:p-8 bg-white border border-stone space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sobre a Edição</span>
                </div>
                <div className="text-sm md:text-base text-blue-deep font-normal leading-relaxed whitespace-pre-line">
                  {edition.description}
                </div>
              </section>
            )}

            {/* Galeria de Fotos da Edição (Grid 3 x 2 = 6 fotos) */}
            <section className="space-y-6" aria-label="Galeria da Edição">
              <div className="flex items-center justify-between border-b border-stone/60 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gold" />
                  <h2 className="font-serif font-bold text-night text-xl md:text-2xl">
                    Galeria de Registros
                  </h2>
                </div>
                <span className="text-xs text-stone-dark font-mono">
                  {photos.length} {photos.length === 1 ? "foto" : "fotos"}
                </span>
              </div>

              {photos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {photos.map((photo) => (
                    <MemoriaPhotoCard
                      key={photo.id}
                      photo={photo}
                      aspectRatio="aspect-[4/3]"
                      showCaption={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="clay-card p-8 text-center bg-white border border-stone text-stone-dark text-xs font-mono">
                  Nenhuma fotografia catalogada para esta edição no momento.
                </div>
              )}

              {/* Botão "Ver mais" -> Link Externo do Google Drive */}
              {edition.external_drive_url && (
                <div className="pt-6 flex justify-center">
                  <a
                    href={edition.external_drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-night text-ivory text-xs uppercase tracking-widest font-semibold border border-night hover:bg-gold hover:text-night hover:border-gold transition-all duration-200 shadow-sm group"
                  >
                    <span>Ver mais no Acervo Completo</span>
                    <ExternalLink className="w-4 h-4 text-gold group-hover:text-night transition-colors" />
                  </a>
                </div>
              )}
            </section>
          </main>

          {/* Coluna Lateral Direita: Menu Compacto de Edições (4 ou 3 colunas) */}
          <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28">
            <EditionsSidebar
              eventType={eventType}
              editions={allEditions}
              currentYear={edition.year}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
