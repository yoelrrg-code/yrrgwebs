import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";
import {
  createProject,
  createTicket,
  createUser,
  findUserByEmail,
  ProjectServiceType,
} from "@/lib/helpdesk-repo";
import { notifyAdminByEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!checkRateLimit(`register:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Por favor aguarda un minuto." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      company,
      phone_whatsapp,
      country,
      tax_id,
      create_initial_project,
      project_name,
      service_type,
      current_domain,
      kickoff_date,
      kickoff_notes,
    } = body;

    if (!name || !email || !password || !company || !phone_whatsapp) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos obligatorios." },
        { status: 400 }
      );
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        {
          error:
            "Ya existe una cuenta registrada con este correo electrónico. Inicia sesión.",
        },
        { status: 409 }
      );
    }

    const newUser = await createUser({
      name,
      email,
      password,
      auth_provider: "credentials",
      role: "client",
      company,
      phone_whatsapp,
      country: country || "Argentina",
      tax_id,
    });

    await notifyAdminByEmail({
      subject: `[YRRG.ai Nuevo Cliente] ${newUser.name} (${newUser.company}) se registró en el Portal`,
      event_type: "new_registration",
      client_name: newUser.name,
      body_preview: `Nuevo cliente registrado: ${newUser.name} (${newUser.email}) | Empresa: ${newUser.company} | WhatsApp: ${newUser.phone_whatsapp} | País: ${newUser.country}.`,
    });

    if (create_initial_project && project_name) {
      const proj = await createProject({
        user_id: newUser.id,
        name: project_name,
        service_type: (service_type as ProjectServiceType) || "smart-website",
        current_domain,
        kickoff_date: kickoff_date || "Por coordinar por WhatsApp",
        kickoff_notes,
      });

      const tck = await createTicket({
        user_id: newUser.id,
        project_id: proj.id,
        type: "initial_build",
        priority: "high",
        subject: `Solicitud Inicial de Sitio Web: ${proj.name} (${proj.code})`,
        description: `Proyecto inicial creado durante el registro.\nServicio: ${proj.service_type}\nDominio actual: ${
          proj.current_domain || "Nuevo dominio"
        }\nCharla 45 min agendada: ${
          proj.kickoff_date
        }\nNotas: ${kickoff_notes || "Sin notas adicionales."}`,
        sender_name: newUser.name,
      });

      await notifyAdminByEmail({
        subject: `[YRRG.ai Proyecto #${proj.code}] Solicitud de Sitio + Charla 45 min de ${newUser.company}`,
        event_type: "new_project_kickoff",
        related_project_code: proj.code,
        related_ticket_number: tck.ticket_number,
        client_name: newUser.name,
        body_preview: `Proyecto: ${proj.name} (${proj.code}) | Servicio: ${proj.service_type} | Charla 45 min: ${proj.kickoff_date} | Ticket generado: #${tck.ticket_number}.`,
      });
    }

    const token = createSessionToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company: newUser.company,
      authProvider: newUser.auth_provider,
    });

    const response = NextResponse.json({
      ok: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Error procesando el registro." },
      { status: 500 }
    );
  }
}
