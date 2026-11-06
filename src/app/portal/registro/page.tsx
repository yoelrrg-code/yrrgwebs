"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Globe,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export default function PortalRegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [country, setCountry] = useState("Argentina");
  const [taxId, setTaxId] = useState("");

  const [createInitialProject, setCreateInitialProject] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [serviceType, setServiceType] = useState("smart-website");
  const [currentDomain, setCurrentDomain] = useState("");
  const [kickoffDate, setKickoffDate] = useState(
    "Próximo Martes o Jueves — 11:00 hs"
  );
  const [kickoffNotes, setKickoffNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          company,
          phone_whatsapp: phoneWhatsapp,
          country,
          tax_id: taxId,
          create_initial_project: createInitialProject,
          project_name:
            projectName || `Sitio Web ${company || "Corporativo"}`,
          service_type: serviceType,
          current_domain: currentDomain,
          kickoff_date: kickoffDate,
          kickoff_notes: kickoffNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo completar el registro.");
        setLoading(false);
        return;
      }

      router.push("/portal");
      router.refresh();
    } catch {
      setError("Error de conexión con el servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#070d14] py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-down">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00b231]/30 bg-[#00b231]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#00b231]">
              <Sparkles className="h-3.5 w-3.5" />
              Onboarding de Cliente + MySQL Helpdesk
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc] sm:text-4xl">
              Crea tu cuenta de cliente y agenda tu charla de 45 min
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#94a6b8] sm:text-base">
              Al registrarte tendrás acceso inmediato a tu panel para gestionar
              uno o varios sitios web, pedir cambios por tickets y aprobar vistas
              previas en minutos.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 shadow-2xl sm:p-10"
          >
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300">
              {error}
            </div>
          )}

          {/* Section 1: Client & Company Data */}
          <div className="flex items-center gap-2 border-b border-[#1b2a3d] pb-3">
            <Building2 className="h-5 w-5 text-[#00b231]" />
            <h2 className="font-heading text-lg font-bold text-[#f7fafc]">
              1. Datos de tu Empresa y Contacto
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Lucía Fernández"
                className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                Correo Corporativo *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lucia@tuempresa.com"
                className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                Contraseña (mín. 6 caracteres) *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                Empresa u Organización *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ej. Constructora del Sur S.A."
                className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                WhatsApp Directo (para avisos de Preview) *
              </label>
              <input
                type="text"
                required
                value={phoneWhatsapp}
                onChange={(e) => setPhoneWhatsapp(e.target.value)}
                placeholder="+54 9 11 5555-0000"
                className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                  País *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                >
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="México">México</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Perú">Perú</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="España / USA">España / USA</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                  CUIT / RUT / RFC
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="Opcional"
                  className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Initial Website Request & 45-min Call */}
          <div className="mt-8 border-t border-[#1b2a3d] pt-6">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#00b231]/40 bg-[#070d14] p-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={createInitialProject}
                  onChange={(e) => setCreateInitialProject(e.target.checked)}
                  className="h-4 w-4 accent-[#00b231]"
                />
                <div>
                  <div className="font-heading text-sm font-bold text-[#f7fafc]">
                    Solicitar mi primer Sitio Web + Agendar charla de 45 min
                  </div>
                  <div className="text-xs text-[#94a6b8]">
                    Crea automáticamente tu primer proyecto y envía aviso por
                    email a nuestro equipo de ingeniería.
                  </div>
                </div>
              </div>
              <Calendar className="h-5 w-5 text-[#00b231]" />
            </label>

            {createInitialProject && (
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                    Nombre del Sitio o Proyecto *
                  </label>
                  <input
                    type="text"
                    required={createInitialProject}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Ej. Web Institucional + Landing Servicios"
                    className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                    Servicio Principal Requerido
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                  >
                    <option value="smart-website">
                      Smart Website desde cero en Next.js
                    </option>
                    <option value="migracion">
                      Migración sin Dolor (desde WordPress / Wix)
                    </option>
                    <option value="optimizacion">
                      Optimización Extrema & Core Web Vitals
                    </option>
                    <option value="ai-seo">
                      AI SEO & Posicionamiento en ChatGPT / Perplexity
                    </option>
                    <option value="mantenimiento">
                      Mantenimiento Blindado 24/7
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                    Dominio Actual (Si ya tienes uno)
                  </label>
                  <div className="relative mt-1.5">
                    <Globe className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#94a6b8]" />
                    <input
                      type="text"
                      value={currentDomain}
                      onChange={(e) => setCurrentDomain(e.target.value)}
                      placeholder="https://tuempresa.com"
                      className="w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] py-3 pl-10 pr-4 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                    Día y Horario Preferido (Charla 45 min)
                  </label>
                  <input
                    type="text"
                    value={kickoffDate}
                    onChange={(e) => setKickoffDate(e.target.value)}
                    placeholder="Ej. Jueves 14:30 hs (GMT-3)"
                    className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a6b8]">
                    Objetivos principales o referencias visuales
                  </label>
                  <textarea
                    rows={3}
                    value={kickoffNotes}
                    onChange={(e) => setKickoffNotes(e.target.value)}
                    placeholder="Cuéntanos brevemente qué quieres lograr con tu nuevo sitio web..."
                    className="mt-1.5 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] focus:border-[#00b231] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1b2a3d] pt-6 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-[#94a6b8]">
              <CheckCircle2 className="h-4 w-4 text-[#00b231]" />
              <span>
                Notificación automática por email a ingeniería al registrarte
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-7 py-4 text-sm font-bold text-[#070d14] transition-colors hover:bg-[#008f27] hover:text-[#f7fafc] sm:w-auto"
            >
              <span>
                {loading
                  ? "Creando cuenta y proyecto..."
                  : "Completar Registro e Ir al Portal"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-[#94a6b8]">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/portal/login"
              className="font-bold text-[#00b231] hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </ScrollReveal>
    </div>
  </div>
);
}
