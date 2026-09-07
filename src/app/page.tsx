import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { ArrowRight, Landmark, FileText, Scale, BookOpen, CalendarHeart, Compass, Search, Users, UserCog, UserCheck, History, Book, Image as ImageIcon, Library } from "lucide-react";
import { getFeaturedMuseums } from "@/lib/museums";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MuseumAccordionMobile } from "@/components/museum/MuseumAccordionMobile";
import { MuseumGrid } from "@/components/museum/MuseumGrid";
import { Button } from "@/components/ui/Button";
import { getAcervoPhotos, getLatestEventEdition, getEventPhotos, getPhotoUrl } from "@/lib/memoria";

export const revalidate = 60;

export default async function HomePage() {
  const featuredMuseums = getFeaturedMuseums();

  // Buscar preview para os cards de Memória e Eventos
  const previewAcervo = await getAcervoPhotos(1);
  const semanaEdition = await getLatestEventEdition("semana_de_museus");
  const previewSemana = semanaEdition ? await getEventPhotos(semanaEdition.id, 1) : [];
  const primaveraEdition = await getLatestEventEdition("primavera_de_museus");
  const previewPrimavera = primaveraEdition ? await getEventPhotos(primaveraEdition.id, 1) : [];

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
                  <div className="flex -space-x-2.5" title="Ranielle Figueiredo, Matheus Bernardes e Stella Ker">
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative group-hover:ring-gold transition-all" title="Ranielle Menezes de Figueiredo — Coordenadora Executiva">
                      <img
                        src="/images/sobre/ranielle-figueiredo.webp"
                        alt="Ranielle Menezes de Figueiredo"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative group-hover:ring-gold transition-all" title="Matheus José Mendes Bernardes — Coordenador Executivo">
                      <img
                        src="/images/sobre/matheus-bernardes.webp"
                        alt="Matheus José Mendes Bernardes"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-night overflow-hidden ring-1 ring-gold/40 shadow-md bg-stone-dark relative group-hover:ring-gold transition-all" title="Stella de Abreu Alves Ker — Monitora e Equipe Técnica">
                      <img
                        src="/images/sobre/stella-ker.webp"
                        alt="Stella de Abreu Alves Ker"
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

        {/* 3. Publicações */}
        <section id="publicacoes">
          <SectionHeader
            eyebrow="Pesquisa & Conhecimento"
            title="Publicações"
            subtitle="Acesse nosso acervo bibliográfico, editoriais e catálogos desenvolvidos pelos pesquisadores."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/publicacoes" className="clay-card p-6 flex flex-col justify-between hover:border-gold group transition-all border border-stone-light/50">
              <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gold/20">
                <Book className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-night text-lg mb-1 group-hover:text-gold transition-colors">
                  Publicações SIMOP
                </h3>
                <p className="text-xs text-blue-deep leading-relaxed">
                  Artigos, catálogos e boletins.
                </p>
              </div>
            </Link>
            
            <Link href="/publicacoes" className="clay-card p-6 flex flex-col justify-between hover:border-gold group transition-all border border-stone-light/50">
              <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gold/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-night text-lg mb-1 group-hover:text-gold transition-colors">
                  Olhar Museu (Editorial)
                </h3>
                <p className="text-xs text-blue-deep leading-relaxed">
                  Nossa coluna editorial oficial.
                </p>
              </div>
            </Link>

            <Link href="/publicacoes" className="clay-card p-6 flex flex-col justify-between hover:border-gold group transition-all border border-stone-light/50">
              <div className="w-12 h-12 rounded-none bg-gold/15 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gold/20">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-night text-lg mb-1 group-hover:text-gold transition-colors">
                  Ouro Preto: Museus (2014)
                </h3>
                <p className="text-xs text-blue-deep leading-relaxed">
                  Material histórico de 2014.
                </p>
              </div>
            </Link>
          </div>
          
          <div className="text-center">
            <Button href="/publicacoes" variant="secondary" size="md">
              Acessar Publicações →
            </Button>
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

        {/* 5. Memória e Eventos */}
        <section className="clay-card p-8 md:p-12 relative overflow-hidden bg-white">
          <SectionHeader
            eyebrow="Agenda & Registro"
            title="Memória e Eventos"
            subtitle="Explore os registros fotográficos, exposições passadas e acompanhe a agenda cultural das instituições que compõem o SIMOP."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            
            {/* Card Acervo */}
            <Link href="/memoria-e-eventos" className="relative h-64 sm:h-72 lg:h-80 flex flex-col justify-end p-6 group overflow-hidden border border-stone transition-all hover:border-gold">
              <div className="absolute inset-0 bg-stone-300">
                {previewAcervo[0] && (
                  <img
                    src={getPhotoUrl(previewAcervo[0].storage_path)}
                    alt="Preview Acervo"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/50 to-transparent group-hover:via-night/60 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-none bg-gold/20 text-gold flex items-center justify-center mb-4 backdrop-blur-sm border border-gold/30 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-ivory text-xl mb-1.5 group-hover:text-gold transition-colors">
                  Acervo de Fotos
                </h3>
                <p className="text-xs text-stone leading-relaxed">
                  Registros visuais e memória institucional dos museus de Ouro Preto.
                </p>
              </div>
            </Link>

            {/* Card Semana de Museus */}
            <Link href="/memoria-e-eventos" className="relative h-64 sm:h-72 lg:h-80 flex flex-col justify-end p-6 group overflow-hidden border border-stone transition-all hover:border-gold">
              <div className="absolute inset-0 bg-stone-300">
                {previewSemana[0] && (
                  <img
                    src={getPhotoUrl(previewSemana[0].storage_path)}
                    alt="Preview Semana de Museus"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/50 to-transparent group-hover:via-night/60 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-none bg-gold/20 text-gold flex items-center justify-center mb-4 backdrop-blur-sm border border-gold/30 group-hover:scale-110 transition-transform">
                  <CalendarHeart className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-ivory text-xl mb-1.5 group-hover:text-gold transition-colors">
                  Semana de Museus
                </h3>
                <p className="text-xs text-stone leading-relaxed">
                  {semanaEdition ? `Reviva a edição de ${semanaEdition.year}. ` : ""}Edições, programações e imagens históricas.
                </p>
              </div>
            </Link>

            {/* Card Primavera de Museus */}
            <Link href="/memoria-e-eventos" className="relative h-64 sm:h-72 lg:h-80 flex flex-col justify-end p-6 group overflow-hidden border border-stone transition-all hover:border-gold">
              <div className="absolute inset-0 bg-stone-300">
                {previewPrimavera[0] && (
                  <img
                    src={getPhotoUrl(previewPrimavera[0].storage_path)}
                    alt="Preview Primavera de Museus"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/50 to-transparent group-hover:via-night/60 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-none bg-gold/20 text-gold flex items-center justify-center mb-4 backdrop-blur-sm border border-gold/30 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-ivory text-xl mb-1.5 group-hover:text-gold transition-colors">
                  Primavera de Museus
                </h3>
                <p className="text-xs text-stone leading-relaxed">
                  {primaveraEdition ? `Recorde a edição de ${primaveraEdition.year}. ` : ""}Celebração anual do patrimônio e da cultura.
                </p>
              </div>
            </Link>

          </div>
          
          <div className="text-center">
            <Button href="/memoria-e-eventos" variant="secondary" size="md">
              Saber mais →
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
