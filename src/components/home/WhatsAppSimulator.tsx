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
} from "lucide-react";

export function WhatsAppSimulator() {
  const [selectedId, setSelectedId] = useState(SIMULATOR_SCENARIOS[0].id);
  const [isApproved, setIsApproved] = useState(false);

  const currentScenario =
    SIMULATOR_SCENARIOS.find((s) => s.id === selectedId) ||
    SIMULATOR_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setSelectedId(id);
    setIsApproved(false);
  };

  return (
    <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724]/70 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
      {/* Top Scenario Selector Tabs */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#1b2a3d] pb-6 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00b231]/30 bg-[#00b231]/10 px-3 py-1 font-mono text-xs font-medium text-[#00b231]">
            <Sparkles className="h-3.5 w-3.5" />
            Simulador Interactivo en Vivo
          </span>
          <h3 className="mt-2 font-heading text-xl font-bold text-[#f7fafc] sm:text-2xl">
            Prueba cómo pides un cambio por WhatsApp y sale a producción
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {SIMULATOR_SCENARIOS.map((scenario) => {
            const active = scenario.id === selectedId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleSelectScenario(scenario.id)}
                className={`rounded-xl px-3.5 py-2 text-left text-xs font-semibold transition-all sm:text-sm ${
                  active
                    ? "bg-[#00b231] text-[#070d14] shadow-lg shadow-[#00b231]/20"
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
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Client WhatsApp Message */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#1b2a3d] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00b231]/20 font-heading text-sm font-bold text-[#00b231]">
                  {currentScenario.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f7fafc]">
                    {currentScenario.clientName}
                  </div>
                  <div className="text-xs text-[#94a6b8]">
                    {currentScenario.clientRole} • WhatsApp
                  </div>
                </div>
              </div>
              <span className="rounded-md bg-[#0e1724] px-2 py-1 font-mono text-[11px] text-[#00b231]">
                Paso 1: Tu mensaje
              </span>
            </div>

            {/* Outgoing WhatsApp Bubble */}
            <div className="mt-4 rounded-2xl rounded-tr-sm border border-[#00b231]/30 bg-[#00b231]/10 p-4 text-sm text-[#f7fafc]">
              {currentScenario.isAudio && (
                <div className="mb-2.5 flex items-center gap-2 rounded-lg bg-[#070d14]/70 px-3 py-2">
                  <Mic className="h-4 w-4 shrink-0 text-[#00b231]" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1b2a3d]">
                    <div className="h-full w-4/5 rounded-full bg-[#00b231]" />
                  </div>
                  <span className="font-mono text-xs text-[#94a6b8]">
                    {currentScenario.audioDuration}
                  </span>
                </div>
              )}
              <p className="leading-relaxed">{currentScenario.whatsappMessage}</p>
              <div className="mt-2 flex items-center justify-end gap-1 font-mono text-[11px] text-[#94a6b8]">
                <span>{currentScenario.whatsappTime}</span>
                <CheckCheck className="h-3.5 w-3.5 text-[#00b231]" />
              </div>
            </div>
          </div>

          {/* YRRG Instant Reply */}
          <div className="mt-4 rounded-2xl rounded-tl-sm border border-[#1b2a3d] bg-[#0e1724] p-3.5 text-xs text-[#94a6b8]">
            <div className="font-semibold text-[#00b231]">YRRG.ai Concierge</div>
            <p className="mt-1 text-[#f7fafc]/90">
              ¡Recibido! Nuestro agente ya está procesando el cambio en Next.js.
              En unos minutos te enviamos el link Preview para aprobar. ⚡
            </p>
          </div>
        </div>

        {/* Column 2: YRRG AI Agent + Engineer Pipeline */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#1b2a3d] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#2fa4e3]" />
                <span className="font-mono text-xs font-semibold text-[#f7fafc]">
                  YRRG-Agent Pipeline
                </span>
              </div>
              <span className="rounded-md bg-[#0e1724] px-2 py-1 font-mono text-[11px] text-[#2fa4e3]">
                Paso 2: Ejecución IA
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {currentScenario.agentLogs.map((log, index) => (
                <div
                  key={log.step}
                  className="rounded-xl border border-[#1b2a3d]/80 bg-[#0e1724]/70 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#00b231]">
                      0{index + 1}. {log.step}
                    </span>
                    <span className="font-mono text-[11px] text-[#94a6b8]">
                      {log.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#f7fafc]/85">{log.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-3.5 py-2.5 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-[#94a6b8]">
              <Clock className="h-3.5 w-3.5 text-[#00b231]" />
              Tiempo total:
            </span>
            <span className="font-bold text-[#00b231]">
              {currentScenario.elapsedMinutes} minutos (SLA &lt; 30m)
            </span>
          </div>
        </div>

        {/* Column 3: Next.js Preview & 1-Click Approval */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#1b2a3d] pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#00b231]" />
                <span className="font-mono text-xs font-semibold text-[#f7fafc]">
                  Entorno Preview & Live
                </span>
              </div>
              <span className="rounded-md bg-[#0e1724] px-2 py-1 font-mono text-[11px] text-[#00b231]">
                Paso 3: Tu aprobación
              </span>
            </div>

            {/* URL Bar */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-[#1b2a3d] bg-[#0e1724] px-3 py-2 font-mono text-[11px] text-[#94a6b8]">
              <span className="truncate">{currentScenario.previewUrl}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#00b231]" />
            </div>

            {/* Before Card */}
            <div className="mt-3 rounded-xl border border-[#1b2a3d] bg-[#0e1724]/40 p-3 opacity-75">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#94a6b8]">
                Antes (Producción)
              </div>
              <div className="mt-1 text-xs font-semibold text-[#f7fafc]">
                {currentScenario.beforePreview.title}
              </div>
              <div className="text-xs text-[#94a6b8]">
                {currentScenario.beforePreview.highlight}
              </div>
            </div>

            {/* After Preview Card */}
            <div className="mt-3 rounded-xl border border-[#00b231]/50 bg-[#00b231]/10 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00b231]">
                  { isApproved ? "✓ Publicado en Vivo" : "Nuevo en Preview" }
                </span>
                <span className="rounded-full bg-[#070d14] px-2 py-0.5 font-mono text-[10px] text-[#00b231]">
                  {currentScenario.afterPreview.badge}
                </span>
              </div>
              <div className="mt-1.5 text-sm font-bold text-[#f7fafc]">
                {currentScenario.afterPreview.title}
              </div>
              <div className="mt-1 text-xs font-medium text-[#00b231]">
                {currentScenario.afterPreview.highlight}
              </div>
              <div className="mt-1 text-[11px] text-[#94a6b8]">
                {currentScenario.afterPreview.subtext}
              </div>
            </div>
          </div>

          {/* Interactive Approve Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setIsApproved(!isApproved)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all sm:text-sm ${
                isApproved
                  ? "border border-[#00b231] bg-[#00b231]/20 text-[#00b231]"
                  : "bg-[#00b231] text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {isApproved
                  ? "¡Cambio aprobado y desplegado en Edge!"
                  : "Simular 'OK, publicar cambio' por WhatsApp"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
