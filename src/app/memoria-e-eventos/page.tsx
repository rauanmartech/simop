import React from "react";
import Link from "next/link";
import {
  Camera,
  Calendar,
  Sparkles,
  ArrowRight,
  Eye,
  ImageIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAcervoPhotos,
  getLatestEventEdition,
  getEventPhotos,
  getPhotoUrl,
} from "@/lib/memoria";
import { MemoriaPhoto } from "@/types/memoria";

export const metadata = {
  title: "Memória e Eventos — Sistema de Museus de Ouro Preto (SIMOP)",
  description:
    "Espaço visual de memória, documentação fotográfica e registros dos grandes eventos dos museus de Ouro Preto.",
};

export const revalidate = 60;

interface PhotoGridSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sectionPrefix: string;
  photos: MemoriaPhoto[];
}

const PhotoGridSection: React.FC<PhotoGridSectionProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  sectionPrefix,
  photos,
}) => {
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
          /* Grid Fotográfico: renderiza apenas as fotos existentes (até 6) */
          <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6">
            
            {/* Foto 1: Destaque Principal Panorâmico (8 colunas no desktop se houver 2+, ou 12 se for única) */}
            {photos[0] && (
              <div
                className={`${
                  photos.length === 1 ? "col-span-12" : "col-span-12 lg:col-span-8"
                } group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold`}
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

            {/* Foto 2: Card Lateral (4 colunas no desktop, preenchendo altura flex) */}
            {photos[1] && (
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold flex flex-col h-full">
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

            {/* Linha Inferior: Fotos 3 a 6 (somente as que existirem) */}
            {photos.slice(2).map((photo, index) => {
              const photoNumber = index + 3;
              const refLabel = photo.reference_code || `Ref. ${String(photoNumber).padStart(2, "0")}`;

              return (
                <div
                  key={photo.id}
                  className="col-span-6 md:col-span-3 group relative overflow-hidden border border-stone bg-stone-200 transition-all duration-300 hover:border-gold"
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
    </section>
  );
};

export default async function MemoriaEEventosPage() {
  // 1. Busca até 6 fotos do Acervo
  const acervoPhotos = await getAcervoPhotos(6);

  // 2. Busca a edição ativa/mais recente da Semana de Museus e suas fotos
  const semanaEdition = await getLatestEventEdition("semana_de_museus");
  const semanaPhotos = semanaEdition
    ? await getEventPhotos(semanaEdition.id, 6)
    : [];

  // 3. Busca a edição ativa/mais recente da Primavera de Museus e suas fotos
  const primaveraEdition = await getLatestEventEdition("primavera_de_museus");
  const primaveraPhotos = primaveraEdition
    ? await getEventPhotos(primaveraEdition.id, 6)
    : [];

  return (
    <div className="space-y-16 md:space-y-24 pb-24">
      {/* ========================================================================= */}
      {/* 0. HERO / INTRODUÇÃO DA PÁGINA: MEMÓRIA E EVENTOS                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-night text-ivory border-b border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest font-mono">
              <Camera className="w-4 h-4" />
              <span>Arquivo Visual & Documentação</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
              Memória e <span className="text-gold italic font-serif">Eventos</span>
            </h1>

            <p className="text-base sm:text-xl text-stone font-light leading-relaxed">
              Salvaguarda de memória, documentação fotográfica e registros visuais das grandes
              temporadas culturais e dos museus de Ouro Preto.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-dark border-t border-stone-dark/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span className="text-stone">
                  Acervo Fotográfico ({acervoPhotos.length} fotos)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span className="text-stone">
                  Semana de Museus {semanaEdition ? `(${semanaEdition.year})` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span className="text-stone">
                  Primavera de Museus {primaveraEdition ? `(${primaveraEdition.year})` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. SEÇÃO: ACERVO DE FOTOS                                                 */}
      {/* ========================================================================= */}
      <PhotoGridSection
        id="acervo-de-fotos"
        eyebrow="Arquivo Histórico & Iconografia"
        title="Acervo de Fotos"
        subtitle="Registros históricos e contemporâneos do patrimônio museológico de Ouro Preto."
        sectionPrefix="Acervo"
        photos={acervoPhotos}
      />

      {/* ========================================================================= */}
      {/* 2. SEÇÃO: SEMANA DE MUSEUS                                                */}
      {/* ========================================================================= */}
      <PhotoGridSection
        id="semana-de-museus"
        eyebrow="Ação Anual Integrada"
        title={
          semanaEdition?.edition_number
            ? `${semanaEdition.edition_number}ª Semana de Museus (${semanaEdition.year})`
            : semanaEdition
            ? `Semana de Museus ${semanaEdition.year}`
            : "Semana de Museus"
        }
        subtitle={
          semanaEdition?.title
            ? `“${semanaEdition.title}” — ${semanaEdition.subtitle || "Registros fotográficos da edição."}`
            : "Ação nacional integrada promovida pelo IBRAM com programações especiais nos museus."
        }
        sectionPrefix="Semana de Museus"
        photos={semanaPhotos}
      />

      {/* ========================================================================= */}
      {/* 3. SEÇÃO: PRIMAVERA DE MUSEUS                                             */}
      {/* ========================================================================= */}
      <PhotoGridSection
        id="primavera-de-museus"
        eyebrow="Temporada Cultural & Primavera"
        title={
          primaveraEdition?.edition_number
            ? `${primaveraEdition.edition_number}ª Primavera de Museus (${primaveraEdition.year})`
            : primaveraEdition
            ? `Primavera de Museus ${primaveraEdition.year}`
            : "Primavera de Museus"
        }
        subtitle={
          primaveraEdition?.title
            ? `“${primaveraEdition.title}” — ${primaveraEdition.subtitle || "Registros fotográficos da edição."}`
            : "Temporada cultural com exposições, seminários e visitas mediadas pelo circuito histórico."
        }
        sectionPrefix="Primavera de Museus"
        photos={primaveraPhotos}
      />
    </div>
  );
}
