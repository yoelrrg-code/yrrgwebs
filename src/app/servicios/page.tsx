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
  "smart-website": <Code2 className="h-7 w-7 text-[#00b231]" />,
  migracion: <RefreshCw className="h-7 w-7 text-[#00b231]" />,
  optimizacion: <Gauge className="h-7 w-7 text-[#00b231]" />,
  "ai-seo": <Bot className="h-7 w-7 text-[#00b231]" />,
  mantenimiento: <ShieldCheck className="h-7 w-7 text-[#00b231]" />,
};

export default function ServiciosPage() {
  return (
    <div className="bg-[#070d14] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
            Arquitectura Integral YRRG.ai
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.2] text-[#f7fafc] sm:text-5xl">
            Cinco servicios de ingeniería web en un solo sistema
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#94a6b8]">
            No vendemos plantillas sueltas ni horas de soporte aisladas. Cada
            Smart Website incluye desarrollo en Next.js, migración segura,
            velocidad extrema, AI SEO y gestión continua por WhatsApp y Tickets.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {SERVICES.map((service, idx) => (
            <div
              key={service.slug}
              className="card-interactive rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-7 hover:border-[#00b231]/50 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1b2a3d] bg-[#070d14]">
                      {SERVICE_ICONS[service.slug]}
                    </div>
                    <span className="rounded-full border border-[#1b2a3d] bg-[#070d14] px-3.5 py-1 font-mono text-xs text-[#00b231]">
                      0{idx + 1} • {service.badge}
                    </span>
                  </div>

                  <h2 className="mt-5 font-heading text-2xl font-bold leading-snug text-[#f7fafc] sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3.5 text-base leading-relaxed text-[#94a6b8]">
                    {service.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {service.solutions.map((sol) => (
                      <div
                        key={sol}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-[#f7fafc]/90 sm:text-base"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#00b231]" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6">
                  <div>
                    <div className="font-mono text-xs uppercase text-[#94a6b8]">
                      Indicador Clave
                    </div>
                    <div className="mt-2 font-mono text-4xl font-extrabold text-[#00b231]">
                      {service.heroMetric}
                    </div>
                    <div className="mt-1.5 text-sm leading-relaxed text-[#f7fafc]/85">
                      {service.heroMetricLabel}
                    </div>

                    <div className="mt-6 border-t border-[#1b2a3d] pt-4">
                      <div className="font-mono text-xs uppercase text-[#2fa4e3]">
                        Especificaciones Técnicas
                      </div>
                      <ul className="mt-2.5 space-y-2 font-mono text-xs leading-relaxed text-[#f7fafc]/85">
                        {service.techSpecs.map((spec) => (
                          <li key={spec}>• {spec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/servicios/${service.slug}`}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-4 py-3.5 text-sm font-bold text-[#070d14] transition-all duration-300 hover:bg-[#008f27] hover:text-[#f7fafc]"
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
