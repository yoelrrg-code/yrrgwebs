import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HOW_IT_WORKS_STEPS, SITE_CONFIG } from "@/data/site-data";
import { WhatsAppSimulator } from "@/components/home/WhatsAppSimulator";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Terminal,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Funciona | De una Charla de 45 min a Cambios en 30 min",
  description:
    "Conoce el flujo de trabajo de YRRG.ai: 45 minutos de entrevista inicial, desarrollo en Next.js y actualizaciones continuas por WhatsApp en menos de 30 minutos.",
};

export default function ComoFuncionaPage() {
  return (
    <div className="bg-[#090D16] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            Metodología & SLA de Respuesta
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-[#F9FAFB] sm:text-5xl">
            Tú te ocupas de tu negocio. Nosotros de tu web.
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            Combinamos agentes de inteligencia artificial especializados en
            Next.js con ingenieros de software senior para eliminar toda la
            burocracia del desarrollo web tradicional.
          </p>
        </div>

        {/* Detailed 4 Steps Timeline */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="flex flex-col justify-between rounded-3xl border border-[#1F2937] bg-[#111827] p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-4xl font-extrabold text-[#10B981]">
                    Paso {step.stepNumber}
                  </span>
                  <span className="rounded-full border border-[#1F2937] bg-[#090D16] px-3 py-1 font-mono text-xs text-[#6366F1]">
                    {step.badge}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-2xl font-bold text-[#F9FAFB]">
                  {step.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#9CA3AF]">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#090D16] p-4 font-mono text-xs text-[#10B981]">
                ✓ Entregable: {step.deliverable}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture & SLA Guarantees */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-[#1F2937] bg-[#111827]/80 p-6">
            <Clock className="h-8 w-8 text-[#10B981]" />
            <h3 className="mt-4 font-heading text-lg font-bold text-[#F9FAFB]">
              Preview en menos de 30 minutos
            </h3>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Cada cambio de texto, precio, promoción o imagen genera una URL de
              vista previa segura para que revises desde tu celular antes de
              salir en vivo.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#111827]/80 p-6">
            <Terminal className="h-8 w-8 text-[#6366F1]" />
            <h3 className="mt-4 font-heading text-lg font-bold text-[#F9FAFB]">
              Código Limpio en Git & Edge
            </h3>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              No usamos parches visuales. Cada actualización pasa por control de
              versiones y validación automática de velocidad y SEO.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1F2937] bg-[#111827]/80 p-6">
            <ShieldCheck className="h-8 w-8 text-[#10B981]" />
            <h3 className="mt-4 font-heading text-lg font-bold text-[#F9FAFB]">
              Propiedad Total de tu Activo
            </h3>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Tu dominio, tus textos, tus fotos y tu código son 100% tuyos desde
              el día uno, sin ataduras ni cláusulas ocultas.
            </p>
          </div>
        </div>

        {/* Interactive Simulator */}
        <div className="mt-16">
          <WhatsAppSimulator />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-[#10B981]/30 bg-[#111827] p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-bold text-[#F9FAFB] sm:text-3xl">
            Empieza con el Paso 01 hoy mismo
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#9CA3AF] sm:text-base">
            Reserva tu charla de descubrimiento de 45 minutos o escríbenos por
            WhatsApp para auditar tu sitio actual sin costo.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-[#090D16] hover:bg-[#059669] hover:text-[#F9FAFB]"
            >
              <span>Agendar charla de 45 min</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#090D16] px-6 py-3.5 text-sm font-semibold text-[#F9FAFB] hover:border-[#10B981]"
            >
              <MessageSquare className="h-4 w-4 text-[#10B981]" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
