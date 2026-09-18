import React from "react";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Layers,
  Database,
  ExternalLink,
  ArrowRight,
  Landmark,
  Camera,
  BookOpen,
  Calendar,
  FileSpreadsheet,
  Instagram,
  Mail,
  Phone,
  Globe,
  Sparkles,
  ShieldCheck,
  Server,
  Image as ImageIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata = {
  title: "Tecnologia — Sistema de Museus de Ouro Preto (SIMOP)",
  description:
    "Conheça a infraestrutura tecnológica do SIMOP e como a plataforma organiza, preserva e apresenta as informações dos museus de Ouro Preto.",
};

export default function TecnologiaPage() {
  const systemElements = [
    {
      title: "Museus",
      description: "Informações organizadas sobre os museus e seus espaços.",
      href: "/museus",
      icon: Landmark,
      tag: "Espaços & Unidades",
    },
    {
      title: "Acervo",
      description: "Fotografias e conteúdos que ajudam a preservar e apresentar a memória.",
      href: "/memoria-e-eventos/acervo",
      icon: Camera,
      tag: "Fotografia & Memória",
    },
    {
      title: "Publicações",
      description: "Conteúdos editoriais e informações produzidas pelos museus.",
      href: "/publicacoes",
      icon: BookOpen,
      tag: "Produção Editorial",
    },
    {
      title: "Memória e Eventos",
      description: "Registros fotográficos e históricos de iniciativas e acontecimentos.",
      href: "/memoria-e-eventos",
      icon: Calendar,
      tag: "Semanas & Primaveras",
    },
    {
      title: "Informações",
      description: "Dados estruturados para facilitar a organização e o acesso ao conteúdo.",
      href: "/institucional",
      icon: FileSpreadsheet,
      tag: "Estrutura & Gestão",
    },
    {
      title: "Legislações",
      description: "Leis, decretos e normativas do setor museológico municipal, estadual e federal.",
      href: "/legislacoes",
      icon: ShieldCheck,
      tag: "Normas & Leis",
    },
  ];

  const techStack = [
    {
      name: "Next.js & React",
      category: "Framework & Frontend",
      description:
        "Arquitetura com renderização no servidor (SSR) para alta velocidade de carregamento, indexação pública e performance.",
      icon: Server,
    },
    {
      name: "TypeScript",
      category: "Linguagem & Tipagem",
      description:
        "Código tipado estaticamente para garantir estabilidade, clareza e manutenção facilitada à medida que o sistema evolui.",
      icon: Code2,
    },
    {
      name: "Tailwind CSS",
      category: "Design System & Estilização",
      description:
        "Sistema de design modular e customizado com a identidade visual e tokens tipográficos de Ouro Preto.",
      icon: Layers,
    },
    {
      name: "Supabase (PostgreSQL)",
      category: "Banco de Dados & Storage",
      description:
        "Banco relacional robusto para metadados e armazenamento em nuvem de alta disponibilidade para arquivos e acervos fotográficos.",
      icon: Database,
    },
    {
      name: "Processamento de Mídia (WebP)",
      category: "Performance & Imagens",
      description:
        "Otimização e conversão automática de fotografias para formatos modernos, reduzindo o tráfego de dados e aumentando a velocidade.",
      icon: Cpu,
    },
  ];

  const contactLinks = [
    {
      label: "WhatsApp",
      value: "(71) 98378-9492",
      href: "https://wa.me/5571983789492",
      icon: Phone,
      iconColor:
        "text-[#25D366] bg-[#25D366]/10 border-[#25D366]/30 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366]",
    },
    {
      label: "Instagram",
      value: "@origemdev",
      href: "https://instagram.com/origemdev",
      icon: Instagram,
      iconColor:
        "text-[#9333ea] bg-[#9333ea]/10 border-[#9333ea]/30 group-hover:bg-[#9333ea] group-hover:text-white group-hover:border-[#9333ea]",
    },
    {
      label: "E-mail",
      value: "comercial.origemdev@gmail.com",
      href: "mailto:comercial.origemdev@gmail.com",
      icon: Mail,
      iconColor:
        "text-[#2563eb] bg-[#2563eb]/10 border-[#2563eb]/30 group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb]",
    },
    {
      label: "Site",
      value: "www.origemdev.com.br",
      href: "https://www.origemdev.com.br",
      icon: Globe,
      iconColor:
        "text-[#ea580c] bg-[#ea580c]/10 border-[#ea580c]/30 group-hover:bg-[#ea580c] group-hover:text-white group-hover:border-[#ea580c]",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-24">
      {/* ========================================================================= */}
      {/* 1. HERO                                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-night text-ivory border-b border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto do Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest font-mono">
                <Cpu className="w-4 h-4" />
                <span>Plataforma & Infraestrutura Digital</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
                Tecnologia
              </h1>

              <p className="text-base sm:text-xl text-stone font-light leading-relaxed">
                O SIMOP utiliza tecnologia para aproximar informação, patrimônio e pessoas. Uma
                plataforma desenvolvida para organizar os conteúdos dos museus de Ouro Preto e
                tornar seu acervo e sua memória mais acessíveis.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-dark border-t border-stone-dark/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                  <span className="text-stone">Estrutura Modular</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                  <span className="text-stone">Preservação Digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                  <span className="text-stone">Acesso Público</span>
                </div>
              </div>
            </div>

            {/* Espaço visual para imagem (Ambiente e Interface) */}
            <div className="lg:col-span-5">
              <div className="clay-card bg-white/5 border border-stone-dark/40 p-3 group">
                <div className="relative w-full h-[320px] sm:h-[380px] border border-stone-dark/30 overflow-hidden bg-night/60">
                  <img
                    src="/images/tecnologia/ambiente-e-interface.webp"
                    alt="Ambiente e interface da plataforma SIMOP"
                    className="w-full h-auto block transition-transform duration-[4000ms] ease-in-out group-hover:-translate-y-[calc(100%-320px)] sm:group-hover:-translate-y-[calc(100%-380px)]"
                  />
                  <div className="absolute top-3 right-3 bg-night/90 backdrop-blur-md px-2.5 py-1 text-gold text-[10px] font-mono border border-gold/40 flex items-center gap-1.5 shadow-md pointer-events-none group-hover:opacity-20 transition-opacity duration-300">
                    <Sparkles className="w-3 h-3 text-gold animate-pulse" />
                    <span>Passe o mouse para rolar</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-dark font-mono text-center pt-2.5">
                  Ambiente e interface da plataforma SIMOP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SOBRE A ORIGEM + DESENVOLVIMENTO                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card p-8 md:p-12 bg-white border border-stone space-y-10">

          {/* 2a. Desenvolvimento */}
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Engenharia & Design"
              title="Desenvolvido pela ORIGEM"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-blue-deep leading-relaxed">
                <p>
                  O SIMOP foi desenvolvido pela ORIGEM, estúdio especializado na criação de sites,
                  sistemas e experiências digitais, unindo design e tecnologia para desenvolver
                  soluções funcionais, intuitivas e alinhadas aos objetivos de cada projeto.
                </p>
                <p>
                  Para este projeto, design e tecnologia foram utilizados em conjunto para criar
                  uma plataforma alinhada às necessidades dos museus de Ouro Preto, facilitando a
                  organização e o acesso às informações do sistema. A estrutura foi pensada para
                  oferecer uma experiência clara e acessível, valorizando o conteúdo e a identidade
                  dos museus.
                </p>
                <p>
                  Além disso, o SIMOP foi desenvolvido com uma estrutura preparada para sua
                  evolução, permitindo a expansão de conteúdos e funcionalidades conforme as
                  necessidades do sistema.
                </p>
              </div>

              {/* Banner lateral */}
              <div className="lg:col-span-4">
                <div className="border border-stone bg-ivory p-3 flex flex-col items-center justify-center space-y-2">
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-stone/60 bg-night/5">
                    <img
                      src="/images/tecnologia/banner.png"
                      alt="ORIGEM Desenvolvimento"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-stone-dark font-mono text-center">
                    ORIGEM • Design & Tecnologia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2b. Sobre a ORIGEM */}
          <div className="p-6 sm:p-8 bg-ivory border border-stone space-y-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sobre o Estúdio</span>
              </div>
              <h3 className="font-serif font-bold text-night text-xl">ORIGEM</h3>
              <p className="text-xs sm:text-sm text-blue-deep leading-relaxed">
                A ORIGEM desenvolve soluções digitais sob medida, unindo estratégia, design e
                tecnologia para transformar ideias e necessidades reais em produtos digitais.
              </p>
            </div>

            <div className="pt-2 border-t border-stone/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {contactLinks.map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-3.5 bg-white border border-stone/60 hover:border-stone group transition-all duration-200 flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-all duration-200 ${contact.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-dark">
                        {contact.label}
                      </span>
                      <span className="block text-xs font-semibold text-night truncate">
                        {contact.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-stone/60 flex justify-end">
              <a
                href="https://www.origemdev.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-night text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-night transition-all duration-200 border border-night hover:border-gold shadow-sm"
              >
                <span>Conheça a ORIGEM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TECNOLOGIA A SERVIÇO DO PATRIMÔNIO                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card p-8 md:p-12 bg-white border border-stone space-y-8">
          <SectionHeader
            eyebrow="Propósito & Estrutura"
            title="Tecnologia a serviço do patrimônio"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Textos da Seção */}
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-blue-deep leading-relaxed">
              <p>
                O SIMOP foi pensado para ir além de uma presença digital. Sua estrutura reúne
                informações, conteúdos, fotografias, eventos e diferentes aspectos da realidade
                museológica em um único ambiente.
              </p>
              <p>
                Por trás da interface existe uma estrutura digital preparada para organizar essas
                informações e permitir que o sistema continue evoluindo conforme as necessidades
                dos museus.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-ivory border border-stone space-y-1.5">
                  <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block">
                    Integração
                  </span>
                  <p className="text-xs text-stone-dark leading-normal">
                    Conexão harmoniosa entre acervos, legislações, eventos e catálogos das instituições.
                  </p>
                </div>
                <div className="p-4 bg-ivory border border-stone space-y-1.5">
                  <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block">
                    Continuidade
                  </span>
                  <p className="text-xs text-stone-dark leading-normal">
                    Capacidade de evolução constante com preservação da consistência dos registros.
                  </p>
                </div>
              </div>
            </div>

            {/* Diagrama de Arquitetura de Dados */}
            <div className="lg:col-span-5">
              <div className="border border-stone bg-[#0f1117] p-4 space-y-2">
                <div className="relative w-full aspect-[4/3] overflow-hidden flex flex-col gap-2 p-3">

                  {/* Label topo */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#C99A45]">Arquitetura · SIMOP</span>
                    <span className="text-[9px] font-mono text-[#4a5568]">v1.0</span>
                  </div>

                  {/* Camada 1: Interface */}
                  <div className="border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 rounded-sm">
                    <div className="text-[9px] font-mono text-[#4a5568] uppercase tracking-wider mb-1.5">Interface · Next.js + TypeScript</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {[
                        { label: "Museus", color: "#C99A45" },
                        { label: "Acervo", color: "#f97316" },
                        { label: "Publicações", color: "#3b82f6" },
                        { label: "Memória", color: "#8b5cf6" },
                        { label: "Legislações", color: "#22c55e" },
                        { label: "Institucional", color: "#14b8a6" },
                      ].map((item) => (
                        <span
                          key={item.label}
                          className="px-1.5 py-0.5 text-[8px] font-mono font-semibold rounded-sm"
                          style={{ backgroundColor: item.color + "22", color: item.color, border: `1px solid ${item.color}44` }}
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Seta */}
                  <div className="flex items-center justify-center gap-1 my-0.5">
                    <div className="flex-1 h-px bg-[#2d3748]" />
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                      <path d="M5 0L5 8M5 8L2 5M5 8L8 5" stroke="#4a5568" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <div className="flex-1 h-px bg-[#2d3748]" />
                  </div>

                  {/* Camada 2: API & Lógica */}
                  <div className="border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 rounded-sm">
                    <div className="text-[9px] font-mono text-[#4a5568] uppercase tracking-wider mb-1.5">API & Lógica de Negócio</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: "Auth", color: "#f59e0b" },
                        { label: "Queries", color: "#6366f1" },
                        { label: "Storage", color: "#ec4899" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="text-center text-[8px] font-mono py-1 rounded-sm"
                          style={{ backgroundColor: item.color + "18", color: item.color, border: `1px solid ${item.color}33` }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seta */}
                  <div className="flex items-center justify-center gap-1 my-0.5">
                    <div className="flex-1 h-px bg-[#2d3748]" />
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                      <path d="M5 0L5 8M5 8L2 5M5 8L8 5" stroke="#4a5568" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <div className="flex-1 h-px bg-[#2d3748]" />
                  </div>

                  {/* Camada 3: Banco & Storage */}
                  <div className="border border-[#22c55e33] bg-[#0d1f14] px-3 py-2 rounded-sm">
                    <div className="text-[9px] font-mono text-[#22c55e88] uppercase tracking-wider mb-1.5">Dados · Supabase (PostgreSQL)</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-[#22c55e12] border border-[#22c55e22] rounded-sm px-2 py-1 space-y-0.5">
                        <div className="text-[8px] font-mono text-[#22c55e] font-semibold">PostgreSQL</div>
                        <div className="text-[7px] font-mono text-[#4a5568]">Metadados · Registros</div>
                      </div>
                      <div className="bg-[#3b82f612] border border-[#3b82f622] rounded-sm px-2 py-1 space-y-0.5">
                        <div className="text-[8px] font-mono text-[#3b82f6] font-semibold">Storage</div>
                        <div className="text-[7px] font-mono text-[#4a5568]">Imagens · Documentos</div>
                      </div>
                    </div>
                  </div>

                </div>
                <p className="text-[11px] text-stone-dark font-mono text-center">
                  Estrutura e organização de dados museológicos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. UM SISTEMA CONECTADO                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          eyebrow="Arquitetura de Conteúdo"
          title="Um sistema conectado"
          subtitle="Conheça os principais eixos que estruturam a organização de dados, conteúdos e memórias do SIMOP."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemElements.map((elem) => {
            const Icon = elem.icon;
            return (
              <Link
                key={elem.title}
                href={elem.href}
                className="clay-card p-6 bg-white border border-stone flex flex-col justify-between group hover:border-gold transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-ivory border border-stone flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-night transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-dark bg-ivory px-2 py-0.5 border border-stone/60">
                      {elem.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-night text-lg group-hover:text-gold transition-colors">
                      {elem.title}
                    </h3>
                    <p className="text-xs text-blue-deep leading-relaxed">
                      {elem.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone/40 flex items-center justify-between text-[11px] font-mono text-stone-dark group-hover:text-gold transition-colors">
                  <span>Acessar área</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TECNOLOGIA (UMA PLATAFORMA PREPARADA PARA EVOLUIR)                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card p-8 md:p-12 bg-white border border-stone space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-semibold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Infraestrutura Tecnológica</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-night tracking-tight">
              Uma plataforma preparada para evoluir
            </h2>
            <p className="text-sm sm:text-base text-blue-deep leading-relaxed font-light">
              A arquitetura do SIMOP foi construída para permitir a expansão do sistema sem
              comprometer sua organização. Novos conteúdos, registros e funcionalidades podem ser
              incorporados à plataforma conforme o projeto evolui.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="p-5 bg-ivory border border-stone space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-white border border-stone flex items-center justify-center text-gold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-stone-dark uppercase tracking-wider">
                        {tech.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-night text-base mb-1">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-blue-deep leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CRÉDITOS TÉCNICOS                                                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card bg-white border border-stone p-8 md:p-12 space-y-8">
          <SectionHeader
            eyebrow="Reconhecimento & Atribuição"
            title="Créditos Técnicos"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Desenvolvimento */}
            <div className="p-6 bg-ivory border border-stone space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gold shrink-0" />
                <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest">
                  Desenvolvimento
                </span>
              </div>
              <div className="space-y-2">
                <img src="/images/tecnologia/logo-nome.webp" alt="ORIGEM" className="h-5 w-auto" />
                <a 
                  href="https://www.origemdev.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-xs text-stone-dark hover:text-gold transition-colors font-mono"
                >
                  origemdev.com.br
                </a>
              </div>
              <div className="pt-2 border-t border-stone/60">
                <p className="text-[11px] text-blue-deep leading-relaxed">
                  Engenharia de software, arquitetura de sistemas e implementação da plataforma SIMOP.
                </p>
              </div>
            </div>

            {/* Design e Experiência */}
            <div className="p-6 bg-ivory border border-stone space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-[#8b5cf6] shrink-0" />
                <span className="text-[10px] font-mono font-bold text-[#8b5cf6] uppercase tracking-widest">
                  Design e Experiência
                </span>
              </div>
              <div className="space-y-2">
                <img src="/images/tecnologia/logo-nome.webp" alt="ORIGEM" className="h-5 w-auto" />
                <a 
                  href="https://www.origemdev.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-xs text-stone-dark hover:text-gold transition-colors font-mono"
                >
                  origemdev.com.br
                </a>
              </div>
              <div className="pt-2 border-t border-stone/60">
                <p className="text-[11px] text-blue-deep leading-relaxed">
                  Identidade visual, design de interface e experiência do usuário da plataforma.
                </p>
              </div>
            </div>

            {/* Tecnologias */}
            <div className="p-6 bg-ivory border border-stone space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-[#3b82f6] shrink-0" />
                <span className="text-[10px] font-mono font-bold text-[#3b82f6] uppercase tracking-widest">
                  Tecnologias Utilizadas
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: "React", color: "#61dafb" },
                  { label: "Next.js", color: "#0070f3" },
                  { label: "TypeScript", color: "#3b82f6" },
                  { label: "PostgreSQL", color: "#22c55e" },
                  { label: "Supabase", color: "#3ecf8e" },
                  { label: "Tailwind CSS", color: "#38bdf8" },
                  { label: "Node.js", color: "#84cc16" },
                ].map((tech) => (
                  <span
                    key={tech.label}
                    className="px-2 py-0.5 text-[10px] font-mono font-semibold border"
                    style={{
                      backgroundColor: tech.color + "15",
                      color: tech.color === "#ffffff" ? "#e2e8f0" : tech.color,
                      borderColor: tech.color + "40",
                    }}
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
