import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sparkles, Archive } from "lucide-react";

interface MuseumCollectionProps {
  acervo: string;
  destaques: string[];
}

export const MuseumCollection: React.FC<MuseumCollectionProps> = ({ acervo, destaques }) => {
  return (
    <section id="acervo" className="py-12 border-t border-stone/60">
      <SectionHeader
        eyebrow="Obras e Documentos"
        title="Acervo e Destaques"
        subtitle="Riqueza documental, peças sacras, mobília e criações artísticas preservadas."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Acervo Overview */}
        <div className="lg:col-span-2 clay-card p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-gold font-semibold text-xs uppercase tracking-wider mb-4">
              <Archive className="w-4 h-4" />
              <span>Visão Geral do Acervo</span>
            </div>
            <p className="text-base md:text-lg text-blue-deep leading-relaxed whitespace-pre-line">
              {acervo}
            </p>
          </div>
        </div>

        {/* Destaques Sidebar */}
        <div className="clay-card-dark p-8 text-ivory flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-gold font-semibold text-xs uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Destaques da Exposição</span>
            </div>

            <ul className="space-y-4">
              {destaques.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-none bg-gold/20 text-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-gold/30">
                    0{index + 1}
                  </span>
                  <span className="text-sm text-stone leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
