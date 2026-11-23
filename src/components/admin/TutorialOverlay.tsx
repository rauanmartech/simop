"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  MousePointer2,
  ShieldCheck,
  Pause,
  Play,
} from "lucide-react";
import { TutorialModule, TutorialStep } from "@/types/tutorial";
import { voiceNarrator } from "@/utils/tutorialVoice";

interface TutorialOverlayProps {
  module: TutorialModule;
  onFinish: () => void;
  onClose: () => void;
  onChangeTab?: (tab: "acervo" | "semana" | "primavera" | "tutoriais") => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  module,
  onFinish,
  onClose,
  onChangeTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursorClickAnimation, setShowCursorClickAnimation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const step: TutorialStep = module.steps[currentStepIndex] || module.steps[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === module.steps.length - 1;
  const progressPercent = Math.round(
    ((currentStepIndex + 1) / module.steps.length) * 100
  );

  // Trocar de aba se o passo exigir
  useEffect(() => {
    if (step.targetTab && onChangeTab) {
      onChangeTab(step.targetTab);
    }
  }, [step.targetTab, onChangeTab]);

  // Atualizar elemento destacado
  const updateTargetPosition = useCallback(() => {
    if (isPaused) return;

    if (!step.targetSelector) {
      setTargetRect(null);
      setCursorPos(null);
      return;
    }

    const element = document.querySelector(step.targetSelector);
    if (element) {
      const rect = element.getBoundingClientRect();
      const newRect: TargetRect = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right,
      };
      setTargetRect(newRect);

      // Scroll suave se estiver fora da viewport
      if (
        rect.top < 80 ||
        rect.bottom > window.innerHeight - 80 ||
        rect.left < 20 ||
        rect.right > window.innerWidth - 20
      ) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }

      // Posicionar cursor animado no centro do elemento
      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top + rect.height / 2;
      setCursorPos({ x: targetCenterX, y: targetCenterY });

      // Trigger de clique animado após mover o cursor
      setShowCursorClickAnimation(false);
      const timer = setTimeout(() => {
        setShowCursorClickAnimation(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      // Elemento não encontrado na tela no momento
      setTargetRect(null);
      setCursorPos(null);
    }
  }, [step.targetSelector, isPaused]);

  useEffect(() => {
    // Timeout para permitir que a renderização da aba se complete
    const timer = setTimeout(() => {
      updateTargetPosition();
    }, 180);

    window.addEventListener("resize", updateTargetPosition);
    window.addEventListener("scroll", updateTargetPosition, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateTargetPosition);
      window.removeEventListener("scroll", updateTargetPosition, true);
    };
  }, [updateTargetPosition, currentStepIndex]);

  // Narração por voz
  useEffect(() => {
    if (isVoiceActive && !isPaused) {
      const textToSpeak = step.speechText || step.description;
      voiceNarrator.speak(textToSpeak);
    } else {
      voiceNarrator.stop();
    }
    return () => {
      voiceNarrator.stop();
    };
  }, [currentStepIndex, isVoiceActive, isPaused, step]);

  const handleToggleVoice = () => {
    const nextState = !isVoiceActive;
    setIsVoiceActive(nextState);
    voiceNarrator.setEnabled(nextState);
    if (nextState) {
      voiceNarrator.speak(step.speechText || step.description);
    } else {
      voiceNarrator.stop();
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      voiceNarrator.stop();
      onFinish();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPaused(false);
  };

  // Posição da caixa de diálogo flutuante
  const getDialogStyle = (): React.CSSProperties => {
    if (!targetRect || step.placement === "center") {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      };
    }

    const margin = 18;
    const cardWidth = 380;
    const cardHeight = 260;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = targetRect.bottom + margin;
    let left = targetRect.left + targetRect.width / 2 - cardWidth / 2;

    // Se placement for top ou se não couber embaixo
    if (step.placement === "top" || top + cardHeight > viewportHeight - 20) {
      if (targetRect.top - cardHeight - margin > 20) {
        top = targetRect.top - cardHeight - margin;
      }
    }

    if (step.placement === "left" && targetRect.left - cardWidth - margin > 20) {
      left = targetRect.left - cardWidth - margin;
      top = targetRect.top;
    } else if (
      step.placement === "right" &&
      targetRect.right + cardWidth + margin < viewportWidth - 20
    ) {
      left = targetRect.right + margin;
      top = targetRect.top;
    }

    // Limites de tela
    left = Math.max(16, Math.min(left, viewportWidth - cardWidth - 16));
    top = Math.max(70, Math.min(top, viewportHeight - cardHeight - 16));

    return {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999,
      width: `min(${cardWidth}px, 92vw)`,
    };
  };

  return (
    <div
      className="fixed inset-0 z-[9990] pointer-events-auto transition-opacity duration-300"
      aria-label="Tutorial interativo guiado"
      role="dialog"
    >
      {/* 1. Backdrop escuro com furo/spotlight no elemento focado */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 9991 }}
      >
        <defs>
          <mask id="tutorial-spotlight-mask">
            {/* Fundo branco = opaco */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Buraco preto = transparente onde o elemento estiver */}
            {targetRect && (
              <rect
                x={Math.max(0, targetRect.left - 8)}
                y={Math.max(0, targetRect.top - 8)}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="8"
                ry="8"
                fill="black"
              />
            )}
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(10, 15, 20, 0.76)"
          mask="url(#tutorial-spotlight-mask)"
        />
      </svg>

      {/* 2. Glow / Borda luminosa no elemento focado */}
      {targetRect && (
        <div
          className="fixed pointer-events-none transition-all duration-300 ease-out border-2 border-gold rounded-lg shadow-[0_0_25px_rgba(217,119,6,0.6)] animate-pulse"
          style={{
            zIndex: 9992,
            top: `${targetRect.top - 8}px`,
            left: `${targetRect.left - 8}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`,
          }}
        />
      )}

      {/* 3. Cursor de Mouse Animado */}
      {cursorPos && !isPaused && (
        <div
          className="fixed pointer-events-none transition-all duration-700 ease-out flex items-center gap-1.5"
          style={{
            zIndex: 9998,
            top: `${cursorPos.y}px`,
            left: `${cursorPos.x}px`,
            transform: "translate(-6px, -6px)",
          }}
        >
          <div
            className={`transition-transform duration-200 ${
              showCursorClickAnimation ? "scale-75" : "scale-100"
            }`}
          >
            <MousePointer2 className="w-7 h-7 text-gold fill-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter" />
          </div>
          <span className="bg-night/95 text-gold border border-gold/40 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-bounce">
            Clique aqui
          </span>
        </div>
      )}

      {/* 4. Caixa de Diálogo do Passo (Card Guiado) */}
      <div
        ref={cardRef}
        style={getDialogStyle()}
        className="bg-white border-2 border-gold/70 shadow-2xl rounded-none p-5 text-night flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header do Card */}
        <div className="flex items-center justify-between border-b border-stone/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold font-bold">
              {module.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Toggle Narração de Voz */}
            <button
              onClick={handleToggleVoice}
              className={`p-1.5 rounded transition-colors ${
                isVoiceActive
                  ? "bg-gold/20 text-gold border border-gold/40"
                  : "text-stone-dark hover:text-night hover:bg-stone/20"
              }`}
              title={isVoiceActive ? "Desativar voz" : "Ativar narração de voz"}
              aria-label="Controle de voz"
            >
              {isVoiceActive ? (
                <Volume2 className="w-4 h-4 text-gold" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Pausar / Continuar */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 text-stone-dark hover:text-night hover:bg-stone/20 rounded transition-colors"
              title={isPaused ? "Retomar tutorial" : "Pausar tutorial"}
            >
              {isPaused ? (
                <Play className="w-4 h-4 text-emerald-600" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>

            {/* Fechar */}
            <button
              onClick={() => {
                voiceNarrator.stop();
                onClose();
              }}
              className="p-1.5 text-stone-dark hover:text-red-600 hover:bg-stone/20 rounded transition-colors"
              title="Fechar tutorial"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-stone-dark">
            <span>
              Passo {currentStepIndex + 1} de {module.steps.length}
            </span>
            <span>{progressPercent}% concluído</span>
          </div>
          <div className="w-full bg-stone/30 h-1.5 overflow-hidden">
            <div
              className="bg-gold h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Conteúdo do Passo */}
        <div className="space-y-2 py-1">
          <h3 className="text-base font-serif font-bold text-night leading-snug">
            {step.title}
          </h3>
          <p className="text-xs text-stone-dark leading-relaxed font-sans">
            {step.description}
          </p>

          {/* Dica de Segurança / Modo Simulado */}
          <div className="mt-2.5 flex items-center gap-2 p-2 bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 font-mono">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Ambiente seguro: nenhuma alteração real será salva.</span>
          </div>
        </div>

        {/* Footer / Botões de Navegação */}
        <div className="flex items-center justify-between pt-3 border-t border-stone/30">
          <div className="flex items-center gap-1">
            <button
              onClick={handleRestart}
              className="p-2 text-stone-dark hover:text-night text-xs font-mono flex items-center gap-1"
              title="Recomeçar do passo 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Reiniciar</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 border border-stone-dark/30 hover:bg-stone/20 text-night text-xs font-mono flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-night text-gold hover:bg-gold hover:text-night font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>{isLastStep ? "Concluir" : "Avançar"}</span>
              {isLastStep ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
