"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Shield, AlertCircle, Loader2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Se já estiver logado, redireciona para o admin
  useEffect(() => {
    const checkSession = async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.push("/admin");
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage(
        "Supabase não configurado. Certifique-se de preencher NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local."
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(
          error.message === "Invalid login credentials"
            ? "E-mail ou senha incorretos."
            : error.message
        );
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Ocorreu um erro ao realizar o login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        
        {/* Logo / Header Institucional */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-night text-gold border border-gold/40 shadow-sm mx-auto">
            <Shield className="w-7 h-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-night tracking-tight">
            Painel Administrativo
          </h1>
          <p className="text-xs sm:text-sm text-stone-dark font-mono">
            Sistema de Museus de Ouro Preto — SIMOP
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="clay-card p-8 bg-white border border-stone space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider font-semibold text-night"
              >
                E-mail institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@museusdeouropreto.org.br"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-ivory border border-stone focus:border-gold focus:outline-none text-night placeholder:text-stone-dark/60 rounded-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-mono uppercase tracking-wider font-semibold text-night"
              >
                Senha de acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-ivory border border-stone focus:border-gold focus:outline-none text-night placeholder:text-stone-dark/60 rounded-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-night text-ivory text-xs uppercase tracking-widest font-semibold border border-night hover:bg-gold hover:text-night hover:border-gold transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar no Painel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-stone/50 text-center">
            <Link
              href="/"
              className="text-xs text-stone-dark hover:text-gold transition-colors font-mono"
            >
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
