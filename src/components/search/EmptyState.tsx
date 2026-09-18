import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onResetFilters: () => void;
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  title = "Nenhum museu encontrado",
  description = "Nenhum resultado corresponde aos termos da sua busca. Tente refinar suas palavras-chave ou limpar os filtros aplicados.",
}) => {
  return (
    <div className="clay-card p-12 text-center flex flex-col items-center justify-center my-8 max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-none bg-stone/30 flex items-center justify-center mb-6 text-blue-deep">
        <SearchX className="w-8 h-8 text-gold" />
      </div>
      <h3 className="text-xl font-serif font-bold text-night mb-2">{title}</h3>
      <p className="text-sm text-blue-deep mb-6 max-w-md leading-relaxed">{description}</p>
      <Button onClick={onResetFilters} variant="primary" size="md">
        Limpar filtros
      </Button>
    </div>
  );
};
