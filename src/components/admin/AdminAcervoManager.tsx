"use client";

import React, { useState, useEffect } from "react";
import {
  Camera,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  RefreshCw,
  FileImage,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Star,
  CheckSquare,
  Square,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { MemoriaPhoto } from "@/types/memoria";
import { getPhotoUrl } from "@/lib/memoria";
import {
  processImageBeforeUpload,
  formatBytes,
  ProcessedImageResult,
} from "@/utils/imageProcessor";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface UploadQueueItem {
  id: string;
  originalFile: File;
  fileName: string;
  originalSize: number;
  processedSize?: number;
  dimensions?: { width: number; height: number };
  status: "waiting" | "processing" | "uploading" | "completed" | "error";
  progress: number;
  errorMessage?: string;
  storagePath?: string;
  previewUrl?: string;
  // Metadados
  caption: string;
  photographer: string;
  referenceCode: string;
  isFeatured: boolean;
}

export const AdminAcervoManager: React.FC = () => {
  const [photos, setPhotos] = useState<MemoriaPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [featuringId, setFeaturingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Modal State
  const [photoToDelete, setPhotoToDelete] = useState<MemoriaPhoto | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);

  // Upload Queue State
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [editMode, setEditMode] = useState<"individual" | "general">("individual");
  const [savingMetadata, setSavingMetadata] = useState(false);

  // Global edit fields (Modo Geral)
  const [globalCaption, setGlobalCaption] = useState("");
  const [globalPhotographer, setGlobalPhotographer] = useState("");
  const [globalReferenceCode, setGlobalReferenceCode] = useState("");
  const [globalIsFeatured, setGlobalIsFeatured] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("memoria_photos")
      .select("*")
      .eq("section_type", "acervo")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar fotos do acervo:", error);
    } else {
      setPhotos((data as MemoriaPhoto[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // 1. Início da seleção e processamento de arquivos
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setStatusMessage(null);

    const newItems: UploadQueueItem[] = Array.from(files).map((file, index) => {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      return {
        id: `${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
        originalFile: file,
        fileName: file.name,
        originalSize: file.size,
        status: "waiting",
        progress: 0,
        caption: cleanName,
        photographer: globalPhotographer || "",
        referenceCode: "",
        isFeatured: false,
      };
    });

    setQueue(newItems);
    setIsProcessingQueue(true);

    // Reset input
    e.target.value = "";

    // Processar e enviar itens sequencialmente / independentemente
    const supabase = getSupabase();
    if (!supabase) {
      setStatusMessage({ type: "error", text: "Supabase não conectado." });
      setIsProcessingQueue(false);
      return;
    }

    for (let i = 0; i < newItems.length; i++) {
      const item = newItems[i];

      // A. Atualizar para 'processing'
      updateQueueItem(item.id, {
        status: "processing",
        progress: 25,
      });

      try {
        // Processar no navegador (redimensionar 1080x1920 + WebP 85%)
        const processed: ProcessedImageResult = await processImageBeforeUpload(
          item.originalFile,
          0.85
        );

        updateQueueItem(item.id, {
          status: "uploading",
          progress: 60,
          processedSize: processed.processedSize,
          dimensions: { width: processed.width, height: processed.height },
          previewUrl: processed.previewUrl,
        });

        // B. Upload para o Supabase Storage
        const fileExt = "webp";
        const uniqueStorageName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const storagePath = `acervo/${uniqueStorageName}`;

        const { error: uploadError } = await supabase.storage
          .from("memoria-e-eventos")
          .upload(storagePath, processed.blob, {
            contentType: "image/webp",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Falha no upload para o Storage: ${uploadError.message}`);
        }

        // C. Concluído no Storage
        updateQueueItem(item.id, {
          status: "completed",
          progress: 100,
          storagePath,
        });
      } catch (err: any) {
        updateQueueItem(item.id, {
          status: "error",
          progress: 100,
          errorMessage: err.message || "Erro desconhecido ao processar/enviar imagem.",
        });
      }
    }

    setIsProcessingQueue(false);
  };

  const updateQueueItem = (id: string, updates: Partial<UploadQueueItem>) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // 2. Aplicar dados gerais a todas as imagens da fila (Modo Geral)
  const handleApplyGeneral = () => {
    setQueue((prev) =>
      prev.map((item, index) => ({
        ...item,
        caption: globalCaption ? `${globalCaption} ${index + 1}` : item.caption,
        photographer: globalPhotographer || item.photographer,
        referenceCode: globalReferenceCode
          ? `${globalReferenceCode}-${String(index + 1).padStart(2, "0")}`
          : item.referenceCode,
        isFeatured: globalIsFeatured,
      }))
    );
    setStatusMessage({
      type: "success",
      text: "Metadados gerais aplicados a todas as fotos da fila!",
    });
  };

  // 3. Salvar metadados no Supabase e finalizar fluxo
  const handleSaveAllMetadata = async () => {
    const completedItems = queue.filter((item) => item.status === "completed" && item.storagePath);
    if (completedItems.length === 0) {
      setStatusMessage({
        type: "error",
        text: "Nenhuma imagem foi concluída com sucesso para salvar.",
      });
      return;
    }

    const supabase = getSupabase();
    if (!supabase) return;

    setSavingMetadata(true);
    setStatusMessage(null);

    try {
      const recordsToInsert = completedItems.map((item, index) => ({
        section_type: "acervo",
        storage_path: item.storagePath!,
        caption: item.caption.trim() || item.fileName.replace(/\.[^/.]+$/, ""),
        photographer: item.photographer.trim() || null,
        reference_code: item.referenceCode.trim() || null,
        is_featured: item.isFeatured,
        is_published: true,
        display_order: index,
      }));

      const { error: dbError } = await supabase
        .from("memoria_photos")
        .insert(recordsToInsert);

      if (dbError) throw dbError;

      setStatusMessage({
        type: "success",
        text: `${completedItems.length} fotografia(s) cadastradas no acervo com sucesso!`,
      });

      // Limpar fila e recarregar acervo
      setQueue([]);
      setGlobalCaption("");
      setGlobalPhotographer("");
      setGlobalReferenceCode("");
      setGlobalIsFeatured(false);

      await fetchPhotos();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: `Erro ao registrar fotografias: ${err.message}`,
      });
    } finally {
      setSavingMetadata(false);
    }
  };

  // Cancelar fila
  const handleCancelQueue = () => {
    if (
      window.confirm(
        "Deseja cancelar o cadastro das fotos? As imagens já enviadas que não forem salvas não aparecerão no acervo público."
      )
    ) {
      setQueue([]);
      setStatusMessage(null);
    }
  };

  // Marcar/desmarcar foto como destaque (somente uma por vez)
  const handleToggleFeatured = async (photo: MemoriaPhoto) => {
    const supabase = getSupabase();
    if (!supabase) return;

    // Se já é destaque, remove o destaque
    const newFeaturedState = !photo.is_featured;

    setFeaturingId(photo.id);
    setStatusMessage(null);

    try {
      // 1. Remover destaque de todas as fotos do acervo
      await supabase
        .from("memoria_photos")
        .update({ is_featured: false })
        .eq("section_type", "acervo");

      // 2. Marcar a foto selecionada (se newFeaturedState = true)
      if (newFeaturedState) {
        const { error } = await supabase
          .from("memoria_photos")
          .update({ is_featured: true })
          .eq("id", photo.id);

        if (error) throw error;
      }

      // Atualizar estado local
      setPhotos((prev) =>
        prev.map((p) => ({
          ...p,
          is_featured: newFeaturedState ? p.id === photo.id : false,
        }))
      );

      setStatusMessage({
        type: "success",
        text: newFeaturedState
          ? "Fotografia marcada como destaque do acervo!"
          : "Destaque removido da fotografia.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: `Erro ao atualizar destaque: ${err.message}`,
      });
    } finally {
      setFeaturingId(null);
    }
  };

  // Excluir foto existente do acervo
  const requestDeletePhoto = (photo: MemoriaPhoto) => {
    setPhotoToDelete(photo);
  };

  const confirmDeletePhoto = async () => {
    if (!photoToDelete) return;
    
    const photo = photoToDelete;
    setPhotoToDelete(null);

    const supabase = getSupabase();
    if (!supabase) return;

    setDeletingId(photo.id);
    setStatusMessage(null);

    try {
      const { error: dbError } = await supabase
        .from("memoria_photos")
        .delete()
        .eq("id", photo.id);

      if (dbError) throw dbError;

      if (photo.storage_path) {
        await supabase.storage.from("memoria-e-eventos").remove([photo.storage_path]);
      }

      setStatusMessage({ type: "success", text: "Fotografia removida com sucesso!" });
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      setSelectedPhotoIds((prev) => prev.filter((id) => id !== photo.id));
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: `Erro ao excluir fotografia: ${err.message}`,
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Seleção de múltiplas fotos
  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllPhotos = () => {
    if (selectedPhotoIds.length === photos.length) {
      setSelectedPhotoIds([]);
    } else {
      setSelectedPhotoIds(photos.map((p) => p.id));
    }
  };

  const confirmBulkDeletePhotos = async () => {
    if (selectedPhotoIds.length === 0) return;

    setIsBulkDeleteModalOpen(false);
    setIsDeletingBulk(true);
    setStatusMessage(null);

    const supabase = getSupabase();
    if (!supabase) {
      setIsDeletingBulk(false);
      return;
    }

    try {
      const photosToDeleteList = photos.filter((p) => selectedPhotoIds.includes(p.id));
      const storagePaths = photosToDeleteList
        .map((p) => p.storage_path)
        .filter((path): path is string => !!path);

      // 1. Excluir do banco
      const { error: dbError } = await supabase
        .from("memoria_photos")
        .delete()
        .in("id", selectedPhotoIds);

      if (dbError) throw dbError;

      // 2. Excluir do storage
      if (storagePaths.length > 0) {
        await supabase.storage.from("memoria-e-eventos").remove(storagePaths);
      }

      setStatusMessage({
        type: "success",
        text: `${selectedPhotoIds.length} fotografia(s) excluída(s) com sucesso!`,
      });

      setPhotos((prev) => prev.filter((p) => !selectedPhotoIds.includes(p.id)));
      setSelectedPhotoIds([]);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: `Erro ao excluir fotografias selecionadas: ${err.message}`,
      });
    } finally {
      setIsDeletingBulk(false);
    }
  };

  const isAllUploadsDone =
    queue.length > 0 &&
    !isProcessingQueue &&
    queue.every((item) => item.status === "completed" || item.status === "error");

  const completedCount = queue.filter((i) => i.status === "completed").length;

  return (
    <div className="space-y-10">
      {/* Alerta de Status */}
      {statusMessage && (
        <div
          className={`p-4 text-xs flex items-start gap-2.5 border-l-4 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-600 text-emerald-900"
              : "bg-red-50 border-red-600 text-red-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{statusMessage.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ÁREA DE SELEÇÃO E UPLOAD DE FOTOS                                     */}
      {/* ========================================================================= */}
      {queue.length === 0 && (
        <section className="clay-card p-6 md:p-8 bg-white border border-stone space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-stone/60">
            <Upload className="w-5 h-5 text-gold" />
            <h2 className="font-serif font-bold text-night text-lg sm:text-xl">
              Cadastrar Novas Fotografias no Acervo
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-stone hover:border-gold/80 bg-ivory p-8 text-center transition-colors">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-12 h-12 bg-white border border-stone mx-auto flex items-center justify-center text-gold">
                  <FileImage className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-night">
                    Selecione uma ou múltiplas fotografias
                  </p>
                  <p className="text-xs text-stone-dark font-mono">
                    Redimensionamento automático até 1080×1920 px e compressão WebP antes do envio.
                  </p>
                </div>

                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-night text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-night transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Escolher Imagens</span>
                </label>

                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFilesSelected}
                  className="hidden"
                />
              </div>
            </div>

            <p className="text-[11px] text-stone-dark font-mono text-center">
              Formatos suportados: JPG, PNG, WEBP, AVIF. As imagens são otimizadas no navegador sem distorção.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTA COMPACTA DE STATUS INDIVIDUAL DE UPLOAD                          */}
      {/* ========================================================================= */}
      {queue.length > 0 && (
        <section className="clay-card p-6 md:p-8 bg-white border border-stone space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone/60">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-gold" />
                <h2 className="font-serif font-bold text-night text-lg sm:text-xl">
                  Processamento e Envio das Fotografias
                </h2>
              </div>
              <p className="text-xs text-stone-dark font-mono">
                {isProcessingQueue
                  ? "Otimizando imagens e enviando para o repositório..."
                  : `Processamento concluído: ${completedCount} de ${queue.length} fotos prontas.`}
              </p>
            </div>

            {!isProcessingQueue && (
              <button
                onClick={handleCancelQueue}
                className="inline-flex items-center gap-1.5 text-xs text-stone-dark hover:text-red-700 font-mono"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancelar envio</span>
              </button>
            )}
          </div>

          {/* Lista Compacta de Itens */}
          <div className="divide-y divide-stone/50 border border-stone bg-ivory/40">
            {queue.map((item) => (
              <div key={item.id} className="p-3.5 sm:p-4 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Nome e Tamanho */}
                  <div className="flex items-center gap-3 min-w-0">
                    <FileImage className="w-4 h-4 text-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-semibold text-night truncate">
                        {item.fileName}
                      </p>
                      <p className="text-[10px] text-stone-dark font-mono">
                        Original: {formatBytes(item.originalSize)}
                        {item.processedSize && (
                          <span className="text-emerald-700 font-medium">
                            {" → "}WebP: {formatBytes(item.processedSize)}
                            {item.dimensions && ` (${item.dimensions.width}×${item.dimensions.height}px)`}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 text-right">
                    {item.status === "waiting" && (
                      <span className="text-[11px] font-mono text-stone-dark">
                        Aguardando...
                      </span>
                    )}
                    {item.status === "processing" && (
                      <span className="text-[11px] font-mono text-gold flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Otimizando WebP...</span>
                      </span>
                    )}
                    {item.status === "uploading" && (
                      <span className="text-[11px] font-mono text-blue-deep flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Enviando ({item.progress}%)...</span>
                      </span>
                    )}
                    {item.status === "completed" && (
                      <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Concluído ✓</span>
                      </span>
                    )}
                    {item.status === "error" && (
                      <span className="text-[11px] font-mono text-red-600 font-bold flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        <span>Erro no envio</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Barra de Progresso Individual */}
                <div className="w-full bg-stone-300 h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      item.status === "error"
                        ? "bg-red-600"
                        : item.status === "completed"
                        ? "bg-emerald-600"
                        : "bg-gold"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                {/* Mensagem de Erro Específica */}
                {item.errorMessage && (
                  <p className="text-[10px] font-mono text-red-600">
                    {item.errorMessage}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* 3. EDIÇÃO DE METADADOS (LIBERADA APÓS O TÉRMINO DOS UPLOADS)               */}
          {/* ========================================================================= */}
          {isAllUploadsDone && completedCount > 0 && (
            <div className="space-y-6 pt-4 border-t border-stone/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-night text-base sm:text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Edição de Metadados das Fotografias</span>
                  </h3>
                  <p className="text-xs text-stone-dark font-mono">
                    Escolha entre preenchimento individual para cada foto ou preenchimento geral.
                  </p>
                </div>

                {/* Seletor de Modo */}
                <div className="flex items-center bg-ivory border border-stone p-1">
                  <button
                    type="button"
                    onClick={() => setEditMode("individual")}
                    className={`px-3 py-1.5 text-xs font-mono font-semibold transition-colors ${
                      editMode === "individual"
                        ? "bg-night text-gold"
                        : "text-stone-dark hover:text-night"
                    }`}
                  >
                    Modo Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode("general")}
                    className={`px-3 py-1.5 text-xs font-mono font-semibold transition-colors ${
                      editMode === "general"
                        ? "bg-night text-gold"
                        : "text-stone-dark hover:text-night"
                    }`}
                  >
                    Modo Geral (Aplicar a todas)
                  </button>
                </div>
              </div>

              {/* A. MODO GERAL */}
              {editMode === "general" && (
                <div className="p-5 bg-ivory border border-stone space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-night">
                    <SlidersHorizontal className="w-4 h-4 text-gold" />
                    <span>Preencher Dados para Todas as Fotos</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono font-semibold text-night">
                        Legenda Base
                      </label>
                      <input
                        type="text"
                        value={globalCaption}
                        onChange={(e) => setGlobalCaption(e.target.value)}
                        placeholder="Ex: Acervo Fotográfico Histórico"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone focus:border-gold focus:outline-none text-night"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono font-semibold text-night">
                        Código de Referência Base
                      </label>
                      <input
                        type="text"
                        value={globalReferenceCode}
                        onChange={(e) => setGlobalReferenceCode(e.target.value)}
                        placeholder="Ex: ACERVO-2026"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone focus:border-gold focus:outline-none text-night"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono font-semibold text-night">
                        Crédito Fotográfico
                      </label>
                      <input
                        type="text"
                        value={globalPhotographer}
                        onChange={(e) => setGlobalPhotographer(e.target.value)}
                        placeholder="Ex: Acervo SIMOP"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone focus:border-gold focus:outline-none text-night"
                      />
                    </div>

                    <div className="md:col-span-3 flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="global-featured"
                        checked={globalIsFeatured}
                        onChange={(e) => setGlobalIsFeatured(e.target.checked)}
                        className="w-4 h-4 text-gold border-stone rounded-none focus:ring-gold"
                      />
                      <label
                        htmlFor="global-featured"
                        className="text-xs font-mono font-medium text-night cursor-pointer"
                      >
                        Marcar como fotos em destaque
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleApplyGeneral}
                      className="px-4 py-2 bg-stone-dark text-ivory text-xs uppercase tracking-wider font-mono hover:bg-gold hover:text-night transition-colors"
                    >
                      Aplicar a Todas
                    </button>
                  </div>
                </div>
              )}

              {/* B. MODO INDIVIDUAL (Cards de Edição) */}
              <div className="space-y-4">
                <p className="text-xs font-mono font-semibold text-night">
                  Revisão dos Metadados das Fotos ({completedCount}):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {queue
                    .filter((item) => item.status === "completed")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white border border-stone flex flex-col sm:flex-row gap-4"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full sm:w-28 h-28 bg-stone-200 shrink-0 overflow-hidden border border-stone">
                          {item.previewUrl && (
                            <img
                              src={item.previewUrl}
                              alt={item.fileName}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-night/90 text-gold text-[9px] font-mono">
                            WebP
                          </span>
                        </div>

                        {/* Campos Individuais */}
                        <div className="flex-1 space-y-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-dark">
                              Legenda / Descrição
                            </label>
                            <input
                              type="text"
                              value={item.caption}
                              onChange={(e) =>
                                updateQueueItem(item.id, { caption: e.target.value })
                              }
                              placeholder="Legenda da fotografia"
                              className="w-full px-2.5 py-1.5 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-dark">
                                Ref. (opcional)
                              </label>
                              <input
                                type="text"
                                value={item.referenceCode}
                                onChange={(e) =>
                                  updateQueueItem(item.id, { referenceCode: e.target.value })
                                }
                                placeholder="Ref. 01"
                                className="w-full px-2.5 py-1.5 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-dark">
                                Crédito
                              </label>
                              <input
                                type="text"
                                value={item.photographer}
                                onChange={(e) =>
                                  updateQueueItem(item.id, { photographer: e.target.value })
                                }
                                placeholder="Fotógrafo"
                                className="w-full px-2.5 py-1.5 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`featured-${item.id}`}
                              checked={item.isFeatured}
                              onChange={(e) =>
                                updateQueueItem(item.id, { isFeatured: e.target.checked })
                              }
                              className="w-3.5 h-3.5 text-gold border-stone rounded-none focus:ring-gold"
                            />
                            <label
                              htmlFor={`featured-${item.id}`}
                              className="text-[11px] font-mono text-night cursor-pointer"
                            >
                              Foto em Destaque
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Botão Final: Salvar e Publicar */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelQueue}
                  disabled={savingMetadata}
                  className="px-5 py-3 bg-ivory border border-stone text-xs font-mono uppercase hover:border-gold transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSaveAllMetadata}
                  disabled={savingMetadata || completedCount === 0}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-night text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-night transition-colors disabled:opacity-50"
                >
                  {savingMetadata ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Salvando no Repositório...</span>
                    </>
                  ) : (
                    <>
                      <span>Salvar e Publicar no Acervo ({completedCount})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTAGEM E GERENCIAMENTO DAS FOTOS DO ACERVO                           */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone/60 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-gold" />
            <h2 className="font-serif font-bold text-night text-lg sm:text-xl">
              Fotografias Cadastradas no Acervo ({photos.length})
            </h2>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {photos.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={toggleSelectAllPhotos}
                  disabled={loading || isDeletingBulk}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory border border-stone text-xs font-mono text-night hover:border-gold transition-colors"
                >
                  {selectedPhotoIds.length === photos.length && photos.length > 0 ? (
                    <>
                      <CheckSquare className="w-3.5 h-3.5 text-gold" />
                      <span>Desmarcar Todas</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-3.5 h-3.5 text-stone-dark" />
                      <span>Selecionar Todas</span>
                    </>
                  )}
                </button>

                {selectedPhotoIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsBulkDeleteModalOpen(true)}
                    disabled={isDeletingBulk}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isDeletingBulk ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>Excluir Selecionadas ({selectedPhotoIds.length})</span>
                  </button>
                )}
              </>
            )}

            <button
              onClick={fetchPhotos}
              disabled={loading || isDeletingBulk}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory border border-stone text-xs font-mono hover:border-gold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="clay-card p-12 text-center bg-white border border-stone text-stone-dark text-xs font-mono">
            Carregando fotografias do acervo...
          </div>
        ) : photos.length === 0 ? (
          <div className="clay-card p-12 text-center bg-white border border-stone space-y-2">
            <p className="font-serif font-bold text-night text-base">
              Nenhuma fotografia encontrada no acervo.
            </p>
            <p className="text-xs text-stone-dark">
              Utilize o formulário acima para cadastrar a primeira fotografia.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => {
              const url = getPhotoUrl(photo.storage_path);
              const isDeleting = deletingId === photo.id;
              const isFeaturing = featuringId === photo.id;
              const isSelected = selectedPhotoIds.includes(photo.id);

              return (
                <div
                  key={photo.id}
                  className={`clay-card bg-white border overflow-hidden flex flex-col justify-between group transition-all duration-150 ${
                    isSelected ? "ring-2 ring-gold border-gold bg-gold/5" : "border-stone"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-200 overflow-hidden">
                    <img
                      src={url}
                      alt={photo.caption || "Foto do acervo"}
                      className="w-full h-full object-cover"
                    />

                    {/* Checkbox de Seleção */}
                    <button
                      type="button"
                      onClick={() => toggleSelectPhoto(photo.id)}
                      title={isSelected ? "Desmarcar foto" : "Selecionar foto"}
                      className={`absolute top-2 left-2 z-10 p-1 transition-all rounded-none border shadow-sm ${
                        isSelected
                          ? "bg-gold border-gold text-night"
                          : "bg-night/70 border-white/30 text-white/80 hover:bg-night hover:text-white"
                      }`}
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-night" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    {/* Botão de estrela — destaque */}
                    <button
                      onClick={() => handleToggleFeatured(photo)}
                      disabled={isFeaturing || !!featuringId || isDeletingBulk}
                      title={photo.is_featured ? "Remover destaque" : "Marcar como destaque"}
                      className={`absolute top-2 right-2 p-1.5 border transition-all duration-200 disabled:opacity-60 ${
                        photo.is_featured
                          ? "bg-gold border-gold/80 text-night shadow-sm"
                          : "bg-night/70 border-white/20 text-white/60 hover:bg-gold/90 hover:text-night hover:border-gold"
                      }`}
                    >
                      {isFeaturing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Star
                          className="w-3.5 h-3.5"
                          fill={photo.is_featured ? "currentColor" : "none"}
                        />
                      )}
                    </button>

                    {photo.is_featured && (
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-gold text-night text-[9px] font-bold uppercase tracking-wider font-mono shadow-sm">
                        Destaque
                      </span>
                    )}
                  </div>

                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-night line-clamp-2">
                        {photo.caption || "Sem legenda"}
                      </p>
                      {photo.reference_code && (
                        <p className="text-[10px] text-gold font-mono">
                          {photo.reference_code}
                        </p>
                      )}
                      {photo.photographer && (
                        <p className="text-[10px] text-stone-dark">
                          Foto: {photo.photographer}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-stone/50 flex justify-end">
                      <button
                        onClick={() => requestDeletePhoto(photo)}
                        disabled={isDeleting || isDeletingBulk}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-red-600 hover:text-red-800 hover:underline disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={photoToDelete !== null}
        title="Excluir Fotografia"
        message={`Tem certeza que deseja excluir a fotografia "${photoToDelete?.caption || 'sem legenda'}" do acervo? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        onConfirm={confirmDeletePhoto}
        onCancel={() => setPhotoToDelete(null)}
      />

      <ConfirmDialog
        isOpen={isBulkDeleteModalOpen}
        title="Excluir Fotografias Selecionadas"
        message={`Tem certeza que deseja excluir as ${selectedPhotoIds.length} fotografias selecionadas do acervo? Esta ação não pode ser desfeita e removerá os arquivos permanentemente.`}
        confirmText={`Excluir ${selectedPhotoIds.length} Fotos`}
        onConfirm={confirmBulkDeletePhotos}
        onCancel={() => setIsBulkDeleteModalOpen(false)}
      />
    </div>
  );
};
