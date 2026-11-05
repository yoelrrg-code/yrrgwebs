import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function Logo({ className = "", showSubtitle = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 focus:outline-none ${className}`}
      aria-label="YRRG.ai Inicio"
    >
      {/* Rounded square with emerald-to-indigo gradient containing >_ + bolt */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#6366F1] p-[1px] shadow-lg shadow-emerald-500/20 transition-transform duration-200 group-hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090D16]/90 backdrop-blur-sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <defs>
              <linearGradient
                id="yrrg-logo-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            {/* Terminal prompt chevron > */}
            <path
              d="M4.5 7.5L9.5 12L4.5 16.5"
              stroke="#10B981"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Terminal underscore _ */}
            <path
              d="M10.5 16.5H13.5"
              stroke="#6366F1"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Electric bolt */}
            <path
              d="M16.5 4.5L13 11.5H17L14.5 19.5L20.5 11H16.2L16.5 4.5Z"
              fill="url(#yrrg-logo-grad)"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline font-heading text-xl font-extrabold tracking-tight text-[#F9FAFB]">
          <span>YRRG</span>
          <span className="text-[#10B981]">.ai</span>
        </div>
        {showSubtitle && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF]">
            Smart Website System
          </span>
        )}
      </div>
    </Link>
  );
}
