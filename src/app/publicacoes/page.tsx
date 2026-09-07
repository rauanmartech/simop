import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { OlharMuseuService, OlharMuseuPost } from "@/lib/olharMuseuService";

export const metadata = {
  title: "Publicações — Sistema de Museus de Ouro Preto (SIMOP)",
  description:
    "Hub editorial e repositório de publicações do Sistema de Museus de Ouro Preto e do projeto Olhar Museu.",
};

export const revalidate = 60; // ISR: revalida a cada 60s

// URL base do Olhar Museu para links externos
const OLHAR_MUSEU_URL = process.env.NEXT_PUBLIC_OLHAR_MUSEU_URL || "http://localhost:3001";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function PostImage({ post }: { post: OlharMuseuPost }) {
  const url = post.featured_image?.public_url;
  const alt = post.featured_image?.alt_text || post.title;

  if (url) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return <ImagePlaceholder className="transition-transform duration-500 group-hover:scale-105" />;
}

function SmallPostImage({ post }: { post: OlharMuseuPost }) {
  const url = post.featured_image?.public_url;
  const alt = post.featured_image?.alt_text || post.title;

  if (url) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 96px, 144px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    );
  }
  return <ImagePlaceholder className="transition-transform duration-300 group-hover:scale-105" />;
}

export default async function PublicacoesPage() {
  // Busca dados do Olhar Museu em paralelo
  const featuredPost = await OlharMuseuService.getFeaturedPost();
  const secondaryPosts = await OlharMuseuService.getLatestPosts(
    3,
    featuredPost ? [featuredPost.id] : []
  );
  const latestPosts = await OlharMuseuService.getLatestPosts(
    3,
    [
      ...(featuredPost ? [featuredPost.id] : []),
      ...secondaryPosts.map((p) => p.id),
    ]
  );

  return (
    <div className="space-y-16 md:space-y-24 pb-24">
      {/* ========================================================================= */}
      {/* 0. HERO / CABEÇALHO EDITORIAL INSTITUCIONAL                               */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-night text-ivory border-b border-stone-dark/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>Hub de Conteúdo Editorial</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
              Publicações & <span className="text-gold italic font-serif">Produção Editorial</span>
            </h1>

            <p className="text-base sm:text-xl text-stone font-light leading-relaxed">
              Espaço dedicado à produção, circulação e disseminação de pesquisas, reflexões e registros
              sobre o patrimônio museológico de Ouro Preto, articulando a rede de instituições e o projeto Olhar Museu.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-dark border-t border-stone-dark/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span className="text-stone">Destaques Editoriais</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span className="text-stone">Projeto Olhar Museu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span className="text-stone">Acervo & Artigos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. SEÇÃO PRINCIPAL: PUBLICAÇÕES                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Seção de Publicações">
        <SectionHeader
          eyebrow="Curadoria Editorial"
          title="Publicações"
          subtitle="Confira as principais notícias e coberturas produzidas pelo projeto Olhar Museu sobre o patrimônio e os museus de Ouro Preto."
        />

        <div className="space-y-10">
          {/* 1.1 CARD PRINCIPAL EM DESTAQUE (MANCHETE EDITORIAL) */}
          {featuredPost ? (
            <article className="clay-card bg-white p-6 sm:p-8 lg:p-10 border border-stone hover:border-gold transition-all duration-300 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* Imagem da notícia destaque (7 colunas no desktop) */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-stone">
                    <PostImage post={featuredPost} />
                    {featuredPost.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-night/90 text-gold text-xs font-bold uppercase tracking-wider border border-gold/40">
                          {featuredPost.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informações da Manchete (5 colunas no desktop) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-stone-dark font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{formatDate(featuredPost.published_at)}</span>
                      </div>
                      {featuredPost.reading_time_minutes > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            <span>{featuredPost.reading_time_minutes} min de leitura</span>
                          </div>
                        </>
                      )}
                    </div>

                    <h2 className="font-serif font-bold text-night text-2xl sm:text-3xl lg:text-4xl leading-tight group-hover:text-gold transition-colors">
                      {featuredPost.title}
                    </h2>

                    {featuredPost.excerpt && (
                      <p className="text-sm sm:text-base text-blue-deep font-normal leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-stone/60 flex items-center justify-between">
                    <Link
                      href={`${OLHAR_MUSEU_URL}/noticias/${featuredPost.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-night hover:text-gold transition-colors"
                    >
                      <span>Acessar publicação</span>
                      <ArrowUpRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                    <span className="text-xs text-stone-dark font-mono">
                      [ Edição Destaque ]
                    </span>
                  </div>
                </div>

              </div>
            </article>
          ) : (
            /* Fallback se não houver destaque */
            <article className="clay-card bg-white p-8 border border-stone text-center text-stone-dark">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-mono">Nenhuma publicação em destaque no momento.</p>
            </article>
          )}

          {/* 1.2 TRÊS CARDS SECUNDÁRIOS */}
          {secondaryPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {secondaryPosts.map((post) => (
                <article
                  key={post.id}
                  className="clay-card bg-white p-4 sm:p-5 md:p-6 border border-stone hover:border-gold transition-all duration-300 flex flex-row md:flex-col justify-between gap-4 md:gap-0 group"
                >
                  <div className="flex flex-row md:flex-col gap-3.5 md:gap-4 flex-1 min-w-0">
                    <div className="relative w-28 sm:w-36 md:w-full aspect-[4/3] md:aspect-[16/10] shrink-0 overflow-hidden border border-stone">
                      <SmallPostImage post={post} />
                      {post.category && (
                        <div className="absolute top-2 left-2 md:top-3 md:left-3">
                          <span className="px-2 py-0.5 bg-night/90 text-gold text-[10px] md:text-[11px] font-bold uppercase tracking-wider border border-gold/30">
                            {post.category.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 md:space-y-3 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] text-stone-dark font-mono">
                        <Calendar className="w-3 h-3 text-gold shrink-0" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>

                      <h3 className="font-serif font-bold text-night text-sm sm:text-base md:text-lg lg:text-xl leading-snug group-hover:text-gold transition-colors line-clamp-2 md:line-clamp-none">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-xs text-blue-deep leading-relaxed hidden sm:block md:block line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 md:pt-4 md:mt-6 md:border-t md:border-stone/50 flex items-center justify-end md:justify-between shrink-0 self-center md:self-auto">
                    <Link
                      href={`${OLHAR_MUSEU_URL}/noticias/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
                    >
                      <span className="hidden md:inline">Ler publicação</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* 1.3 NAVEGAÇÃO DA SEÇÃO */}
          <div className="pt-6 flex justify-center">
            <Link
              href={`${OLHAR_MUSEU_URL}/noticias`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-night text-ivory text-xs uppercase tracking-widest font-semibold border border-night hover:bg-gold hover:text-night hover:border-gold transition-all duration-200 shadow-sm"
            >
              <span>Ver todas as publicações</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO: OLHAR MUSEU (APRESENTAÇÃO DO PROJETO EDITORIAL)                */}
      {/* ========================================================================= */}
      <section className="bg-night text-ivory border-y border-stone-dark/30 py-16 md:py-24 relative overflow-hidden" aria-label="Seção Olhar Museu">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Bloco de Texto Institucional Olhar Museu (7 colunas) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-8 bg-gold rounded-none" />
                <span className="text-xs uppercase tracking-widest font-semibold text-gold">
                  Informativo do SiMOP
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ivory tracking-tight">
                Olhar Museu
              </h2>

              <div className="space-y-4 text-stone text-sm sm:text-base font-light leading-relaxed">
                <p>
                  O Olhar Museu é um informativo do Sistema de Museus de Ouro Preto (SiMOP) voltado à divulgação das ações dos museus e instituições que integram o Sistema, reunindo conteúdos relacionados ao patrimônio, à memória, à cultura e à museologia em Ouro Preto. Ao longo de sua trajetória, a publicação tem acompanhado diferentes momentos da atuação do SiMOP, compartilhando notícias, projetos, atividades e experiências do universo museológico da cidade.
                </p>
                <p>
                  O informativo também se constitui como um espaço de aproximação entre os museus e a comunidade, ampliando as possibilidades de diálogo e participação. Em diferentes edições, o Olhar Museu abriu espaço para contribuições de moradores, profissionais, pesquisadores, estudantes e colaboradores, reunindo diferentes experiências e olhares sobre a cidade e seu patrimônio.
                </p>
                <p>
                  Em 2013, por exemplo, uma de suas edições contou com textos produzidos pela própria comunidade a partir do tema &quot;gentileza&quot;, evidenciando essa proposta de troca e construção coletiva. Em 2012, a publicação chegou à sua 10ª edição, lançada durante a 6ª Primavera dos Museus, com o tema &quot;Os Museus estão na Moda&quot;.
                </p>
                <p className="text-xs sm:text-sm text-stone-dark border-t border-stone-dark/40 pt-3">
                  Desde então, o Olhar Museu integra as iniciativas de comunicação do SiMOP, contribuindo para o registro de suas ações, a circulação de conhecimentos e o fortalecimento das relações entre os museus, o patrimônio cultural e a comunidade.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-gold">
                <span className="px-3 py-1 bg-gold/10 border border-gold/30">
                  Difusão & Memória Museal
                </span>
                <span className="px-3 py-1 bg-gold/10 border border-gold/30">
                  Participação Comunitária
                </span>
              </div>
            </div>

            {/* Espaço Visual Editorial Complementar (5 colunas) */}
            <div className="lg:col-span-5">
              <div className="clay-card-dark p-4 sm:p-6 bg-[#2e1f0e] border border-stone-dark/40 space-y-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-stone-dark/40 bg-[#3d2b14]">
                  <Image
                    src="/images/publicacoes/capa-olhar-museu.webp"
                    alt="Capa do informativo Olhar Museu"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain object-center"
                    priority
                  />
                </div>

                <div className="space-y-3 pt-1 border-t border-stone-dark/40">
                  <div className="flex items-center justify-between text-xs text-stone-dark">
                    <span className="font-mono text-gold">Marcos do Informativo</span>
                    <span className="text-[11px] uppercase tracking-wider text-stone">SiMOP</span>
                  </div>

                  <div className="space-y-2 text-xs text-stone leading-relaxed">
                    <div className="p-2.5 bg-night/80 border border-stone-dark/30 flex items-start gap-2">
                      <span className="text-gold font-mono font-bold">2012</span>
                      <span className="text-[11px]">10ª edição na 6ª Primavera dos Museus (&quot;Os Museus estão na Moda&quot;).</span>
                    </div>
                    <div className="p-2.5 bg-night/80 border border-stone-dark/30 flex items-start gap-2">
                      <span className="text-gold font-mono font-bold">2013</span>
                      <span className="text-[11px]">Edição colaborativa comunitária com a temática &quot;Gentileza&quot;.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEÇÃO: ÚLTIMAS PUBLICAÇÕES DO OLHAR MUSEU                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Últimas Publicações do Olhar Museu">
        <SectionHeader
          eyebrow="Olhar Museu"
          title="Últimas Publicações"
          subtitle="Informativo do SiMOP voltado à divulgação das ações dos museus, registros de memória e fortalecimento das relações com a comunidade."
        />

        <div className="space-y-6">
          <div className="divide-y divide-stone/60 border-y border-stone/60 bg-white shadow-sm">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <article
                  key={post.id}
                  className="p-3.5 sm:p-5 md:p-6 hover:bg-ivory/50 transition-colors duration-200 group"
                >
                  <Link
                    href={`${OLHAR_MUSEU_URL}/noticias/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-start sm:items-center gap-3 sm:gap-6 justify-between"
                  >
                    {/* Imagem Compacta + Título & Metadados */}
                    <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-6 flex-1 min-w-0">
                      <div className="relative w-24 sm:w-36 md:w-44 aspect-[4/3] sm:aspect-[16/10] shrink-0 overflow-hidden border border-stone">
                        <SmallPostImage post={post} />
                      </div>

                      <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                          {post.category && (
                            <span className="px-2 py-0.5 bg-gold/15 border border-gold/40 text-gold text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                              {post.category.name}
                            </span>
                          )}
                          <span className="text-stone-dark font-mono text-[10px] sm:text-[11px] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gold" />
                            {formatDate(post.published_at)}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-night text-sm sm:text-base md:text-lg leading-snug group-hover:text-gold transition-colors line-clamp-2 sm:line-clamp-none">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-xs text-stone-dark line-clamp-2 leading-relaxed hidden sm:block">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Seta Clicável */}
                    <div className="self-center shrink-0 pl-1 sm:pl-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border border-stone group-hover:border-gold group-hover:bg-gold group-hover:text-night text-stone-dark transition-all duration-200">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <div className="p-10 text-center text-stone-dark font-mono text-sm">
                Nenhuma publicação recente disponível.
              </div>
            )}
          </div>

          {/* 3.1 NAVEGAÇÃO DO OLHAR MUSEU */}
          <div className="pt-6 flex justify-center">
            <Link
              href={`${OLHAR_MUSEU_URL}/noticias`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-night text-ivory text-xs uppercase tracking-widest font-semibold border border-night hover:bg-gold hover:text-night hover:border-gold transition-all duration-200 shadow-sm"
            >
              <span>Ver todas no Olhar Museu</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
