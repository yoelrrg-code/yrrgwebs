import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, PRICING_DATA } from "@/data/site-data";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Terminal,
  Sparkles,
} from "lucide-react";

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Servicio no encontrado" };
  }
  return {
    title: service.title,
    description: service.subtitle,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="bg-[#090D16] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#10B981]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a todos los servicios</span>
        </Link>

        {/* Service Hero */}
        <div className="mt-8 grid grid-cols-1 gap-8 rounded-3xl border border-[#1F2937] bg-[#111827] p-6 sm:p-12 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#10B981]">
              <Sparkles className="h-3.5 w-3.5" />
              {service.badge}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold text-[#F9FAFB] sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#9CA3AF]">
              {service.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]/90">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-[#090D16] hover:bg-[#059669] hover:text-[#F9FAFB]"
              >
                <span>Solicitar este servicio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/precios"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#090D16] px-6 py-3.5 text-sm font-semibold text-[#F9FAFB] hover:border-[#10B981]"
              >
                <span>
                  Incluido en el plan de ${PRICING_DATA.monthlyFee}/mes
                </span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#090D16] p-6">
            <div className="font-mono text-xs uppercase text-[#9CA3AF]">
              Métrica de Impacto
            </div>
            <div className="mt-2 font-mono text-5xl font-extrabold text-[#10B981]">
              {service.heroMetric}
            </div>
            <div className="mt-1 text-sm text-[#F9FAFB]">
              {service.heroMetricLabel}
            </div>

            <div className="mt-6 border-t border-[#1F2937] pt-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#6366F1]">
                <Terminal className="h-4 w-4" />
                <span>Stack & Garantías Técnicas</span>
              </div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-[#9CA3AF]">
                {service.techSpecs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2">
                    <span className="text-[#10B981]">✓</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-red-500/20 bg-[#111827]/70 p-7">
            <h2 className="font-heading text-xl font-bold text-[#F9FAFB]">
              {service.problemTitle}
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm text-[#9CA3AF]">
              {service.problems.map((prob) => (
                <li key={prob} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#10B981]/40 bg-[#111827] p-7">
            <h2 className="font-heading text-xl font-bold text-[#F9FAFB]">
              {service.solutionTitle}
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm text-[#F9FAFB]/90">
              {service.solutions.map((sol) => (
                <li key={sol} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deliverables Grid */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#F9FAFB] sm:text-3xl">
            Qué entregamos exactamente en {service.shortTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {service.deliverables.map((del, idx) => (
              <div
                key={del.title}
                className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
              >
                <div className="font-mono text-xs font-bold text-[#10B981]">
                  ENTREGABLE 0{idx + 1}
                </div>
                <h3 className="mt-2 font-heading text-lg font-bold text-[#F9FAFB]">
                  {del.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {del.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Services Navigation */}
        <div className="mt-16 border-t border-[#1F2937] pt-12">
          <h3 className="font-heading text-xl font-bold text-[#F9FAFB]">
            Explora los demás pilares incluidos en tu suscripción
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/servicios/${other.slug}`}
                className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5 transition-colors hover:border-[#10B981]"
              >
                <div className="font-mono text-xs text-[#10B981]">
                  {other.heroMetric}
                </div>
                <div className="mt-1 font-heading text-base font-bold text-[#F9FAFB]">
                  {other.shortTitle}
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-[#9CA3AF]">
                  {other.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
