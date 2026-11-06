import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES, SITE_CONFIG } from "@/data/site-data";
import { ArrowRight, Quote, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Clientes y Casos de Éxito | Resultados en Next.js",
  description:
    "Conoce cómo empresas de logística, salud y servicios profesionales en Latinoamérica multiplicaron su velocidad y consultas migrando a YRRG.ai.",
};

export default function ClientesPage() {
  return (
    <div className="bg-[#070d14] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
            Impacto Medible en Producción
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.2] text-[#f7fafc] sm:text-5xl">
            Empresas que dejaron atrás sitios lentos
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#94a6b8]">
            Métricas reales de velocidad (Core Web Vitals), posicionamiento en
            buscadores de IA y conversión comercial luego de migrar a un Smart
            Website de YRRG.ai.
          </p>
        </div>

        {/* Global Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {SITE_CONFIG.stats.map((st) => (
            <div
              key={st.label}
              className="card-interactive rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-5 text-center"
            >
              <div className="font-mono text-2xl font-extrabold text-[#00b231] sm:text-3xl">
                {st.value}
              </div>
              <div className="mt-1.5 text-sm text-[#94a6b8]">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Detailed Case Studies */}
        <div className="mt-16 space-y-10">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="card-interactive rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-7 sm:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1b2a3d] pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-heading text-2xl font-bold text-[#f7fafc]">
                      {cs.company}
                    </h2>
                    <span className="rounded-full bg-[#070d14] px-3 py-1 font-mono text-xs text-[#00b231]">
                      {cs.country}
                    </span>
                  </div>
                  <div className="mt-1.5 text-sm text-[#94a6b8]">
                    Industria: {cs.industry} • Stack anterior:{" "}
                    <span className="text-red-400">{cs.previousStack}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#00b231]/35 bg-[#00b231]/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-[#00b231]">
                  <TrendingUp className="h-4 w-4" />
                  Migrado a Next.js Edge
                </span>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="font-heading text-2xl font-bold leading-snug text-[#f7fafc]">
                    {cs.headline}
                  </h3>
                  <p className="mt-3.5 text-base leading-relaxed text-[#94a6b8]">
                    {cs.summary}
                  </p>

                  <div className="mt-6 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6">
                    <div className="flex items-center gap-2 text-[#00b231]">
                      <Quote className="h-4 w-4" />
                      <span className="font-mono text-xs uppercase">
                        Testimonio Directo
                      </span>
                    </div>
                    <p className="mt-2.5 text-base italic leading-relaxed text-[#f7fafc]/90">
                      “{cs.quote}”
                    </p>
                    <div className="mt-3 text-sm font-semibold text-[#00b231]">
                      {cs.author} —{" "}
                      <span className="font-normal text-[#94a6b8]">
                        {cs.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#94a6b8]">
                    Comparativa Antes vs Después
                  </div>
                  {cs.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-4"
                    >
                      <div className="text-xs font-medium text-[#94a6b8]">
                        {m.label}
                      </div>
                      <div className="mt-2 flex items-center justify-between font-mono">
                        <span className="text-sm line-through text-red-400">
                          {m.before}
                        </span>
                        <span className="text-xl font-extrabold text-[#00b231]">
                          {m.after}
                        </span>
                      </div>
                      <div className="mt-1 text-right font-mono text-xs text-[#33cf5e]">
                        {m.improvement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
            ¿Quieres ver cómo rendiría tu sitio actual en Next.js?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#94a6b8]">
            Hacemos una auditoría gratuita de velocidad y SEO en nuestra llamada
            de descubrimiento de 45 minutos.
          </p>
          <Link
            href="/portal/registro"
            className="animate-pulse-glow mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-7 py-3.5 text-sm font-bold text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
          >
            <span>Solicitar auditoría y propuesta</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
