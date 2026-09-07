"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Scale,
  FileText,
  Landmark,
  ShieldCheck,
  BookOpen,
  Calendar,
  ExternalLink,
  Search,
  CheckCircle2,
  Download,
  Building2,
  Globe2,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface LegislationItem {
  id: string;
  title: string;
  code: string;
  date: string;
  category: "municipal" | "federal" | "regimento" | "patrimonio";
  categoryLabel: string;
  issuer: string;
  status: "Em vigor" | "Aprovado" | "Marco Histórico";
  summary: string;
  highlights: string[];
  scope: string;
  linkText?: string;
  linkUrl?: string;
}

const legislations: LegislationItem[] = [
  {
    id: "lei-305-2006",
    title: "Criação e Regulamentação do Sistema de Museus de Ouro Preto",
    code: "Lei Municipal nº 305/2006",
    date: "07 de dezembro de 2006",
    category: "municipal",
    categoryLabel: "Municipal",
    issuer: "Prefeitura Municipal e Câmara de Ouro Preto",
    status: "Em vigor",
    summary:
      "Institui e regulamenta o Sistema de Museus de Ouro Preto (SiMOP) com a finalidade de organizar, sob a forma de sistema integrado, o conjunto das atividades e instituições museológicas no município.",
    highlights: [
      "Criação oficial da entidade pública SiMOP.",
      "Estruturação do trabalho em rede entre museus públicos, universitários e privados.",
      "Articulação permanente com os setores municipais de cultura e patrimônio.",
      "Fixação das bases para o planejamento museológico compartilhado.",
    ],
    scope: "Âmbito Municipal (Ouro Preto / MG)",
    linkUrl: "https://www.ouropreto.mg.gov.br",
    linkText: "Portal da Prefeitura",
  },
  {
    id: "lei-11904-2009",
    title: "Estatuto Nacional de Museus",
    code: "Lei Federal nº 11.904/2009",
    date: "14 de janeiro de 2009",
    category: "federal",
    categoryLabel: "Federal",
    issuer: "Presidência da República / Congresso Nacional",
    status: "Em vigor",
    summary:
      "Institui o Estatuto dos Museus no Brasil e estabelece as diretrizes fundamentais para preservação, conservação, segurança, documentação, inventário e função social dos acervos museológicos nacionais.",
    highlights: [
      "Definição jurídica do conceito e função social do museu no Brasil.",
      "Obrigatoriedade da elaboração do Plano Museológico para cada instituição.",
      "Diretrizes rigorosas para inventário, salvaguarda e segurança de acervos.",
      "Criação do Sistema Brasileiro de Museus (SBM) e articulação com sistemas locais.",
    ],
    scope: "Âmbito Federal (Nacional)",
    linkUrl: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l11904.htm",
    linkText: "Texto Integral no Planalto",
  },
  {
    id: "lei-932-2014",
    title: "Estatuto Municipal de Museus de Ouro Preto",
    code: "Lei Municipal nº 932/2014",
    date: "12 de dezembro de 2014",
    category: "municipal",
    categoryLabel: "Municipal",
    issuer: "Prefeitura Municipal de Ouro Preto",
    status: "Em vigor",
    summary:
      "Estabelece as normas e diretrizes municipais para a política de museus de Ouro Preto, assegurando a proteção do patrimônio cultural, a qualificação profissional e o incentivo à visitação pública.",
    highlights: [
      "Regulamentação específica dos direitos e deveres dos museus municipais.",
      "Fomento à integração entre pesquisa acadêmica (UFOP) e espaços culturais.",
      "Normas de acessibilidade, catalogação digital e programas educativos.",
      "Fortalecimento da participação da comunidade e conselhos locais.",
    ],
    scope: "Âmbito Municipal (Ouro Preto / MG)",
    linkUrl: "https://www.ouropreto.mg.gov.br",
    linkText: "Legislação Municipal",
  },
  {
    id: "regimento-interno-2026",
    title: "Regimento Interno do SiMOP",
    code: "Regimento Interno SiMOP (2026)",
    date: "Aprovado em 2026",
    category: "regimento",
    categoryLabel: "Regimento Interno",
    issuer: "Conselho Gestor do SiMOP",
    status: "Aprovado",
    summary:
      "Documento deliberativo aprovado pelo Conselho Gestor que disciplina o funcionamento interno, a composição das 16 instituições integrantes, as eleições, mandatos e as atribuições da Coordenação Executiva.",
    highlights: [
      "Representação paritária com 2 representantes (titular e suplente) por instituição.",
      "Composição oficial com 16 instituições e secretarias municipais.",
      "Mandato de 2 anos para a Coordenação Executiva, com possibilidade de recondução.",
      "Diretrizes para condução de reuniões, propostas de parcerias e publicações.",
    ],
    scope: "Governança Interna do SiMOP",
    linkUrl: "/institucional#conselho-gestor",
    linkText: "Ver Conselho Gestor",
  },
  {
    id: "decreto-lei-25-1937",
    title: "Organização da Proteção do Patrimônio Histórico e Artístico Nacional",
    code: "Decreto-Lei nº 25/1937",
    date: "30 de novembro de 1937",
    category: "patrimonio",
    categoryLabel: "Patrimônio & Tombamento",
    issuer: "Governo Federal / IPHAN",
    status: "Marco Histórico",
    summary:
      "Instrumento legal precursor no Brasil que instituiu o Tombamento e a salvaguarda sistemática de monumentos, acervos artísticos e conjuntos urbanos de valor excepcional, incluindo o tombamento de Ouro Preto em 1938.",
    highlights: [
      "Inscrição nos Livros do Tombo de Ouro Preto como Monumento Nacional (1938).",
      "Regras para conservação de bens móveis e imóveis de interesse histórico.",
      "Base jurídica que protege os edifícios coloniais que hoje abrigam os museus.",
    ],
    scope: "Âmbito Federal / Histórico",
    linkUrl: "http://portal.iphan.gov.br",
    linkText: "Portal IPHAN",
  },
  {
    id: "unesco-1980",
    title: "Inscrição de Ouro Preto como Patrimônio Mundial da UNESCO",
    code: "Convenção do Patrimônio Mundial (1980)",
    date: "05 de setembro de 1980",
    category: "patrimonio",
    categoryLabel: "Patrimônio & Tombamento",
    issuer: "UNESCO (Organização das Nações Unidas)",
    status: "Marco Histórico",
    summary:
      "Declaração internacional que consagrou Ouro Preto como o primeiro sítio urbano brasileiro na lista do Patrimônio Mundial Cultural da UNESCO, exigindo cooperação internacional e gestão integrada de seus acervos.",
    highlights: [
      "Reconhecimento universal do valor excepcional da arte colonial e barroca.",
      "Compromisso permanente de conservação e gestão responsável do território.",
      "Estímulo à criação de redes e sistemas de salvaguarda museal como o SiMOP.",
    ],
    scope: "Âmbito Internacional (UNESCO)",
    linkUrl: "https://whc.unesco.org/en/list/124",
    linkText: "UNESCO World Heritage",
  },
];

export default function LegislacoesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredLegislations = useMemo(() => {
    return legislations.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.highlights.some((h) =>
          h.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const categories = [
    { id: "all", label: "Todas as Normas", count: legislations.length },
    {
      id: "municipal",
      label: "Legislação Municipal",
      count: legislations.filter((l) => l.category === "municipal").length,
    },
    {
      id: "federal",
      label: "Legislação Federal",
      count: legislations.filter((l) => l.category === "federal").length,
    },
    {
      id: "regimento",
      label: "Regimento do SiMOP",
      count: legislations.filter((l) => l.category === "regimento").length,
    },
    {
      id: "patrimonio",
      label: "Patrimônio & Tombamento",
      count: legislations.filter((l) => l.category === "patrimonio").length,
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-20 pt-8">
      {/* 1. Header Editorial / Hero */}
      <section className="relative overflow-hidden bg-night text-ivory border-b border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
              <Scale className="w-4 h-4" />
              <span>Marco Legal & Governança</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
              Legislações & <span className="text-gold italic font-serif">Normativas</span>
            </h1>

            <p className="text-base sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              Repositório dos atos normativos, leis municipais e federais, estatutos e diretrizes regimentais que orientam e sustentam a atuação do Sistema de Museus de Ouro Preto (SiMOP).
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-dark/30 text-stone">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">
                  Lei de Criação
                </span>
                <span className="text-sm font-semibold text-gold">Lei 305/2006</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">
                  Estatuto Federal
                </span>
                <span className="text-sm font-semibold text-gold">Lei 11.904/2009</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">
                  Estatuto Municipal
                </span>
                <span className="text-sm font-semibold text-gold">Lei 932/2014</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-stone-dark font-medium block">
                  Regimento Interno
                </span>
                <span className="text-sm font-semibold text-gold">Vigência 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls: Search & Category Filter */}
        <div className="clay-card p-6 md:p-8 bg-white mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por termo, lei, número ou palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-ivory border border-stone focus:border-gold focus:outline-none text-night placeholder:text-stone-dark/70 rounded-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-dark hover:text-night"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Total Results */}
            <div className="text-xs text-stone-dark font-medium">
              Exibindo <span className="font-bold text-night">{filteredLegislations.length}</span> de{" "}
              <span>{legislations.length}</span> atos normativos
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone/50">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-night text-gold border border-gold"
                    : "bg-ivory text-blue-deep border border-stone hover:border-gold/60"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-none ${
                    selectedCategory === cat.id
                      ? "bg-gold text-night font-bold"
                      : "bg-stone/50 text-stone-dark"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main List Column (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            {filteredLegislations.length === 0 ? (
              <div className="clay-card p-12 text-center space-y-4 bg-white">
                <Scale className="w-12 h-12 text-stone-dark mx-auto" />
                <h3 className="font-serif font-bold text-night text-xl">
                  Nenhuma legislação encontrada
                </h3>
                <p className="text-sm text-stone-dark max-w-md mx-auto">
                  Não encontramos nenhum documento correspondente aos critérios de busca selecionados. Tente ajustar as palavras-chave ou redefinir os filtros.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 bg-night text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-night transition-colors"
                >
                  Ver todas as legislações
                </button>
              </div>
            ) : (
              filteredLegislations.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="clay-card p-8 md:p-10 bg-white space-y-6 hover:border-gold transition-all duration-300 scroll-mt-28"
                >
                  {/* Item Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone/60">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider font-mono">
                        {item.code}
                      </span>
                      <span className="px-2.5 py-1 bg-ivory border border-stone text-blue-deep text-[11px] font-semibold uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-dark">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{item.date}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-[10px] uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1">
                    <h2 className="font-serif font-bold text-night text-xl md:text-2xl leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-xs text-stone-dark font-medium flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{item.issuer}</span>
                      <span className="text-stone">•</span>
                      <span>{item.scope}</span>
                    </p>
                  </div>

                  {/* Summary / Ementa */}
                  <div className="p-4 bg-ivory border-l-4 border-gold text-sm text-blue-deep leading-relaxed">
                    <p className="font-medium text-night text-xs uppercase tracking-wider mb-1 font-mono">
                      Ementa & Finalidade:
                    </p>
                    {item.summary}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pontos de Destaque & Impactos no SiMOP</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-dark">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  {item.linkUrl && (
                    <div className="pt-2 flex justify-end">
                      {item.linkUrl.startsWith("http") ? (
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:underline"
                        >
                          <span>{item.linkText || "Consultar Documento"}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={item.linkUrl}
                          className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:underline"
                        >
                          <span>{item.linkText || "Ver Seção Institucional"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  )}
                </article>
              ))
            )}
          </main>

          {/* Sidebar / Coluna Lateral (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Card Lateral 1: Hierarquia Normativa */}
            <div className="clay-card p-6 bg-white space-y-6">
              <div className="flex items-center gap-2 text-night font-serif font-bold text-base pb-3 border-b border-stone/60">
                <Scale className="w-4 h-4 text-gold" />
                <span>Hierarquia Normativa do SiMOP</span>
              </div>

              <div className="space-y-4 text-xs text-stone-dark leading-relaxed">
                <div className="p-3 bg-ivory border border-stone/60 space-y-1">
                  <div className="font-bold text-night flex items-center justify-between">
                    <span>1. Marco Federal</span>
                    <span className="text-[10px] text-gold font-mono">Lei 11.904/09</span>
                  </div>
                  <p className="text-[11px]">
                    Fixa as diretrizes nacionais e os conceitos fundamentais para todos os museus do país.
                  </p>
                </div>

                <div className="p-3 bg-ivory border border-stone/60 space-y-1">
                  <div className="font-bold text-night flex items-center justify-between">
                    <span>2. Marco Municipal</span>
                    <span className="text-[10px] text-gold font-mono">Leis 305/06 & 932/14</span>
                  </div>
                  <p className="text-[11px]">
                    Institui o SiMOP e disciplina o Estatuto Municipal de Museus de Ouro Preto.
                  </p>
                </div>

                <div className="p-3 bg-ivory border border-stone/60 space-y-1">
                  <div className="font-bold text-night flex items-center justify-between">
                    <span>3. Regimento Interno</span>
                    <span className="text-[10px] text-gold font-mono">Vigência 2026</span>
                  </div>
                  <p className="text-[11px]">
                    Define a composição do Conselho Gestor, eleições e atribuições da Coordenação Executiva.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/institucional"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-night text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-night transition-colors"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Página Institucional SiMOP</span>
                </Link>
              </div>
            </div>

            {/* Card Lateral 2: Glossário Jurídico-Museológico */}
            <div className="clay-card p-6 bg-ivory space-y-5">
              <div className="flex items-center gap-2 text-night font-serif font-bold text-base pb-3 border-b border-stone/60">
                <BookOpen className="w-4 h-4 text-gold" />
                <span>Glossário Essencial</span>
              </div>

              <div className="space-y-3.5 text-xs text-blue-deep leading-relaxed">
                <div>
                  <h4 className="font-bold text-night text-xs">Órgão Colegiado:</h4>
                  <p className="text-[11px] text-stone-dark">
                    Estrutura em que o poder de decisão é exercido conjuntamente por um grupo de representantes (Conselho Gestor).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-night text-xs">Plano Museológico:</h4>
                  <p className="text-[11px] text-stone-dark">
                    Ferramenta básica de planejamento estratégico, desenvolvimento e gestão obrigatória para cada museu.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-night text-xs">Salvaguarda:</h4>
                  <p className="text-[11px] text-stone-dark">
                    Conjunto de ações integradas de documentação, conservação preventiva, restauração e segurança do acervo.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Lateral 3: Consulta a Documentos Oficiais */}
            <div className="clay-card-dark p-6 bg-night text-ivory space-y-4 border border-stone-dark/30">
              <div className="flex items-center gap-2 text-ivory font-serif font-bold text-base pb-3 border-b border-stone-dark/30">
                <FileText className="w-4 h-4 text-gold" />
                <span>Documentação & Consultas</span>
              </div>

              <p className="text-xs text-stone leading-relaxed">
                Para solicitar cópias integrais de resoluções, atas de reuniões do Conselho Gestor ou certidões regimentais, utilize os canais institucionais do SiMOP.
              </p>

              <div className="pt-2">
                <Link
                  href="/institucional#quem-somos"
                  className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Consulte o SiMOP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
