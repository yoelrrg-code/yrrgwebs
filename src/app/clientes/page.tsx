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
    <div className="bg-[#090D16] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            Impacto Medible en Producción
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-[#F9FAFB] sm:text-5xl">
            Empresas que dejaron atrás sitios lentos
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            Métricas reales de velocidad (Core Web Vitals), posicionamiento en
            buscadores de IA y conversión comercial luego de migrar a un Smart
            Website de YRRG.ai.
          </p>
        </div>

        {/* Global Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SITE_CONFIG.stats.map((st) => (
            <div
              key={st.label}
              className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5 text-center"
            >
              <div className="font-mono text-2xl font-extrabold text-[#10B981] sm:text-3xl">
                {st.value}
              </div>
              <div className="mt-1 text-xs text-[#9CA3AF]">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Detailed Case Studies */}
        <div className="mt-16 space-y-10">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl border border-[#1F2937] bg-[#111827] p-7 sm:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F2937] pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-heading text-2xl font-bold text-[#F9FAFB]">
                      {cs.company}
                    </h2>
                    <span className="rounded-full bg-[#090D16] px-3 py-1 font-mono text-xs text-[#10B981]">
                      {cs.country}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-[#9CA3AF]">
                    Industria: {cs.industry} • Stack anterior:{" "}
                    <span className="text-red-400">{cs.previousStack}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1.5 font-mono text-xs font-semibold text-[#10B981]">
                  <TrendingUp className="h-4 w-4" />
                  Migrado a Next.js Edge
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="font-heading text-xl font-bold text-[#F9FAFB] sm:text-2xl">
                    {cs.headline}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#9CA3AF]">
                    {cs.summary}
                  </p>

                  <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#090D16] p-5">
                    <div className="flex items-center gap-2 text-[#10B981]">
                      <Quote className="h-4 w-4" />
                      <span className="font-mono text-xs uppercase">
                        Testimonio Directo
                      </span>
                    </div>
                    <p className="mt-2 text-sm italic text-[#F9FAFB]/90">
                      “{cs.quote}”
                    </p>
                    <div className="mt-3 text-xs font-semibold text-[#10B981]">
                      {cs.author} —{" "}
                      <span className="font-normal text-[#9CA3AF]">
                        {cs.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
                    Comparativa Antes vs Después
                  </div>
                  {cs.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[#1F2937] bg-[#090D16] p-4"
                    >
                      <div className="text-xs font-medium text-[#9CA3AF]">
                        {m.label}
                      </div>
                      <div className="mt-2 flex items-center justify-between font-mono">
                        <span className="text-xs line-through text-red-400">
                          {m.before}
                        </span>
                        <span className="text-lg font-extrabold text-[#10B981]">
                          {m.after}
                        </span>
                      </div>
                      <div className="mt-1 text-right font-mono text-[11px] text-[#10B981]">
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
        <div className="mt-16 rounded-3xl border border-[#1F2937] bg-[#111827] p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-bold text-[#F9FAFB] sm:text-3xl">
            ¿Quieres ver cómo rendiría tu sitio actual en Next.js?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#9CA3AF] sm:text-base">
            Hacemos una auditoría gratuita de velocidad y SEO en nuestra llamada
            de descubrimiento de 45 minutos.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-7 py-3.5 text-sm font-bold text-[#090D16] hover:bg-[#059669] hover:text-[#F9FAFB]"
          >
            <span>Solicitar auditoría y propuesta</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
