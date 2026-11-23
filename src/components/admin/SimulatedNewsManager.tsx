"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  ShieldAlert,
  Search,
  Sparkles,
  Image as ImageIcon,
  Calendar,
  Tag,
  FileText,
  RotateCcw,
} from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface SimulatedNoticia {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  isPublished: boolean;
  hasCoverImage: boolean;
}

const INITIAL_NOTICIAS: SimulatedNoticia[] = [
  {
    id: "not-1",
    title: "Abertura da Exposição de Arte Sacra Barroca em Ouro Preto",
    category: "Exposição",
    date: "2026-10-14",
    author: "Assessoria Cultural",
    summary:
      "Nova mostra permanente reúne peças restauradas do século XVIII pertencentes aos museus locais.",
    isPublished: true,
    hasCoverImage: true,
  },
  {
    id: "not-2",
    title: "Oficina Educativa: Patrimônio e Memória para Jovens Estudantes",
    category: "Educação",
    date: "2026-10-20",
    author: "Coordenação Pedagógica",
    summary:
      "Inscrições gratuitas abertas para escolas municipais participarem das visitas mediadas.",
    isPublished: true,
    hasCoverImage: true,
  },
  {
    id: "not-3",
    title: "Restauração de Pinturas Murais Históricas Entra na Fase Final",
    category: "Restauro",
    date: "2026-11-02",
    author: "Equipe Técnica",
    summary:
      "Técnicos do IPHAN e da Secretaria de Cultura concluem prospecção e fixação de policromia.",
    isPublished: false,
    hasCoverImage: false,
  },
];

export const SimulatedNewsManager: React.FC = () => {
  const [noticias, setNoticias] = useState<SimulatedNoticia[]>(INITIAL_NOTICIAS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoticia, setSelectedNoticia] = useState<SimulatedNoticia | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noticiaToDelete, setNoticiaToDelete] = useState<SimulatedNoticia | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Exposição");
  const [formAuthor, setFormAuthor] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formIsPublished, setFormIsPublished] = useState(true);

  const showNotification = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleOpenCreate = () => {
    setSelectedNoticia(null);
    setFormTitle("");
    setFormCategory("Exposição");
    setFormAuthor("Administrador");
    setFormSummary("");
    setFormIsPublished(true);
    setIsEditing(true);
  };

  const handleOpenEdit = (noticia: SimulatedNoticia) => {
    setSelectedNoticia(noticia);
    setFormTitle(noticia.title);
    setFormCategory(noticia.category);
    setFormAuthor(noticia.author);
    setFormSummary(noticia.summary);
    setFormIsPublished(noticia.isPublished);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Por favor, preencha o título da notícia.");
      return;
    }

    if (selectedNoticia) {
      // Editar
      setNoticias((prev) =>
        prev.map((item) =>
          item.id === selectedNoticia.id
            ? {
                ...item,
                title: formTitle,
                category: formCategory,
                author: formAuthor,
                summary: formSummary,
                isPublished: formIsPublished,
              }
            : item
        )
      );
      showNotification("Notícia demonstrativa atualizada com sucesso!");
    } else {
      // Criar nova
      const newNoticia: SimulatedNoticia = {
        id: `not-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        date: new Date().toISOString().split("T")[0],
        author: formAuthor || "Administrador",
        summary: formSummary || "Texto demonstrativo adicionado durante o tutorial.",
        isPublished: formIsPublished,
        hasCoverImage: true,
      };
      setNoticias((prev) => [newNoticia, ...prev]);
      showNotification("Nova notícia criada com sucesso no ambiente simulado!");
    }

    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    if (!noticiaToDelete) return;
    setNoticias((prev) => prev.filter((item) => item.id !== noticiaToDelete.id));
    showNotification("Notícia removida com segurança da demonstração.");
    setNoticiaToDelete(null);
  };

  const handleResetData = () => {
    setNoticias(INITIAL_NOTICIAS);
    setIsEditing(false);
    showNotification("Dados de demonstração restaurados para o padrão inicial.");
  };

  const filteredNoticias = noticias.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-stone/60 p-6 space-y-6">
      {/* Banner de Demonstração Segura */}
      <div className="bg-amber-50 border border-amber-300 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <div className="text-xs font-mono">
            <strong className="font-bold">Ambiente de Demonstração Interativo:</strong> Você pode
            criar, editar, simular imagens e excluir livremente. Nenhuma alteração afeta o banco de dados oficial.
          </div>
        </div>
        <button
          onClick={handleResetData}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-mono transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {feedbackMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Barra de Ferramentas / Busca e Criação */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-dark" />
          <input
            type="text"
            placeholder="Buscar notícias demonstrativas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone text-xs font-mono bg-ivory/50 focus:outline-none focus:border-gold"
          />
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-night text-gold hover:bg-gold hover:text-night font-bold text-xs font-mono transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Notícia</span>
        </button>
      </div>

      {/* Formulário de Criação/Edição */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-5 bg-stone-light/40 border-2 border-gold/40 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-stone pb-2">
            <h4 className="text-sm font-serif font-bold text-night">
              {selectedNoticia ? "Editar Notícia" : "Criar Nova Notícia"}
            </h4>
            <span className="text-[10px] font-mono uppercase bg-gold/20 text-gold px-2 py-0.5 border border-gold/40">
              Modo Prático Seguro
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-stone-dark uppercase">
                Título / Manchete *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Ex: Novo Espaço Interativo é Inaugurado"
                className="w-full px-3 py-2 border border-stone text-xs bg-white focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-stone-dark uppercase">
                Categoria
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3 py-2 border border-stone text-xs bg-white focus:outline-none focus:border-gold"
              >
                <option value="Exposição">Exposição</option>
                <option value="Educação">Educação</option>
                <option value="Restauro">Restauro</option>
                <option value="Institucional">Institucional</option>
                <option value="Programação">Programação Cultural</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-stone-dark uppercase">
              Resumo da Notícia
            </label>
            <textarea
              rows={3}
              value={formSummary}
              onChange={(e) => setFormSummary(e.target.value)}
              placeholder="Breve descrição que aparecerá nos destaques do portal..."
              className="w-full px-3 py-2 border border-stone text-xs bg-white focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-night">
              <input
                type="checkbox"
                checked={formIsPublished}
                onChange={(e) => setFormIsPublished(e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              <span>Publicar imediatamente no portal</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 border border-stone text-xs font-mono text-stone-dark hover:bg-stone/20"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-night text-gold hover:bg-gold hover:text-night text-xs font-mono font-bold transition-colors"
              >
                {selectedNoticia ? "Salvar Alterações" : "Cadastrar Notícia"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Lista de Notícias */}
      <div className="overflow-x-auto border border-stone/40">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-light/50 border-b border-stone font-mono text-stone-dark uppercase text-[10px]">
            <tr>
              <th className="p-3">Título & Resumo</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Data</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone/30">
            {filteredNoticias.map((noticia) => (
              <tr key={noticia.id} className="hover:bg-ivory/50 transition-colors">
                <td className="p-3 max-w-sm">
                  <div className="font-serif font-bold text-night text-sm">
                    {noticia.title}
                  </div>
                  <div className="text-stone-dark text-xs truncate mt-0.5">
                    {noticia.summary}
                  </div>
                </td>
                <td className="p-3">
                  <span className="inline-block px-2 py-0.5 bg-stone-light border border-stone text-[10px] font-mono text-night">
                    {noticia.category}
                  </span>
                </td>
                <td className="p-3 text-stone-dark font-mono text-[11px]">
                  {noticia.date}
                </td>
                <td className="p-3">
                  {noticia.isPublished ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Publicado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-dark">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone" />
                      Rascunho
                    </span>
                  )}
                </td>
                <td className="p-3 text-right space-x-1 whitespace-nowrap">
                  <button
                    onClick={() => handleOpenEdit(noticia)}
                    className="p-1.5 text-stone-dark hover:text-night hover:bg-stone/20 transition-colors"
                    title="Editar notícia"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setNoticiaToDelete(noticia)}
                    className="p-1.5 text-stone-dark hover:text-red-600 hover:bg-stone/20 transition-colors"
                    title="Excluir notícia"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diálogo de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={!!noticiaToDelete}
        title="Confirmar Exclusão de Notícia"
        message={`Tem certeza que deseja remover a notícia demonstrativa "${noticiaToDelete?.title}"? Esta operação no modo interativo ensina como as confirmações de segurança funcionam no sistema.`}
        confirmText="Sim, excluir"
        cancelText="Cancelar"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setNoticiaToDelete(null)}
      />
    </div>
  );
};
