"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Save,
  RefreshCw,
  Camera,
  FileImage,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { MemoriaEventEdition, MemoriaEventType, MemoriaPhoto } from "@/types/memoria";
import { getPhotoUrl } from "@/lib/memoria";
import {
  processImageBeforeUpload,
  formatBytes,
  ProcessedImageResult,
} from "@/utils/imageProcessor";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AdminEventManagerProps {
  eventType: MemoriaEventType;
  title: string;
}

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
  // Metadados editáveis
  caption: string;
  photographer: string;
  referenceCode: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AdminEventManager: React.FC<AdminEventManagerProps> = ({
  eventType,
  title,
}) => {
  // --- Edition state ---
  const [editions, setEditions] = useState<MemoriaEventEdition[]>([]);
  const [selectedEditionId, setSelectedEditionId] = useState<string | "new">("new");
  const [loadingEditions, setLoadingEditions] = useState(true);

  // --- Photos state ---
  const [photos, setPhotos] = useState<MemoriaPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  // --- Upload Queue state ---
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [editMode, setEditMode] = useState<"individual" | "general">("individual");
  const [savingMetadata, setSavingMetadata] = useState(false);

  // Global edit fields (Modo Geral)
  const [globalCaption, setGlobalCaption] = useState("");
  const [globalPhotographer, setGlobalPhotographer] = useState("");
  const [globalReferenceCode, setGlobalReferenceCode] = useState("");

  // --- Edition form fields ---
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [editionNumber, setEditionNumber] = useState<string>("");
  const [editionTitle, setEditionTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalDriveUrl, setExternalDriveUrl] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [savingEdition, setSavingEdition] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Modal State
  const [photoToDelete, setPhotoToDelete] = useState<MemoriaPhoto | null>(null);
  const [editionToDelete, setEditionToDelete] = useState<MemoriaEventEdition | null>(null);
  const [isDeletingEdition, setIsDeletingEdition] = useState(false);

  // ---------------------------------------------------------------------------
  // Edition fetch / select
  // ---------------------------------------------------------------------------

  const fetchEditions = async () => {
    setLoadingEditions(true);
    const supabase = getSupabase();
    if (!supabase) { setLoadingEditions(false); return; }

    const { data, error } = await supabase
      .from("memoria_event_editions")
      .select("*")
      .eq("event_type", eventType)
      .order("year", { ascending: false });

    if (!error) {
      const list = (data as MemoriaEventEdition[]) || [];
      setEditions(list);
      if (list.length > 0 && selectedEditionId === "new") {
        selectEdition(list[0]);
      }
    }
    setLoadingEditions(false);
  };

  const fetchPhotos = async (editionId: string) => {
    setLoadingPhotos(true);
    const supabase = getSupabase();
    if (!supabase) { setLoadingPhotos(false); return; }

    const { data, error } = await supabase
      .from("memoria_photos")
      .select("*")
      .eq("edition_id", editionId)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error) setPhotos((data as MemoriaPhoto[]) || []);
    setLoadingPhotos(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchEditions(); }, [eventType]);

  const selectEdition = (edition: MemoriaEventEdition) => {
    setSelectedEditionId(edition.id);
    setYear(edition.year);
    setEditionNumber(edition.edition_number ? String(edition.edition_number) : "");
    setEditionTitle(edition.title || "");
    setSubtitle(edition.subtitle || "");
    setDescription(edition.description || "");
    setExternalDriveUrl(edition.external_drive_url || "");
    setIsCurrent(Boolean(edition.is_current));
    setIsPublished(edition.is_published);
    setQueue([]);
    fetchPhotos(edition.id);
  };

  const handleNewEditionClick = () => {
    setSelectedEditionId("new");
    setYear(new Date().getFullYear());
    setEditionNumber("");
    setEditionTitle("");
    setSubtitle("");
    setDescription("");
    setExternalDriveUrl("");
    setIsCurrent(false);
    setIsPublished(true);
    setPhotos([]);
    setQueue([]);
  };

  // ---------------------------------------------------------------------------
  // Save edition
  // ---------------------------------------------------------------------------

  const handleSaveEdition = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEdition(true);
    setStatusMessage(null);

    const supabase = getSupabase();
    if (!supabase) {
      setStatusMessage({ type: "error", text: "Supabase não conectado." });
      setSavingEdition(false);
      return;
    }

    try {
      if (isCurrent) {
        await supabase
          .from("memoria_event_editions")
          .update({ is_current: false })
          .eq("event_type", eventType);
      }

      const payload = {
        event_type: eventType,
        year: Number(year),
        edition_number: editionNumber ? Number(editionNumber) : null,
        title: editionTitle.trim() || null,
        subtitle: subtitle.trim() || null,
        description: description.trim() || null,
        external_drive_url: externalDriveUrl.trim() || null,
        is_current: isCurrent,
        is_published: isPublished,
      };

      if (selectedEditionId === "new") {
        const { data, error } = await supabase
          .from("memoria_event_editions")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        setStatusMessage({ type: "success", text: "Nova edição cadastrada com sucesso!" });
        await fetchEditions();
        if (data) selectEdition(data as MemoriaEventEdition);
      } else {
        const { error } = await supabase
          .from("memoria_event_editions")
          .update(payload)
          .eq("id", selectedEditionId);

        if (error) throw error;
        setStatusMessage({ type: "success", text: "Edição atualizada com sucesso!" });
        await fetchEditions();
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: `Erro ao salvar edição: ${err.message}` });
    } finally {
      setSavingEdition(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Upload queue helpers
  // ---------------------------------------------------------------------------

  const updateQueueItem = (id: string, updates: Partial<UploadQueueItem>) => {
    setQueue((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedEditionId === "new") {
      setStatusMessage({ type: "error", text: "Salve a edição primeiro antes de enviar fotografias." });
      return;
    }

    const files = e.target.files;
    if (!files || files.length === 0) return;

    setStatusMessage(null);

    const newItems: UploadQueueItem[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
      originalFile: file,
      fileName: file.name,
      originalSize: file.size,
      status: "waiting",
      progress: 0,
      caption: file.name.replace(/\.[^/.]+$/, ""),
      photographer: globalPhotographer || "",
      referenceCode: "",
    }));

    setQueue(newItems);
    setIsProcessingQueue(true);
    e.target.value = "";

    const supabase = getSupabase();
    if (!supabase) {
      setStatusMessage({ type: "error", text: "Supabase não conectado." });
      setIsProcessingQueue(false);
      return;
    }

    const folder = eventType === "semana_de_museus" ? "semana-de-museus" : "primavera-de-museus";

    for (let i = 0; i < newItems.length; i++) {
      const item = newItems[i];

      updateQueueItem(item.id, { status: "processing", progress: 25 });

      try {
        const processed: ProcessedImageResult = await processImageBeforeUpload(item.originalFile, 0.85);

        updateQueueItem(item.id, {
          status: "uploading",
          progress: 60,
          processedSize: processed.processedSize,
          dimensions: { width: processed.width, height: processed.height },
          previewUrl: processed.previewUrl,
        });

        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
        const storagePath = `${folder}/${year}/${uniqueName}`;

        const { error: uploadError } = await supabase.storage
          .from("memoria-e-eventos")
          .upload(storagePath, processed.blob, { contentType: "image/webp", upsert: false });

        if (uploadError) throw new Error(`Falha no upload para o Storage: ${uploadError.message}`);

        updateQueueItem(item.id, { status: "completed", progress: 100, storagePath });
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

  // --- Modo Geral: aplicar a todas ---
  const handleApplyGeneral = () => {
    setQueue((prev) =>
      prev.map((item, index) => ({
        ...item,
        caption: globalCaption ? `${globalCaption} ${index + 1}` : item.caption,
        photographer: globalPhotographer || item.photographer,
        referenceCode: globalReferenceCode
          ? `${globalReferenceCode}-${String(index + 1).padStart(2, "0")}`
          : item.referenceCode,
      }))
    );
    setStatusMessage({ type: "success", text: "Metadados gerais aplicados a todas as fotos da fila!" });
  };

  // --- Salvar metadados no banco ---
  const handleSaveAllMetadata = async () => {
    const completedItems = queue.filter((item) => item.status === "completed" && item.storagePath);
    if (completedItems.length === 0) {
      setStatusMessage({ type: "error", text: "Nenhuma imagem foi concluída com sucesso para salvar." });
      return;
    }

    const supabase = getSupabase();
    if (!supabase) return;

    setSavingMetadata(true);
    setStatusMessage(null);

    try {
      const recordsToInsert = completedItems.map((item, index) => ({
        section_type: eventType,
        edition_id: selectedEditionId,
        storage_path: item.storagePath!,
        caption: item.caption.trim() || item.fileName.replace(/\.[^/.]+$/, ""),
        photographer: item.photographer.trim() || null,
        reference_code: item.referenceCode.trim() || null,
        is_featured: false,
        is_published: true,
        display_order: photos.length + index,
      }));

      const { error: dbError } = await supabase.from("memoria_photos").insert(recordsToInsert);
      if (dbError) throw dbError;

      setStatusMessage({
        type: "success",
        text: `${completedItems.length} fotografia(s) adicionadas à edição com sucesso!`,
      });

      setQueue([]);
      setGlobalCaption("");
      setGlobalPhotographer("");
      setGlobalReferenceCode("");

      await fetchPhotos(selectedEditionId);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: `Erro ao registrar fotografias: ${err.message}` });
    } finally {
      setSavingMetadata(false);
    }
  };

  const handleCancelQueue = () => {
    if (window.confirm("Deseja cancelar o cadastro das fotos? As imagens já enviadas que não forem salvas não aparecerão na galeria pública.")) {
      setQueue([]);
      setStatusMessage(null);
    }
  };

  // --- Delete photo ---
  const requestDeletePhoto = (photo: MemoriaPhoto) => {
    setPhotoToDelete(photo);
  };

  const confirmDeletePhoto = async () => {
    if (!photoToDelete) return;

    const photo = photoToDelete;
    setPhotoToDelete(null);

    const supabase = getSupabase();
    if (!supabase) return;

    setDeletingPhotoId(photo.id);
    try {
      await supabase.from("memoria_photos").delete().eq("id", photo.id);
      if (photo.storage_path) {
        await supabase.storage.from("memoria-e-eventos").remove([photo.storage_path]);
      }
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      setStatusMessage({ type: "success", text: "Foto excluída com sucesso!" });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: `Erro ao excluir: ${err.message}` });
    } finally {
      setDeletingPhotoId(null);
    }
  };

  // --- Delete Edition ---
  const requestDeleteEdition = () => {
    const ed = editions.find(e => e.id === selectedEditionId);
    if (ed) setEditionToDelete(ed);
  };

  const confirmDeleteEdition = async () => {
    if (!editionToDelete) return;
    
    const edition = editionToDelete;
    setEditionToDelete(null);
    setIsDeletingEdition(true);
    setStatusMessage(null);

    const supabase = getSupabase();
    if (!supabase) return;

    try {
      // Deleta primeiro todas as fotos vinculadas do Storage
      const { data: editionPhotos } = await supabase
        .from("memoria_photos")
        .select("storage_path")
        .eq("edition_id", edition.id);

      if (editionPhotos && editionPhotos.length > 0) {
        const paths = editionPhotos.map(p => p.storage_path).filter(Boolean);
        if (paths.length > 0) {
          await supabase.storage.from("memoria-e-eventos").remove(paths);
        }
      }

      // Deleta a edição (On Delete Cascade deve excluir as fotos do banco automaticamente, 
      // ou se não tiver FK Cascade configurada, deletamos as fotos primeiro, 
      // mas como é Supabase com ON DELETE CASCADE geralmente, o delete na tabela pai resolve o banco)
      const { error } = await supabase
        .from("memoria_event_editions")
        .delete()
        .eq("id", edition.id);

      if (error) throw error;

      setStatusMessage({ type: "success", text: "Edição e todas as suas fotos foram excluídas com sucesso!" });
      handleNewEditionClick(); // Reseta o form
      await fetchEditions(); // Recarrega as edições
    } catch (err: any) {
      setStatusMessage({ type: "error", text: `Erro ao excluir edição: ${err.message}` });
    } finally {
      setIsDeletingEdition(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Derived
  // ---------------------------------------------------------------------------

  const isAllUploadsDone =
    queue.length > 0 &&
    !isProcessingQueue &&
    queue.every((item) => item.status === "completed" || item.status === "error");

  const completedCount = queue.filter((i) => i.status === "completed").length;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

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

      {/* ===================================================================== */}
      {/* 1. Barra de Seleção de Edições                                        */}
      {/* ===================================================================== */}
      <section className="clay-card p-6 bg-white border border-stone space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-night text-lg sm:text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span>Gerenciar Edições: {title}</span>
            </h2>
            <p className="text-xs text-stone-dark font-mono">
              Selecione uma edição para editar textos e fotos ou adicione uma nova.
            </p>
          </div>

          <button
            onClick={handleNewEditionClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-night text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-night transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Nova Edição</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-stone/50">
          {loadingEditions ? (
            <span className="text-xs text-stone-dark font-mono">Carregando edições...</span>
          ) : editions.length === 0 ? (
            <span className="text-xs text-stone-dark font-mono">Nenhuma edição cadastrada.</span>
          ) : (
            editions.map((ed) => {
              const isSelected = selectedEditionId === ed.id;
              return (
                <button
                  key={ed.id}
                  onClick={() => selectEdition(ed)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-night text-gold border border-gold"
                      : "bg-ivory text-blue-deep border border-stone hover:border-gold/60"
                  }`}
                >
                  <span>{ed.year}</span>
                  {ed.edition_number && (
                    <span className="text-[10px] opacity-75">({ed.edition_number}ª)</span>
                  )}
                  {ed.is_current && (
                    <span className="text-[9px] px-1 bg-gold text-night font-bold uppercase">
                      Atual
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. Formulário de Edição de Textos e Metadados                         */}
      {/* ===================================================================== */}
      <section className="clay-card p-6 md:p-8 bg-white border border-stone space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone/60">
          <h3 className="font-serif font-bold text-night text-base sm:text-lg">
            {selectedEditionId === "new"
              ? "Cadastrar Nova Edição"
              : `Editar Edição: ${year} ${editionNumber ? `(${editionNumber}ª Edição)` : ""}`}
          </h3>

          {selectedEditionId !== "new" && isCurrent && (
            <span className="px-2.5 py-1 bg-gold/15 border border-gold/40 text-gold text-xs font-bold font-mono uppercase">
              ⭐ Edição Ativa Principal
            </span>
          )}
        </div>

        <form onSubmit={handleSaveEdition} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ano */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-night">
                Ano da Edição *
              </label>
              <input
                type="number"
                required
                min={1900}
                max={2100}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night font-mono"
              />
            </div>

            {/* Número da Edição */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-night">
                Número da Edição (opcional)
              </label>
              <input
                type="number"
                min={1}
                value={editionNumber}
                onChange={(e) => setEditionNumber(e.target.value)}
                placeholder="Ex: 22 (para 22ª Edição)"
                className="w-full px-3.5 py-2 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night font-mono"
              />
            </div>

            {/* Link Externo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-night">
                Link do Google Drive (Acervo Completo)
              </label>
              <input
                type="url"
                value={externalDriveUrl}
                onChange={(e) => setExternalDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full px-3.5 py-2 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night font-mono"
              />
            </div>

            {/* Tema / Título */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-night">
                Tema / Lema da Edição
              </label>
              <input
                type="text"
                value={editionTitle}
                onChange={(e) => setEditionTitle(e.target.value)}
                placeholder="Ex: Museus, Sustentabilidade e Bem-estar"
                className="w-full px-3.5 py-2 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night"
              />
            </div>

            {/* Subtítulo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-night">
                Subtítulo / Resumo Curto
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Programação integrada em Ouro Preto"
                className="w-full px-3.5 py-2 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night"
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-night">
                Texto de Apresentação / Histórico da Edição
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Insira o texto institucional descritivo com a história, programação e reflexão sobre a edição..."
                className="w-full p-3 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night leading-relaxed font-sans"
              />
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-3 flex flex-wrap items-center gap-8 pt-2">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="is-current"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="w-4 h-4 text-gold border-stone rounded-none focus:ring-gold"
                />
                <label htmlFor="is-current" className="text-xs font-mono font-medium text-night cursor-pointer">
                  Definir como Edição Atual Principal (exibida por padrão na rota principal)
                </label>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="is-published"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-gold border-stone rounded-none focus:ring-gold"
                />
                <label htmlFor="is-published" className="text-xs font-mono font-medium text-night cursor-pointer">
                  Publicar edição no portal público
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            {selectedEditionId !== "new" && (
              <button
                type="button"
                onClick={requestDeleteEdition}
                disabled={savingEdition || isDeletingEdition}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-red-200 text-red-600 text-xs uppercase tracking-widest font-semibold hover:bg-red-50 hover:border-red-600 transition-colors disabled:opacity-50"
              >
                {isDeletingEdition ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Excluindo...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Excluir Edição</span>
                  </>
                )}
              </button>
            )}

            <button
              type="submit"
              disabled={savingEdition || isDeletingEdition}
              className="inline-flex items-center gap-2 px-6 py-3 bg-night text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-night transition-colors disabled:opacity-50"
            >
              {savingEdition ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Dados da Edição</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* ===================================================================== */}
      {/* 3. Gerenciamento de Fotos                                             */}
      {/* ===================================================================== */}
      {selectedEditionId !== "new" && (
        <section className="space-y-6">

          {/* ----------------------------------------------------------------- */}
          {/* 3A. ÁREA DE SELEÇÃO E UPLOAD (exibida quando a fila está vazia)   */}
          {/* ----------------------------------------------------------------- */}
          {queue.length === 0 && (
            <div className="clay-card p-6 md:p-8 bg-white border border-stone space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-stone/60">
                <Upload className="w-5 h-5 text-gold" />
                <h3 className="font-serif font-bold text-night text-lg sm:text-xl">
                  Adicionar Fotografias à Edição {year}
                </h3>
              </div>

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
                    htmlFor={`event-photo-upload-${eventType}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-night text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-night transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Escolher Imagens</span>
                  </label>

                  <input
                    id={`event-photo-upload-${eventType}`}
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
          )}

          {/* ----------------------------------------------------------------- */}
          {/* 3B. LISTA COMPACTA DE STATUS + EDIÇÃO DE METADADOS                */}
          {/* ----------------------------------------------------------------- */}
          {queue.length > 0 && (
            <div className="clay-card p-6 md:p-8 bg-white border border-stone space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-gold" />
                    <h3 className="font-serif font-bold text-night text-lg sm:text-xl">
                      Processamento e Envio das Fotografias
                    </h3>
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

              {/* Lista Compacta */}
              <div className="divide-y divide-stone/50 border border-stone bg-ivory/40">
                {queue.map((item) => (
                  <div key={item.id} className="p-3.5 sm:p-4 space-y-2">
                    <div className="flex items-center justify-between gap-4">
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

                      <div className="shrink-0 text-right">
                        {item.status === "waiting" && (
                          <span className="text-[11px] font-mono text-stone-dark">Aguardando...</span>
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

                    {/* Barra de Progresso */}
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

                    {item.errorMessage && (
                      <p className="text-[10px] font-mono text-red-600">{item.errorMessage}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Edição de Metadados (liberada após uploads) */}
              {isAllUploadsDone && completedCount > 0 && (
                <div className="space-y-6 pt-4 border-t border-stone/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-night text-base sm:text-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span>Edição de Metadados das Fotografias</span>
                      </h4>
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

                  {/* MODO GERAL */}
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
                            placeholder="Ex: Semana de Museus 2025"
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
                            placeholder="Ex: SM-2025"
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
                            placeholder="Ex: Assessoria SIMOP"
                            className="w-full px-3 py-2 text-xs bg-white border border-stone focus:border-gold focus:outline-none text-night"
                          />
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

                  {/* MODO INDIVIDUAL */}
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

                            {/* Campos */}
                            <div className="flex-1 space-y-3">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-dark">
                                  Legenda / Descrição
                                </label>
                                <input
                                  type="text"
                                  value={item.caption}
                                  onChange={(e) => updateQueueItem(item.id, { caption: e.target.value })}
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
                                    onChange={(e) => updateQueueItem(item.id, { referenceCode: e.target.value })}
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
                                    onChange={(e) => updateQueueItem(item.id, { photographer: e.target.value })}
                                    placeholder="Fotógrafo"
                                    className="w-full px-2.5 py-1.5 text-xs bg-ivory border border-stone focus:border-gold focus:outline-none text-night"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Botão Final */}
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
                          <span>Salvar e Publicar na Edição ({completedCount})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* 3C. GRID DE FOTOS EXISTENTES DA EDIÇÃO                            */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone/60 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold" />
                <h3 className="font-serif font-bold text-night text-base sm:text-lg">
                  Fotografias da Edição {year} ({photos.length})
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-dark font-mono hidden sm:block">
                  As 6 primeiras fotos são exibidas na galeria pública.
                </span>
                <button
                  onClick={() => fetchPhotos(selectedEditionId)}
                  disabled={loadingPhotos}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory border border-stone text-xs font-mono hover:border-gold transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingPhotos ? "animate-spin" : ""}`} />
                  <span>Atualizar</span>
                </button>
              </div>
            </div>

            {loadingPhotos ? (
              <div className="clay-card p-12 text-center bg-white border border-stone text-stone-dark text-xs font-mono">
                Carregando fotografias da edição...
              </div>
            ) : photos.length === 0 ? (
              <div className="clay-card p-12 text-center bg-white border border-stone space-y-2">
                <p className="font-serif font-bold text-night text-base">
                  Nenhuma fotografia cadastrada para esta edição.
                </p>
                <p className="text-xs text-stone-dark font-mono">
                  Utilize a área de upload acima para adicionar imagens.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {photos.map((photo, idx) => {
                  const url = getPhotoUrl(photo.storage_path);
                  const isDeleting = deletingPhotoId === photo.id;
                  const isFirst6 = idx < 6;

                  return (
                    <div
                      key={photo.id}
                      className={`clay-card bg-white overflow-hidden flex flex-col justify-between border ${
                        isFirst6 ? "border-gold/40" : "border-stone"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-stone-200 overflow-hidden">
                        <img
                          src={url}
                          alt={photo.caption || `Foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                            isFirst6
                              ? "bg-gold text-night"
                              : "bg-night/80 text-gold"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="p-2 space-y-1.5 text-[10px]">
                        <p className="font-semibold text-night line-clamp-1">
                          {photo.caption || `Foto ${idx + 1}`}
                        </p>
                        {photo.photographer && (
                          <p className="text-stone-dark truncate">
                            {photo.photographer}
                          </p>
                        )}
                        <div className="flex justify-end pt-1 border-t border-stone/40">
                          <button
                            onClick={() => requestDeletePhoto(photo)}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-800 hover:underline inline-flex items-center gap-1 disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-2.5 h-2.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-2.5 h-2.5" />
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
          </div>
        </section>
      )}

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={photoToDelete !== null}
        title="Excluir Fotografia"
        message={`Tem certeza que deseja excluir esta fotografia da edição ${year}? Esta ação não pode ser desfeita e removerá a imagem permanentemente.`}
        confirmText="Excluir Foto"
        onConfirm={confirmDeletePhoto}
        onCancel={() => setPhotoToDelete(null)}
      />

      <ConfirmDialog
        isOpen={editionToDelete !== null}
        title="Excluir Edição Inteira"
        message={`Você tem certeza ABSOLUTA que deseja excluir a edição de ${editionToDelete?.year}? Isso vai apagar TODOS os dados da edição, incluindo todas as fotografias e textos. Essa ação NÃO tem retorno.`}
        confirmText="Sim, excluir tudo"
        onConfirm={confirmDeleteEdition}
        onCancel={() => setEditionToDelete(null)}
      />
    </div>
  );
};
