"use client";

import React, { useState } from "react";
import { SITE_CONFIG, PRICING_DATA } from "@/data/site-data";
import {
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState("Crear un nuevo Smart Website");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/5491155550192?text=${encodeURIComponent(
    `Hola YRRG.ai! Soy ${name || "interesado"}${
      company ? ` de ${company}` : ""
    }. Quiero conversar sobre: ${goal}.${
      website ? ` Mi web actual es: ${website}` : ""
    }`
  )}`;

  return (
    <div className="bg-[#090D16] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left Column: Info & Direct Channels */}
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 font-mono text-xs font-semibold text-[#10B981]">
              <Sparkles className="h-3.5 w-3.5" />
              Paso 01 • Charla de 45 minutos
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold text-[#F9FAFB] sm:text-4xl">
              Empecemos tu nuevo Smart Website
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#9CA3AF]">
              Completa tus datos para coordinar nuestra videollamada inicial de
              45 minutos o escríbenos directamente por WhatsApp si prefieres
              avanzar al instante.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-[#10B981]" />
                  <div className="font-heading text-sm font-bold text-[#F9FAFB]">
                    Canal Rápido por WhatsApp
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[#9CA3AF]">
                  Respuesta inmediata de nuestro equipo para resolver dudas o
                  agendar tu reunión.
                </p>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#10B981] hover:underline"
                >
                  <span>Abrir chat en WhatsApp →</span>
                </a>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#6366F1]" />
                  <div className="font-heading text-sm font-bold text-[#F9FAFB]">
                    Correo Corporativo
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[#9CA3AF]">
                  {SITE_CONFIG.contactEmail}
                </p>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#10B981]" />
                  <div className="font-heading text-sm font-bold text-[#F9FAFB]">
                    Resumen de Inversión
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[#9CA3AF]">
                  Setup único de{" "}
                  <strong className="text-[#F9FAFB]">
                    ${PRICING_DATA.setupFee} USD
                  </strong>{" "}
                  + Suscripción todo incluido de{" "}
                  <strong className="text-[#10B981]">
                    ${PRICING_DATA.monthlyFee} USD/mes
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Onboarding Form */}
          <div className="rounded-3xl border border-[#1F2937] bg-[#111827] p-6 sm:p-10 lg:col-span-3">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="mt-5 font-heading text-2xl font-bold text-[#F9FAFB]">
                  ¡Solicitud recibida, {name}!
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#9CA3AF]">
                  Ya preparamos tu ficha inicial. Si quieres acelerar aún más la
                  coordinación de horario, haz clic abajo para enviarnos tu
                  resumen directo por WhatsApp:
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-[#090D16] hover:bg-[#059669] hover:text-[#F9FAFB]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Confirmar horario por WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl border border-[#1F2937] bg-[#090D16] px-5 py-3.5 text-xs font-semibold text-[#9CA3AF] hover:text-[#F9FAFB]"
                  >
                    Editar datos
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-heading text-xl font-bold text-[#F9FAFB]">
                  Solicitar reunión de descubrimiento o propuesta
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Tu Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Martín Morales"
                      className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Empresa u Organización *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ej. Grupo Andino S.A."
                      className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:border-[#10B981] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Sitio web actual (Opcional)
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://tuempresa.com"
                      className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      ¿Qué necesitas lograr?
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-sm text-[#F9FAFB] focus:border-[#10B981] focus:outline-none"
                    >
                      <option value="Crear un nuevo Smart Website">
                        Crear un nuevo Smart Website desde cero
                      </option>
                      <option value="Migrar mi web actual (WordPress/Wix) a Next.js">
                        Migrar mi web actual (WordPress/Wix) a Next.js
                      </option>
                      <option value="Mejorar velocidad y AI SEO">
                        Mejorar velocidad (100/100) y AI SEO
                      </option>
                      <option value="Plan Corporativo / Enterprise a medida">
                        Plan Corporativo / Enterprise a medida
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                    Cuéntanos brevemente sobre tu negocio o proyecto
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="¿A qué se dedica tu empresa y qué te gustaría mejorar de tu presencia digital actual?"
                    className="mt-2 w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#9CA3AF]/50 focus:border-[#10B981] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-4 text-sm font-bold text-[#090D16] transition-colors hover:bg-[#059669] hover:text-[#F9FAFB]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Agendar charla de 45 min</span>
                  </button>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1F2937] bg-[#090D16] px-6 py-4 text-sm font-semibold text-[#F9FAFB] hover:border-[#10B981]"
                  >
                    <MessageSquare className="h-4 w-4 text-[#10B981]" />
                    <span>Enviar directo por WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
