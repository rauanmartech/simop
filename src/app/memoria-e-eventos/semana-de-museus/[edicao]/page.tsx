import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getEventEditionByYear,
  getEventEditions,
  getEventPhotos,
} from "@/lib/memoria";
import { EventEditionDetail } from "@/components/memoria/EventEditionDetail";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    edicao: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { edicao } = await params;
  const year = parseInt(edicao, 10);

  if (isNaN(year)) {
    return {
      title: "Edição não encontrada | SIMOP",
    };
  }

  const edition = await getEventEditionByYear("semana_de_museus", year);
  if (!edition) {
    return {
      title: "Edição não encontrada | SIMOP",
    };
  }

  return {
    title: `Semana de Museus ${edition.year} | SIMOP`,
    description:
      edition.subtitle ||
      edition.description ||
      `Registros e acervo da Semana de Museus ${edition.year} em Ouro Preto.`,
  };
}

export default async function SemanaDeMuseusEdicaoPage({ params }: PageProps) {
  const { edicao } = await params;
  const year = parseInt(edicao, 10);

  if (isNaN(year)) {
    notFound();
  }

  const [edition, allEditions] = await Promise.all([
    getEventEditionByYear("semana_de_museus", year),
    getEventEditions("semana_de_museus"),
  ]);

  if (!edition) {
    notFound();
  }

  const photos = await getEventPhotos(edition.id, 6);

  return (
    <EventEditionDetail
      eventType="semana_de_museus"
      edition={edition}
      allEditions={allEditions}
      photos={photos}
    />
  );
}
