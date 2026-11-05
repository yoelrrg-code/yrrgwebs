"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  ArrowRight,
  Code2,
  RefreshCw,
  Gauge,
  Bot,
  ShieldCheck,
  Building2,
  Briefcase,
  HeartHandshake,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SERVICES, AUDIENCE_SEGMENTS } from "@/data/site-data";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "smart-website": <Code2 className="h-4 w-4 text-[#00b231]" />,
  migracion: <RefreshCw className="h-4 w-4 text-[#00b231]" />,
  optimizacion: <Gauge className="h-4 w-4 text-[#00b231]" />,
  "ai-seo": <Bot className="h-4 w-4 text-[#00b231]" />,
  mantenimiento: <ShieldCheck className="h-4 w-4 text-[#00b231]" />,
};

const SEGMENT_ICONS: Record<string, React.ReactNode> = {
  pymes: <Briefcase className="h-4 w-4 text-[#2fa4e3]" />,
  enterprise: <Building2 className="h-4 w-4 text-[#2fa4e3]" />,
  fundaciones: <HeartHandshake className="h-4 w-4 text-[#2fa4e3]" />,
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1b2a3d]/80 bg-[#070d14]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Logo showSubtitle />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {/* Servicios Dropdown */}
          <div className="group relative">
            <Link
              href="/servicios"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/servicios")
                  ? "text-[#00b231]"
                  : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
              }`}
            >
              <span>Servicios</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#94a6b8] transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className=" rounded-2xl border border-[#1b2a3d] bg-[#0e1724]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                <div className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#94a6b8]">
                  5 Soluciones Integrales
                </div>
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#1b2a3d]/60"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1b2a3d] bg-[#070d14]">
                      {SERVICE_ICONS[service.slug] || (
                        <Zap className="h-4 w-4 text-[#00b231]" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#f7fafc]">
                        {service.shortTitle}
                      </div>
                      <div className="line-clamp-1 text-xs text-[#94a6b8]">
                        {service.subtitle}
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="mt-1 border-t border-[#1b2a3d] pt-1">
                  <Link
                    href="/servicios"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-[#00b231] hover:bg-[#070d14]/60"
                  >
                    <span>Ver todos los servicios</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Para quién es Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/soluciones")
                  ? "text-[#00b231]"
                  : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
              }`}
            >
              <span>Para quién es</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#94a6b8] transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                <div className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#94a6b8]">
                  Según tu organización
                </div>
                {AUDIENCE_SEGMENTS.map((seg) => (
                  <Link
                    key={seg.slug}
                    href={`/soluciones/${seg.slug}`}
                    className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#1b2a3d]/60"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1b2a3d] bg-[#070d14]">
                      {SEGMENT_ICONS[seg.slug]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#f7fafc]">
                        {seg.shortTitle}
                      </div>
                      <div className="line-clamp-1 text-xs text-[#94a6b8]">
                        {seg.subtitle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/como-funciona"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/como-funciona")
                ? "text-[#00b231]"
                : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
            }`}
          >
            Cómo funciona
          </Link>

          <Link
            href="/precios"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/precios")
                ? "text-[#00b231]"
                : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
            }`}
          >
            Precios
          </Link>

          <Link
            href="/clientes"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/clientes")
                ? "text-[#00b231]"
                : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
            }`}
          >
            Clientes
          </Link>

          <Link
            href="/blog"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/blog")
                ? "text-[#00b231]"
                : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
            }`}
          >
            Blog
          </Link>

          <Link
            href="/nosotros"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/nosotros")
                ? "text-[#00b231]"
                : "text-[#f7fafc]/90 hover:bg-[#0e1724] hover:text-[#f7fafc]"
            }`}
          >
            Nosotros
          </Link>
        </nav>

        {/* Primary CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-4 py-2.5 text-sm font-semibold text-[#070d14] shadow-lg shadow-[#00b231]/20 transition-all hover:bg-[#008f27] hover:text-[#f7fafc]"
          >
            <span>Empezar ahora</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-xl border border-[#1b2a3d] bg-[#0e1724] p-2.5 text-[#f7fafc] lg:hidden"
          aria-label="Abrir menú de navegación"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#1b2a3d] bg-[#070d14] px-4 pb-6 pt-4 lg:hidden">
          <div className="space-y-4">
            <div>
              <div className="px-2 font-mono text-xs uppercase tracking-wider text-[#00b231]">
                Servicios
              </div>
              <div className="mt-2 grid grid-cols-1 gap-1">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-[#f7fafc] hover:bg-[#0e1724]"
                  >
                    {SERVICE_ICONS[service.slug]}
                    <span>{service.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1b2a3d] pt-3">
              <div className="px-2 font-mono text-xs uppercase tracking-wider text-[#2fa4e3]">
                Para quién es
              </div>
              <div className="mt-2 grid grid-cols-1 gap-1">
                {AUDIENCE_SEGMENTS.map((seg) => (
                  <Link
                    key={seg.slug}
                    href={`/soluciones/${seg.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-[#f7fafc] hover:bg-[#0e1724]"
                  >
                    {SEGMENT_ICONS[seg.slug]}
                    <span>{seg.shortTitle}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-[#1b2a3d] pt-3">
              <Link
                href="/como-funciona"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0e1724] px-3 py-2 text-sm font-medium text-[#f7fafc]"
              >
                Cómo funciona
              </Link>
              <Link
                href="/precios"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0e1724] px-3 py-2 text-sm font-medium text-[#f7fafc]"
              >
                Precios
              </Link>
              <Link
                href="/clientes"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0e1724] px-3 py-2 text-sm font-medium text-[#f7fafc]"
              >
                Clientes
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0e1724] px-3 py-2 text-sm font-medium text-[#f7fafc]"
              >
                Blog
              </Link>
              <Link
                href="/nosotros"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0e1724] px-3 py-2 text-sm font-medium text-[#f7fafc]"
              >
                Nosotros
              </Link>
              <Link
                href="/servicios"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-[#0e1724] px-3 py-2 text-sm font-medium text-[#00b231]"
              >
                Ver Servicios
              </Link>
            </div>

            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-4 py-3 text-sm font-bold text-[#070d14]"
            >
              <span>Empezar ahora</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
