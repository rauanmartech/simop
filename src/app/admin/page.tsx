"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Camera,
  Calendar,
  LogOut,
  ExternalLink,
  Layers,
  Sparkles,
  Loader2,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { AdminAcervoManager } from "@/components/admin/AdminAcervoManager";
import { AdminEventManager } from "@/components/admin/AdminEventManager";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"acervo" | "semana" | "primavera">("acervo");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabase();
      if (!supabase) {
        setAuthChecking(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/admin/login");
      } else {
        setUserEmail(data.session.user.email || "Administrador");
      }
      setAuthChecking(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  if (authChecking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
        <p className="text-xs font-mono text-stone-dark uppercase tracking-wider">
          Verificando credenciais de acesso...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pb-24">
      {/* 0. Barra Superior Administrativa */}
      <header className="bg-night border-b border-stone-dark/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-serif font-bold text-ivory leading-tight">
                  SIMOP Admin
                </span>
                <span className="text-[10px] text-stone-dark font-mono">
                  Gestão de Memória & Eventos
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userEmail && (
                <span className="hidden sm:inline-block text-xs font-mono text-stone bg-stone-dark/20 px-3 py-1 border border-stone-dark/30">
                  {userEmail}
                </span>
              )}

              <Link
                href="/memoria-e-eventos"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-mono"
              >
                <span>Ver Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-dark/20 hover:bg-red-900/50 text-ivory text-xs font-mono border border-stone-dark/40 transition-colors"
                title="Sair do painel"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 1. Header do Painel & Seletor de Abas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone/60">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-night tracking-tight">
              Gestão de Conteúdo • Memória & Eventos
            </h1>
            <p className="text-xs sm:text-sm text-stone-dark font-mono">
              Gerencie o acervo fotográfico e as edições de eventos em tempo real no Supabase.
            </p>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex flex-wrap gap-2 border-b border-stone/60 pb-px">
          <button
            onClick={() => setActiveTab("acervo")}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 border-b-2 ${
              activeTab === "acervo"
                ? "bg-white text-night border-gold shadow-sm"
                : "bg-transparent text-stone-dark border-transparent hover:text-night hover:bg-white/50"
            }`}
          >
            <Camera className="w-4 h-4 text-gold" />
            <span>Acervo de Fotos</span>
          </button>

          <button
            onClick={() => setActiveTab("semana")}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 border-b-2 ${
              activeTab === "semana"
                ? "bg-white text-night border-gold shadow-sm"
                : "bg-transparent text-stone-dark border-transparent hover:text-night hover:bg-white/50"
            }`}
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>Semana de Museus</span>
          </button>

          <button
            onClick={() => setActiveTab("primavera")}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 border-b-2 ${
              activeTab === "primavera"
                ? "bg-white text-night border-gold shadow-sm"
                : "bg-transparent text-stone-dark border-transparent hover:text-night hover:bg-white/50"
            }`}
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>Primavera de Museus</span>
          </button>
        </div>

        {/* 2. Conteúdo da Aba Ativa */}
        <main className="pt-2">
          {activeTab === "acervo" && <AdminAcervoManager />}
          {activeTab === "semana" && (
            <AdminEventManager
              eventType="semana_de_museus"
              title="Semana de Museus"
            />
          )}
          {activeTab === "primavera" && (
            <AdminEventManager
              eventType="primavera_de_museus"
              title="Primavera de Museus"
            />
          )}
        </main>
      </div>
    </div>
  );
}
