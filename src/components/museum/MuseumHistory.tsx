import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Scroll } from "lucide-react";

interface MuseumHistoryProps {
  historia: string;
}

export const MuseumHistory: React.FC<MuseumHistoryProps> = ({ historia }) => {
  const paragraphs = historia.split("\n\n").filter(Boolean);

  return (
    <section id="historia" className="py-12 border-t border-stone/60">
      <SectionHeader
        eyebrow="Memória e Trajetória"
        title="História do Espaço"
        subtitle="A trajetória centenária e o valor histórico deste patrimônio cultural."
      />

      <div className="clay-card p-8 md:p-12 relative overflow-hidden">
        {/* Subtle decorative icon */}
        <div className="absolute top-6 right-6 text-stone/20 pointer-events-none">
          <Scroll className="w-24 h-24 stroke-[1]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {paragraphs.map((p, index) => (
            <p
              key={index}
              className={`text-base md:text-lg text-blue-deep leading-relaxed ${
                index === 0
                  ? "font-serif text-lg md:text-xl text-night border-l-2 border-gold pl-4 italic"
                  : ""
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
