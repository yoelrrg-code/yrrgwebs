"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRICING_DATA } from "@/data/site-data";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
} from "lucide-react";

export default function PreciosPage() {
  const [billingAnnual, setBillingAnnual] = useState(false);

  const displayedMonthly = billingAnnual
    ? PRICING_DATA.annualMonthlyEquivalent
    : PRICING_DATA.monthlyFee;

  return (
    <div className="bg-[#070d14] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
            Inversión Transparente
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-[#f7fafc] sm:text-5xl">
            Un precio simple. Todo incluido.
          </h1>
          <p className="mt-4 text-lg text-[#94a6b8]">
            Sin cotizaciones eternas ni cobros por hora cada vez que necesitas
            actualizar tu sitio web.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-1.5">
            <button
              type="button"
              onClick={() => setBillingAnnual(false)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                !billingAnnual
                  ? "bg-[#00b231] text-[#070d14]"
                  : "text-[#94a6b8] hover:text-[#f7fafc]"
              }`}
            >
              Pago Mensual (${PRICING_DATA.monthlyFee}/mes)
            </button>
            <button
              type="button"
              onClick={() => setBillingAnnual(true)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                billingAnnual
                  ? "bg-[#00b231] text-[#070d14]"
                  : "text-[#94a6b8] hover:text-[#f7fafc]"
              }`}
            >
              Pago Anual (${PRICING_DATA.annualMonthlyEquivalent}/mes • Ahorra
              17%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main All-in-One Plan */}
          <div className="rounded-3xl border border-[#00b231]/50 bg-[#0e1724] p-8 shadow-2xl shadow-[#00b231]/10 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00b231]/15 px-3 py-1 font-mono text-xs font-semibold text-[#00b231]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {PRICING_DATA.standardPlan.badge}
                </span>
                <h2 className="mt-3 font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
                  {PRICING_DATA.standardPlan.name}
                </h2>
              </div>
            </div>

            <p className="mt-3 text-sm text-[#94a6b8] sm:text-base">
              {PRICING_DATA.standardPlan.description}
            </p>

            {/* Price Breakdown Boxes */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5">
                <div className="font-mono text-xs uppercase text-[#94a6b8]">
                  {PRICING_DATA.standardPlan.setupTitle}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-extrabold text-[#f7fafc]">
                    ${PRICING_DATA.setupFee}
                  </span>
                  <span className="font-mono text-xs text-[#94a6b8]">
                    USD (Pago único)
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#94a6b8]">
                  {PRICING_DATA.standardPlan.setupSubtitle}
                </p>
              </div>

              <div className="rounded-2xl border border-[#00b231]/40 bg-[#070d14] p-5">
                <div className="font-mono text-xs uppercase text-[#00b231]">
                  {PRICING_DATA.standardPlan.monthlyTitle}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-extrabold text-[#00b231]">
                    ${displayedMonthly}
                  </span>
                  <span className="font-mono text-xs text-[#94a6b8]">
                    USD / mes
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#94a6b8]">
                  {PRICING_DATA.standardPlan.monthlySubtitle}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="font-mono text-xs uppercase tracking-wider text-[#94a6b8]">
                El Estándar YRRG.ai incluido en tu plan:
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PRICING_DATA.standardPlan.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-sm text-[#f7fafc]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00b231]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b231] px-6 py-4 text-base font-bold text-[#070d14] transition-colors hover:bg-[#008f27] hover:text-[#f7fafc] sm:w-auto"
              >
                <span>Comenzar ahora por ${PRICING_DATA.setupFee} USD</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enterprise / Custom Plan */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2fa4e3]/15 px-3 py-1 font-mono text-xs font-semibold text-[#2fa4e3]">
                <Building2 className="h-3.5 w-3.5" />
                Corporativos & Multi-País
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold text-[#f7fafc]">
                {PRICING_DATA.enterprisePlan.name}
              </h2>
              <div className="mt-3 font-heading text-3xl font-extrabold text-[#f7fafc]">
                {PRICING_DATA.enterprisePlan.priceLabel}
              </div>
              <p className="mt-3 text-sm text-[#94a6b8]">
                {PRICING_DATA.enterprisePlan.description}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-[#f7fafc]/90">
                {PRICING_DATA.enterprisePlan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2fa4e3]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contacto"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-5 py-3.5 text-sm font-semibold text-[#f7fafc] hover:border-[#2fa4e3]"
            >
              <span>Contactar Ventas Enterprise</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-center font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
            Comparativa honesta: YRRG.ai vs Opciones Tradicionales
          </h2>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#1b2a3d] bg-[#0e1724]">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#1b2a3d] bg-[#070d14] font-mono text-xs uppercase text-[#94a6b8]">
                  <th className="p-4 sm:p-5">Criterio</th>
                  <th className="p-4 text-[#00b231] sm:p-5">
                    YRRG.ai (Next.js + IA)
                  </th>
                  <th className="p-4 sm:p-5">Agencia Tradicional</th>
                  <th className="p-4 sm:p-5">WordPress / Wix (Hazlo tú)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b2a3d]">
                {PRICING_DATA.comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-[#070d14]/40">
                    <td className="p-4 font-semibold text-[#f7fafc] sm:p-5">
                      {row.feature}
                    </td>
                    <td className="p-4 font-semibold text-[#00b231] sm:p-5">
                      {row.yrrg}
                    </td>
                    <td className="p-4 text-[#94a6b8] sm:p-5">{row.agency}</td>
                    <td className="p-4 text-[#94a6b8] sm:p-5">{row.diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
            Preguntas frecuentes sobre precios y facturación
          </h2>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
