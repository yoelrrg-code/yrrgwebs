import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SERVICES, AUDIENCE_SEGMENTS, SITE_CONFIG } from "@/data/site-data";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#090D16] text-[#9CA3AF]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo showSubtitle />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9CA3AF]">
              Creamos, migramos y mantenemos sitios web ultrarrápidos en Next.js
              para empresas en toda Latinoamérica. Sin paneles complejos: pides
              cambios por WhatsApp y están listos en minutos.
            </p>

            {/* Operational Status Badge */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#1F2937] bg-[#111827] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="font-mono text-xs text-[#F9FAFB]">
                {SITE_CONFIG.statusText}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#10B981] hover:underline"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Directo</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="inline-flex items-center gap-1.5 text-[#9CA3AF] hover:text-[#F9FAFB]"
              >
                <Mail className="h-4 w-4" />
                <span>{SITE_CONFIG.contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F9FAFB]">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/servicios"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Visión General
                </Link>
              </li>
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="transition-colors hover:text-[#10B981]"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segments Column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F9FAFB]">
              Para quién es
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {AUDIENCE_SEGMENTS.map((seg) => (
                <li key={seg.slug}>
                  <Link
                    href={`/soluciones/${seg.slug}`}
                    className="transition-colors hover:text-[#10B981]"
                  >
                    {seg.shortTitle}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/clientes"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link
                  href="/precios"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Planes y Precios
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F9FAFB]">
              Compañía
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/como-funciona"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Sobre YRRG.ai
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Blog & Recursos IA
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="transition-colors hover:text-[#10B981]"
                >
                  Agendar Llamada
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1F2937] pt-8 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} YRRG.ai — Smart Website System. Todos
            los derechos reservados.
          </p>
          <div className="flex items-center gap-6 font-mono">
            <span>Next.js 15 Architecture</span>
            <span className="text-[#10B981]">PageSpeed 100/100</span>
            <span>AI SEO Native</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
