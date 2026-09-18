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
import { PhotoGridSection } from "@/components/memoria/PhotoGridSection";
import {
  getAcervoPhotos,
  getLatestEventEdition,
  getEventPhotos,
} from "@/lib/memoria";

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
