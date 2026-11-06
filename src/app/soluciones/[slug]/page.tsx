import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUDIENCE_SEGMENTS, PRICING_DATA } from "@/data/site-data";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Quote,
  Sparkles,
} from "lucide-react";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AUDIENCE_SEGMENTS.map((segment) => ({
    slug: segment.slug,
  }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const segment = AUDIENCE_SEGMENTS.find((s) => s.slug === slug);
  if (!segment) {
    return { title: "Solución no encontrada" };
  }
  return {
    title: `${segment.title} | Soluciones YRRG.ai`,
    description: segment.subtitle,
  };
}

export default async function SolutionSegmentPage({
  params,
}: SolutionPageProps) {
  const { slug } = await params;
  const segment = AUDIENCE_SEGMENTS.find((s) => s.slug === slug);

  if (!segment) {
    notFound();
  }

  const otherSegments = AUDIENCE_SEGMENTS.filter(
    (s) => s.slug !== segment.slug
  );

  return (
    <div className="bg-[#070d14] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-7 sm:p-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2fa4e3]/40 bg-[#2fa4e3]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#2fa4e3]">
            <Sparkles className="h-3.5 w-3.5" />
            {segment.badge}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-[1.2] text-[#f7fafc] sm:text-5xl">
            {segment.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#f7fafc]/90">
            {segment.subtitle}
          </p>
          <p className="mt-3.5 max-w-3xl text-base leading-relaxed text-[#94a6b8]">
            {segment.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/portal/registro"
              className="animate-pulse-glow inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-6 py-3.5 text-sm font-bold text-[#070d14] transition-all duration-300 hover:bg-[#008f27] hover:text-[#f7fafc]"
            >
              <span>Agendar charla de 45 min</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/precios"
              className="inline-flex items-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-6 py-3.5 text-sm font-semibold text-[#f7fafc] hover:border-[#00b231]"
            >
              <span>
                Ver planes desde ${PRICING_DATA.monthlyFee} USD/mes
              </span>
            </Link>
          </div>
        </div>

        {/* Pain Points vs Ideal For */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-red-500/25 bg-[#0e1724]/80 p-7 sm:p-8">
            <h2 className="font-heading text-2xl font-bold leading-snug text-[#f7fafc]">
              Los obstáculos que resolvemos en {segment.shortTitle}
            </h2>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-[#94a6b8]">
              {segment.painPoints.map((pain) => (
                <li key={pain} className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-400" />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-interactive rounded-3xl border border-[#00b231]/45 bg-[#0e1724] p-7 sm:p-8">
            <h2 className="font-heading text-2xl font-bold leading-snug text-[#f7fafc]">
              Organizaciones que eligen este modelo
            </h2>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-[#f7fafc]">
              {segment.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00b231]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5">
              <div className="flex items-center gap-2 text-[#00b231]">
                <Quote className="h-4 w-4" />
                <span className="font-mono text-xs uppercase">
                  Experiencia de Cliente
                </span>
              </div>
              <p className="mt-2.5 text-base italic leading-relaxed text-[#94a6b8]">
                “{segment.featuredQuote.quote}”
              </p>
              <div className="mt-3 text-sm font-semibold text-[#f7fafc]">
                {segment.featuredQuote.author} —{" "}
                <span className="font-normal text-[#94a6b8]">
                  {segment.featuredQuote.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold leading-tight text-[#f7fafc] sm:text-3xl">
            Por qué YRRG.ai es el aliado ideal para {segment.shortTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {segment.benefits.map((benefit, idx) => (
              <div
                key={benefit.title}
                className="card-interactive rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-7"
              >
                <div className="font-mono text-xs font-bold text-[#00b231]">
                  VENTAJA 0{idx + 1}
                </div>
                <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-[#f7fafc]">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-[#94a6b8]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Segments */}
        <div className="mt-16 border-t border-[#1b2a3d] pt-12">
          <h3 className="font-heading text-lg font-bold text-[#f7fafc]">
            Otras soluciones según el perfil de tu organización
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherSegments.map((other) => (
              <Link
                key={other.slug}
                href={`/soluciones/${other.slug}`}
                className="card-interactive flex items-center justify-between rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-6 hover:border-[#00b231]"
              >
                <div>
                  <div className="font-heading text-lg font-bold text-[#f7fafc]">
                    {other.title}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-[#94a6b8]">
                    {other.subtitle}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#00b231]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
