"use client";

import React, { useState } from "react";
import { Museum } from "@/types/museum";
import { ExpandableMuseumCard } from "./ExpandableMuseumCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

interface MuseumAccordionMobileProps {
  museums: Museum[];
  loading?: boolean;
  className?: string;
}

export const MuseumAccordionMobile: React.FC<MuseumAccordionMobileProps> = ({
  museums,
  loading = false,
  className = "",
}) => {
  // Inicialmente o primeiro museu está aberto, conforme os requisitos.
  const [openCardId, setOpenCardId] = useState<string | null>(museums.length > 0 ? museums[0].id : null);

  if (loading) {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {museums.map((museum) => (
        <ExpandableMuseumCard
          key={museum.id}
          museum={museum}
          isOpen={openCardId === museum.id}
          onClick={() => setOpenCardId(museum.id)}
        />
      ))}
    </div>
  );
};
