export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string; // CSS selector or data-tutorial-target
  placement?: "top" | "bottom" | "left" | "right" | "center";
  targetTab?: "acervo" | "semana" | "primavera" | "tutoriais";
  actionType?: "click" | "input" | "observe" | "navigate";
  actionText?: string; // ex: "Clique aqui para avançar"
  simulatedValue?: string; // Para demonstrar preenchimento seguro de campo
  speechText?: string; // Texto a ser narrado por voz (se omitido usa description)
}

export interface TutorialModule {
  id: string;
  title: string;
  badge: string;
  description: string;
  estimatedMinutes: number;
  iconName: "Shield" | "Camera" | "Calendar" | "Sparkles" | "FileText" | "Layers";
  stepsCount: number;
  steps: TutorialStep[];
}

export interface TutorialProgressState {
  completedModules: string[];
  lastCompletedAt?: Record<string, string>;
}
