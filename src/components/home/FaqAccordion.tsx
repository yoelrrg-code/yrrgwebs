"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/site-data";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.question}
            className="card-interactive overflow-hidden rounded-2xl border border-[#1b2a3d] bg-[#0e1724]/90 hover:border-[#00b231]/45"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-heading text-base font-bold leading-snug text-[#f7fafc] sm:text-lg">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#00b231] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="animate-fade-slide border-t border-[#1b2a3d]/70 px-6 pb-6 pt-4 text-base leading-relaxed text-[#94a6b8]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
