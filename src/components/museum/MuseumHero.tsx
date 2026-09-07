import React from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { MapPin, Clock, Ticket } from "lucide-react";
import { Museum } from "@/types/museum";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { Button } from "@/components/ui/Button";

interface MuseumHeroProps {
  museum: Museum;
}

export const MuseumHero: React.FC<MuseumHeroProps> = ({ museum }) => {
  return (
    <div className="relative w-full min-h-[480px] lg:min-h-[560px] flex items-end overflow-hidden bg-night text-ivory">
      {/* Background Image with Overlay */}
      <img src={museum.imagem_capa} alt={museum.nome} className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryTag label={museum.categoria} variant="highlight" size="md" />
            <span className="text-xs uppercase tracking-widest text-blue-light font-medium">
              {museum.subcategoria}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
            {museum.nome}
          </h1>

          <p className="text-base md:text-xl text-stone font-light leading-relaxed">
            {museum.hero_texto_auxiliar || museum.descricao_curta}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-stone border-t border-stone-dark/40">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>{museum.localizacao.bairro}, {museum.localizacao.cidade}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <span>{museum.visitacao.horario}</span>
            </div>

            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-gold shrink-0" />
              <span>{museum.visitacao.entrada}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button href="#sobre" variant="primary" size="md">
              Conhecer o museu
            </Button>
            <Button href="#visitacao" variant="gold-outline" size="md">
              Informações de visitação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
