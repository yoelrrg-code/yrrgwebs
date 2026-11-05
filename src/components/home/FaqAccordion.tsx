"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/site-data";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]/80 transition-colors hover:border-[#10B981]/40"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-heading text-base font-semibold text-[#F9FAFB] sm:text-lg">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#10B981] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-[#1F2937]/70 px-6 pb-5 pt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
