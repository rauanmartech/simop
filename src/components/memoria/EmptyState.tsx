import React from "react";
import Link from "next/link";
import { Camera, ArrowLeft } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  backHref?: string;
  backLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nenhum conteúdo encontrado",
  message = "Ainda não há registros ou fotografias publicados para esta seção no momento.",
  backHref = "/memoria-e-eventos",
  backLabel = "Voltar para Memória e Eventos",
}) => {
  return (
    <div className="clay-card p-12 text-center space-y-5 bg-white max-w-2xl mx-auto my-12 border border-stone">
      <div className="w-14 h-14 mx-auto bg-ivory border border-stone flex items-center justify-center text-stone-dark">
        <Camera className="w-6 h-6 text-gold" />
      </div>

      <div className="space-y-2">
        <h3 className="font-serif font-bold text-night text-xl">{title}</h3>
        <p className="text-sm text-stone-dark leading-relaxed">{message}</p>
      </div>

      {backHref && (
        <div className="pt-2">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-night text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-night transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
