"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Museum } from "@/types/museum";
import { CategoryTag } from "@/components/ui/CategoryTag";

interface ExpandableMuseumCardProps {
  museum: Museum;
  isOpen: boolean;
  onClick: () => void;
}

export const ExpandableMuseumCard: React.FC<ExpandableMuseumCardProps> = ({ museum, isOpen, onClick }) => {
  return (
    <article 
      className={`clay-card overflow-hidden flex flex-col group cursor-pointer ${isOpen ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
      onClick={!isOpen ? onClick : undefined}
    >
      {isOpen ? (
        <div className="flex flex-col w-full">
          {/* Open State - Exact replica of MuseumCard */}
          <div className="relative w-full h-56 md:h-60 overflow-hidden bg-stone/30 shrink-0">
            <img src={museum.imagem_capa} alt={museum.nome} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 left-4 z-10">
              <CategoryTag label={museum.categoria} variant="default" size="sm" />
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-4">
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-night group-hover:text-gold transition-colors leading-snug">
                <Link href={`/museus/${museum.slug}`} className="focus:outline-none block w-full" onClick={(e) => {
                    if (!isOpen) e.preventDefault();
                }}>
                  {museum.nome}
                </Link>
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-blue-deep font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{museum.localizacao.cidade}, {museum.localizacao.estado}</span>
              </div>

              <p className="text-sm text-blue-deep leading-relaxed line-clamp-3 pt-1">
                {museum.descricao_curta}
              </p>
            </div>

            {/* Card CTA Footer */}
            <div className="pt-3 border-t border-stone/50 flex items-center justify-between mt-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-blue-deep group-hover:text-gold transition-colors">
                Explorar Acervo
              </span>
              <Link
                href={`/museus/${museum.slug}`}
                className="w-9 h-9 rounded-none bg-ivory border border-stone flex items-center justify-center text-night group-hover:bg-gold group-hover:border-gold group-hover:text-night transition-all duration-300"
                aria-label={`Ver detalhes do ${museum.nome}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center w-full bg-white h-28">
          {/* Closed State - Horizontal Layout */}
          <div className="relative w-28 h-28 shrink-0 overflow-hidden bg-stone/30">
            <img src={museum.imagem_capa} alt={museum.nome} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="p-4 flex flex-row items-center justify-between flex-grow gap-3 overflow-hidden">
            <div className="flex flex-col justify-center overflow-hidden w-full">
              <h3 className="font-serif text-base font-bold text-night truncate">
                {museum.nome}
              </h3>
              <p className="text-xs text-blue-deep leading-relaxed line-clamp-2 pt-1">
                {museum.descricao_curta}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-ivory border border-stone text-night transition-all duration-300 rounded-none group-hover:bg-gold group-hover:border-gold">
               <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
