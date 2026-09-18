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
  const mapQuery = encodeURIComponent(`${nomeMuseu}, ${localizacao.endereco}, ${localizacao.cidade} - ${localizacao.estado}`);
  const googleMapsUrl = `https://maps.google.com/?q=${mapQuery}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

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

        {/* Map Embed Card */}
        <div className="lg:col-span-2 clay-card overflow-hidden relative min-h-[350px] flex flex-col justify-between bg-stone/10 border border-stone p-0 group">
          <div className="w-full h-[320px] sm:h-[380px] lg:h-full min-h-[300px] relative">
            <iframe
              title={`Mapa de localização - ${nomeMuseu}`}
              src={mapEmbedUrl}
              className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
              allowFullScreen
            />
            <div className="absolute top-3 right-3 z-10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-night/90 text-gold text-xs font-bold uppercase tracking-wider border border-gold/40 hover:bg-gold hover:text-night transition-all duration-200 shadow-md backdrop-blur-sm"
              >
                <span>Abrir no Google Maps</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
