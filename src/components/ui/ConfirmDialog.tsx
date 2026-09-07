import React from "react";
import { AlertCircle, Trash2 } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isDestructive = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/80 backdrop-blur-sm">
      <div className="bg-white border border-stone shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div
              className={`shrink-0 p-3 flex items-center justify-center ${
                isDestructive ? "bg-red-100 text-red-600" : "bg-gold/20 text-gold"
              }`}
            >
              {isDestructive ? (
                <Trash2 className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-night text-xl tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-stone-dark leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-ivory/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-stone/50">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-mono font-semibold text-stone-dark uppercase hover:bg-stone-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-colors shadow-sm ${
              isDestructive
                ? "bg-red-600 text-white hover:bg-red-700 border border-red-700"
                : "bg-night text-ivory hover:bg-gold hover:text-night border border-night"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
