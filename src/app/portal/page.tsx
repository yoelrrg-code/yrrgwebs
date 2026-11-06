"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  FolderGit2,
  LogOut,
  MessageSquare,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
  Calendar,
  Bot,
  User,
  Wrench,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";
import type {
  ProjectRecord,
  TicketMessageRecord,
  TicketRecord,
  UserRecord,
} from "@/lib/helpdesk-repo";

const STATUS_LABELS: Record<
  string,
  { label: string; colorClass: string }
> = {
  received: {
    label: "Recibido",
    colorClass: "border-[#2fa4e3]/40 bg-[#2fa4e3]/10 text-[#2fa4e3]",
  },
  in_progress: {
    label: "En Proceso (IA + Ing.)",
    colorClass: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  },
  preview_ready: {
    label: "⚡ Preview Listo para Aprobar",
    colorClass: "border-[#00b231] bg-[#00b231]/20 text-[#00b231]",
  },
  approved_live: {
    label: "✓ Aprobado y en Producción",
    colorClass: "border-[#00b231]/40 bg-[#00b231]/10 text-[#33cf5e]",
  },
  closed: {
    label: "Cerrado",
    colorClass: "border-[#1b2a3d] bg-[#070d14] text-[#94a6b8]",
  },
};

const TYPE_LABELS: Record<string, string> = {
  initial_build: "Desarrollo Inicial / Migración",
  content_update: "Cambio de Contenido / Precios",
  new_feature: "Nueva Sección / Página",
  optimization_seo: "Optimización / AI SEO",
  support: "Soporte Técnico",
};

export default function ClientPortalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storageMode, setStorageMode] = useState<"mysql" | "memory_fallback">(
    "mysql"
  );
  const [user, setUser] = useState<UserRecord | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [tickets, setTickets] = useState<TicketRecord[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<TicketRecord | null>(
    null
  );
  const [messages, setMessages] = useState<TicketMessageRecord[]>([]);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  // Modals
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [editingVaultProject, setEditingVaultProject] =
    useState<ProjectRecord | null>(null);

  // New Ticket Form State
  const [newTicketProjectId, setNewTicketProjectId] = useState("");
  const [newTicketType, setNewTicketType] = useState("content_update");
  const [newTicketPriority, setNewTicketPriority] = useState("normal");
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketDesc, setNewTicketDesc] = useState("");

  // New Project + 45-min Call Form State
  const [newPrjName, setNewPrjName] = useState("");
  const [newPrjService, setNewPrjService] = useState("smart-website");
  const [newPrjDomain, setNewPrjDomain] = useState("");
  const [newPrjKickoff, setNewPrjKickoff] = useState(
    "Jueves 11:00 hs (GMT-3) — Videollamada 45 min"
  );
  const [newPrjNotes, setNewPrjNotes] = useState("");

  // Brand Vault Edit State
  const [vaultNotes, setVaultNotes] = useState("");
  const [vaultKickoff, setVaultKickoff] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  const fetchMessages = useCallback(async (ticketId: string) => {
    try {
      const res = await fetch(`/api/portal?ticketId=${ticketId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch {
      // ignore
    }
  }, []);

  const loadPortalData = useCallback(async () => {
    try {
      const res = await fetch("/api/portal");
      if (res.status === 401) {
        router.push("/portal/login");
        return;
      }
      const data = await res.json();
      setStorageMode(data.storageMode || "mysql");
      setUser(data.user);
      const prjs: ProjectRecord[] = data.projects || [];
      const tcks: TicketRecord[] = data.tickets || [];
      setProjects(prjs);
      setTickets(tcks);

      if (prjs.length > 0 && !newTicketProjectId) {
        setNewTicketProjectId(prjs[0].id);
      }

      if (tcks.length > 0) {
        setSelectedTicket((prev) => {
          const updated = prev
            ? tcks.find((t) => t.id === prev.id) || tcks[0]
            : tcks[0];
          fetchMessages(updated.id);
          return updated;
        });
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [router, newTicketProjectId, fetchMessages]);

  useEffect(() => {
    loadPortalData();
  }, [loadPortalData]);

  const handleSelectTicket = (tck: TicketRecord) => {
    setSelectedTicket(tck);
    fetchMessages(tck.id);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_ticket",
        project_id: newTicketProjectId || projects[0]?.id,
        type: newTicketType,
        priority: newTicketPriority,
        subject: newTicketSubject,
        description: newTicketDesc,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setShowNewTicketModal(false);
      setNewTicketSubject("");
      setNewTicketDesc("");
      showToast(
        `Ticket #${data.ticket.ticket_number} creado y enviado por email al Administrador.`
      );
      await loadPortalData();
      if (data.ticket) {
        handleSelectTicket(data.ticket);
      }
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_project",
        name: newPrjName,
        service_type: newPrjService,
        current_domain: newPrjDomain,
        kickoff_date: newPrjKickoff,
        kickoff_notes: newPrjNotes,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setShowNewProjectModal(false);
      setNewPrjName("");
      setNewPrjDomain("");
      setNewPrjNotes("");
      showToast(
        `Proyecto ${data.project.code} creado, charla agendada y ticket #${data.ticket.ticket_number} enviado al Admin.`
      );
      await loadPortalData();
    }
  };

  const handleSaveBrandVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVaultProject) return;
    const res = await fetch("/api/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_brand_vault",
        project_id: editingVaultProject.id,
        brand_vault_notes: vaultNotes,
        kickoff_date: vaultKickoff,
      }),
    });
    if (res.ok) {
      setEditingVaultProject(null);
      showToast("Brand Vault y horario de reunión actualizados en MySQL.");
      await loadPortalData();
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim()) return;
    setSubmittingReply(true);
    const res = await fetch("/api/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add_message",
        ticket_id: selectedTicket.id,
        ticket_number: selectedTicket.ticket_number,
        message: replyText,
      }),
    });
    setSubmittingReply(false);
    if (res.ok) {
      setReplyText("");
      await fetchMessages(selectedTicket.id);
      showToast("Comentario enviado y notificado por email a Ingeniería.");
    }
  };

  const handleApprovePreview = async (ticket: TicketRecord) => {
    const res = await fetch("/api/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "approve_preview",
        ticket_id: ticket.id,
        ticket_number: ticket.ticket_number,
      }),
    });
    if (res.ok) {
      showToast(
        `¡Preview del ticket #${ticket.ticket_number} aprobada! Notificación de salida a producción enviada al Admin.`
      );
      await loadPortalData();
      await fetchMessages(ticket.id);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  };

  const filteredTickets =
    selectedProjectId === "all"
      ? tickets
      : tickets.filter((t) => t.project_id === selectedProjectId);

  if (loading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-[#070d14]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#00b231] border-t-transparent" />
          <p className="mt-4 font-mono text-xs text-[#94a6b8]">
            Cargando tus proyectos y tickets desde MySQL...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d14] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Toast Banner */}
        {toastMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#00b231] bg-[#00b231]/15 px-5 py-3.5 text-sm font-semibold text-[#f7fafc] shadow-lg">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#00b231]" />
              {toastMessage}
            </span>
          </div>
        )}

        {/* Top Portal Header */}
        <ScrollReveal variant="fade-down">
          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00b231]/40 bg-[#00b231]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00b231]">
                  <Database className="h-3.5 w-3.5" />
                  {storageMode === "mysql"
                    ? "● Conectado a MySQL (yrrgwebs)"
                    : "● Modo Demo Cloud (In-Memory)"}
                </span>
                <span className="rounded-full border border-[#1b2a3d] bg-[#070d14] px-3 py-1 font-mono text-xs text-[#94a6b8]">
                  Empresa: <strong className="text-[#f7fafc]">{user?.company}</strong>
                </span>
              </div>
              <h1 className="mt-3 font-heading text-2xl font-extrabold text-[#f7fafc] sm:text-3xl">
                Hola, {user?.name}
              </h1>
              <p className="mt-1 text-xs text-[#94a6b8] sm:text-sm">
                Panel de Proyectos Web, Solicitudes de Cambio y Aprobación de
                Vistas Previas en 1 Clic.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowNewProjectModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#2fa4e3]/50 bg-[#2fa4e3]/10 px-4 py-2.5 text-xs font-bold text-[#2fa4e3] transition-colors hover:bg-[#2fa4e3] hover:text-[#070d14]"
              >
                <Calendar className="h-4 w-4" />
                <span>+ Nuevo Sitio Web / Charla 45 min</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewTicketModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-4 py-2.5 text-xs font-bold text-[#070d14] transition-colors hover:bg-[#008f27] hover:text-[#f7fafc]"
              >
                <Plus className="h-4 w-4" />
                <span>Nuevo Ticket de Cambio</span>
              </button>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-xs font-semibold text-[#94a6b8] hover:border-[#2fa4e3] hover:text-[#f7fafc]"
              >
                <ShieldCheck className="h-4 w-4 text-[#2fa4e3]" />
                <span>Vista Admin</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-xs font-semibold text-[#94a6b8] hover:border-red-500/50 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 1: MIS PROYECTOS WEB */}
        <div className="mt-8">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-[#f7fafc]">
                <FolderGit2 className="h-5 w-5 text-[#00b231]" />
                <span>Mis Sitios Web y Proyectos ({projects.length})</span>
              </h2>
              {selectedProjectId !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedProjectId("all")}
                  className="font-mono text-xs text-[#00b231] hover:underline"
                >
                  Ver tickets de todos los proyectos ({tickets.length})
                </button>
              )}
            </div>
          </ScrollReveal>

          <StaggerContainer className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((prj) => {
              const isSelected = selectedProjectId === prj.id;
              const prjTicketCount = tickets.filter(
                (t) => t.project_id === prj.id
              ).length;
              return (
                <StaggerItem key={prj.id} variant="zoom-in" className="h-full">
                  <div
                    onClick={() =>
                      setSelectedProjectId(isSelected ? "all" : prj.id)
                    }
                    className={`h-full cursor-pointer rounded-2xl border p-5 transition-all ${
                      isSelected
                        ? "border-[#00b231] bg-[#0e1724] shadow-lg shadow-[#00b231]/10"
                        : "border-[#1b2a3d] bg-[#0e1724]/80 hover:border-[#00b231]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-[#070d14] px-2.5 py-1 font-mono text-xs font-bold text-[#00b231]">
                        {prj.code}
                      </span>
                      <span className="rounded-full border border-[#1b2a3d] bg-[#070d14] px-2.5 py-0.5 font-mono text-xs uppercase text-[#2fa4e3]">
                        {prj.status === "production"
                          ? "En Producción"
                          : prj.status === "onboarding"
                          ? "Onboarding / Charla 45m"
                          : "En Desarrollo"}
                      </span>
                    </div>

                    <h3 className="mt-3 font-heading text-base font-bold text-[#f7fafc]">
                      {prj.name}
                    </h3>
                    <div className="mt-1 text-xs text-[#94a6b8]">
                      Dominio:{" "}
                      <span className="font-mono text-[#f7fafc]">
                        {prj.current_domain || "En configuración"}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-[#94a6b8]">
                      Charla 45 min:{" "}
                      <span className="text-[#33cf5e]">{prj.kickoff_date}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#1b2a3d] pt-3 text-xs">
                      <span className="font-mono text-[#94a6b8]">
                        {prjTicketCount} ticket(s) asociados
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingVaultProject(prj);
                          setVaultNotes(prj.brand_vault_notes || "");
                          setVaultKickoff(prj.kickoff_date || "");
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-[#2fa4e3] hover:underline"
                      >
                        <Wrench className="h-3.5 w-3.5" />
                        <span>Brand Vault / Horario</span>
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* SECTION 2: TICKET LIST + INTERACTIVE THREAD & 1-CLICK PREVIEW APPROVAL */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Tickets List */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-[#f7fafc]">
                <Ticket className="h-5 w-5 text-[#00b231]" />
                <span>
                  Mis Tickets ({filteredTickets.length})
                </span>
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {filteredTickets.map((tck) => {
                const active = selectedTicket?.id === tck.id;
                const st =
                  STATUS_LABELS[tck.status] || STATUS_LABELS.received;
                return (
                  <div
                    key={tck.id}
                    onClick={() => handleSelectTicket(tck)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      active
                        ? "border-[#00b231] bg-[#0e1724] shadow-lg shadow-[#00b231]/10"
                        : "border-[#1b2a3d] bg-[#0e1724]/60 hover:border-[#1b2a3d]/90"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#00b231]">
                          #{tck.ticket_number}
                        </span>
                        <span className="rounded bg-[#070d14] px-2 py-0.5 font-mono text-xs text-[#94a6b8]">
                          {tck.project_code || "PRJ"}
                        </span>
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${st.colorClass}`}
                      >
                        {st.label}
                      </span>
                    </div>

                    <h3 className="mt-2 font-heading text-sm font-bold text-[#f7fafc]">
                      {tck.subject}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-xs text-[#94a6b8]">
                      <span>{TYPE_LABELS[tck.type] || tck.type}</span>
                      <span className="font-mono">{tck.created_at}</span>
                    </div>
                  </div>
                );
              })}

              {filteredTickets.length === 0 && (
                <div className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-8 text-center text-sm text-[#94a6b8]">
                  No hay tickets en este proyecto todavía. Haz clic en{" "}
                  <strong className="text-[#00b231]">
                    Nuevo Ticket de Cambio
                  </strong>{" "}
                  para enviar tu primera solicitud.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Ticket Inspector, 1-Click Preview Sign-Off & Conversation */}
          <div className="lg:col-span-7">
            {selectedTicket ? (
              <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1b2a3d] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-[#070d14] px-2.5 py-1 font-mono text-xs font-bold text-[#00b231]">
                        #{selectedTicket.ticket_number}
                      </span>
                      <span className="font-mono text-xs text-[#2fa4e3]">
                        Proyecto: {selectedTicket.project_code || "PRJ-101"} (
                        {selectedTicket.project_name || "Smart Website"})
                      </span>
                    </div>
                    <h2 className="mt-2 font-heading text-xl font-bold text-[#f7fafc]">
                      {selectedTicket.subject}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-xs font-semibold ${
                      (
                        STATUS_LABELS[selectedTicket.status] ||
                        STATUS_LABELS.received
                      ).colorClass
                    }`}
                  >
                    {
                      (
                        STATUS_LABELS[selectedTicket.status] ||
                        STATUS_LABELS.received
                      ).label
                    }
                  </span>
                </div>

                {/* 1-CLICK PREVIEW SIGN-OFF CARD */}
                {(selectedTicket.status === "preview_ready" ||
                  selectedTicket.preview_url) && (
                  <div className="mt-5 rounded-2xl border border-[#00b231] bg-[#00b231]/10 p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#00b231]">
                          <Sparkles className="h-4 w-4" />
                          Entorno de Vista Previa (Staging Preview)
                        </span>
                        <div className="mt-1 flex items-center gap-2 font-mono text-xs text-[#f7fafc]">
                          <span>
                            {selectedTicket.preview_url ||
                              "https://preview.yrrg.ai"}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5 text-[#00b231]" />
                        </div>
                        {selectedTicket.approved_by ? (
                          <p className="mt-1.5 text-xs text-[#33cf5e]">
                            ✓ Aprobado por {selectedTicket.approved_by} el{" "}
                            {selectedTicket.approved_at}
                          </p>
                        ) : (
                          <p className="mt-1.5 text-xs text-[#94a6b8]">
                            Revisa el cambio en el enlace Preview. Al aprobarlo,
                            nuestro sistema publica en vivo y notifica al
                            administrador.
                          </p>
                        )}
                      </div>

                      {selectedTicket.status !== "approved_live" && (
                        <button
                          type="button"
                          onClick={() => handleApprovePreview(selectedTicket)}
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#00b231] px-4 py-3 text-xs font-bold text-[#070d14] shadow-lg shadow-[#00b231]/20 transition-all hover:bg-[#008f27] hover:text-[#f7fafc]"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Aprobar Preview y Publicar (1 Clic)</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Ticket Conversation Thread */}
                <div className="mt-6 space-y-4">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#94a6b8]">
                    Historial de Conversación y Actividad IA / Ingeniería
                  </div>

                  <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
                    {messages.map((msg) => {
                      const isClient = msg.sender_role === "client";
                      const isAi = msg.sender_role === "ai_agent";
                      return (
                        <div
                          key={msg.id}
                          className={`rounded-2xl border p-4 text-sm ${
                            isClient
                              ? "border-[#1b2a3d] bg-[#070d14]"
                              : isAi
                              ? "border-[#2fa4e3]/40 bg-[#2fa4e3]/10"
                              : "border-[#00b231]/40 bg-[#00b231]/10"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-bold text-[#f7fafc]">
                              {isAi ? (
                                <Bot className="h-4 w-4 text-[#2fa4e3]" />
                              ) : isClient ? (
                                <User className="h-4 w-4 text-[#94a6b8]" />
                              ) : (
                                <ShieldCheck className="h-4 w-4 text-[#00b231]" />
                              )}
                              {msg.sender_name}
                            </span>
                            <span className="font-mono text-xs text-[#94a6b8]">
                              {msg.created_at}
                            </span>
                          </div>
                          <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-[#f7fafc]/90 sm:text-sm">
                            {msg.message}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply Input */}
                  <form onSubmit={handleSendReply} className="mt-4 flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe un comentario o ajuste sobre este ticket..."
                      className="flex-1 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-3 text-sm text-[#f7fafc] placeholder-[#94a6b8]/50 focus:border-[#00b231] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submittingReply}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-5 py-3 text-xs font-bold text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
                    >
                      <Send className="h-4 w-4" />
                      <span>Enviar</span>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-12 text-center text-sm text-[#94a6b8]">
                Selecciona un ticket de la izquierda para ver su estado, enlace
                Preview y conversación.
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

        {/* MODAL 1: NEW CHANGE / SUPPORT TICKET */}
        {showNewTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 shadow-2xl sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[#f7fafc]">
                Nuevo Ticket de Cambio o Soporte
              </h3>
              <p className="mt-1 text-xs text-[#94a6b8]">
                Se registrará en MySQL y enviará un correo inmediato a nuestro
                equipo de ingeniería (SLA &lt; 30 min para Preview).
              </p>

              <form onSubmit={handleCreateTicket} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Sitio Web / Proyecto *
                  </label>
                  <select
                    value={newTicketProjectId}
                    onChange={(e) => setNewTicketProjectId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} — {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                      Tipo de Solicitud
                    </label>
                    <select
                      value={newTicketType}
                      onChange={(e) => setNewTicketType(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-2.5 text-sm text-[#f7fafc]"
                    >
                      <option value="content_update">
                        Cambio de Contenido / Precios
                      </option>
                      <option value="new_feature">
                        Nueva Sección / Página
                      </option>
                      <option value="optimization_seo">
                        Optimización / AI SEO
                      </option>
                      <option value="support">Soporte Técnico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                      Prioridad
                    </label>
                    <select
                      value={newTicketPriority}
                      onChange={(e) => setNewTicketPriority(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3 py-2.5 text-sm text-[#f7fafc]"
                    >
                      <option value="normal">Normal (&lt; 30 min)</option>
                      <option value="high">Alta (Campaña Activa)</option>
                      <option value="urgent">Urgente (Producción)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Asunto del Cambio *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="Ej. Actualizar precios del Plan Corporativo y sumar testimonio"
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Detalle de lo que deseas modificar o agregar *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newTicketDesc}
                    onChange={(e) => setNewTicketDesc(e.target.value)}
                    placeholder="Describe con tus palabras el texto, precios, promoción o sección que quieres actualizar..."
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-2.5 text-xs font-semibold text-[#94a6b8]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#00b231] px-5 py-2.5 text-xs font-bold text-[#070d14]"
                  >
                    Crear Ticket y Notificar al Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: REQUEST NEW WEBSITE PROJECT + SCHEDULE 45-MIN CALL */}
        {showNewProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 shadow-2xl sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[#f7fafc]">
                Solicitar Nuevo Sitio Web + Agendar Charla (45 min)
              </h3>
              <p className="mt-1 text-xs text-[#94a6b8]">
                ¿Necesitas otra web para una unidad de negocio o campaña?
                Créala aquí y coordinamos la reunión de descubrimiento.
              </p>

              <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Nombre del Nuevo Sitio o Proyecto *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPrjName}
                    onChange={(e) => setNewPrjName(e.target.value)}
                    placeholder="Ej. Portal Mayorista B2B 2026"
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Servicio Requerido
                  </label>
                  <select
                    value={newPrjService}
                    onChange={(e) => setNewPrjService(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  >
                    <option value="smart-website">
                      Smart Website en Next.js
                    </option>
                    <option value="migracion">
                      Migración sin Dolor (WordPress a Next.js)
                    </option>
                    <option value="optimizacion">
                      Optimización Core Web Vitals
                    </option>
                    <option value="ai-seo">AI SEO & Buscadores IA</option>
                    <option value="mantenimiento">
                      Mantenimiento Blindado 24/7
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Dominio (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newPrjDomain}
                    onChange={(e) => setNewPrjDomain(e.target.value)}
                    placeholder="https://mayorista.tuempresa.com"
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Día y Horario para la Charla de 45 min *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPrjKickoff}
                    onChange={(e) => setNewPrjKickoff(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Notas u Objetivos del Proyecto
                  </label>
                  <textarea
                    rows={3}
                    value={newPrjNotes}
                    onChange={(e) => setNewPrjNotes(e.target.value)}
                    placeholder="Objetivo comercial, público objetivo o referencias..."
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-2.5 text-xs font-semibold text-[#94a6b8]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#00b231] px-5 py-2.5 text-xs font-bold text-[#070d14]"
                  >
                    Crear Proyecto y Agendar Charla
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: EDIT BRAND VAULT */}
        {editingVaultProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 shadow-2xl sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[#f7fafc]">
                Brand Vault — {editingVaultProject.code} (
                {editingVaultProject.name})
              </h3>
              <p className="mt-1 text-xs text-[#94a6b8]">
                Guarda aquí los colores de marca, enlaces a Google Drive/Figma
                con logos, y datos de tu dominio para nuestro equipo.
              </p>

              <form onSubmit={handleSaveBrandVault} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Horario Charla de 45 min
                  </label>
                  <input
                    type="text"
                    value={vaultKickoff}
                    onChange={(e) => setVaultKickoff(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                    Activos de Marca, Colores, Logos y Accesos DNS
                  </label>
                  <textarea
                    rows={5}
                    value={vaultNotes}
                    onChange={(e) => setVaultNotes(e.target.value)}
                    placeholder="Colores hexadecimales, link a carpeta de fotos, proveedor de dominio..."
                    className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#070d14] px-3.5 py-2.5 text-sm text-[#f7fafc]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingVaultProject(null)}
                    className="rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-2.5 text-xs font-semibold text-[#94a6b8]"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#00b231] px-5 py-2.5 text-xs font-bold text-[#070d14]"
                  >
                    Guardar en MySQL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
