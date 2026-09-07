"use client";

import React from "react";
import { MuseumCategory } from "@/types/museum";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { ArrowUpDown } from "lucide-react";

interface FilterBarProps {
  selectedCategory: MuseumCategory;
  onSelectCategory: (category: MuseumCategory) => void;
  sortBy: "relevance" | "alphabetical";
  onSelectSortBy: (sort: "relevance" | "alphabetical") => void;
  categories?: MuseumCategory[];
  className?: string;
}

const DEFAULT_CATEGORIES: MuseumCategory[] = [
  "Todos",
  "História",
  "Arte",
  "Arte Sacra",
  "Patrimônio",
  "Cultura",
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSortBy,
  categories = DEFAULT_CATEGORIES,
  className = "",
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 ${className}`}>
      {/* Categories Horizontal Pills */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <CategoryTag
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => onSelectCategory(cat)}
            variant={selectedCategory === cat ? "highlight" : "default"}
            size="md"
          />
        ))}
      </div>

      {/* Sorting Select */}
      <div className="flex items-center gap-2 text-xs text-blue-deep shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
        <span className="font-semibold uppercase tracking-wider">Ordenar:</span>
        <select
          value={sortBy}
          onChange={(e) => onSelectSortBy(e.target.value as "relevance" | "alphabetical")}
          className="bg-white border border-stone rounded-none px-3 py-1.5 text-night font-medium text-xs focus:outline-none focus:ring-1 focus:ring-gold"
        >
          <option value="relevance">Mais relevantes</option>
          <option value="alphabetical">Ordem alfabética</option>
        </select>
      </div>
    </div>
  );
};
