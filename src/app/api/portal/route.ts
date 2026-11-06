import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
  addTicketMessage,
  adminUpdateTicket,
  approveTicketPreview,
  createProject,
  createTicket,
  ensureDatabaseInitialized,
  findTicketById,
  findUserById,
  getMessagesForTicket,
  listAllProjects,
  listAllTickets,
  listEmailNotifications,
  listProjectsForUser,
  listTicketsForUser,
  ProjectServiceType,
  TicketCategoryType,
  TicketPriorityType,
  TicketStatusType,
  updateProjectBrandVault,
} from "@/lib/helpdesk-repo";
import { notifyAdminByEmail } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  const session = await getSessionUser();
  const storageMode = await ensureDatabaseInitialized();

  if (!session) {
    return NextResponse.json(
      { authenticated: false, storageMode },
      { status: 401 }
    );
  }

  const scope = req.nextUrl.searchParams.get("scope") || "client";
  const ticketId = req.nextUrl.searchParams.get("ticketId");

  if (ticketId) {
    const ticket = await findTicketById(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
    }
    // Authorization check: User must be ticket owner or admin
    if (session.role !== "admin" && ticket.user_id !== session.id) {
      return NextResponse.json(
        { error: "Acceso no autorizado a este ticket." },
        { status: 403 }
      );
    }
    const messages = await getMessagesForTicket(ticketId);
    return NextResponse.json({ ok: true, ticket, messages, storageMode });
  }

  const fullUser = await findUserById(session.id);

  if (scope === "admin" && session.role === "admin") {
    const [projects, tickets, emailLogs] = await Promise.all([
      listAllProjects(),
      listAllTickets(),
      listEmailNotifications(),
    ]);
    return NextResponse.json({
      authenticated: true,
      storageMode,
      user: fullUser || session,
      projects,
      tickets,
      emailLogs,
    });
  }

  const [projects, tickets] = await Promise.all([
    listProjectsForUser(session.id),
    listTicketsForUser(session.id),
  ]);

  return NextResponse.json({
    authenticated: true,
    storageMode,
    user: fullUser || session,
    projects,
    tickets,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json(
      { error: "Sesión expirada. Por favor vuelve a iniciar sesión." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { action } = body;

    // 1. Create a New Website Project + Schedule 45-min Call + Open Initial Ticket
    if (action === "create_project") {
      const {
        name,
        service_type,
        current_domain,
        kickoff_date,
        kickoff_notes,
        brand_vault_notes,
      } = body;

      if (!name) {
        return NextResponse.json(
          { error: "El nombre del sitio o proyecto es obligatorio." },
          { status: 400 }
        );
      }

      const project = await createProject({
        user_id: session.id,
        name,
        service_type: (service_type as ProjectServiceType) || "smart-website",
        current_domain,
        kickoff_date,
        kickoff_notes,
        brand_vault_notes,
      });

      const ticket = await createTicket({
        user_id: session.id,
        project_id: project.id,
        type: "initial_build",
        priority: "high",
        subject: `Nuevo Sitio Web Solicitado: ${project.name} (${project.code})`,
        description: `Solicitud de nuevo proyecto web.\nServicio: ${
          project.service_type
        }\nDominio: ${
          project.current_domain || "Por definir"
        }\nCharla de 45 min agendada: ${
          project.kickoff_date
        }\nObjetivos / Notas: ${kickoff_notes || "Conversar en la llamada."}`,
        sender_name: session.name,
      });

      await notifyAdminByEmail({
        subject: `[YRRG.ai Nuevo Proyecto #${project.code}] ${session.name} (${session.company}) agendó charla de 45 min`,
        event_type: "new_project_kickoff",
        related_project_code: project.code,
        related_ticket_number: ticket.ticket_number,
        client_name: `${session.name} (${session.company})`,
        body_preview: `Proyecto: ${project.name} (${project.code}) | Servicio: ${project.service_type} | Charla 45 min: ${project.kickoff_date} | Ticket inicial: #${ticket.ticket_number}.`,
      });

      return NextResponse.json({ ok: true, project, ticket });
    }

    // 2. Update Project Brand Vault & Kickoff Slot
    if (action === "update_brand_vault") {
      const { project_id, brand_vault_notes, kickoff_date } = body;
      await updateProjectBrandVault({
        project_id,
        user_id: session.id,
        brand_vault_notes: brand_vault_notes || "",
        kickoff_date,
      });
      return NextResponse.json({ ok: true });
    }

    // 3. Create a New Change / Support Ticket
    if (action === "create_ticket") {
      const { project_id, type, priority, subject, description } = body;
      if (!project_id || !subject || !description) {
        return NextResponse.json(
          { error: "Selecciona el proyecto y completa el asunto y detalle." },
          { status: 400 }
        );
      }

      const ticket = await createTicket({
        user_id: session.id,
        project_id,
        type: (type as TicketCategoryType) || "content_update",
        priority: (priority as TicketPriorityType) || "normal",
        subject,
        description,
        sender_name: session.name,
      });

      await notifyAdminByEmail({
        subject: `[YRRG.ai Ticket #${ticket.ticket_number}] ${ticket.subject} — ${session.company}`,
        event_type: "new_ticket",
        related_ticket_number: ticket.ticket_number,
        client_name: `${session.name} (${session.company})`,
        body_preview: `Prioridad: ${ticket.priority.toUpperCase()} | Tipo: ${ticket.type} | Detalle: ${ticket.description}`,
      });

      return NextResponse.json({ ok: true, ticket });
    }

    // 4. Add a Reply Message in Ticket Thread
    if (action === "add_message") {
      const { ticket_id, ticket_number, message } = body;
      if (!ticket_id || !message) {
        return NextResponse.json(
          { error: "El mensaje no puede estar vacío." },
          { status: 400 }
        );
      }

      const ticket = await findTicketById(ticket_id);
      if (!ticket) {
        return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
      }
      if (session.role !== "admin" && ticket.user_id !== session.id) {
        return NextResponse.json(
          { error: "No tienes permiso para responder en este ticket." },
          { status: 403 }
        );
      }

      const newMsg = await addTicketMessage({
        ticket_id,
        sender_user_id: session.id,
        sender_name: session.name,
        sender_role: session.role === "admin" ? "admin" : "client",
        message,
      });

      if (session.role !== "admin") {
        await notifyAdminByEmail({
          subject: `[YRRG.ai Respuesta en #${ticket_number || ticket_id}] ${session.name} (${session.company})`,
          event_type: "new_message",
          related_ticket_number: ticket_number || ticket_id,
          client_name: `${session.name} (${session.company})`,
          body_preview: `Nuevo comentario del cliente en el ticket #${
            ticket_number || ticket_id
          }: "${message}"`,
        });
      }

      return NextResponse.json({ ok: true, message: newMsg });
    }

    // 5. 1-Click Client Approval of Preview Link
    if (action === "approve_preview") {
      const { ticket_id, ticket_number } = body;
      if (!ticket_id) {
        return NextResponse.json({ error: "Ticket ID requerido." }, { status: 400 });
      }

      const ticket = await findTicketById(ticket_id);
      if (!ticket) {
        return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
      }
      if (session.role !== "admin" && ticket.user_id !== session.id) {
        return NextResponse.json(
          { error: "No tienes permiso para aprobar este ticket." },
          { status: 403 }
        );
      }

      const approvedLabel = `${session.name} (${session.email})`;

      const updated = await approveTicketPreview({
        ticket_id,
        approved_by_label: approvedLabel,
        sender_user_id: session.id,
        sender_name: session.name,
      });

      await notifyAdminByEmail({
        subject: `✅ [YRRG.ai Preview APROBADO #${ticket_number || ticket_id}] ${session.company} autorizó publicar en vivo`,
        event_type: "ticket_approved",
        related_ticket_number: ticket_number || ticket_id,
        client_name: `${session.name} (${session.company})`,
        body_preview: `El cliente ${approvedLabel} aprobó el enlace Preview del ticket #${
          ticket_number || ticket_id
        } para salida inmediata a producción.`,
      });

      return NextResponse.json({ ok: true, ticket: updated });
    }

    // 6. Admin Update Ticket Status / Preview URL / Reply
    if (action === "admin_update_ticket") {
      if (session.role !== "admin") {
        return NextResponse.json({ error: "No autorizado." }, { status: 403 });
      }

      const { ticket_id, ticket_number, status, preview_url, admin_reply } =
        body;
      await adminUpdateTicket({
        ticket_id,
        status: status as TicketStatusType,
        preview_url,
        admin_reply,
        admin_name: session.name,
        admin_user_id: session.id,
      });

      if (status === "preview_ready" && preview_url) {
        await notifyAdminByEmail({
          subject: `[YRRG.ai Preview Listo #${ticket_number || ticket_id}] Enviado para aprobación del cliente`,
          event_type: "preview_ready",
          related_ticket_number: ticket_number || ticket_id,
          client_name: session.name,
          body_preview: `Preview generada: ${preview_url} | Estado cambiado a 'preview_ready'.`,
        });
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Acción desconocida." }, { status: 400 });
  } catch (err) {
    console.error("Portal API error:", err);
    return NextResponse.json(
      { error: "Error procesando la solicitud en el servidor." },
      { status: 500 }
    );
  }
}
