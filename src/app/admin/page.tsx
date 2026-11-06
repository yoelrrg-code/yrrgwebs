"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Database,
  FolderGit2,
  Mail,
  ShieldCheck,
  Ticket,
  ExternalLink,
  Send,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import type {
  EmailLogRecord,
  ProjectRecord,
  TicketMessageRecord,
  TicketRecord,
  UserRecord,
} from "@/lib/helpdesk-repo";

export default function AdminHelpdeskPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storageMode, setStorageMode] = useState<"mysql" | "memory_fallback">(
    "mysql"
  );
  const [user, setUser] = useState<UserRecord | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLogRecord[]>([]);

  const [activeTab, setActiveTab] = useState<"tickets" | "projects" | "emails">(
    "tickets"
  );
  const [selectedTicket, setSelectedTicket] = useState<TicketRecord | null>(
    null
  );
  const [messages, setMessages] = useState<TicketMessageRecord[]>([]);

  // Admin Ticket Update Controls
  const [editStatus, setEditStatus] = useState("preview_ready");
  const [editPreviewUrl, setEditPreviewUrl] = useState("");
  const [adminReply, setAdminReply] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4500);
  };

  const fetchMessages = useCallback(async (ticketId: string) => {
    const res = await fetch(`/api/portal?ticketId=${ticketId}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages || []);
    }
  }, []);

  const loadAdminData = useCallback(async () => {
    const res = await fetch("/api/portal?scope=admin");
    if (res.status === 401) {
      router.push("/portal/login");
      return;
    }
    const data = await res.json();
    setStorageMode(data.storageMode || "mysql");
    setUser(data.user);
    setProjects(data.projects || []);
    const tcks: TicketRecord[] = data.tickets || [];
    setTickets(tcks);
    setEmailLogs(data.emailLogs || []);

    if (tcks.length > 0) {
      setSelectedTicket((prev) => {
        const chosen = prev
          ? tcks.find((t) => t.id === prev.id) || tcks[0]
          : tcks[0];
        setEditStatus(chosen.status);
        setEditPreviewUrl(
          chosen.preview_url ||
            `https://preview-${chosen.ticket_number.toLowerCase()}.yrrg.ai`
        );
        fetchMessages(chosen.id);
        return chosen;
      });
    }
    setLoading(false);
  }, [router, fetchMessages]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const handleSwitchToAdminSession = async () => {
    setLoading(true);
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@yrrg.ai",
        password: "Admin2026!",
      }),
    });
    await loadAdminData();
  };

  const handleSelectTicket = (tck: TicketRecord) => {
    setSelectedTicket(tck);
    setEditStatus(tck.status);
    setEditPreviewUrl(
      tck.preview_url ||
        `https://preview-${tck.ticket_number.toLowerCase()}.yrrg.ai`
    );
    fetchMessages(tck.id);
  };

  const handleAdminUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const res = await fetch("/api/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "admin_update_ticket",
        ticket_id: selectedTicket.id,
        ticket_number: selectedTicket.ticket_number,
        status: editStatus,
        preview_url: editPreviewUrl,
        admin_reply: adminReply,
      }),
    });

    if (res.ok) {
      setAdminReply("");
      showToast(
        `Ticket #${selectedTicket.ticket_number} actualizado en MySQL y notificado.`
      );
      await loadAdminData();
      await fetchMessages(selectedTicket.id);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-[#070d14]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#00b231] border-t-transparent" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-[75vh] bg-[#070d14] py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-8 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#2fa4e3]" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-[#f7fafc]">
            Consola Exclusiva de Administradores
          </h1>
          <p className="mt-2 text-sm text-[#94a6b8]">
            Actualmente estás conectado como cliente (
            <strong className="text-[#f7fafc]">{user?.email}</strong>). Haz clic
            abajo para cambiar en 1 clic a la sesión de Administrador de
            YRRG.ai y ver todos los tickets y la bandeja de emails enviados:
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleSwitchToAdminSession}
              className="w-full rounded-xl bg-[#00b231] px-5 py-3.5 text-sm font-bold text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
            >
              Cambiar a Sesión Admin (admin@yrrg.ai) en 1 Clic
            </button>
            <Link
              href="/portal"
              className="text-xs font-semibold text-[#94a6b8] hover:text-[#f7fafc]"
            >
              ← Volver a mi Portal de Cliente
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d14] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {toast && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-[#00b231] bg-[#00b231]/15 px-5 py-3.5 text-sm font-semibold text-[#f7fafc]">
            <CheckCircle2 className="h-5 w-5 text-[#00b231]" />
            <span>{toast}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00b231]/40 bg-[#00b231]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00b231]">
                <Database className="h-3.5 w-3.5" />
                {storageMode === "mysql"
                  ? "MySQL Activo (127.0.0.1:3306/yrrgwebs)"
                  : "Modo Demo Cloud"}
              </span>
              <span className="rounded-full border border-[#2fa4e3]/40 bg-[#2fa4e3]/10 px-3 py-1 font-mono text-xs text-[#2fa4e3]">
                Admin Helpdesk Console
              </span>
            </div>
            <h1 className="mt-3 font-heading text-2xl font-extrabold text-[#f7fafc] sm:text-3xl">
              Centro de Control YRRG.ai — Tickets, Proyectos y Emails
            </h1>
          </div>

          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1b2a3d] bg-[#070d14] px-4 py-2.5 text-xs font-semibold text-[#f7fafc] hover:border-[#00b231]"
          >
            <ArrowLeft className="h-4 w-4 text-[#00b231]" />
            <span>Ir a Vista Cliente</span>
          </Link>
        </div>

        {/* KPI Strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-4">
            <div className="font-mono text-xs text-[#94a6b8]">
              Proyectos Totales
            </div>
            <div className="mt-1 font-mono text-3xl font-extrabold text-[#f7fafc]">
              {projects.length}
            </div>
          </div>
          <div className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-4">
            <div className="font-mono text-xs text-[#94a6b8]">
              Tickets Totales
            </div>
            <div className="mt-1 font-mono text-3xl font-extrabold text-[#00b231]">
              {tickets.length}
            </div>
          </div>
          <div className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-4">
            <div className="font-mono text-xs text-[#94a6b8]">
              Previews por Aprobar
            </div>
            <div className="mt-1 font-mono text-3xl font-extrabold text-[#2fa4e3]">
              {tickets.filter((t) => t.status === "preview_ready").length}
            </div>
          </div>
          <div className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-4">
            <div className="font-mono text-xs text-[#94a6b8]">
              Emails Enviados al Admin
            </div>
            <div className="mt-1 font-mono text-3xl font-extrabold text-[#33cf5e]">
              {emailLogs.length}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-[#1b2a3d] pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("tickets")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "tickets"
                ? "bg-[#00b231] text-[#070d14]"
                : "border border-[#1b2a3d] bg-[#0e1724] text-[#94a6b8] hover:text-[#f7fafc]"
            }`}
          >
            <Ticket className="h-4 w-4" />
            <span>Gestión de Tickets ({tickets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "projects"
                ? "bg-[#00b231] text-[#070d14]"
                : "border border-[#1b2a3d] bg-[#0e1724] text-[#94a6b8] hover:text-[#f7fafc]"
            }`}
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Proyectos y Charlas 45 min ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("emails")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "emails"
                ? "bg-[#00b231] text-[#070d14]"
                : "border border-[#1b2a3d] bg-[#0e1724] text-[#94a6b8] hover:text-[#f7fafc]"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>
              Bandeja de Emails al Admin ({emailLogs.length})
            </span>
          </button>
        </div>

        {/* TAB 1: GESTIÓN DE TICKETS */}
        {activeTab === "tickets" && (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-5">
              {tickets.map((tck) => {
                const active = selectedTicket?.id === tck.id;
                return (
                  <div
                    key={tck.id}
                    onClick={() => handleSelectTicket(tck)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      active
                        ? "border-[#00b231] bg-[#0e1724]"
                        : "border-[#1b2a3d] bg-[#0e1724]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00b231]">
                        #{tck.ticket_number} • {tck.project_code}
                      </span>
                      <span className="rounded bg-[#070d14] px-2 py-0.5 font-mono text-[10px] uppercase text-[#2fa4e3]">
                        {tck.status}
                      </span>
                    </div>
                    <div className="mt-1.5 font-heading text-sm font-bold text-[#f7fafc]">
                      {tck.subject}
                    </div>
                    <div className="mt-1 text-xs text-[#94a6b8]">
                      Cliente: {tck.client_name} ({tck.client_company})
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              {selectedTicket && (
                <div className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6">
                  <div className="border-b border-[#1b2a3d] pb-4">
                    <div className="font-mono text-xs text-[#00b231]">
                      #{selectedTicket.ticket_number} • Cliente:{" "}
                      {selectedTicket.client_name} (
                      {selectedTicket.client_company}) • WhatsApp:{" "}
                      {selectedTicket.client_whatsapp}
                    </div>
                    <h2 className="mt-1 font-heading text-xl font-bold text-[#f7fafc]">
                      {selectedTicket.subject}
                    </h2>
                  </div>

                  {/* Admin Control Form */}
                  <form
                    onSubmit={handleAdminUpdate}
                    className="mt-5 space-y-4 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-5"
                  >
                    <div className="font-mono text-xs font-bold uppercase text-[#2fa4e3]">
                      Panel de Ingeniería: Actualizar Estado y Enviar Preview
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                          Estado del Ticket
                        </label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-3 py-2.5 text-sm text-[#f7fafc]"
                        >
                          <option value="received">Recibido</option>
                          <option value="in_progress">
                            En Proceso (IA + Ingeniería)
                          </option>
                          <option value="preview_ready">
                            ⚡ Preview Listo para Aprobar por el Cliente
                          </option>
                          <option value="approved_live">
                            ✓ Aprobado y Publicado en Producción
                          </option>
                          <option value="closed">Cerrado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                          URL de Vista Previa (Staging Preview)
                        </label>
                        <input
                          type="text"
                          value={editPreviewUrl}
                          onChange={(e) => setEditPreviewUrl(e.target.value)}
                          placeholder="https://preview-tck.yrrg.ai"
                          className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-3 py-2.5 text-sm text-[#f7fafc]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#94a6b8]">
                        Respuesta para el Cliente (Opcional)
                      </label>
                      <textarea
                        rows={2}
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        placeholder="Ej. ¡Listo! Ya desplegamos el cambio en el enlace Preview para tu aprobación..."
                        className="mt-1 w-full rounded-xl border border-[#1b2a3d] bg-[#0e1724] px-3.5 py-2 text-sm text-[#f7fafc]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#00b231] px-5 py-2.5 text-xs font-bold text-[#070d14] hover:bg-[#008f27] hover:text-[#f7fafc]"
                    >
                      <Send className="h-4 w-4" />
                      <span>Guardar Cambios y Notificar</span>
                    </button>
                  </form>

                  {/* Messages */}
                  <div className="mt-6 space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className="rounded-xl border border-[#1b2a3d] bg-[#070d14] p-3.5 text-xs"
                      >
                        <div className="flex justify-between font-bold text-[#f7fafc]">
                          <span>
                            {m.sender_name} ({m.sender_role})
                          </span>
                          <span className="font-mono text-[#94a6b8]">
                            {m.created_at}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[#94a6b8]">{m.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROYECTOS Y CHARLAS 45 MIN */}
        {activeTab === "projects" && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-[#1b2a3d] bg-[#0e1724] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#00b231]">
                    {p.code}
                  </span>
                  <span className="rounded-full bg-[#070d14] px-3 py-1 font-mono text-xs text-[#2fa4e3]">
                    {p.service_type} • {p.status}
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-xl font-bold text-[#f7fafc]">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-[#94a6b8]">
                  Cliente: {p.client_name} ({p.client_company})
                </p>

                <div className="mt-4 space-y-2 rounded-2xl border border-[#1b2a3d] bg-[#070d14] p-4 text-xs">
                  <div className="flex items-center gap-2 text-[#33cf5e]">
                    <Calendar className="h-4 w-4" />
                    <span>
                      <strong>Charla 45 min:</strong> {p.kickoff_date}
                    </span>
                  </div>
                  <div className="text-[#94a6b8]">
                    <strong>Dominio:</strong> {p.current_domain || "Por definir"}
                  </div>
                  <div className="text-[#94a6b8]">
                    <strong>Brand Vault:</strong>{" "}
                    {p.brand_vault_notes || "Sin notas cargadas"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BANDEJA DE EMAILS ENVIADOS AL ADMIN */}
        {activeTab === "emails" && (
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-[#00b231]/30 bg-[#0e1724] p-4 text-xs text-[#94a6b8]">
              Cada vez que un cliente se registra, solicita un sitio web con
              charla de 45 min, abre un ticket o aprueba un Preview, el sistema
              envía el correo a{" "}
              <strong className="text-[#00b231]">admin@yrrg.ai</strong> y guarda
              la copia auditable en la tabla MySQL{" "}
              <code className="font-mono text-[#f7fafc]">
                email_notifications_log
              </code>
              .
            </div>

            {emailLogs.map((eml) => (
              <div
                key={eml.id}
                className="rounded-2xl border border-[#1b2a3d] bg-[#0e1724] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#00b231]">
                    Para: {eml.recipient_email} • Evento: {eml.event_type}
                  </span>
                  <span className="font-mono text-xs text-[#94a6b8]">
                    {eml.created_at} •{" "}
                    {eml.delivery_status === "sent_resend"
                      ? "Enviado vía Resend SMTP"
                      : "Registrado en Outbox MySQL"}
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-base font-bold text-[#f7fafc]">
                  {eml.subject}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#94a6b8]">
                  {eml.body_preview}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
