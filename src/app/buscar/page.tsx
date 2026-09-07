"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { filterMuseums } from "@/lib/museums";
import { SearchBar } from "@/components/search/SearchBar";
import { MuseumGrid } from "@/components/museum/MuseumGrid";
import { EmptyState } from "@/components/search/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { Sparkles, Search } from "lucide-react";

const POPULAR_TAGS = [
  "Inconfidência",
  "Barroco",
  "Aleijadinho",
  "Guignard",
  "Arte Sacra",
  "História",
  "Arquitetura",
  "Economia",
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    return filterMuseums(query);
  }, [query]);

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Search Header */}
      <div className="clay-card-dark p-8 md:p-12 text-ivory relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold">
            <Search className="w-4 h-4" />
            <span>Busca e Descoberta Cultural</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-ivory tracking-tight">
            Explore o Acervo de Ouro Preto
          </h1>

          <p className="text-sm md:text-base text-stone font-light leading-relaxed">
            Pesquise por termos históricos, artistas, períodos ou nomes dos espaços culturais da cidade.
          </p>

          <div className="pt-2">
            <SearchBar
              value={query}
              onChange={setQuery}
              autoFocus
              placeholder="Digite 'oratório', 'inconfidência', 'aleijadinho'..."
            />
          </div>

          {/* Quick Tag Recommendations */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Sugestões:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <CategoryTag
                key={tag}
                label={tag}
                active={query.toLowerCase() === tag.toLowerCase()}
                onClick={() => handleTagClick(tag)}
                variant="alternative"
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone/60 pb-3 text-xs uppercase tracking-wider font-semibold text-blue-deep">
          <span>
            {results.length} {results.length === 1 ? "resultado" : "resultados"}{" "}
            {query ? `para "${query}"` : "disponíveis"}
          </span>
          {query && (
            <button
              onClick={handleReset}
              className="text-gold hover:underline font-bold text-xs"
            >
              Limpar pesquisa
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <MuseumGrid museums={results} />
        ) : (
          <EmptyState
            onResetFilters={handleReset}
            title="Nenhum museu encontrado para esta busca"
            description={`Não foram encontrados resultados correspondentes a "${query}". Tente buscar por termos como "história", "sacra", ou "aleijadinho".`}
          />
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-blue-deep">Carregando busca...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
