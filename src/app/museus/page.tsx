"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MuseumCategory } from "@/types/museum";
import { filterMuseums } from "@/lib/museums";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterBar } from "@/components/search/FilterBar";
import { MuseumGrid } from "@/components/museum/MuseumGrid";
import { EmptyState } from "@/components/search/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";

function MuseumCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("categoria") as MuseumCategory) || "Todos";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MuseumCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<"relevance" | "alphabetical">("relevance");

  const filteredMuseums = useMemo(() => {
    return filterMuseums(query, selectedCategory, sortBy);
  }, [query, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCategory("Todos");
    setSortBy("relevance");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      {/* Editorial Header */}
      <SectionHeader
        eyebrow="Catálogo Completo"
        title="Museus de Ouro Preto"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore museus, coleções, espaços históricos e instituições dedicadas à preservação da memória cultural de Ouro Preto."
      />

      {/* Search Bar */}
      <div className="max-w-2xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nome, categoria ou palavra-chave..."
        />
      </div>

      {/* Filter and Sort Controls */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
      />

      {/* Results Header Info */}
      <div className="flex items-center justify-between border-b border-stone/60 pb-3 text-xs text-blue-deep uppercase tracking-wider font-semibold">
        <span>
          {filteredMuseums.length} {filteredMuseums.length === 1 ? "museu encontrado" : "museus encontrados"}
        </span>
        {selectedCategory !== "Todos" && (
          <span className="text-gold">Filtro: {selectedCategory}</span>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredMuseums.length > 0 ? (
        <MuseumGrid museums={filteredMuseums} />
      ) : (
        <EmptyState onResetFilters={handleResetFilters} />
      )}
    </div>
  );
}

export default function MuseumCatalogPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-blue-deep">Carregando catálogo...</div>}>
      <MuseumCatalogContent />
    </Suspense>
  );
}
