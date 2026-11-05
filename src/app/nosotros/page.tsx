import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Globe2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | La Filosofía detrás de YRRG.ai",
  description:
    "En YRRG.ai democratizamos la ingeniería web en Next.js y la inteligencia artificial para que empresas de toda Latinoamérica tengan sitios rápidos y siempre actualizados.",
};

export default function NosotrosPage() {
  return (
    <div className="bg-[#070d14] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
            Nuestra Misión en Latinoamérica
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-[#f7fafc] sm:text-5xl">
            Ingeniería de Silicon Valley, simplicidad de un mensaje de WhatsApp
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#94a6b8]">
            Nacimos tras ver durante años el mismo problema: excelentes empresas
            en toda la región atrapadas con sitios web lentos en WordPress que
            nadie quiere actualizar, o pagando fortunas a agencias tradicionales
            por cambios mínimos.
          </p>
        </div>

        {/* Philosophy Pillars */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8">
            <Zap className="h-8 w-8 text-[#00b231]" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-[#f7fafc]">
              1. El software debe quitarte trabajo, no dártelo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
              Entregarle un panel de administración complejo al dueño de una
              PyME, al gerente comercial o al director de una fundación es
              trasladarle una carga operativa que no pidió. En YRRG.ai
              reemplazamos los paneles por una interfaz que ya usas todos los
              días: WhatsApp y correo electrónico.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8">
            <Cpu className="h-8 w-8 text-[#2fa4e3]" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-[#f7fafc]">
              2. IA + Ingenieros Senior = Velocidad en 30 minutos
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
              Construimos nuestra propia infraestructura de agentes de IA que
              interpretan tus pedidos de actualización, escriben código limpio
              en Next.js y generan entornos de vista previa (Preview) bajo la
              supervisión de ingenieros reales. Eso nos permite hacer en
              minutos lo que antes tomaba semanas.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8">
            <ShieldCheck className="h-8 w-8 text-[#00b231]" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-[#f7fafc]">
              3. Calidad técnica sin concesiones
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
              Cada sitio que desplegamos está programado en Next.js +
              TypeScript, distribuido en servidores Edge globales y configurado
              con AI SEO nativo. No usamos plantillas infladas ni constructores
              visuales que degraden tu marca.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8">
            <Globe2 className="h-8 w-8 text-[#2fa4e3]" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-[#f7fafc]">
              4. Transparencia y cercanía regional
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#94a6b8] sm:text-base">
              Precios claros publicados en nuestra web ($299 USD de inicio + $59
              USD/mes todo incluido), trato directo en tu mismo idioma y huso
              horario, y propiedad total de tu dominio y código.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-[#00b231]/30 bg-[#0e1724] p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
            Conozcámonos en una charla de 45 minutos
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#94a6b8] sm:text-base">
            Cuéntanos sobre tu empresa y descubre cómo podemos transformar tu
            sitio web esta misma semana.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-7 py-3.5 text-sm font-bold text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
          >
            <span>Ir a Contacto</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
