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
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Cómo Funciona | De una Charla de 45 min a Cambios en 30 min",
  description:
    "Conoce el flujo de trabajo de YRRG.ai: 45 minutos de entrevista inicial, desarrollo en Next.js y actualizaciones continuas por WhatsApp o Tickets en menos de 30 minutos.",
};

export default function ComoFuncionaPage() {
  return (
    <div className="bg-[#070d14] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
              Metodología & SLA de Respuesta
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.2] text-[#f7fafc] sm:text-5xl">
              Tú te ocupas de tu negocio. Nosotros de tu web.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#94a6b8]">
              Combinamos agentes de inteligencia artificial especializados en
              Next.js con ingenieros de software senior para eliminar toda la
              burocracia del desarrollo web tradicional.
            </p>
          </div>
        </ScrollReveal>

        {/* Detailed 4 Steps Timeline */}
        <StaggerContainer staggerDelay={0.12} className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <StaggerItem key={step.stepNumber} variant="fade-up">
              <div
                className="card-interactive flex h-full flex-col justify-between rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-4xl font-extrabold text-[#00b231]">
                      Paso {step.stepNumber}
                    </span>
                    <span className="rounded-full border border-[#1b2a3d] bg-[#070d14] px-3.5 py-1 font-mono text-xs text-[#2fa4e3]">
                      {step.badge}
                    </span>
                  </div>
                  <h2 className="mt-5 font-heading text-2xl font-bold leading-snug text-[#f7fafc]">
                    {step.title}
                  </h2>
                  <p className="mt-3.5 text-base leading-relaxed text-[#94a6b8]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-4 font-mono text-xs leading-relaxed text-[#33cf5e]">
                  ✓ Entregable: {step.deliverable}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Architecture & SLA Guarantees */}
        <StaggerContainer staggerDelay={0.1} className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StaggerItem variant="zoom-in">
            <div className="card-interactive h-full rounded-3xl border border-[#1b2a3d] bg-[#0e1724]/90 p-7">
              <Clock className="h-8 w-8 text-[#00b231]" />
              <h3 className="mt-4 font-heading text-xl font-bold text-[#f7fafc]">
                Preview en menos de 30 minutos
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
                Cada cambio de texto, precio, promoción o imagen genera una URL de
                vista previa segura para que revises desde tu celular antes de
                salir en vivo.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem variant="zoom-in">
            <div className="card-interactive h-full rounded-3xl border border-[#1b2a3d] bg-[#0e1724]/90 p-7">
              <Terminal className="h-8 w-8 text-[#2fa4e3]" />
              <h3 className="mt-4 font-heading text-xl font-bold text-[#f7fafc]">
                Código Limpio en Git & Edge
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
                No usamos parches visuales. Cada actualización pasa por control de
                versiones y validación automática de velocidad y SEO.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem variant="zoom-in">
            <div className="card-interactive h-full rounded-3xl border border-[#1b2a3d] bg-[#0e1724]/90 p-7">
              <ShieldCheck className="h-8 w-8 text-[#00b231]" />
              <h3 className="mt-4 font-heading text-xl font-bold text-[#f7fafc]">
                Propiedad Total de tu Activo
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
                Tu dominio, tus textos, tus fotos y tu código son 100% tuyos desde
                el día uno, sin ataduras ni cláusulas ocultas.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Interactive Simulator */}
        <ScrollReveal variant="zoom-in" delay={0.1} className="mt-16">
          <WhatsAppSimulator />
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal variant="fade-up" delay={0.1} className="mt-16 rounded-3xl border border-[#00b231]/35 bg-[#0e1724] p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-bold leading-tight text-[#f7fafc] sm:text-3xl">
            Empieza con el Paso 01 hoy mismo
          </h2>
          <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-[#94a6b8]">
            Reserva tu charla de descubrimiento de 45 minutos o escríbenos por
            WhatsApp para auditar tu sitio actual sin costo.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/portal/registro"
              className="animate-pulse-glow inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-7 py-4 text-base font-bold text-[#070d14] transition-all duration-300 hover:bg-[#008f27] hover:text-[#f7fafc]"
            >
              <span>Agendar charla de 45 min</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-7 py-4 text-base font-semibold text-[#f7fafc] transition-all duration-300 hover:border-[#00b231]"
            >
              <MessageSquare className="h-5 w-5 text-[#00b231]" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
