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
  Chrome,
  Github,
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
                    <Chrome className="h-4 w-4 text-[#00b231]" />
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
                    <Github className="h-4 w-4 text-[#2fa4e3]" />
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
              <span className="font-mono text-[11px] uppercase text-[#94a6b8]">
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                  Correo Electrónico Corporativo
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#94a6b8]" />
                  <input
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                  Contraseña
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#94a6b8]" />
                  <input
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
