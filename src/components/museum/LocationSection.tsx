import React from "react";
import { MapPin, Navigation, Compass } from "lucide-react";
import { LocationInfo } from "@/types/museum";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface LocationSectionProps {
  localizacao: LocationInfo;
  nomeMuseu: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  localizacao,
  nomeMuseu,
}) => {
  return (
    <section id="localizacao" className="py-12 border-t border-stone/60">
      <SectionHeader
        eyebrow="Como chegar"
        title="Localização & Mapa"
        subtitle="Endereço no centro histórico de Ouro Preto e orientações de acesso."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Address Card */}
        <div className="clay-card p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-none bg-gold/15 text-gold flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>

            <h3 className="font-serif font-bold text-night text-xl">{nomeMuseu}</h3>

            <div className="space-y-2 text-sm text-blue-deep">
              <p className="font-medium text-night">{localizacao.endereco}</p>
              <p>Bairro: {localizacao.bairro}</p>
              <p>
                {localizacao.cidade} — {localizacao.estado}
              </p>
              {localizacao.cep && <p>CEP: {localizacao.cep}</p>}
            </div>
          </div>

          <div className="pt-6 border-t border-stone/50 mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
            <Compass className="w-4 h-4" />
            <span>Centro Histórico</span>
          </div>
        </div>

        {/* Map Representation Card */}
        <div className="lg:col-span-2 clay-card overflow-hidden relative min-h-[300px] flex items-center justify-center bg-stone/20 p-8 text-center">
          <div className="relative z-10 max-w-md space-y-4">
            <div className="w-14 h-14 rounded-none bg-night text-gold flex items-center justify-center mx-auto shadow-lg border border-gold/40">
              <Navigation className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-night text-lg">Mapa de Ouro Preto</h4>
            <p className="text-sm text-blue-deep leading-relaxed">
              {localizacao.endereco}, {localizacao.bairro}, {localizacao.cidade} - {localizacao.estado}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${nomeMuseu}, ${localizacao.endereco}, ${localizacao.cidade}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-gold text-night text-xs uppercase tracking-wider font-bold hover:bg-gold-light transition-colors border border-transparent hover:border-night"
            >
              <span>Abrir no Google Maps</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
