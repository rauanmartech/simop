import React from "react";
import { Metadata } from "next";
import {
  getEventEditions,
  getEventPhotos,
} from "@/lib/memoria";
import { EventEditionDetail } from "@/components/memoria/EventEditionDetail";
import { EmptyState } from "@/components/memoria/EmptyState";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const editions = await getEventEditions("semana_de_museus");
  const latestEdition = editions[0];

  if (!latestEdition) {
    return {
      title: "Semana de Museus — Memória e Eventos | SIMOP",
      description:
        "Registros, programações e memória histórica das edições da Semana de Museus em Ouro Preto.",
    };
  }

  return {
    title: `Semana de Museus ${latestEdition.year} | SIMOP`,
    description:
      latestEdition.subtitle ||
      latestEdition.description ||
      `Registros e acervo da Semana de Museus ${latestEdition.year} em Ouro Preto.`,
  };
}

export default async function SemanaDeMuseusPage() {
  const editions = await getEventEditions("semana_de_museus");

  if (!editions || editions.length === 0) {
    return (
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Nenhuma edição da Semana de Museus cadastrada"
          message="As edições e memórias da Semana de Museus estão sendo integradas ao repositório digital."
          backHref="/memoria-e-eventos"
          backLabel="Voltar para Memória e Eventos"
        />
      </div>
    );
  }

  const latestEdition = editions[0];
  const photos = await getEventPhotos(latestEdition.id, 6);

  return (
    <EventEditionDetail
      eventType="semana_de_museus"
      edition={latestEdition}
      allEditions={editions}
      photos={photos}
    />
  );
}
