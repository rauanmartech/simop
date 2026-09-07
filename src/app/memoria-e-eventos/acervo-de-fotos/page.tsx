import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Camera, ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAcervoPhotos } from "@/lib/memoria";
import { MemoriaPhotoCard } from "@/components/memoria/MemoriaPhotoCard";
import { EmptyState } from "@/components/memoria/EmptyState";

export const metadata: Metadata = {
  title: "Acervo de Fotos — Memória e Eventos | SIMOP",
  description:
    "Explore a galeria completa do acervo fotográfico histórico e contemporâneo do Sistema de Museus de Ouro Preto.",
};

export const revalidate = 60; // Revalida a cada 60 segundos

export default async function AcervoDeFotosPage() {
  const photos = await getAcervoPhotos(20);

  return (
    <div className="space-y-12 pb-24 pt-6">
      {/* Breadcrumb de navegação */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/memoria-e-eventos"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-dark hover:text-gold transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Memória e Eventos</span>
        </Link>
      </div>

      {/* Cabeçalho Editorial Hero */}
      <section className="relative overflow-hidden bg-night text-ivory border-y border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest font-mono">
              <Camera className="w-3.5 h-3.5" />
              <span>Acervo Fotográfico Completo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
              Acervo de <span className="text-gold italic font-serif">Fotos</span>
            </h1>

            <p className="text-base sm:text-lg text-stone font-light leading-relaxed max-w-3xl">
              Registros visuais, salvaguarda de memória e iconografia representativa do patrimônio
              museológico e histórico de Ouro Preto.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Fotográfico: 4 imagens por linha (total de 20 imagens) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Galeria do Acervo"
          title="Fotografias Recentes"
          subtitle={`Exibindo as ${photos.length} fotografias mais recentes catalogadas no repositório.`}
        />

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
          <EmptyState
            title="Nenhuma fotografia encontrada no acervo"
            message="O acervo fotográfico está sendo integrado e em breve as imagens estarão disponíveis para consulta pública."
            backHref="/memoria-e-eventos"
            backLabel="Voltar para Memória e Eventos"
          />
        )}
      </main>
    </div>
  );
}
