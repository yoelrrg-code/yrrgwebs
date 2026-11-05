import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Code2,
  RefreshCw,
  Gauge,
  Bot,
  MessageSquare,
  Sparkles,
  Building2,
  Briefcase,
  HeartHandshake,
} from "lucide-react";
import {
  SITE_CONFIG,
  SERVICES,
  AUDIENCE_SEGMENTS,
  HOW_IT_WORKS_STEPS,
  PRICING_DATA,
  CASE_STUDIES,
} from "@/data/site-data";
import { WhatsAppSimulator } from "@/components/home/WhatsAppSimulator";
import { FaqAccordion } from "@/components/home/FaqAccordion";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "smart-website": <Code2 className="h-6 w-6 text-[#00b231]" />,
  migracion: <RefreshCw className="h-6 w-6 text-[#00b231]" />,
  optimizacion: <Gauge className="h-6 w-6 text-[#00b231]" />,
  "ai-seo": <Bot className="h-6 w-6 text-[#00b231]" />,
  mantenimiento: <ShieldCheck className="h-6 w-6 text-[#00b231]" />,
};

const SEGMENT_ICONS: Record<string, React.ReactNode> = {
  pymes: <Briefcase className="h-6 w-6 text-[#2fa4e3]" />,
  enterprise: <Building2 className="h-6 w-6 text-[#2fa4e3]" />,
  fundaciones: <HeartHandshake className="h-6 w-6 text-[#2fa4e3]" />,
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-radial-glow bg-grid-pattern pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00b231]/30 bg-[#0e1724]/90 px-4 py-1.5 shadow-lg shadow-[#00b231]/10">
              <Zap className="h-4 w-4 text-[#00b231]" />
              <span className="font-mono text-xs font-medium text-[#f7fafc]">
                El fin de WordPress y de los paneles complejos
              </span>
            </div>

            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-[#f7fafc] sm:text-6xl lg:leading-[1.1]">
              Tu sitio web en{" "}
              <span className="bg-gradient-to-r from-[#00b231] via-[#33cf5e] to-[#2fa4e3] bg-clip-text text-transparent">
                Next.js ultrarrápido
              </span>
              , gestionado por WhatsApp.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#94a6b8] sm:text-xl">
              Creamos o migramos tu web a la tecnología más rápida del mercado y
              nos encargamos de todo. Cuando quieras cambiar algo, simplemente
              mandas un audio o mensaje de WhatsApp y está listo en{" "}
              <span className="font-semibold text-[#f7fafc]">
                menos de 30 minutos
              </span>
              .
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-7 py-4 text-base font-bold text-[#070d14] shadow-xl shadow-[#00b231]/20 transition-all hover:bg-[#008f27] hover:text-[#f7fafc] sm:w-auto"
              >
                <span>Agendar charla de 45 min</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/como-funciona"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-7 py-4 text-base font-semibold text-[#f7fafc] transition-colors hover:border-[#00b231]/50 sm:w-auto"
              >
                <span>Ver cómo funciona</span>
              </Link>
            </div>

            {/* Key Metrics Strip */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SITE_CONFIG.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724]/80 p-4 backdrop-blur-md"
                >
                  <div className="font-mono text-2xl font-bold text-[#00b231] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#94a6b8] sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive WhatsApp + AI Agent Simulator */}
          <div className="mt-16">
            <WhatsAppSimulator />
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION SECTION */}
      <section className="border-t border-[#1b2a3d] bg-[#070d14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
              Por qué existe YRRG.ai
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
              El modelo tradicional de páginas web está roto
            </h2>
            <p className="mt-4 text-base text-[#94a6b8] sm:text-lg">
              Hasta hoy tenías dos opciones frustrantes: pagar miles de dólares
              a una agencia lenta o pelear tú mismo con WordPress y constructores
              que nunca quedan bien.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Old Way Card */}
            <div className="rounded-3xl border border-red-500/20 bg-[#0e1724]/60 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 font-mono text-xs font-semibold text-red-400">
                <XCircle className="h-4 w-4" />
                El viejo mundo (WordPress / Agencias / DIY)
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-[#f7fafc]">
                Lento, vulnerable y abandonado a los pocos meses
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-[#94a6b8] sm:text-base">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Nadie quiere entrar al panel:
                    </strong>{" "}
                    Te entregan un usuario de administrador que nadie en tu
                    empresa tiene tiempo ni ganas de aprender.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Lentitud que espanta clientes:
                    </strong>{" "}
                    Plantillas sobrecargadas que tardan 5 segundos en abrir en
                    el celular y arruinan tus campañas de anuncios.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Inseguridad y plugins rotos:
                    </strong>{" "}
                    Actualizaciones que desconfiguran el diseño o abren puertas
                    a malware y caídas constantes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Invisible para buscadores de IA:
                    </strong>{" "}
                    Código sucio que ChatGPT, Perplexity y Gemini no pueden
                    interpretar con claridad.
                  </span>
                </li>
              </ul>
            </div>

            {/* YRRG Way Card */}
            <div className="rounded-3xl border border-[#00b231]/40 bg-gradient-to-b from-[#0e1724] to-[#070d14] p-6 shadow-xl shadow-[#00b231]/5 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00b231]/15 px-3 py-1 font-mono text-xs font-semibold text-[#00b231]">
                <CheckCircle2 className="h-4 w-4" />
                El Estándar YRRG.ai (Smart Website System)
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-[#f7fafc]">
                Ingeniería Next.js + Gestión instantánea por WhatsApp
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-[#94a6b8] sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00b231]" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Cero paneles de control:
                    </strong>{" "}
                    Mandas un audio o texto por WhatsApp y nuestro sistema +
                    ingenieros te envían un Preview en menos de 30 minutos.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00b231]" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Velocidad 100/100 en Google:
                    </strong>{" "}
                    Desarrollado en Next.js puro y desplegado en servidores Edge
                    para cargar en 0.4 segundos.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00b231]" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      Seguridad blindada 24/7:
                    </strong>{" "}
                    Sin plugins frágiles ni bases de datos expuestas. Tu web es
                    inmutable y está siempre en línea.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00b231]" />
                  <span>
                    <strong className="text-[#f7fafc]">
                      AI SEO nativo incluido:
                    </strong>{" "}
                    Datos estructurados JSON-LD y protocolo{" "}
                    <code className="font-mono text-xs text-[#00b231]">
                      /llms.txt
                    </code>{" "}
                    para aparecer en Google, ChatGPT y Perplexity.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 SERVICES BENTO GRID */}
      <section className="border-t border-[#1b2a3d] bg-[#0e1724]/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
                5 Pilares en una Sola Suscripción
              </span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
                Todo lo que tu presencia digital necesita, resuelto
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00b231] hover:underline"
            >
              <span>Explorar los 5 servicios en detalle</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {SERVICES.map((service, index) => {
              const colSpan =
                index < 2 ? "lg:col-span-3" : "lg:col-span-2";
              return (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className={`group flex flex-col justify-between rounded-3xl border border-[#1b2a3d] bg-[#0e1724]/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#00b231]/50 hover:shadow-xl hover:shadow-[#00b231]/5 sm:p-8 ${colSpan}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1b2a3d] bg-[#070d14]">
                        {SERVICE_ICONS[service.slug]}
                      </div>
                      <span className="rounded-full border border-[#1b2a3d] bg-[#070d14] px-3 py-1 font-mono text-xs font-semibold text-[#00b231]">
                        {service.heroMetric} • {service.heroMetricLabel}
                      </span>
                    </div>

                    <div className="mt-5 font-mono text-xs uppercase tracking-wider text-[#94a6b8]">
                      {service.badge}
                    </div>
                    <h3 className="mt-1.5 font-heading text-2xl font-bold text-[#f7fafc] group-hover:text-[#00b231]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#94a6b8]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#1b2a3d]/80 pt-4 text-sm font-semibold text-[#f7fafc]">
                    <span>Ver alcance y especificaciones</span>
                    <ArrowRight className="h-4 w-4 text-[#00b231] transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-STEP HOW IT WORKS */}
      <section className="border-t border-[#1b2a3d] bg-[#070d14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
              Simplicidad Radical
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
              Cómo funciona el sistema YRRG.ai en 4 pasos
            </h2>
            <p className="mt-4 text-base text-[#94a6b8] sm:text-lg">
              Diseñamos un proceso donde tú dedicas solo 45 minutos al inicio y
              nosotros nos ocupamos de toda la ingeniería para siempre.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="relative flex flex-col justify-between rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-extrabold text-[#00b231]">
                      {step.stepNumber}
                    </span>
                    <span className="rounded-lg border border-[#1b2a3d] bg-[#070d14] px-2.5 py-1 font-mono text-[11px] text-[#94a6b8]">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-[#f7fafc]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#94a6b8]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-[#1b2a3d] bg-[#070d14] p-3 text-xs text-[#00b231]">
                  <strong>Entregable:</strong> {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE SEGMENTS ("PARA QUIÉN ES") */}
      <section className="border-t border-[#1b2a3d] bg-[#0e1724]/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2fa4e3]">
              Soluciones por Tipo de Organización
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
              ¿Para quién está diseñado YRRG.ai?
            </h2>
            <p className="mt-4 text-base text-[#94a6b8]">
              Adaptamos nuestra arquitectura y flujo de trabajo al ritmo de tu
              organización.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {AUDIENCE_SEGMENTS.map((seg) => (
              <Link
                key={seg.slug}
                href={`/soluciones/${seg.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-7 transition-all hover:border-[#2fa4e3]/60"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1b2a3d] bg-[#070d14]">
                    {SEGMENT_ICONS[seg.slug]}
                  </div>
                  <div className="mt-4 font-mono text-xs text-[#2fa4e3]">
                    {seg.badge}
                  </div>
                  <h3 className="mt-1.5 font-heading text-2xl font-bold text-[#f7fafc] group-hover:text-[#00b231]">
                    {seg.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#94a6b8]">
                    {seg.subtitle}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-[#1b2a3d] pt-4 text-xs text-[#94a6b8]">
                    {seg.idealFor.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#00b231]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00b231]">
                  <span>Ver solución para {seg.shortTitle}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES PREVIEW */}
      <section className="border-t border-[#1b2a3d] bg-[#070d14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
                Resultados Reales en LATAM
              </span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
                Antes y después de migrar a YRRG.ai
              </h2>
            </div>
            <Link
              href="/clientes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00b231] hover:underline"
            >
              <span>Ver todos los casos de éxito</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#94a6b8]">
                    <span className="font-semibold text-[#f7fafc]">
                      {cs.company}
                    </span>
                    <span className="rounded-md bg-[#070d14] px-2.5 py-1 font-mono text-[11px] text-[#00b231]">
                      {cs.country}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-[#94a6b8]">
                    Anterior: {cs.previousStack}
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-[#f7fafc]">
                    {cs.headline}
                  </h3>

                  <div className="mt-5 space-y-2.5">
                    {cs.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-[#1b2a3d] bg-[#070d14] p-3"
                      >
                        <div className="text-[11px] text-[#94a6b8]">
                          {m.label}
                        </div>
                        <div className="mt-1 flex items-center justify-between font-mono text-xs">
                          <span className="line-through text-red-400/80">
                            {m.before}
                          </span>
                          <span className="font-bold text-[#00b231]">
                            → {m.after}
                          </span>
                          <span className="rounded bg-[#00b231]/10 px-1.5 py-0.5 text-[10px] text-[#00b231]">
                            {m.improvement}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="mt-6 border-t border-[#1b2a3d] pt-4 text-xs italic text-[#94a6b8]">
                  “{cs.quote}”
                  <footer className="mt-2 not-italic font-semibold text-[#f7fafc]">
                    {cs.author} —{" "}
                    <span className="font-normal text-[#94a6b8]">{cs.role}</span>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING SUMMARY */}
      <section className="border-t border-[#1b2a3d] bg-[#0e1724]/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
              Precios Claros y Sin Sorpresas
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
              Una fracción de lo que cuesta una agencia tradicional
            </h2>
            <p className="mt-4 text-base text-[#94a6b8]">
              Sin presupuestos ocultos por cambiar una foto ni facturas sorpresa
              de mantenimiento.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#00b231]/40 bg-[#0e1724] p-6 shadow-2xl shadow-[#00b231]/10 sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00b231]/15 px-3 py-1 font-mono text-xs font-semibold text-[#00b231]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {PRICING_DATA.standardPlan.badge}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
                  {PRICING_DATA.standardPlan.name}
                </h3>
                <p className="mt-2 text-sm text-[#94a6b8]">
                  {PRICING_DATA.standardPlan.description}
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-2.5 text-sm text-[#f7fafc] sm:grid-cols-2">
                  {PRICING_DATA.standardPlan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00b231]" />
                      <span className="text-xs sm:text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6 lg:col-span-2">
                <div>
                  <div className="border-b border-[#1b2a3d] pb-4">
                    <div className="font-mono text-xs uppercase text-[#94a6b8]">
                      Setup / Migración Inicial
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-heading text-3xl font-extrabold text-[#f7fafc]">
                        ${PRICING_DATA.setupFee}
                      </span>
                      <span className="font-mono text-xs text-[#94a6b8]">
                        USD • Pago único
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="font-mono text-xs uppercase text-[#00b231]">
                      Suscripción Todo Incluido
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-heading text-4xl font-extrabold text-[#00b231]">
                        ${PRICING_DATA.monthlyFee}
                      </span>
                      <span className="font-mono text-xs text-[#94a6b8]">
                        USD / mes
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#94a6b8]">
                      Incluye hosting Edge, seguridad, AI SEO y cambios
                      ilimitados por WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <Link
                    href="/contacto"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-4 py-3.5 text-sm font-bold text-[#070d14] transition-colors hover:bg-[#008f27] hover:text-[#f7fafc]"
                  >
                    <span>Empezar mi Smart Website</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/precios"
                    className="block text-center text-xs font-medium text-[#94a6b8] hover:text-[#f7fafc]"
                  >
                    Ver comparativa completa y Plan Enterprise →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="border-t border-[#1b2a3d] bg-[#070d14] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
              Preguntas Frecuentes
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
              Todo claro antes de empezar
            </h2>
          </div>

          <div className="mt-12">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="border-t border-[#1b2a3d] bg-gradient-to-b from-[#0e1724] to-[#070d14] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-5xl">
            ¿Listo para tener una web que vuela y se actualiza por WhatsApp?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#94a6b8] sm:text-lg">
            Agenda una videollamada de 45 minutos sin compromiso o escríbenos
            directo por WhatsApp. Analizamos tu sitio actual y diseñamos el plan
            para tu nuevo Smart Website.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-8 py-4 text-base font-bold text-[#070d14] shadow-xl shadow-[#00b231]/20 hover:bg-[#008f27] hover:text-[#f7fafc] sm:w-auto"
            >
              <span>Agendar charla de 45 min</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-8 py-4 text-base font-semibold text-[#f7fafc] hover:border-[#00b231] sm:w-auto"
            >
              <MessageSquare className="h-5 w-5 text-[#00b231]" />
              <span>Hablar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
