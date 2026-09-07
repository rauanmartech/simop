"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/museus", label: "Museus" },
    { href: "/institucional", label: "Institucional" },
    { href: "/publicacoes", label: "Publicações" },
    { href: "/legislacoes", label: "Legislações" },
    { href: "/memoria-e-eventos", label: "Memória e Eventos" },
    { href: "/tecnologia", label: "Tecnologia" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-night border-b border-stone-dark/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center self-stretch py-2 group">
            <img
              src="/images/logo-simop.webp"
              alt="SIMOP – Sistema Interno de Museus de Ouro Preto"
              className="h-full w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação Principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                  isActive(link.href)
                    ? "text-gold font-semibold"
                    : "text-ivory hover:text-gold-light"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/buscar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-blue-deep text-ivory text-xs uppercase tracking-wider font-semibold hover:border-gold hover:text-gold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buscar</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/buscar"
              aria-label="Buscar museus"
              className="p-2 text-ivory hover:text-gold transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ivory hover:text-gold transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-night/95 backdrop-blur-lg border-b border-stone-dark/40 px-6 py-6 transition-all duration-300 animate-fadeIn">
          <nav className="flex flex-col gap-4" aria-label="Menu Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-base font-medium border-b border-stone-dark/20 flex items-center justify-between ${
                  isActive(link.href)
                    ? "text-gold font-bold pl-2 border-l-2 border-l-gold"
                    : "text-ivory hover:text-gold-light"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-stone-dark">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
