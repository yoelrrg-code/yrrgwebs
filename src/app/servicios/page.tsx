import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/data/site-data";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  RefreshCw,
  Gauge,
  Bot,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios | Smart Websites, Migración, AI SEO y Mantenimiento",
  description:
    "Conoce los 5 pilares del sistema YRRG.ai: desarrollo en Next.js, migración sin dolor, optimización Core Web Vitals, AI SEO y mantenimiento 24/7 por WhatsApp.",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "smart-website": <Code2 className="h-7 w-7 text-[#10B981]" />,
  migracion: <RefreshCw className="h-7 w-7 text-[#10B981]" />,
  optimizacion: <Gauge className="h-7 w-7 text-[#10B981]" />,
  "ai-seo": <Bot className="h-7 w-7 text-[#10B981]" />,
  mantenimiento: <ShieldCheck className="h-7 w-7 text-[#10B981]" />,
};

export default function ServiciosPage() {
  return (
    <div className="bg-[#090D16] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            Arquitectura Integral YRRG.ai
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-[#F9FAFB] sm:text-5xl">
            Cinco servicios de ingeniería web en un solo sistema
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            No vendemos plantillas sueltas ni horas de soporte aisladas. Cada
            Smart Website incluye desarrollo en Next.js, migración segura,
            velocidad extrema, AI SEO y gestión continua por WhatsApp.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {SERVICES.map((service, idx) => (
            <div
              key={service.slug}
              className="rounded-3xl border border-[#1F2937] bg-[#111827] p-6 transition-all hover:border-[#10B981]/50 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1F2937] bg-[#090D16]">
                      {SERVICE_ICONS[service.slug]}
                    </div>
                    <span className="rounded-full border border-[#1F2937] bg-[#090D16] px-3 py-1 font-mono text-xs text-[#10B981]">
                      0{idx + 1} • {service.badge}
                    </span>
                  </div>

                  <h2 className="mt-4 font-heading text-2xl font-bold text-[#F9FAFB] sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#9CA3AF]">
                    {service.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.solutions.map((sol) => (
                      <div
                        key={sol}
                        className="flex items-start gap-2.5 text-sm text-[#F9FAFB]/90"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#090D16] p-6">
                  <div>
                    <div className="font-mono text-xs uppercase text-[#9CA3AF]">
                      Indicador Clave
                    </div>
                    <div className="mt-2 font-mono text-4xl font-extrabold text-[#10B981]">
                      {service.heroMetric}
                    </div>
                    <div className="mt-1 text-xs text-[#9CA3AF]">
                      {service.heroMetricLabel}
                    </div>

                    <div className="mt-6 border-t border-[#1F2937] pt-4">
                      <div className="font-mono text-[11px] uppercase text-[#9CA3AF]">
                        Especificaciones Técnicas
                      </div>
                      <ul className="mt-2 space-y-1.5 font-mono text-xs text-[#F9FAFB]/80">
                        {service.techSpecs.map((spec) => (
                          <li key={spec}>• {spec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/servicios/${service.slug}`}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-4 py-3 text-sm font-bold text-[#090D16] transition-colors hover:bg-[#059669] hover:text-[#F9FAFB]"
                  >
                    <span>Explorar {service.shortTitle}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
