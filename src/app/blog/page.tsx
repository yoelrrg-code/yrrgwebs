import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/site-data";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Recursos | Next.js, AI SEO y Smart Websites",
  description:
    "Artículos estratégicos sobre por qué migrar de WordPress a Next.js, cómo posicionar tu empresa en ChatGPT y Perplexity, y gestión web por WhatsApp.",
};

export default function BlogPage() {
  return (
    <div className="bg-[#070d14] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00b231]">
            Ingeniería & Crecimiento Digital
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-[#f7fafc] sm:text-5xl">
            Blog y Recursos de YRRG.ai
          </h1>
          <p className="mt-4 text-lg text-[#94a6b8]">
            Guías claras y sin tecnicismos innecesarios sobre velocidad web,
            posicionamiento en motores de inteligencia artificial y conversión
            B2B.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-7 transition-all hover:border-[#00b231]/50 sm:p-10"
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

              <h2 className="mt-4 font-heading text-2xl font-bold text-[#f7fafc] sm:text-3xl">
                {post.title}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#94a6b8]">
                {post.excerpt}
              </p>

              <div className="mt-6 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#00b231]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Puntos clave del artículo</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#f7fafc]/90">
                  {post.keyTakeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00b231]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8 text-center">
          <h3 className="font-heading text-2xl font-bold text-[#f7fafc]">
            ¿Prefieres aplicarlo directamente en tu negocio?
          </h3>
          <p className="mt-2 text-sm text-[#94a6b8]">
            Nosotros implementamos toda esta arquitectura por ti desde el primer
            día.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-6 py-3.5 text-sm font-bold text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
          >
            <span>Agendar charla de 45 min</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
