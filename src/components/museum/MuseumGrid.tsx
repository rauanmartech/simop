import React from "react";
import { Museum } from "@/types/museum";
import { MuseumCard } from "./MuseumCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

interface MuseumGridProps {
  museums: Museum[];
  loading?: boolean;
  className?: string;
}

export const MuseumGrid: React.FC<MuseumGridProps> = ({
  museums,
  loading = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {museums.map((museum) => (
        <MuseumCard key={museum.id} museum={museum} />
      ))}
    </div>
  );
};
