import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Compass } from "lucide-react";
import { museums } from "@/data/museums";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-night text-stone border-t border-stone-dark/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group mb-2">
              <img
                src="/images/logo-simop.webp"
                alt="SIMOP – Sistema Interno de Museus de Ouro Preto"
                className="h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </Link>
            <p className="text-sm text-stone leading-relaxed">
              Plataforma dedicada à preservação, consulta e divulgação do patrimônio histórico, artístico e cultural dos museus de Ouro Preto, Minas Gerais.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gold">
              <Compass className="w-4 h-4" />
              <span>Patrimônio Cultural da Humanidade — UNESCO</span>
            </div>
          </div>

          {/* Museums Column */}
          <div>
            <h3 className="font-serif text-ivory text-base font-bold mb-4 uppercase tracking-wider text-gold">
              Museus
            </h3>
            <ul className="space-y-2.5 text-sm">
              {museums.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/museus/${m.slug}`}
                    className="hover:text-gold-light transition-colors line-clamp-1"
                  >
                    {m.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Column */}
          <div>
            <h3 className="font-serif text-ivory text-base font-bold mb-4 uppercase tracking-wider text-gold">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-light transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/museus" className="hover:text-gold-light transition-colors">
                  Catálogo de Museus
                </Link>
              </li>
              <li>
                <Link href="/buscar" className="hover:text-gold-light transition-colors">
                  Explorar e Buscar
                </Link>
              </li>
              <li>
                <Link href="/tecnologia" className="hover:text-gold-light transition-colors">
                  Tecnologia
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Info Column */}
          <div>
            <h3 className="font-serif text-ivory text-base font-bold mb-4 uppercase tracking-wider text-gold">
              Institucional
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Ouro Preto, Minas Gerais — Brasil</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>contato@museusdeouropreto.org.br</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>(31) 3551-0000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-dark/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-dark">
          <p className="text-center md:text-left">
            © 2026 Portal dos Museus de Ouro Preto. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2.5">
            <span>Desenvolvido por</span>
            <a
              href="https://www.origemdev.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-transform hover:scale-105 duration-200"
              aria-label="Origem Desenvolvimento"
              title="Origem Desenvolvimento"
            >
              <img
                src="/images/logo-origem.webp"
                alt="Origem Desenvolvimento"
                className="h-6 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
