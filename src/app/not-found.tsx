import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="clay-card p-10 md:p-16 max-w-2xl w-full flex flex-col items-center justify-center space-y-6">
        <div className="w-20 h-20 rounded-none bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
          <Compass className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-widest text-gold font-bold">
          Erro 404 — Caminho não encontrado
        </span>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-night tracking-tight">
          Página não encontrada
        </h1>

        <p className="text-base md:text-lg text-blue-deep font-normal max-w-md leading-relaxed">
          Parece que este caminho não faz parte do nosso acervo cultural.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button href="/museus" variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos museus
          </Button>
          <Button href="/" variant="secondary" size="md">
            Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
