"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Terminal,
  Wand2,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo iniciar sesión.");
        setLoading(false);
        return;
      }

      if (data.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
      router.refresh();
    } catch {
      setError("Error de conexión con el servidor.");
      setLoading(false);
    }
  };

  const handleQuickDemo = async (
    demoEmail: string,
    demoPassword: string,
    targetRoute: string
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail, password: demoPassword }),
      });
      if (res.ok) {
        router.push(targetRoute);
        router.refresh();
      } else {
        setError("No se pudo iniciar la sesión de demostración.");
        setLoading(false);
      }
    } catch {
      setError("Error de red.");
      setLoading(false);
    }
  };

  const handleOAuthProvider = async (
    provider: "google" | "github" | "magic_link"
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "oauth",
          provider,
          oauth_email:
            provider === "google"
              ? "martin@grupoandino.com"
              : provider === "github"
              ? "cto@grupoandino.com"
              : "directora@grupoandino.com",
          oauth_name:
            provider === "google"
              ? "Martín Morales"
              : provider === "github"
              ? "CTO Grupo Andino (GitHub)"
              : "Directora Comercial (Magic Link)",
          oauth_company: "Grupo Andino Logística",
        }),
      });
      if (res.ok) {
        router.push("/portal");
        router.refresh();
      } else {
        setError("Error autenticando con el proveedor externo.");
        setLoading(false);
      }
    } catch {
      setError("Error de red en AuthProvider.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#070d14] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
          {/* Left Column: Value Proposition */}
          <ScrollReveal variant="slide-left" className="lg:col-span-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00b231]/30 bg-[#00b231]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#00b231]">
                <Sparkles className="h-3.5 w-3.5" />
                YRRG.ai Client Helpdesk
              </span>
              <h1 className="mt-4 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
                Gestiona tus sitios web, cambios y aprobaciones en un solo lugar
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
                Además de pedir cambios por WhatsApp, desde tu portal de cliente
                puedes gestionar múltiples proyectos, abrir tickets priorizados,
                agendar charlas de 45 minutos y aprobar enlaces Preview con 1 clic.
              </p>

              {/* Quick 1-Click Demo Access Card */}
              <div className="mt-8 rounded-2xl border border-[#00b231]/40 bg-[#0e1724] p-5 shadow-xl shadow-[#00b231]/5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#00b231]">
                  <Terminal className="h-4 w-4" />
                  <span>Acceso Rápido Demo (1 Clic • MySQL)</span>
                </div>
                <p className="mt-1.5 text-xs text-[#94a6b8]">
                  Prueba el flujo completo de proyectos, tickets y notificaciones
                  al administrador con datos reales en MySQL:
                </p>
                <StaggerContainer className="mt-4 flex flex-col gap-2.5" staggerDelay={0.08}>
                  <StaggerItem variant="fade-up">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleQuickDemo(
                          "martin@grupoandino.com",
                          "Cliente2026!",
                          "/portal"
                        )
                      }
                      className="flex w-full items-center justify-between rounded-xl bg-[#00b231] px-4 py-3 text-xs font-bold text-[#070d14] transition-colors hover:bg-[#008f27] hover:text-[#f7fafc]"
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Entrar como Cliente Demo (Grupo Andino)
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </StaggerItem>

                  <StaggerItem variant="fade-up">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleQuickDemo("admin@yrrg.ai", "Admin2026!", "/admin")
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-[#2fa4e3]/50 bg-[#070d14] px-4 py-3 text-xs font-bold text-[#2fa4e3] transition-colors hover:bg-[#2fa4e3]/10"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        Entrar como Administrador (Consola + Emails)
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Login Card + AuthProvider */}
          <ScrollReveal variant="zoom-in" delay={0.15} className="lg:col-span-3">
            <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 shadow-2xl sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-[#f7fafc]">
                Iniciar sesión en tu cuenta
              </h2>
              <p className="mt-1 text-xs text-[#94a6b8] sm:text-sm">
                Ingresa con tu proveedor corporativo SSO o con tu correo y
                contraseña.
              </p>

              {/* AuthProvider Buttons */}
              <StaggerContainer className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3" staggerDelay={0.06}>
                <StaggerItem variant="fade-up">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleOAuthProvider("google")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-3 text-xs font-semibold text-[#f7fafc] transition-colors hover:border-[#00b231]"
                  >
                    <svg className="h-4 w-4 text-[#00b231]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google SSO</span>
                  </button>
                </StaggerItem>

                <StaggerItem variant="fade-up">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleOAuthProvider("github")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-3 text-xs font-semibold text-[#f7fafc] transition-colors hover:border-[#2fa4e3]"
                  >
                    <svg className="h-4 w-4 text-[#2fa4e3]" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub SSO</span>
                  </button>
                </StaggerItem>

                <StaggerItem variant="fade-up">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleOAuthProvider("magic_link")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-3 text-xs font-semibold text-[#f7fafc] transition-colors hover:border-[#00b231]"
                  >
                    <Wand2 className="h-4 w-4 text-[#00b231]" />
                    <span>Magic Link</span>
                  </button>
                </StaggerItem>
              </StaggerContainer>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#1b2a3d]" />
              <span className="font-mono text-xs uppercase text-[#94a6b8]">
                O con correo y contraseña
              </span>
              <div className="h-px flex-1 bg-[#1b2a3d]" />
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                  Correo Electrónico Corporativo
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#94a6b8]" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="martin@grupoandino.com"
                    className="w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] py-3 pl-10 pr-4 text-sm text-[#f7fafc] placeholder-[#94a6b8]/50 focus:border-[#00b231] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                  Contraseña
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#94a6b8]" />
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] py-3 pl-10 pr-4 text-sm text-[#f7fafc] placeholder-[#94a6b8]/50 focus:border-[#00b231] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-6 py-3.5 text-sm font-bold text-[#070d14] transition-colors hover:bg-[#008f27] hover:text-[#f7fafc] disabled:opacity-50"
              >
                <span>{loading ? "Ingresando..." : "Ingresar al Portal"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 border-t border-[#1b2a3d] pt-5 text-center text-xs text-[#94a6b8]">
              ¿Aún no tienes cuenta o quieres solicitar tu nuevo sitio web?{" "}
              <Link
                href="/portal/registro"
                className="font-bold text-[#00b231] hover:underline"
              >
                Crear cuenta y agendar charla de 45 min →
              </Link>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
