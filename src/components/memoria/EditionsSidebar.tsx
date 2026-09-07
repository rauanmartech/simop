import React from "react";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { MemoriaEventEdition, MemoriaEventType } from "@/types/memoria";

interface EditionsSidebarProps {
  eventType: MemoriaEventType;
  editions: MemoriaEventEdition[];
  currentYear: number;
}

export const EditionsSidebar: React.FC<EditionsSidebarProps> = ({
  eventType,
  editions,
  currentYear,
}) => {
  const basePath = `/memoria-e-eventos/${
    eventType === "semana_de_museus" ? "semana-de-museus" : "primavera-de-museus"
  }`;

  const eventLabel =
    eventType === "semana_de_museus" ? "Semana de Museus" : "Primavera de Museus";

  return (
    <aside className="space-y-4">
      <div className="clay-card p-5 bg-white border border-stone">
        {/* Cabeçalho do Card */}
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone/60">
          <Calendar className="w-4 h-4 text-gold" />
          <h3 className="font-serif font-bold text-night text-sm uppercase tracking-wider">
            {eventLabel}
          </h3>
        </div>

        <p className="text-[11px] text-stone-dark mb-4 font-mono">
          Edições Registradas
        </p>

        {/* Lista compacta de edições */}
        <nav className="space-y-1" aria-label={`Edições de ${eventLabel}`}>
          {editions.map((edition) => {
            const isActive = edition.year === currentYear;
            return (
              <Link
                key={edition.id}
                href={`${basePath}/${edition.year}`}
                className={`flex items-center justify-between px-3 py-2 text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? "bg-night text-gold font-bold border-l-2 border-gold pl-2.5 shadow-sm"
                    : "text-blue-deep hover:bg-ivory hover:text-night hover:translate-x-0.5"
                }`}
              >
                <span>
                  {edition.year}
                  {edition.edition_number && (
                    <span className="text-[10px] text-stone-dark ml-2 opacity-80 font-normal">
                      ({edition.edition_number}ª Edição)
                    </span>
                  )}
                </span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
