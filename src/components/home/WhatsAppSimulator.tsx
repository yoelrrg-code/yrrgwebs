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
    <div className="rounded-3xl border border-[#1F2937] bg-[#111827]/70 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
      {/* Top Scenario Selector Tabs */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#1F2937] pb-6 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 font-mono text-xs font-medium text-[#10B981]">
            <Sparkles className="h-3.5 w-3.5" />
            Simulador Interactivo en Vivo
          </span>
          <h3 className="mt-2 font-heading text-xl font-bold text-[#F9FAFB] sm:text-2xl">
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
                    ? "bg-[#10B981] text-[#090D16] shadow-lg shadow-emerald-500/20"
                    : "border border-[#1F2937] bg-[#090D16] text-[#9CA3AF] hover:border-[#10B981]/50 hover:text-[#F9FAFB]"
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
        <div className="flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#090D16] p-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]/20 font-heading text-sm font-bold text-[#10B981]">
                  {currentScenario.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F9FAFB]">
                    {currentScenario.clientName}
                  </div>
                  <div className="text-xs text-[#9CA3AF]">
                    {currentScenario.clientRole} • WhatsApp
                  </div>
                </div>
              </div>
              <span className="rounded-md bg-[#111827] px-2 py-1 font-mono text-[11px] text-[#10B981]">
                Paso 1: Tu mensaje
              </span>
            </div>

            {/* Outgoing WhatsApp Bubble */}
            <div className="mt-4 rounded-2xl rounded-tr-sm border border-[#10B981]/30 bg-[#10B981]/10 p-4 text-sm text-[#F9FAFB]">
              {currentScenario.isAudio && (
                <div className="mb-2.5 flex items-center gap-2 rounded-lg bg-[#090D16]/70 px-3 py-2">
                  <Mic className="h-4 w-4 shrink-0 text-[#10B981]" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1F2937]">
                    <div className="h-full w-4/5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="font-mono text-xs text-[#9CA3AF]">
                    {currentScenario.audioDuration}
                  </span>
                </div>
              )}
              <p className="leading-relaxed">{currentScenario.whatsappMessage}</p>
              <div className="mt-2 flex items-center justify-end gap-1 font-mono text-[11px] text-[#9CA3AF]">
                <span>{currentScenario.whatsappTime}</span>
                <CheckCheck className="h-3.5 w-3.5 text-[#10B981]" />
              </div>
            </div>
          </div>

          {/* YRRG Instant Reply */}
          <div className="mt-4 rounded-2xl rounded-tl-sm border border-[#1F2937] bg-[#111827] p-3.5 text-xs text-[#9CA3AF]">
            <div className="font-semibold text-[#10B981]">YRRG.ai Concierge</div>
            <p className="mt-1 text-[#F9FAFB]/90">
              ¡Recibido! Nuestro agente ya está procesando el cambio en Next.js.
              En unos minutos te enviamos el link Preview para aprobar. ⚡
            </p>
          </div>
        </div>

        {/* Column 2: YRRG AI Agent + Engineer Pipeline */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#090D16] p-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#6366F1]" />
                <span className="font-mono text-xs font-semibold text-[#F9FAFB]">
                  YRRG-Agent Pipeline
                </span>
              </div>
              <span className="rounded-md bg-[#111827] px-2 py-1 font-mono text-[11px] text-[#6366F1]">
                Paso 2: Ejecución IA
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {currentScenario.agentLogs.map((log, index) => (
                <div
                  key={log.step}
                  className="rounded-xl border border-[#1F2937]/80 bg-[#111827]/70 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#10B981]">
                      0{index + 1}. {log.step}
                    </span>
                    <span className="font-mono text-[11px] text-[#9CA3AF]">
                      {log.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#F9FAFB]/85">{log.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#111827] px-3.5 py-2.5 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-[#9CA3AF]">
              <Clock className="h-3.5 w-3.5 text-[#10B981]" />
              Tiempo total:
            </span>
            <span className="font-bold text-[#10B981]">
              {currentScenario.elapsedMinutes} minutos (SLA &lt; 30m)
            </span>
          </div>
        </div>

        {/* Column 3: Next.js Preview & 1-Click Approval */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#090D16] p-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#10B981]" />
                <span className="font-mono text-xs font-semibold text-[#F9FAFB]">
                  Entorno Preview & Live
                </span>
              </div>
              <span className="rounded-md bg-[#111827] px-2 py-1 font-mono text-[11px] text-[#10B981]">
                Paso 3: Tu aprobación
              </span>
            </div>

            {/* URL Bar */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-2 font-mono text-[11px] text-[#9CA3AF]">
              <span className="truncate">{currentScenario.previewUrl}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
            </div>

            {/* Before Card */}
            <div className="mt-3 rounded-xl border border-[#1F2937] bg-[#111827]/40 p-3 opacity-75">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#9CA3AF]">
                Antes (Producción)
              </div>
              <div className="mt-1 text-xs font-semibold text-[#F9FAFB]">
                {currentScenario.beforePreview.title}
              </div>
              <div className="text-xs text-[#9CA3AF]">
                {currentScenario.beforePreview.highlight}
              </div>
            </div>

            {/* After Preview Card */}
            <div className="mt-3 rounded-xl border border-[#10B981]/50 bg-[#10B981]/10 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                  { isApproved ? "✓ Publicado en Vivo" : "Nuevo en Preview" }
                </span>
                <span className="rounded-full bg-[#090D16] px-2 py-0.5 font-mono text-[10px] text-[#10B981]">
                  {currentScenario.afterPreview.badge}
                </span>
              </div>
              <div className="mt-1.5 text-sm font-bold text-[#F9FAFB]">
                {currentScenario.afterPreview.title}
              </div>
              <div className="mt-1 text-xs font-medium text-[#10B981]">
                {currentScenario.afterPreview.highlight}
              </div>
              <div className="mt-1 text-[11px] text-[#9CA3AF]">
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
                  ? "border border-[#10B981] bg-[#10B981]/20 text-[#10B981]"
                  : "bg-[#10B981] text-[#090D16] hover:bg-[#059669] hover:text-[#F9FAFB]"
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
