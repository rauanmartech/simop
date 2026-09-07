import React from "react";
import Link from "next/link";
import { Landmark, Compass, Scroll, Shield, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Sobre o Portal — Museus de Ouro Preto",
  description:
    "Conheça a missão institucional, o conceito de preservação cultural e o projeto digital dos museus de Ouro Preto.",
};

export default function SobrePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="clay-card p-8 md:p-14 bg-white relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold">
            <Landmark className="w-4 h-4" />
            <span>Projeto Institucional</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-night tracking-tight leading-tight">
            Portal dos Museus de <span className="text-gold italic font-serif">Ouro Preto</span>
          </h1>

          <p className="text-base md:text-xl text-blue-deep font-normal leading-relaxed">
            Uma iniciativa digital dedicada à preservação, documentação e difusão do acervo cultural, histórico e artístico dos museus da cidade de Ouro Preto, Minas Gerais.
          </p>
        </div>
      </div>

      {/* Concept Pillars */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="Valores e Diretrizes"
          title="Pilares do Projeto"
          subtitle="A experiência digital foi concebida sob os mais elevados padrões editoriais e de salvaguarda patrimonial."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="clay-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center border border-gold/20">
              <Scroll className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-night text-xl">Memória Histórica</h3>
            <p className="text-sm text-blue-deep leading-relaxed">
              Valorização da trajetória dos museus da Inconfidência, Casa dos Contos, Oratório e acervos sacros que constituem a identidade colonial brasileira.
            </p>
          </div>

          <div className="clay-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center border border-gold/20">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-night text-xl">Patrimônio da Humanidade</h3>
            <p className="text-sm text-blue-deep leading-relaxed">
              Reconhecida pela UNESCO em 1980, Ouro Preto abriga um dos maiores conjuntos de arquitetura e arte barroca preservados do mundo.
            </p>
          </div>

          <div className="clay-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center border border-gold/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-night text-xl">Heritage Contemporâneo</h3>
            <p className="text-sm text-blue-deep leading-relaxed">
              Design sofisticado, navegação intuitiva e rigor visual editorial projetados especificamente para conectar visitantes e pesquisadores aos acervos.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Banner */}
      <section className="clay-card-dark p-8 md:p-12 text-ivory flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-gold font-bold">
            Explore a Cidade
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Pronto para descobrir os museus de Ouro Preto?
          </h2>
          <p className="text-sm text-stone leading-relaxed">
            Acesse o catálogo completo ou pesquise acervos por categoria e palavra-chave.
          </p>
        </div>

        <div className="flex gap-4 shrink-0">
          <Button href="/museus" variant="primary" size="md">
            Ver catálogo
          </Button>
        </div>
      </section>
    </div>
  );
}
