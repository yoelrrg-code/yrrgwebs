"use client";

import React, { useState } from "react";
import { SIMULATOR_SCENARIOS } from "@/data/site-data";
import {
  CheckCheck,
  Mic,
  Terminal,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Globe,
  Bot,
} from "lucide-react";

export function WhatsAppSimulator() {
  const [selectedId, setSelectedId] = useState(SIMULATOR_SCENARIOS[0].id);
  const [isApproved, setIsApproved] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScenario =
    SIMULATOR_SCENARIOS.find((s) => s.id === selectedId) ||
    SIMULATOR_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    if (id === selectedId) return;
    setIsTransitioning(true);
    setSelectedId(id);
    setIsApproved(false);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  return (
    <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724]/85 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 sm:p-9">
      {/* Top Scenario Selector Tabs */}
      <div className="flex flex-col justify-between gap-5 border-b border-[#1b2a3d] pb-7 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00b231]/35 bg-[#00b231]/10 px-3.5 py-1.5 font-mono text-xs font-medium text-[#00b231]">
            <Sparkles className="h-3.5 w-3.5" />
            Simulador Interactivo en Vivo
          </span>
          <h3 className="mt-3 font-heading text-2xl font-bold leading-snug text-[#f7fafc] sm:text-3xl">
            Prueba cómo pides un cambio por WhatsApp y sale a producción
          </h3>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {SIMULATOR_SCENARIOS.map((scenario) => {
            const active = scenario.id === selectedId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleSelectScenario(scenario.id)}
                className={`inline-flex min-h-[44px] items-center rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition-all duration-300 ease-out sm:text-sm ${
                  active
                    ? "bg-[#00b231] text-[#070d14] shadow-lg shadow-[#00b231]/25 scale-[1.02]"
                    : "border border-[#1b2a3d] bg-[#070d14] text-[#94a6b8] hover:border-[#00b231]/50 hover:text-[#f7fafc]"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Interactive Flow */}
      <div
        key={currentScenario.id}
        className={`mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3 ${
          isTransitioning ? "opacity-80" : "animate-fade-slide opacity-100"
        }`}
      >
        {/* Column 1: Client WhatsApp Message */}
        <div className="card-interactive flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#1b2a3d] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00b231]/20 font-heading text-sm font-bold text-[#00b231]">
                  {currentScenario.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#f7fafc]">
                    {currentScenario.clientName}
                  </div>
                  <div className="text-xs text-[#94a6b8]">
                    {currentScenario.clientRole} • WhatsApp
                  </div>
                </div>
              </div>
              <span className="rounded-lg bg-[#0e1724] px-2.5 py-1 font-mono text-xs font-semibold text-[#00b231]">
                Paso 1: Tu mensaje
              </span>
            </div>

            {/* Outgoing WhatsApp Bubble */}
            <div className="mt-5 rounded-2xl rounded-tr-sm border border-[#00b231]/35 bg-[#00b231]/10 p-4 text-sm leading-relaxed text-[#f7fafc]">
              {currentScenario.isAudio && (
                <div className="mb-3 flex items-center gap-2.5 rounded-xl bg-[#070d14]/80 px-3.5 py-2.5">
                  <Mic className="h-4 w-4 shrink-0 text-[#00b231]" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1b2a3d]">
                    <div className="h-full w-4/5 rounded-full bg-[#00b231]" />
                  </div>
                  <span className="font-mono text-xs text-[#94a6b8]">
                    {currentScenario.audioDuration}
                  </span>
                </div>
              )}
              <p className="text-sm leading-relaxed text-[#f7fafc]/95">
                {currentScenario.whatsappMessage}
              </p>
              <div className="mt-2.5 flex items-center justify-end gap-1.5 font-mono text-xs text-[#94a6b8]">
                <span>{currentScenario.whatsappTime}</span>
                <CheckCheck className="h-4 w-4 text-[#00b231]" />
              </div>
            </div>
          </div>

          {/* YRRG Instant Reply + Animated Typing Indicator */}
          <div className="mt-5 rounded-2xl rounded-tl-sm border border-[#1b2a3d] bg-[#0e1724] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00b231]">
                <Bot className="h-4 w-4" />
                <span>YRRG.ai Concierge IA</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-[#070d14] px-2.5 py-1">
                <span className="font-mono text-xs text-[#2fa4e3]">
                  Agente activo
                </span>
                <span className="typing-dot-1 h-1.5 w-1.5 rounded-full bg-[#00b231]" />
                <span className="typing-dot-2 h-1.5 w-1.5 rounded-full bg-[#00b231]" />
                <span className="typing-dot-3 h-1.5 w-1.5 rounded-full bg-[#00b231]" />
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#f7fafc]/90">
              ¡Recibido! Nuestro agente ya está procesando el cambio en Next.js.
              En unos minutos te enviamos el link Preview para aprobar. ⚡
            </p>
          </div>
        </div>

        {/* Column 2: YRRG AI Agent + Engineer Pipeline */}
        <div className="card-interactive flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#1b2a3d] pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#2fa4e3]" />
                <span className="font-mono text-xs font-bold text-[#f7fafc]">
                  YRRG-Agent Pipeline
                </span>
              </div>
              <span className="rounded-lg bg-[#0e1724] px-2.5 py-1 font-mono text-xs font-semibold text-[#2fa4e3]">
                Paso 2: Ejecución IA
              </span>
            </div>

            <div className="mt-5 space-y-3.5">
              {currentScenario.agentLogs.map((log, index) => (
                <div
                  key={log.step}
                  className="rounded-xl border border-[#1b2a3d] bg-[#0e1724]/80 p-3.5 transition-colors hover:border-[#2fa4e3]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#00b231]">
                      0{index + 1}. {log.step}
                    </span>
                    <span className="font-mono text-xs text-[#94a6b8]">
                      {log.time}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#f7fafc]/90">
                    {log.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-4 py-3 font-mono text-xs">
            <span className="flex items-center gap-2 text-[#94a6b8]">
              <Clock className="h-4 w-4 text-[#00b231]" />
              Tiempo total:
            </span>
            <span className="font-bold text-[#00b231]">
              {currentScenario.elapsedMinutes} minutos (SLA &lt; 30m)
            </span>
          </div>
        </div>

        {/* Column 3: Next.js Preview & 1-Click Approval */}
        <div className="card-interactive flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#1b2a3d] pb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#00b231]" />
                <span className="font-mono text-xs font-bold text-[#f7fafc]">
                  Entorno Preview & Live
                </span>
              </div>
              <span className="rounded-lg bg-[#0e1724] px-2.5 py-1 font-mono text-xs font-semibold text-[#00b231]">
                Paso 3: Tu aprobación
              </span>
            </div>

            {/* URL Bar */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-3.5 py-2.5 font-mono text-xs text-[#94a6b8]">
              <span className="truncate">{currentScenario.previewUrl}</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#00b231]" />
            </div>

            {/* Before Card */}
            <div className="mt-4 rounded-xl border border-[#1b2a3d] bg-[#0e1724]/50 p-4 opacity-80">
              <div className="font-mono text-xs uppercase tracking-wider text-[#94a6b8]">
                Antes (Producción)
              </div>
              <div className="mt-1 text-sm font-bold text-[#f7fafc]">
                {currentScenario.beforePreview.title}
              </div>
              <div className="mt-0.5 text-xs leading-relaxed text-[#94a6b8]">
                {currentScenario.beforePreview.highlight}
              </div>
            </div>

            {/* After Preview Card */}
            <div className="mt-4 rounded-xl border border-[#00b231]/50 bg-[#00b231]/10 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#00b231]">
                  {isApproved ? "✓ Publicado en Vivo" : "Nuevo en Preview"}
                </span>
                <span className="rounded-full bg-[#070d14] px-2.5 py-0.5 font-mono text-xs text-[#00b231]">
                  {currentScenario.afterPreview.badge}
                </span>
              </div>
              <div className="mt-2 text-base font-bold leading-snug text-[#f7fafc]">
                {currentScenario.afterPreview.title}
              </div>
              <div className="mt-1.5 text-sm font-medium leading-relaxed text-[#33cf5e]">
                {currentScenario.afterPreview.highlight}
              </div>
              <div className="mt-1 text-xs text-[#94a6b8]">
                {currentScenario.afterPreview.subtext}
              </div>
            </div>
          </div>

          {/* Interactive Approve Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsApproved(!isApproved)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-xs font-bold transition-all duration-300 sm:text-sm ${
                isApproved
                  ? "border border-[#00b231] bg-[#00b231]/20 text-[#33cf5e]"
                  : "bg-[#00b231] text-[#070d14] shadow-lg shadow-[#00b231]/20 hover:bg-[#008f27] hover:text-[#f7fafc]"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {isApproved
                  ? "¡Cambio aprobado y desplegado en Edge!"
                  : "Simular 'OK, publicar cambio' (1 Clic)"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
