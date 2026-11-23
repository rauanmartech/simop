"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Camera,
  Calendar,
  FileText,
  Shield,
  Layers,
  Clock,
  CheckCircle2,
  Play,
  RotateCcw,
  Volume2,
  ChevronRight,
  Info,
} from "lucide-react";
import { TutorialModule } from "@/types/tutorial";
import { TUTORIAL_MODULES } from "@/data/tutorialModules";
import { SimulatedNewsManager } from "./SimulatedNewsManager";

interface TutorialCenterProps {
  onStartTutorial: (module: TutorialModule) => void;
  onNavigateToTab: (tab: "acervo" | "semana" | "primavera" | "tutoriais") => void;
}

const STORAGE_KEY = "simop_tutorial_completed_modules";

export const TutorialCenter: React.FC<TutorialCenterProps> = ({
  onStartTutorial,
  onNavigateToTab,
}) => {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<"catalog" | "practice-news">("catalog");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletedModules(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Erro ao carregar progresso dos tutoriais:", e);
    }
  }, []);

  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCompletedModules([]);
  };

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "Camera":
        return <Camera className="w-5 h-5 text-gold" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-gold" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-gold" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-gold" />;
      default:
        return <Shield className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner de Boas-Vindas e Apresentação */}
      <div className="bg-gradient-to-r from-night via-[#1a2332] to-night text-ivory border border-gold/40 p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 border border-gold/50 text-gold text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Onboarding & Capacitação Contínua</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory tracking-tight">
            Central Interativa de Tutoriais
          </h2>

          <p className="text-xs sm:text-sm text-stone leading-relaxed font-sans">
            Aprenda a operar todas as ferramentas do Sistema Municipal de Museus (SIMOP) com guias práticos,
            cursor animado, iluminação direta nos botões e narração por voz acessível. Você aprende no seu ritmo
            sem nenhum risco aos dados reais do acervo.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onStartTutorial(TUTORIAL_MODULES[0])}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-night font-mono font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-night" />
              <span>Iniciar Tour pelo Painel</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-light">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {completedModules.length} de {TUTORIAL_MODULES.length} módulos concluídos
              </span>
            </div>

            {completedModules.length > 0 && (
              <button
                onClick={handleResetProgress}
                className="text-xs font-mono text-stone-dark hover:text-stone-light underline transition-colors"
                title="Limpar histórico de tutoriais concluídos"
              >
                Resetar progresso
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-abas da Central: Catálogo de Tutoriais vs Prática Interativa de Notícias */}
      <div className="flex items-center gap-4 border-b border-stone/50 pb-2">
        <button
          onClick={() => setActiveSubTab("catalog")}
          className={`text-xs font-mono uppercase tracking-wider font-semibold py-2 px-3 border-b-2 transition-all ${
            activeSubTab === "catalog"
              ? "border-gold text-night font-bold"
              : "border-transparent text-stone-dark hover:text-night"
          }`}
        >
          Trilhas & Módulos Disponíveis ({TUTORIAL_MODULES.length})
        </button>

        <button
          onClick={() => setActiveSubTab("practice-news")}
          className={`text-xs font-mono uppercase tracking-wider font-semibold py-2 px-3 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "practice-news"
              ? "border-gold text-night font-bold"
              : "border-transparent text-stone-dark hover:text-night"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-gold" />
          <span>Laboratório de Notícias & CRUD</span>
        </button>
      </div>

      {activeSubTab === "catalog" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TUTORIAL_MODULES.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                className={`bg-white border transition-all duration-200 p-6 flex flex-col justify-between gap-5 relative group hover:shadow-md ${
                  isCompleted ? "border-emerald-300" : "border-stone/60 hover:border-gold/60"
                }`}
              >
                {/* Status de Conclusão */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-night/5 border border-stone/40 flex items-center justify-center">
                      {getModuleIcon(mod.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-stone-light text-stone-dark border border-stone">
                        {mod.badge}
                      </span>
                    </div>
                  </div>

                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Concluído
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-night group-hover:text-gold transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-stone-dark leading-relaxed font-sans">
                    {mod.description}
                  </p>
                </div>

                {/* Rodapé do Card */}
                <div className="pt-4 border-t border-stone/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-stone-dark font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{mod.estimatedMinutes} min
                    </span>
                    <span>•</span>
                    <span>{mod.stepsCount} passos</span>
                  </div>

                  <button
                    onClick={() => onStartTutorial(mod)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-night text-gold hover:bg-gold hover:text-night font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    <span>{isCompleted ? "Rever Guia" : "Iniciar"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <SimulatedNewsManager />
      )}

      {/* Dicas de Recursos e Acessibilidade */}
      <div className="p-5 bg-stone-light/40 border border-stone/60 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-stone-dark">
        <div className="flex items-start gap-3">
          <Volume2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <div>
            <strong className="text-night block font-bold">Narração Integrada:</strong>
            Ative o ícone de áudio dentro do tutorial para ouvir a leitura de cada passo em português.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <div>
            <strong className="text-night block font-bold">Simulação Segura:</strong>
            O sistema protege dados reais, permitindo aprendizado hands-on sem risco de exclusão acidental.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RotateCcw className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <div>
            <strong className="text-night block font-bold">Acesso Permanente:</strong>
            Os tutoriais ficam sempre acessíveis a qualquer momento através do botão no cabeçalho ou aba dedicada.
          </div>
        </div>
      </div>
    </div>
  );
};
