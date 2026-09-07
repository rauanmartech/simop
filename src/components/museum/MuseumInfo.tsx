import React from "react";
import { Clock, Ticket, Timer, Accessibility, Phone, Mail, Globe, Instagram } from "lucide-react";
import { VisitingInfo, ContactInfo } from "@/types/museum";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface MuseumInfoProps {
  visitacao: VisitingInfo;
  acessibilidade: string;
  contato: ContactInfo;
}

export const MuseumInfo: React.FC<MuseumInfoProps> = ({
  visitacao,
  acessibilidade,
  contato,
}) => {
  return (
    <section id="visitacao" className="py-12 border-t border-stone/60">
      <SectionHeader
        eyebrow="Planeje sua visita"
        title="Informações Práticas & Acessibilidade"
        subtitle="Consulte horários, ingresso, regras de acesso e recursos disponíveis."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Horários & Entrada Card */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-none bg-gold/15 text-gold flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-night text-lg">Funcionamento</h3>
            <div className="space-y-2 text-sm text-blue-deep">
              <div>
                <span className="font-semibold text-night block">Horário:</span>
                <span>{visitacao.horario}</span>
              </div>
              {visitacao.ultimo_acesso && (
                <div>
                  <span className="font-semibold text-night block">Último Acesso:</span>
                  <span>{visitacao.ultimo_acesso}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ingresso & Duração Card */}
        <div className="clay-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-none bg-gold/15 text-gold flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-night text-lg">Ingressos & Duração</h3>
            <div className="space-y-2 text-sm text-blue-deep">
              <div>
                <span className="font-semibold text-night block">Entrada:</span>
                <span>{visitacao.entrada}</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <Timer className="w-4 h-4 text-gold shrink-0" />
                <span>Duração média: {visitacao.duracao_visita}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acessibilidade Card */}
        <div className="clay-card p-6 flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-none bg-gold/15 text-gold flex items-center justify-center">
              <Accessibility className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-night text-lg">Acessibilidade</h3>
            <p className="text-sm text-blue-deep leading-relaxed">
              {acessibilidade}
            </p>
          </div>
        </div>
      </div>

      {/* Contato Box */}
      <div className="mt-6 clay-card-dark p-6 md:p-8 text-ivory flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h4 className="font-serif font-bold text-lg text-gold mb-1">Contato & Redes</h4>
          <p className="text-xs text-stone">Dúvidas sobre agendamento e informações institucionais</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-stone">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold shrink-0" />
            <span>{contato.telefone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gold shrink-0" />
            <span>{contato.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold shrink-0" />
            <span>{contato.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-gold shrink-0" />
            <span>{contato.instagram}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
