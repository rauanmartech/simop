import React from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Museum } from "@/types/museum";
import { CategoryTag } from "@/components/ui/CategoryTag";

interface MuseumCardProps {
  museum: Museum;
  className?: string;
}

export const MuseumCard: React.FC<MuseumCardProps> = ({ museum, className = "" }) => {
  return (
    <Link
      href={`/museus/${museum.slug}`}
      className={`clay-card overflow-hidden flex flex-col h-full group hover:border-gold transition-all duration-300 ${className}`}
    >
      <article className="flex flex-col h-full w-full">
        {/* Cover Image Container */}
        <div className="relative w-full h-56 md:h-60 overflow-hidden bg-stone/30">
          <img
            src={museum.imagem_capa}
            alt={museum.nome}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-80" />
          <div className="absolute top-4 left-4 z-10">
            <CategoryTag label={museum.categoria} variant="default" size="sm" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 flex flex-col flex-grow justify-between gap-4">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-night group-hover:text-gold transition-colors leading-snug">
              {museum.nome}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-blue-deep font-medium">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>
                {museum.localizacao.cidade}, {museum.localizacao.estado}
              </span>
            </div>

            <p className="text-sm text-blue-deep leading-relaxed line-clamp-3 pt-1">
              {museum.descricao_curta}
            </p>
          </div>

          {/* Card CTA Footer */}
          <div className="pt-3 border-t border-stone/50 flex items-center justify-between mt-auto">
            <span className="text-xs uppercase tracking-widest font-semibold text-blue-deep group-hover:text-gold transition-colors">
              Explorar Acervo
            </span>
            <div
              className="w-9 h-9 rounded-none bg-ivory border border-stone flex items-center justify-center text-night group-hover:bg-gold group-hover:border-gold group-hover:text-night transition-all duration-300 transform group-hover:translate-x-1"
              aria-label={`Ver detalhes do ${museum.nome}`}
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
