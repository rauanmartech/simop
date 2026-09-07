import React from "react";
import { Museum } from "@/types/museum";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MuseumCard } from "./MuseumCard";

interface RelatedMuseumsProps {
  museums: Museum[];
}

export const RelatedMuseums: React.FC<RelatedMuseumsProps> = ({ museums }) => {
  if (!museums || museums.length === 0) return null;

  return (
    <section className="py-16 border-t border-stone/60">
      <SectionHeader
        eyebrow="Explore Mais"
        title="Continue sua visita"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore outros espaços culturais e descubra diferentes perspectivas sobre a história e a cultura de Ouro Preto."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {museums.map((museum) => (
          <MuseumCard key={museum.id} museum={museum} />
        ))}
      </div>
    </section>
  );
};
