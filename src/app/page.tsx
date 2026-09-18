import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  FileText,
  Scale,
  BookOpen,
  CalendarHeart,
  Compass,
  Search,
  Users,
  UserCog,
  UserCheck,
  History,
  Book,
  Image as ImageIcon,
  Library,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight,
  Camera,
} from "lucide-react";
import { getFeaturedMuseums } from "@/lib/museums";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MuseumAccordionMobile } from "@/components/museum/MuseumAccordionMobile";
import { MuseumGrid } from "@/components/museum/MuseumGrid";
import { Button } from "@/components/ui/Button";
import { OlharMuseuService } from "@/lib/olharMuseuService";

export const revalidate = 60;

function formatPubDate(dateStr?: string): string {
  if (!dateStr) return "Edição Colecionável";
  try {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Edição Especial";
  }
}

export default async function HomePage() {
  const featuredMuseums = getFeaturedMuseums();

  // Buscar preview editorial para a seção Publicações
  const featuredPost = await OlharMuseuService.getFeaturedPost();
  const secondaryPosts = await OlharMuseuService.getLatestPosts(
    2,
    featuredPost ? [featuredPost.id] : []
  );

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-night text-ivory">
        {/* Imagem para Desktop */}
        <img src="/images/hero-home.webp" alt="Ouro Preto" className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-45" />
        {/* Imagem para Mobile */}
        <img src="/images/hero-home-mobile.jpeg" alt="Ouro Preto - Mobile" className="md:hidden absolute inset-0 w-full h-full object-cover opacity-45 object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <Landmark className="w-4 h-4" />
            <span>SIMOP</span>
          </div>
          <img
            src="/images/logo-simop.webp"
            alt="SIMOP – Sistema Interno de Museus de Ouro Preto"
            className="h-32 sm:h-44 lg:h-52 w-auto object-contain mx-auto drop-shadow-2xl"
          />
          <p className="text-lg sm:text-2xl text-stone max-w-3xl mx-auto font-light leading-relaxed">
            Plataforma centralizada para gestão, preservação e consulta do acervo museológico, histórico e cultural de Ouro Preto.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#museus" variant="primary" size="lg">
              Explorar Áreas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        
        {/* 1. Museus */}
        <section id="museus">
          <SectionHeader
            eyebrow="Acervo & Espaços"
            title="Museus"
            subtitle="Conheça os principais espaços institucionais e coleções preservadas no centro histórico de Ouro Preto."
          />
          <MuseumAccordionMobile museums={featuredMuseums} className="md:hidden block" />
          <MuseumGrid museums={featuredMuseums} className="hidden md:grid" />
          <div className="mt-12 text-center">
            <Button href="/museus" variant="secondary" size="md">
              Explorar Museus →
            </Button>
          </div>
        </section>

        {/* 2. Institucional */}
        <section id="institucional" className="clay-card-dark p-8 md:p-12 relative overflow-hidden bg-night text-ivory border border-stone-dark/30">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <SectionHeader
              eyebrow="Diretrizes & Governança"
              title="Institucional"
              subtitle="Compreenda a missão, a trajetória e a estrutura organizacional do SiMOP. Acesse informações sobre nossa gestão executiva e o Conselho Gestor."
              dark={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Histórico & Quem Somos */}
              <Link 
                href="/institucional#historico" 
                className="clay-card-dark p-6 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 relative overflow-hidden hover:bg-stone-dark/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all border border-gold/30">
                      <History className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-night/80 border border-stone-dark/50 text-gold">
                      Lei nº 305/2006
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-ivory text-xl mb-2 group-hover:text-gold transition-colors">
                    Histórico & Missão
                  </h3>
                  <p className="text-xs text-stone leading-relaxed">
                    Entidade pública instituída para articular, coordenar e integrar as instituições museológicas de Ouro Preto, protegendo o patrimônio histórico e cultural.
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-dark/40 flex items-center justify-between text-xs text-gold font-medium">
                  <span className="text-[11px] text-stone">Desde 2006 • UNESCO</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Conhecer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
              
              {/* Card 2: Coordenação Executiva com Fotos Reais */}
              <Link 
                href="/institucional#coordenacao-executiva" 
                className="clay-card-dark p-6 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 relative overflow-hidden hover:bg-stone-dark/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all border border-gold/30">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold">
                      Gestão 2026
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-ivory text-xl mb-2 group-hover:text-gold transition-colors">
                    Coordenação Executiva
                  </h3>
                  <p className="text-xs text-stone leading-relaxed">
                    Direção dos trabalhos organizacionais, proposição de projetos e representação institucional do SiMOP.
                  </p>
                </div>
                
                <div className="pt-6 mt-4 border-t border-stone-dark/40 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-ivory">Ranielle & Matheus</span>
                    <span className="text-[10px] text-stone-dark">Coord. + Equipe Técnica</span>
                  </div>
                  
                  {/* Avatares com Fotos Reais */}
                  <div className="flex -space-x-2.5" title="Ranielle de Figueiredo, Matheus Bernardes e Stella Ker">
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative group-hover:ring-gold transition-all" title="Ranielle de Figueiredo — Coordenadora Executiva">
                      <img
                        src="/images/sobre/ranielle-figueiredo.webp"
                        alt="Ranielle de Figueiredo"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative group-hover:ring-gold transition-all" title="Matheus Bernardes — Coordenador Executivo">
                      <img
                        src="/images/sobre/matheus-bernardes.webp"
                        alt="Matheus Bernardes"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative group-hover:ring-gold transition-all" title="Stella Ker — Monitora e Equipe Técnica">
                      <img
                        src="/images/sobre/stella-ker.webp"
                        alt="Stella Ker"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Card 3: Conselho Gestor com Miniaturas dos Museus */}
              <Link 
                href="/institucional#conselho-gestor" 
                className="clay-card-dark p-6 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 relative overflow-hidden hover:bg-stone-dark/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all border border-gold/30">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold">
                      16 Instituições
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-ivory text-xl mb-2 group-hover:text-gold transition-colors">
                    Conselho Gestor
                  </h3>
                  <p className="text-xs text-stone leading-relaxed">
                    Instância deliberativa e participativa superior, com representação de museus federais, estaduais, municipais, universitários e fundacionais.
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-dark/40 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-ivory">Órgão Deliberativo</span>
                    <span className="text-[10px] text-stone-dark">Titulares & Suplentes</span>
                  </div>

                  {/* Avatares dos Museus Integrantes */}
                  <div className="flex -space-x-2.5" title="Instituições do Conselho Gestor">
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative" title="Museu da Inconfidência">
                      <img
                        src="/images/museus/museu-da-inconfidencia/capa.webp"
                        alt="Museu da Inconfidência"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative" title="Museu Casa dos Contos">
                      <img
                        src="/images/museus/museu-casa-dos-contos/capa.webp"
                        alt="Museu Casa dos Contos"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative" title="Museu Boulieu">
                      <img
                        src="/images/museus/museu-boulieu/capa.webp"
                        alt="Museu Boulieu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night bg-gold/20 text-gold text-[10px] font-bold flex items-center justify-center ring-1 ring-gold/40 shadow-md" title="Mais 13 instituições integrantes">
                      +13
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Quick Metrics Bar & CTA */}
            <div className="pt-6 border-t border-stone-dark/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full sm:w-auto">
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-stone-dark font-medium block">Fundação</span>
                  <span className="text-sm font-semibold text-gold">Lei 305/2006</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-stone-dark font-medium block">Conselho</span>
                  <span className="text-sm font-semibold text-gold">16 Instituições</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-stone-dark font-medium block">Governança</span>
                  <span className="text-sm font-semibold text-gold">Colegiada</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-stone-dark font-medium block">Regimento</span>
                  <span className="text-sm font-semibold text-gold">Vigência 2026</span>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto text-center sm:text-right">
                <Button href="/institucional" variant="primary" size="md">
                  Ver Institucional Completo →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Publicações (Preview Editorial Contemporâneo) */}
        <section id="publicacoes" className="clay-card p-6 sm:p-8 md:p-12 relative overflow-hidden bg-white border border-stone">
          <SectionHeader
            eyebrow="Curadoria Editorial & Pesquisa"
            title="Publicações"
            subtitle="Acesse o informativo Olhar Museu, catálogos históricos, ensaios e pesquisas dedicadas à salvaguarda e à memória do patrimônio museológico de Ouro Preto."
            separator={false}
            className="mb-8 md:mb-10"
          />

          {/* Grid Editorial Assimétrico (12 Colunas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* 3.1 MANCHETE PRINCIPAL / CAPA EDITORIAL (7 Colunas no Desktop) */}
            <div className="lg:col-span-7 flex flex-col">
              <Link
                href="/publicacoes"
                className="group clay-card bg-ivory/40 p-5 sm:p-7 border border-stone hover:border-gold transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Badges de Categoria & Metadados */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 bg-night text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-gold/30">
                      {featuredPost?.category?.name || "Informativo Oficial SiMOP"}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-dark">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{formatPubDate(featuredPost?.published_at)}</span>
                      <span>•</span>
                      <span className="text-gold font-sans font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold" />
                        {featuredPost?.reading_time_minutes ? `${featuredPost.reading_time_minutes} min` : "Destaque"}
                      </span>
                    </div>
                  </div>

                  {/* Imagem Editorial Panorâmica */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-stone bg-stone-200 mb-5">
                    <img
                      src={
                        featuredPost?.featured_image?.public_url ||
                        "/images/publicacoes/capa-olhar-museu.webp"
                      }
                      alt={featuredPost?.title || "Capa do informativo Olhar Museu"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-night/10 group-hover:bg-night/0 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3 bg-night/85 backdrop-blur-sm px-2.5 py-1 text-ivory text-[10px] font-mono border border-stone-dark/40 flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-gold" />
                      <span>Edição em Foco</span>
                    </div>
                  </div>

                  {/* Título & Resumo */}
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-night text-xl sm:text-2xl lg:text-3xl leading-snug group-hover:text-gold transition-colors">
                      {featuredPost?.title || "Olhar Museu: Memória, Museologia e Patrimônio Vivo em Ouro Preto"}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-deep font-normal leading-relaxed line-clamp-3">
                      {featuredPost?.excerpt ||
                        "Informativo oficial do Sistema de Museus de Ouro Preto voltado à difusão das ações dos 16 museus associados, reunindo conteúdos sobre salvaguarda, memória coletiva, história da arte e diálogo cultural."}
                    </p>
                  </div>
                </div>

                {/* Rodapé da Manchete */}
                <div className="pt-5 mt-6 border-t border-stone flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                    <span className="text-xs text-stone-dark font-mono">
                      SiMOP • Repositório Editorial
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-night group-hover:text-gold transition-colors">
                    <span>Acessar publicação</span>
                    <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>

            {/* 3.2 CADERNOS & EDIÇÕES SECUNDÁRIAS (5 Colunas no Desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone/80">
                  <span className="text-xs uppercase tracking-widest font-bold text-night font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold inline-block" />
                    Cadernos & Acervo
                  </span>
                  <span className="text-[10px] font-mono text-stone-dark">Publicações & Guias</span>
                </div>

                {/* Card Secundário 1 */}
                <Link
                  href="/publicacoes"
                  className="clay-card p-4 sm:p-5 bg-white border border-stone hover:border-gold group transition-all duration-300 block"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/30">
                      {secondaryPosts[0]?.category?.name || "Catálogo Histórico"}
                    </span>
                    <span className="text-[10px] font-mono text-stone-dark">
                      {formatPubDate(secondaryPosts[0]?.published_at) || "Edição 2014"}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-night text-base sm:text-lg leading-snug group-hover:text-gold transition-colors mb-1.5">
                    {secondaryPosts[0]?.title || "Ouro Preto: Museus — Guia e Catálogo Geral"}
                  </h4>
                  <p className="text-xs text-stone-dark leading-relaxed line-clamp-2 mb-3">
                    {secondaryPosts[0]?.excerpt ||
                      "Mapeamento histórico e inventário descritivo das instituições museológicas, arquitetura e coleções preservadas no centro histórico."}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-stone/50 text-[11px] text-stone-dark group-hover:text-gold transition-colors">
                    <span className="font-mono">Documentação SiMOP</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Card Secundário 2 */}
                <Link
                  href="/publicacoes"
                  className="clay-card p-4 sm:p-5 bg-white border border-stone hover:border-gold group transition-all duration-300 block"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/30">
                      {secondaryPosts[1]?.category?.name || "Pesquisa & Museologia"}
                    </span>
                    <span className="text-[10px] font-mono text-stone-dark">
                      {formatPubDate(secondaryPosts[1]?.published_at) || "Boletim Técnico"}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-night text-base sm:text-lg leading-snug group-hover:text-gold transition-colors mb-1.5">
                    {secondaryPosts[1]?.title || "Cadernos de Salvaguarda & Acervos Mineiros"}
                  </h4>
                  <p className="text-xs text-stone-dark leading-relaxed line-clamp-2 mb-3">
                    {secondaryPosts[1]?.excerpt ||
                      "Artigos sobre conservação preventiva, extroversão museal e a atuação articulada das instituições patrimoniais em Minas Gerais."}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-stone/50 text-[11px] text-stone-dark group-hover:text-gold transition-colors">
                    <span className="font-mono">Ensaio Técnico</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Callout Teaser da Trajetória Editorial */}
              <div className="p-4 bg-ivory/80 border border-stone/80 text-xs text-stone-dark space-y-1.5">
                <div className="flex items-center gap-2 text-night font-semibold text-[11px] uppercase tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Trajetória Editorial (2012–2026)</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  Edições colaborativas com a comunidade, registros da Primavera dos Museus e artigos sobre o circuito histórico de Ouro Preto.
                </p>
              </div>
            </div>

          </div>

          {/* 3.3 RODAPÉ EDITORIAL & NAVEGAÇÃO */}
          <div className="mt-8 pt-6 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-stone-dark">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Informativo Olhar Museu
              </span>
              <span className="text-stone-dark/40 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Catálogos do SiMOP
              </span>
              <span className="text-stone-dark/40 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Artigos & Pesquisa
              </span>
            </div>

            <div className="w-full sm:w-auto text-center">
              <Button href="/publicacoes" variant="secondary" size="md" className="w-full sm:w-auto">
                Explorar Publicações →
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Legislações (Preview Enriquecido) */}
        <section id="legislacoes" className="clay-card-dark p-8 md:p-12 relative overflow-hidden bg-night text-ivory border border-stone-dark/30">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <SectionHeader
                eyebrow="Marco Legal & Normativas"
                title="Legislações"
                subtitle="Consulte as leis municipais, estatutos federais e o regimento interno que fundamentam a governança do SiMOP e salvaguardam o patrimônio de Ouro Preto."
                dark={true}
                className="mb-0"
              />
              <div className="hidden md:block shrink-0">
                <Button href="/legislacoes" variant="primary" size="md">
                  Repositório Completo →
                </Button>
              </div>
            </div>

            {/* Grid de Preview dos Atos Normativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Lei 305/2006 */}
              <Link
                href="/legislacoes#lei-305-2006"
                className="clay-card-dark p-5 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 hover:bg-stone-dark/30"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gold/15 text-gold border border-gold/30">
                      Municipal
                    </span>
                    <span className="text-[10px] text-stone-dark font-medium">
                      07/12/2006
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-ivory text-base group-hover:text-gold transition-colors leading-snug">
                      Lei nº 305/2006
                    </h3>
                    <p className="text-[11px] text-gold font-medium mt-0.5">
                      Criação do SiMOP
                    </p>
                  </div>
                  <p className="text-xs text-stone leading-relaxed line-clamp-3">
                    Institui e regulamenta o Sistema de Museus de Ouro Preto para organizar de forma integrada as instituições e atividades museais.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-stone-dark/40 flex items-center justify-between text-[11px] text-stone group-hover:text-gold transition-colors">
                  <span>Em vigor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Lei Federal 11.904/2009 */}
              <Link
                href="/legislacoes#lei-11904-2009"
                className="clay-card-dark p-5 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 hover:bg-stone-dark/30"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-deep/50 text-stone-light border border-stone-dark">
                      Federal
                    </span>
                    <span className="text-[10px] text-stone-dark font-medium">
                      14/01/2009
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-ivory text-base group-hover:text-gold transition-colors leading-snug">
                      Lei Federal nº 11.904/2009
                    </h3>
                    <p className="text-[11px] text-gold font-medium mt-0.5">
                      Estatuto dos Museus
                    </p>
                  </div>
                  <p className="text-xs text-stone leading-relaxed line-clamp-3">
                    Marco nacional com diretrizes para preservação, plano museológico, inventário, segurança e função social dos acervos.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-stone-dark/40 flex items-center justify-between text-[11px] text-stone group-hover:text-gold transition-colors">
                  <span>Em vigor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Lei Municipal 932/2014 */}
              <Link
                href="/legislacoes#lei-932-2014"
                className="clay-card-dark p-5 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 hover:bg-stone-dark/30"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gold/15 text-gold border border-gold/30">
                      Municipal
                    </span>
                    <span className="text-[10px] text-stone-dark font-medium">
                      12/12/2014
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-ivory text-base group-hover:text-gold transition-colors leading-snug">
                      Lei nº 932/2014
                    </h3>
                    <p className="text-[11px] text-gold font-medium mt-0.5">
                      Estatuto Municipal de Museus
                    </p>
                  </div>
                  <p className="text-xs text-stone leading-relaxed line-clamp-3">
                    Normas e diretrizes municipais para salvaguarda, qualificação dos profissionais e incentivo permanente à visitação pública.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-stone-dark/40 flex items-center justify-between text-[11px] text-stone group-hover:text-gold transition-colors">
                  <span>Em vigor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Regimento Interno 2026 */}
              <Link
                href="/legislacoes#regimento-interno-2026"
                className="clay-card-dark p-5 flex flex-col justify-between hover:border-gold group transition-all duration-300 bg-stone-dark/20 border border-stone-dark/40 hover:bg-stone-dark/30"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-dark/80 text-gold border border-gold/40">
                      Regimento
                    </span>
                    <span className="text-[10px] text-stone-dark font-medium">
                      Ano 2026
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-ivory text-base group-hover:text-gold transition-colors leading-snug">
                      Regimento Interno
                    </h3>
                    <p className="text-[11px] text-gold font-medium mt-0.5">
                      Governança do SiMOP
                    </p>
                  </div>
                  <p className="text-xs text-stone leading-relaxed line-clamp-3">
                    Regulamenta o Conselho Gestor com 16 instituições, reuniões deliberativas e as atribuições da Coordenação Executiva.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-stone-dark/40 flex items-center justify-between text-[11px] text-stone group-hover:text-gold transition-colors">
                  <span>Aprovado</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>

            {/* Link Adicional Mobile & Marcos Históricos */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-dark/40 text-xs text-stone">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-stone-dark font-medium">Marcos Históricos Adicionais:</span>
                <span className="inline-flex items-center gap-1.5 text-gold font-medium">
                  <Scale className="w-3.5 h-3.5" /> Tombamento IPHAN (1938)
                </span>
                <span className="text-stone-dark">•</span>
                <span className="inline-flex items-center gap-1.5 text-gold font-medium">
                  <Landmark className="w-3.5 h-3.5" /> Patrimônio Mundial UNESCO (1980)
                </span>
              </div>
              <div className="md:hidden w-full text-center">
                <Button href="/legislacoes" variant="primary" size="md" className="w-full">
                  Repositório Completo →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Memória e Eventos (Eixos do Repositório) */}
        <section id="memoria-e-eventos" className="clay-card p-6 sm:p-8 md:p-12 relative overflow-hidden bg-white border border-stone">
          <SectionHeader
            eyebrow="Agenda Cultural & Salvaguarda"
            title="Memória e Eventos"
            subtitle="Documentação histórica, registros e a salvaguarda da memória das grandes temporadas culturais dos museus de Ouro Preto."
            separator={false}
            className="mb-8 md:mb-10"
          />

          {/* Grid dos 3 Eixos do Repositório */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Eixo 1: Semana de Museus */}
            <Link
              href="/memoria-e-eventos"
              className="clay-card p-6 sm:p-7 bg-white border border-stone hover:border-gold group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all border border-gold/30">
                    <CalendarHeart className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold">
                    Maio • IBRAM
                  </span>
                </div>
                <h3 className="font-serif font-bold text-night text-xl mb-2 group-hover:text-gold transition-colors">
                  Semana de Museus
                </h3>
                <p className="text-xs text-stone-dark leading-relaxed">
                  Mobilização nacional em comemoração ao Dia Internacional dos Museus, reunindo seminários, visitas mediadas e programações simultâneas nas instituições do circuito.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-stone/60 flex items-center justify-between text-xs text-night font-bold uppercase tracking-wider group-hover:text-gold transition-colors">
                <span>Ver edições & fotos</span>
                <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Eixo 2: Primavera de Museus */}
            <Link
              href="/memoria-e-eventos"
              className="clay-card p-6 sm:p-7 bg-white border border-stone hover:border-gold group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all border border-gold/30">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold">
                    Setembro • Edições
                  </span>
                </div>
                <h3 className="font-serif font-bold text-night text-xl mb-2 group-hover:text-gold transition-colors">
                  Primavera de Museus
                </h3>
                <p className="text-xs text-stone-dark leading-relaxed">
                  Temporada temática que celebra a chegada da primavera na cidade histórica, promovendo reflexões contemporâneas, novas exposições e diálogo com a comunidade.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-stone/60 flex items-center justify-between text-xs text-night font-bold uppercase tracking-wider group-hover:text-gold transition-colors">
                <span>Ver edições & fotos</span>
                <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Eixo 3: Acervo de Fotos & Documentação */}
            <Link
              href="/memoria-e-eventos"
              className="clay-card p-6 sm:p-7 bg-white border border-stone hover:border-gold group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all border border-gold/30">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold">
                    Arquivo Digital
                  </span>
                </div>
                <h3 className="font-serif font-bold text-night text-xl mb-2 group-hover:text-gold transition-colors">
                  Acervo de Fotos
                </h3>
                <p className="text-xs text-stone-dark leading-relaxed">
                  Repositório iconográfico para salvaguarda de registros do patrimônio edificado, arquitetura colonial, festividades e memórias das instituições de Ouro Preto.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-stone/60 flex items-center justify-between text-xs text-night font-bold uppercase tracking-wider group-hover:text-gold transition-colors">
                <span>Explorar acervo</span>
                <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

          {/* Rodapé & Navegação */}
          <div className="mt-8 pt-6 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-stone-dark">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Semana de Museus
              </span>
              <span className="text-stone-dark/40 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Primavera de Museus
              </span>
              <span className="text-stone-dark/40 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Acervo Fotográfico
              </span>
            </div>

            <div className="w-full sm:w-auto text-center">
              <Button href="/memoria-e-eventos" variant="secondary" size="md" className="w-full sm:w-auto">
                Conhecer Memória e Eventos →
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
