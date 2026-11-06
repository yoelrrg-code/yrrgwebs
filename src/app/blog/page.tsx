import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/site-data";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog & Recursos | Next.js, AI SEO y Smart Websites",
  description:
    "Artículos estratégicos sobre por qué migrar de WordPress a Next.js, cómo posicionar tu empresa en ChatGPT y Perplexity, y gestión web por WhatsApp.",
};

export default function BlogPage() {
  return (
    <div className="bg-[#070d14] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
              Ingeniería & Crecimiento Digital
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.2] text-[#f7fafc] sm:text-5xl">
              Blog y Recursos de YRRG.ai
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#94a6b8]">
              Guías claras y sin tecnicismos innecesarios sobre velocidad web,
              posicionamiento en motores de inteligencia artificial y conversión
              B2B.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="mt-16 space-y-8">
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.slug} variant="fade-up">
              <article
                className="card-interactive rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-7 hover:border-[#00b231]/50 sm:p-10"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#94a6b8]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00b231]/15 px-3 py-1 font-mono font-semibold text-[#00b231]">
                    <BookOpen className="h-3.5 w-3.5" />
                    {post.category}
                  </span>
                  <span className="font-mono">{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>Por {post.author}</span>
                </div>

                <h2 className="mt-4 font-heading text-2xl font-bold leading-snug text-[#f7fafc] sm:text-3xl">
                  {post.title}
                </h2>

                <p className="mt-3.5 text-base leading-relaxed text-[#94a6b8]">
                  {post.excerpt}
                </p>

                <div className="mt-6 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-6">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#00b231]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Puntos clave del artículo</span>
                  </div>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#f7fafc]/90 sm:text-base">
                    {post.keyTakeaways.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#00b231]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal variant="zoom-in" delay={0.15} className="mt-16 rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8 text-center sm:p-12">
          <h3 className="font-heading text-2xl font-bold leading-snug text-[#f7fafc] sm:text-3xl">
            ¿Prefieres aplicarlo directamente en tu negocio?
          </h3>
          <p className="mt-2.5 text-base leading-relaxed text-[#94a6b8]">
            Nosotros implementamos toda esta arquitectura por ti desde el primer
            día.
          </p>
          <Link
            href="/portal/registro"
            className="animate-pulse-glow mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-7 py-4 text-base font-bold text-[#070d14] transition-all duration-300 hover:bg-[#008f27] hover:text-[#f7fafc]"
          >
            <span>Agendar charla de 45 min</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
