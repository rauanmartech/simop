import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { museums } from "@/data/museums";
import { getMuseumBySlug, getRelatedMuseums } from "@/lib/museums";

import { MuseumHero } from "@/components/museum/MuseumHero";
import { MuseumHistory } from "@/components/museum/MuseumHistory";
import { MuseumCollection } from "@/components/museum/MuseumCollection";
import { MuseumInfo } from "@/components/museum/MuseumInfo";
import { LocationSection } from "@/components/museum/LocationSection";
import { Gallery } from "@/components/museum/Gallery";
import { RelatedMuseums } from "@/components/museum/RelatedMuseums";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return museums.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const museum = getMuseumBySlug(slug);

  if (!museum) {
    return {
      title: "Museu não encontrado — Museus de Ouro Preto",
    };
  }

  return {
    title: `${museum.nome} — Museus de Ouro Preto`,
    description: museum.descricao_curta,
    openGraph: {
      title: `${museum.nome} — Portal dos Museus de Ouro Preto`,
      description: museum.descricao_curta,
      images: [
        {
          url: museum.imagem_capa,
          width: 1200,
          height: 630,
          alt: museum.nome,
        },
      ],
    },
  };
}

export default async function MuseumDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const museum = getMuseumBySlug(slug);

  if (!museum) {
    notFound();
  }

  const relatedMuseums = getRelatedMuseums(museum.slug);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <MuseumHero museum={museum} />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
        {/* 2. Resumo & Sobre Section */}
        <section id="sobre" className="space-y-8">
          {/* Resumo Banner */}
          <div className="clay-card p-8 md:p-12 border-l-4 border-l-gold bg-white">
            <h2 className="text-xs uppercase tracking-widest font-bold text-gold mb-3">
              Resumo Institucional
            </h2>
            <p className="text-lg md:text-2xl font-serif text-night font-semibold leading-relaxed">
              {museum.resumo}
            </p>
          </div>

          {/* Sobre Text Blocks */}
          <div className="clay-card p-8 md:p-12">
            <SectionHeader
              eyebrow="A Instituição"
              title={`Sobre o ${museum.nome_curto}`}
              subtitle="Visão geral, missão de preservação e contexto de constituição do espaço."
            />
            <div className="prose prose-lg max-w-none text-blue-deep space-y-6">
              {museum.sobre.split("\n\n").map((p, idx) => (
                <p key={idx} className="text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 3. História Section */}
        <MuseumHistory historia={museum.historia} />

        {/* 4. Acervo & Destaques Section */}
        <MuseumCollection acervo={museum.acervo} destaques={museum.destaques} />

        {/* 5. Visitação, Acessibilidade & Contato */}
        <MuseumInfo
          visitacao={museum.visitacao}
          acessibilidade={museum.acessibilidade}
          contato={museum.contato}
        />

        {/* 6. Localização & Mapa */}
        <LocationSection localizacao={museum.localizacao} nomeMuseu={museum.nome} />

        {/* 7. Galeria de Imagens */}
        <Gallery items={museum.galeria} />

        {/* 8. Museus Relacionados */}
        <RelatedMuseums museums={relatedMuseums} />
      </div>
    </div>
  );
}
