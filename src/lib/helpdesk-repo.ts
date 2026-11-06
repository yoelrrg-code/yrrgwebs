import crypto from "crypto";
import { RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export type AuthProviderType =
  | "credentials"
  | "google"
  | "github"
  | "magic_link";

export type UserRoleType = "client" | "approver" | "admin";

export type ProjectServiceType =
  | "smart-website"
  | "migracion"
  | "optimizacion"
  | "ai-seo"
  | "mantenimiento";

export type ProjectStatusType =
  | "onboarding"
  | "development"
  | "preview_ready"
  | "production";

export type TicketCategoryType =
  | "initial_build"
  | "content_update"
  | "new_feature"
  | "optimization_seo"
  | "support";

export type TicketPriorityType = "normal" | "high" | "urgent";

export type TicketStatusType =
  | "received"
  | "in_progress"
  | "preview_ready"
  | "approved_live"
  | "closed";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string | null;
  auth_provider: AuthProviderType;
  role: UserRoleType;
  company: string;
  phone_whatsapp: string;
  country: string;
  tax_id: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProjectRecord {
  id: string;
  code: string;
  user_id: string;
  client_name?: string;
  client_company?: string;
  name: string;
  service_type: ProjectServiceType;
  status: ProjectStatusType;
  current_domain: string | null;
  preview_url: string | null;
  production_url: string | null;
  kickoff_date: string | null;
  kickoff_notes: string | null;
  brand_vault_notes: string | null;
  created_at: string;
}

export interface TicketRecord {
  id: string;
  ticket_number: string;
  user_id: string;
  project_id: string;
  project_code?: string;
  project_name?: string;
  client_name?: string;
  client_company?: string;
  client_email?: string;
  client_whatsapp?: string;
  type: TicketCategoryType;
  priority: TicketPriorityType;
  status: TicketStatusType;
  channel: "web_helpdesk" | "whatsapp_sync" | "email";
  subject: string;
  description: string;
  preview_url: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketMessageRecord {
  id: string;
  ticket_id: string;
  sender_user_id: string | null;
  sender_name: string;
  sender_role: "client" | "admin" | "ai_agent";
  message: string;
  attachment_url: string | null;
  created_at: string;
}

export interface EmailLogRecord {
  id: string;
  recipient_email: string;
  subject: string;
  event_type: string;
  related_ticket_number: string | null;
  related_project_code: string | null;
  client_name: string;
  body_preview: string;
  delivery_status: "sent_resend" | "logged_local_outbox";
  created_at: string;
}

interface MemoryStore {
  initialized: boolean;
  users: UserRecord[];
  projects: ProjectRecord[];
  tickets: TicketRecord[];
  messages: TicketMessageRecord[];
  emailLogs: EmailLogRecord[];
}

declare global {
  // eslint-disable-next-line no-var
  var __yrrgMemStore: MemoryStore | undefined;
  // eslint-disable-next-line no-var
  var __yrrgMysqlReady: boolean | undefined;
}

function getInitialSeedData(): Omit<MemoryStore, "initialized"> {
  const adminHash = hashPassword("Admin2026!");
  const clientHash = hashPassword("Cliente2026!");

  const users: UserRecord[] = [
    {
      id: "usr-admin-01",
      name: "Yoelkys (YRRG.ai Admin)",
      email: "admin@yrrg.ai",
      password_hash: adminHash,
      auth_provider: "credentials",
      role: "admin",
      company: "YRRG.ai Core Team",
      phone_whatsapp: "+54 9 11 5555-0192",
      country: "Argentina",
      tax_id: "30-71654321-9",
      avatar_url: null,
      created_at: "2026-11-01 09:00:00",
    },
    {
      id: "usr-client-01",
      name: "Martín Morales",
      email: "martin@grupoandino.com",
      password_hash: clientHash,
      auth_provider: "credentials",
      role: "client",
      company: "Grupo Andino Logística",
      phone_whatsapp: "+54 9 11 4444-8899",
      country: "Argentina",
      tax_id: "30-68912345-7",
      avatar_url: null,
      created_at: "2026-11-02 10:15:00",
    },
  ];

  const projects: ProjectRecord[] = [
    {
      id: "prj-101",
      code: "PRJ-101",
      user_id: "usr-client-01",
      name: "Sitio Corporativo Grupo Andino",
      service_type: "smart-website",
      status: "production",
      current_domain: "grupoandino.com",
      preview_url: "https://preview-101.yrrg.ai",
      production_url: "https://grupoandino.com",
      kickoff_date: "Completada • 02 Nov 11:00 hs",
      kickoff_notes:
        "Migración completa desde WordPress a Next.js 15 con AI SEO para logística B2B.",
      brand_vault_notes:
        "Colores corporativos: Azul Marino #0e1724 y Verde #00b231. Dominio registrado en NIC.ar / Cloudflare.",
      created_at: "2026-11-02 11:00:00",
    },
    {
      id: "prj-102",
      code: "PRJ-102",
      user_id: "usr-client-01",
      name: "Landing Campaña Comercio Exterior Q4",
      service_type: "ai-seo",
      status: "onboarding",
      current_domain: "comex.grupoandino.com",
      preview_url: "https://preview-102.yrrg.ai",
      production_url: null,
      kickoff_date: "Martes 10 Nov - 11:00 hs (GMT-3)",
      kickoff_notes:
        "Nueva landing page de alta conversión para captar importadores en Chile, Perú y Argentina.",
      brand_vault_notes:
        "Usar fotos de flota portuaria y testimonios de clientes B2B.",
      created_at: "2026-11-05 15:30:00",
    },
  ];

  const tickets: TicketRecord[] = [
    {
      id: "tck-1001",
      ticket_number: "TCK-1001",
      user_id: "usr-client-01",
      project_id: "prj-101",
      type: "content_update",
      priority: "high",
      status: "preview_ready",
      channel: "web_helpdesk",
      subject: "Actualizar tarifas corporativas Q4 y activar banner 20% OFF",
      description:
        "Necesitamos actualizar la tabla de planes logísticos al valor Q4 ($180 USD/mes) y activar el cintillo superior promocional con 20% de descuento en el primer embarque.",
      preview_url: "https://preview-tck1001.grupoandino.yrrg.ai",
      approved_by: null,
      approved_at: null,
      created_at: "2026-11-05 10:14:00",
      updated_at: "2026-11-05 10:31:00",
    },
    {
      id: "tck-1002",
      ticket_number: "TCK-1002",
      user_id: "usr-client-01",
      project_id: "prj-101",
      type: "optimization_seo",
      priority: "normal",
      status: "approved_live",
      channel: "whatsapp_sync",
      subject: "Implementación de JSON-LD y /llms.txt para ChatGPT Search",
      description:
        "Optimización semántica de las 5 rutas de servicios logísticos para aparecer en recomendaciones de ChatGPT y Perplexity.",
      preview_url: "https://preview-tck1002.grupoandino.yrrg.ai",
      approved_by: "Martín Morales (martin@grupoandino.com)",
      approved_at: "2026-11-04 16:45:00",
      created_at: "2026-11-04 15:20:00",
      updated_at: "2026-11-04 16:45:00",
    },
    {
      id: "tck-1003",
      ticket_number: "TCK-1003",
      user_id: "usr-client-01",
      project_id: "prj-102",
      type: "initial_build",
      priority: "high",
      status: "in_progress",
      channel: "web_helpdesk",
      subject:
        "Solicitud de Nuevo Sitio: Landing Campaña Comercio Exterior Q4 (Charla 45 min)",
      description:
        "Inicio de nuevo proyecto PRJ-102 con charla de descubrimiento agendada para el Martes 10 Nov - 11:00 hs.",
      preview_url: null,
      approved_by: null,
      approved_at: null,
      created_at: "2026-11-05 15:32:00",
      updated_at: "2026-11-05 15:40:00",
    },
  ];

  const messages: TicketMessageRecord[] = [
    {
      id: "msg-101",
      ticket_id: "tck-1001",
      sender_user_id: "usr-client-01",
      sender_name: "Martín Morales",
      sender_role: "client",
      message:
        "Hola equipo! Les dejo este ticket para actualizar las tarifas corporativas de Q4 y sumar el banner promocional de 20% OFF. Quedo atento al enlace Preview.",
      attachment_url: null,
      created_at: "2026-11-05 10:14:00",
    },
    {
      id: "msg-102",
      ticket_id: "tck-1001",
      sender_user_id: null,
      sender_name: "YRRG.ai Code Agent",
      sender_role: "ai_agent",
      message:
        "🤖 Ticket #TCK-1001 analizado. Se actualizó el componente Pricing y el cintillo superior en la rama preview-tck1001. Lighthouse Score verificado: 100/100.",
      attachment_url: null,
      created_at: "2026-11-05 10:25:00",
    },
    {
      id: "msg-103",
      ticket_id: "tck-1001",
      sender_user_id: "usr-admin-01",
      sender_name: "Ingeniería YRRG.ai",
      sender_role: "admin",
      message:
        "¡Hola Martín! Ya tienes listo el enlace Preview en https://preview-tck1001.grupoandino.yrrg.ai (en solo 17 minutos). Puedes aprobarlo con 1 clic aquí mismo para publicarlo en vivo.",
      attachment_url: null,
      created_at: "2026-11-05 10:31:00",
    },
    {
      id: "msg-104",
      ticket_id: "tck-1003",
      sender_user_id: "usr-client-01",
      sender_name: "Martín Morales",
      sender_role: "client",
      message:
        "Agendé la charla de 45 minutos para nuestra nueva Landing de Comercio Exterior Q4.",
      attachment_url: null,
      created_at: "2026-11-05 15:32:00",
    },
    {
      id: "msg-105",
      ticket_id: "tck-1003",
      sender_user_id: "usr-admin-01",
      sender_name: "Ingeniería YRRG.ai",
      sender_role: "admin",
      message:
        "Confirmada la reunión de descubrimiento de 45 minutos. Ya preparamos la estructura base en Next.js para mostrarles propuestas en la llamada.",
      attachment_url: null,
      created_at: "2026-11-05 15:40:00",
    },
  ];

  const emailLogs: EmailLogRecord[] = [
    {
      id: "eml-01",
      recipient_email: "admin@yrrg.ai",
      subject:
        "[YRRG.ai Ticket #TCK-1001] Nuevo pedido de Martín Morales (Grupo Andino Logística)",
      event_type: "new_ticket",
      related_ticket_number: "TCK-1001",
      related_project_code: "PRJ-101",
      client_name: "Martín Morales",
      body_preview:
        "Cliente: Martín Morales | Proyecto: PRJ-101 | Prioridad: ALTA | Asunto: Actualizar tarifas corporativas Q4 y activar banner 20% OFF.",
      delivery_status: "logged_local_outbox",
      created_at: "2026-11-05 10:14:05",
    },
    {
      id: "eml-02",
      recipient_email: "admin@yrrg.ai",
      subject:
        "[YRRG.ai Nuevo Proyecto #PRJ-102] Charla 45 min agendada por Grupo Andino Logística",
      event_type: "new_project_kickoff",
      related_ticket_number: "TCK-1003",
      related_project_code: "PRJ-102",
      client_name: "Martín Morales",
      body_preview:
        "Nuevo proyecto solicitado: Landing Campaña Comercio Exterior Q4 | Fecha charla 45 min: Martes 10 Nov - 11:00 hs (GMT-3).",
      delivery_status: "logged_local_outbox",
      created_at: "2026-11-05 15:32:10",
    },
  ];

  return { users, projects, tickets, messages, emailLogs };
}

function getMemStore(): MemoryStore {
  if (!global.__yrrgMemStore) {
    const seed = getInitialSeedData();
    global.__yrrgMemStore = {
      initialized: true,
      ...seed,
    };
  }
  return global.__yrrgMemStore;
}

export async function ensureDatabaseInitialized(): Promise<"mysql" | "memory_fallback"> {
  if (global.__yrrgMysqlReady === true) {
    return "mysql";
  }

  try {
    const pool = await getMysqlPool();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        name VARCHAR(160) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NULL,
        auth_provider ENUM('credentials', 'google', 'github', 'magic_link') NOT NULL DEFAULT 'credentials',
        role ENUM('client', 'approver', 'admin') NOT NULL DEFAULT 'client',
        company VARCHAR(191) NOT NULL,
        phone_whatsapp VARCHAR(64) NOT NULL,
        country VARCHAR(100) NOT NULL DEFAULT 'Argentina',
        tax_id VARCHAR(64) NULL,
        avatar_url VARCHAR(500) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        code VARCHAR(32) NOT NULL UNIQUE,
        user_id VARCHAR(64) NOT NULL,
        name VARCHAR(191) NOT NULL,
        service_type ENUM('smart-website', 'migracion', 'optimizacion', 'ai-seo', 'mantenimiento') NOT NULL DEFAULT 'smart-website',
        status ENUM('onboarding', 'development', 'preview_ready', 'production') NOT NULL DEFAULT 'onboarding',
        current_domain VARCHAR(255) NULL,
        preview_url VARCHAR(500) NULL,
        production_url VARCHAR(500) NULL,
        kickoff_date VARCHAR(100) NULL,
        kickoff_notes TEXT NULL,
        brand_vault_notes TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_projects_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        ticket_number VARCHAR(32) NOT NULL UNIQUE,
        user_id VARCHAR(64) NOT NULL,
        project_id VARCHAR(64) NOT NULL,
        type ENUM('initial_build', 'content_update', 'new_feature', 'optimization_seo', 'support') NOT NULL DEFAULT 'content_update',
        priority ENUM('normal', 'high', 'urgent') NOT NULL DEFAULT 'normal',
        status ENUM('received', 'in_progress', 'preview_ready', 'approved_live', 'closed') NOT NULL DEFAULT 'received',
        channel ENUM('web_helpdesk', 'whatsapp_sync', 'email') NOT NULL DEFAULT 'web_helpdesk',
        subject VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        preview_url VARCHAR(500) NULL,
        approved_by VARCHAR(191) NULL,
        approved_at TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_tickets_user_id (user_id),
        INDEX idx_tickets_project_id (project_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ticket_messages (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        ticket_id VARCHAR(64) NOT NULL,
        sender_user_id VARCHAR(64) NULL,
        sender_name VARCHAR(191) NOT NULL,
        sender_role ENUM('client', 'admin', 'ai_agent') NOT NULL DEFAULT 'client',
        message TEXT NOT NULL,
        attachment_url VARCHAR(500) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_messages_ticket_id (ticket_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS email_notifications_log (
        id VARCHAR(64) NOT NULL PRIMARY KEY,
        recipient_email VARCHAR(191) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        event_type VARCHAR(64) NOT NULL,
        related_ticket_number VARCHAR(32) NULL,
        related_project_code VARCHAR(32) NULL,
        client_name VARCHAR(191) NOT NULL,
        body_preview TEXT NOT NULL,
        delivery_status ENUM('sent_resend', 'logged_local_outbox') NOT NULL DEFAULT 'logged_local_outbox',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Check if users table is empty; if so, seed initial data
    const [existingUsers] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS cnt FROM users"
    );
    const count = Number(existingUsers[0]?.cnt || 0);

    if (count === 0) {
      const seed = getInitialSeedData();

      for (const u of seed.users) {
        await pool.query(
          `INSERT INTO users (id, name, email, password_hash, auth_provider, role, company, phone_whatsapp, country, tax_id, avatar_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            u.id,
            u.name,
            u.email,
            u.password_hash,
            u.auth_provider,
            u.role,
            u.company,
            u.phone_whatsapp,
            u.country,
            u.tax_id,
            u.avatar_url,
          ]
        );
      }

      for (const p of seed.projects) {
        await pool.query(
          `INSERT INTO projects (id, code, user_id, name, service_type, status, current_domain, preview_url, production_url, kickoff_date, kickoff_notes, brand_vault_notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id,
            p.code,
            p.user_id,
            p.name,
            p.service_type,
            p.status,
            p.current_domain,
            p.preview_url,
            p.production_url,
            p.kickoff_date,
            p.kickoff_notes,
            p.brand_vault_notes,
          ]
        );
      }

      for (const t of seed.tickets) {
        await pool.query(
          `INSERT INTO tickets (id, ticket_number, user_id, project_id, type, priority, status, channel, subject, description, preview_url, approved_by, approved_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            t.id,
            t.ticket_number,
            t.user_id,
            t.project_id,
            t.type,
            t.priority,
            t.status,
            t.channel,
            t.subject,
            t.description,
            t.preview_url,
            t.approved_by,
            t.approved_at,
          ]
        );
      }

      for (const m of seed.messages) {
        await pool.query(
          `INSERT INTO ticket_messages (id, ticket_id, sender_user_id, sender_name, sender_role, message, attachment_url)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            m.id,
            m.ticket_id,
            m.sender_user_id,
            m.sender_name,
            m.sender_role,
            m.message,
            m.attachment_url,
          ]
        );
      }

      for (const e of seed.emailLogs) {
        await pool.query(
          `INSERT INTO email_notifications_log (id, recipient_email, subject, event_type, related_ticket_number, related_project_code, client_name, body_preview, delivery_status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            e.id,
            e.recipient_email,
            e.subject,
            e.event_type,
            e.related_ticket_number,
            e.related_project_code,
            e.client_name,
            e.body_preview,
            e.delivery_status,
          ]
        );
      }
    }

    global.__yrrgMysqlReady = true;
    return "mysql";
  } catch {
    return "memory_fallback";
  }
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const mode = await ensureDatabaseInitialized();
  const normalized = email.trim().toLowerCase();

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1",
      [normalized]
    );
    return (rows[0] as UserRecord) || null;
  }

  const mem = getMemStore();
  return mem.users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    return (rows[0] as UserRecord) || null;
  }

  const mem = getMemStore();
  return mem.users.find((u) => u.id === id) || null;
}

export async function createUser(input: {
  name: string;
  email: string;
  password?: string;
  auth_provider?: AuthProviderType;
  role?: UserRoleType;
  company: string;
  phone_whatsapp: string;
  country: string;
  tax_id?: string;
}): Promise<UserRecord> {
  const mode = await ensureDatabaseInitialized();
  const id = `usr-${crypto.randomBytes(6).toString("hex")}`;
  const password_hash = input.password ? hashPassword(input.password) : null;
  const auth_provider = input.auth_provider || "credentials";
  const role = input.role || "client";
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const record: UserRecord = {
    id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password_hash,
    auth_provider,
    role,
    company: input.company.trim(),
    phone_whatsapp: input.phone_whatsapp.trim(),
    country: input.country.trim() || "Argentina",
    tax_id: input.tax_id?.trim() || null,
    avatar_url: null,
    created_at: now,
  };

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, auth_provider, role, company, phone_whatsapp, country, tax_id, avatar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.name,
        record.email,
        record.password_hash,
        record.auth_provider,
        record.role,
        record.company,
        record.phone_whatsapp,
        record.country,
        record.tax_id,
        record.avatar_url,
      ]
    );
  } else {
    getMemStore().users.push(record);
  }

  return record;
}

export async function listProjectsForUser(userId: string): Promise<ProjectRecord[]> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.*, u.name AS client_name, u.company AS client_company
       FROM projects p
       LEFT JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );
    return rows as ProjectRecord[];
  }

  const mem = getMemStore();
  return mem.projects.filter((p) => p.user_id === userId);
}

export async function listAllProjects(): Promise<ProjectRecord[]> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.*, u.name AS client_name, u.company AS client_company
       FROM projects p
       LEFT JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );
    return rows as ProjectRecord[];
  }

  const mem = getMemStore();
  return mem.projects.map((p) => {
    const u = mem.users.find((usr) => usr.id === p.user_id);
    return {
      ...p,
      client_name: u?.name,
      client_company: u?.company,
    };
  });
}

export async function createProject(input: {
  user_id: string;
  name: string;
  service_type: ProjectServiceType;
  current_domain?: string;
  kickoff_date?: string;
  kickoff_notes?: string;
  brand_vault_notes?: string;
}): Promise<ProjectRecord> {
  const mode = await ensureDatabaseInitialized();
  const id = `prj-${crypto.randomBytes(5).toString("hex")}`;
  const randomNum = Math.floor(103 + Math.random() * 890);
  const code = `PRJ-${randomNum}`;
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const record: ProjectRecord = {
    id,
    code,
    user_id: input.user_id,
    name: input.name.trim(),
    service_type: input.service_type,
    status: "onboarding",
    current_domain: input.current_domain?.trim() || null,
    preview_url: `https://preview-${code.toLowerCase()}.yrrg.ai`,
    production_url: null,
    kickoff_date: input.kickoff_date?.trim() || "Por coordinar por WhatsApp",
    kickoff_notes: input.kickoff_notes?.trim() || null,
    brand_vault_notes: input.brand_vault_notes?.trim() || null,
    created_at: now,
  };

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `INSERT INTO projects (id, code, user_id, name, service_type, status, current_domain, preview_url, production_url, kickoff_date, kickoff_notes, brand_vault_notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.code,
        record.user_id,
        record.name,
        record.service_type,
        record.status,
        record.current_domain,
        record.preview_url,
        record.production_url,
        record.kickoff_date,
        record.kickoff_notes,
        record.brand_vault_notes,
      ]
    );
  } else {
    getMemStore().projects.unshift(record);
  }

  return record;
}

export async function updateProjectBrandVault(input: {
  project_id: string;
  user_id: string;
  brand_vault_notes: string;
  kickoff_date?: string;
}): Promise<void> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `UPDATE projects
       SET brand_vault_notes = ?, kickoff_date = COALESCE(?, kickoff_date)
       WHERE id = ? AND user_id = ?`,
      [
        input.brand_vault_notes,
        input.kickoff_date || null,
        input.project_id,
        input.user_id,
      ]
    );
    return;
  }

  const mem = getMemStore();
  const proj = mem.projects.find(
    (p) => p.id === input.project_id && p.user_id === input.user_id
  );
  if (proj) {
    proj.brand_vault_notes = input.brand_vault_notes;
    if (input.kickoff_date) proj.kickoff_date = input.kickoff_date;
  }
}

export async function listTicketsForUser(userId: string): Promise<TicketRecord[]> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, p.code AS project_code, p.name AS project_name,
              u.name AS client_name, u.company AS client_company, u.email AS client_email, u.phone_whatsapp AS client_whatsapp
       FROM tickets t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.user_id = u.id
       WHERE t.user_id = ?
       ORDER BY t.created_at DESC`,
      [userId]
    );
    return rows as TicketRecord[];
  }

  const mem = getMemStore();
  return mem.tickets
    .filter((t) => t.user_id === userId)
    .map((t) => {
      const p = mem.projects.find((prj) => prj.id === t.project_id);
      const u = mem.users.find((usr) => usr.id === t.user_id);
      return {
        ...t,
        project_code: p?.code,
        project_name: p?.name,
        client_name: u?.name,
        client_company: u?.company,
        client_email: u?.email,
        client_whatsapp: u?.phone_whatsapp,
      };
    });
}

export async function listAllTickets(): Promise<TicketRecord[]> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, p.code AS project_code, p.name AS project_name,
              u.name AS client_name, u.company AS client_company, u.email AS client_email, u.phone_whatsapp AS client_whatsapp
       FROM tickets t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.user_id = u.id
       ORDER BY t.created_at DESC`
    );
    return rows as TicketRecord[];
  }

  const mem = getMemStore();
  return mem.tickets.map((t) => {
    const p = mem.projects.find((prj) => prj.id === t.project_id);
    const u = mem.users.find((usr) => usr.id === t.user_id);
    return {
      ...t,
      project_code: p?.code,
      project_name: p?.name,
      client_name: u?.name,
      client_company: u?.company,
      client_email: u?.email,
      client_whatsapp: u?.phone_whatsapp,
    };
  });
}

export async function findTicketById(
  ticketId: string
): Promise<TicketRecord | null> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, p.code AS project_code, p.name AS project_name,
              u.name AS client_name, u.company AS client_company, u.email AS client_email, u.phone_whatsapp AS client_whatsapp
       FROM tickets t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.user_id = u.id
       WHERE t.id = ? LIMIT 1`,
      [ticketId]
    );
    return (rows[0] as TicketRecord) || null;
  }

  const mem = getMemStore();
  const t = mem.tickets.find((item) => item.id === ticketId);
  if (!t) return null;
  const p = mem.projects.find((prj) => prj.id === t.project_id);
  const u = mem.users.find((usr) => usr.id === t.user_id);
  return {
    ...t,
    project_code: p?.code,
    project_name: p?.name,
    client_name: u?.name,
    client_company: u?.company,
    client_email: u?.email,
    client_whatsapp: u?.phone_whatsapp,
  };
}

export async function getMessagesForTicket(
  ticketId: string
): Promise<TicketMessageRecord[]> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
      [ticketId]
    );
    return rows as TicketMessageRecord[];
  }

  const mem = getMemStore();
  return mem.messages.filter((m) => m.ticket_id === ticketId);
}

export async function createTicket(input: {
  user_id: string;
  project_id: string;
  type: TicketCategoryType;
  priority: TicketPriorityType;
  subject: string;
  description: string;
  sender_name: string;
}): Promise<TicketRecord> {
  const mode = await ensureDatabaseInitialized();
  const id = `tck-${crypto.randomBytes(5).toString("hex")}`;
  const randomNum = Math.floor(1004 + Math.random() * 8990);
  const ticket_number = `TCK-${randomNum}`;
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const record: TicketRecord = {
    id,
    ticket_number,
    user_id: input.user_id,
    project_id: input.project_id,
    type: input.type,
    priority: input.priority,
    status: "received",
    channel: "web_helpdesk",
    subject: input.subject.trim(),
    description: input.description.trim(),
    preview_url: null,
    approved_by: null,
    approved_at: null,
    created_at: now,
    updated_at: now,
  };

  const initialMsgId = `msg-${crypto.randomBytes(5).toString("hex")}`;
  const aiMsgId = `msg-${crypto.randomBytes(5).toString("hex")}`;
  const aiMessageText = `🤖 YRRG.ai Concierge: Hemos recibido tu ticket #${ticket_number}. Nuestro equipo de ingeniería e IA ya fue notificado por email y WhatsApp. En menos de 30 minutos recibirás el enlace Preview para tu revisión.`;

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `INSERT INTO tickets (id, ticket_number, user_id, project_id, type, priority, status, channel, subject, description, preview_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.ticket_number,
        record.user_id,
        record.project_id,
        record.type,
        record.priority,
        record.status,
        record.channel,
        record.subject,
        record.description,
        record.preview_url,
      ]
    );

    await pool.query(
      `INSERT INTO ticket_messages (id, ticket_id, sender_user_id, sender_name, sender_role, message)
       VALUES (?, ?, ?, ?, 'client', ?), (?, ?, NULL, 'YRRG.ai Concierge IA', 'ai_agent', ?)`,
      [
        initialMsgId,
        record.id,
        input.user_id,
        input.sender_name,
        record.description,
        aiMsgId,
        record.id,
        aiMessageText,
      ]
    );
  } else {
    const mem = getMemStore();
    mem.tickets.unshift(record);
    mem.messages.push(
      {
        id: initialMsgId,
        ticket_id: record.id,
        sender_user_id: input.user_id,
        sender_name: input.sender_name,
        sender_role: "client",
        message: record.description,
        attachment_url: null,
        created_at: now,
      },
      {
        id: aiMsgId,
        ticket_id: record.id,
        sender_user_id: null,
        sender_name: "YRRG.ai Concierge IA",
        sender_role: "ai_agent",
        message: aiMessageText,
        attachment_url: null,
        created_at: now,
      }
    );
  }

  return record;
}

export async function addTicketMessage(input: {
  ticket_id: string;
  sender_user_id: string | null;
  sender_name: string;
  sender_role: "client" | "admin" | "ai_agent";
  message: string;
}): Promise<TicketMessageRecord> {
  const mode = await ensureDatabaseInitialized();
  const id = `msg-${crypto.randomBytes(5).toString("hex")}`;
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const record: TicketMessageRecord = {
    id,
    ticket_id: input.ticket_id,
    sender_user_id: input.sender_user_id,
    sender_name: input.sender_name,
    sender_role: input.sender_role,
    message: input.message.trim(),
    attachment_url: null,
    created_at: now,
  };

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `INSERT INTO ticket_messages (id, ticket_id, sender_user_id, sender_name, sender_role, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.ticket_id,
        record.sender_user_id,
        record.sender_name,
        record.sender_role,
        record.message,
      ]
    );
  } else {
    getMemStore().messages.push(record);
  }

  return record;
}

export async function approveTicketPreview(input: {
  ticket_id: string;
  approved_by_label: string;
  sender_user_id: string;
  sender_name: string;
}): Promise<TicketRecord | null> {
  const mode = await ensureDatabaseInitialized();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const approvalMsg = `✅ PREVIEW APROBADO POR EL CLIENTE (${input.approved_by_label}). Solicitud autorizada para despliegue inmediato a Producción en Edge.`;

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `UPDATE tickets
       SET status = 'approved_live', approved_by = ?, approved_at = NOW()
       WHERE id = ?`,
      [input.approved_by_label, input.ticket_id]
    );

    await addTicketMessage({
      ticket_id: input.ticket_id,
      sender_user_id: input.sender_user_id,
      sender_name: input.sender_name,
      sender_role: "client",
      message: approvalMsg,
    });

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM tickets WHERE id = ? LIMIT 1",
      [input.ticket_id]
    );
    return (rows[0] as TicketRecord) || null;
  }

  const mem = getMemStore();
  const tck = mem.tickets.find((t) => t.id === input.ticket_id);
  if (tck) {
    tck.status = "approved_live";
    tck.approved_by = input.approved_by_label;
    tck.approved_at = now;
    await addTicketMessage({
      ticket_id: input.ticket_id,
      sender_user_id: input.sender_user_id,
      sender_name: input.sender_name,
      sender_role: "client",
      message: approvalMsg,
    });
  }
  return tck || null;
}

export async function adminUpdateTicket(input: {
  ticket_id: string;
  status: TicketStatusType;
  preview_url?: string | null;
  admin_reply?: string;
  admin_name: string;
  admin_user_id: string;
}): Promise<void> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `UPDATE tickets
       SET status = ?, preview_url = COALESCE(?, preview_url)
       WHERE id = ?`,
      [input.status, input.preview_url ?? null, input.ticket_id]
    );
  } else {
    const mem = getMemStore();
    const tck = mem.tickets.find((t) => t.id === input.ticket_id);
    if (tck) {
      tck.status = input.status;
      if (input.preview_url !== undefined) {
        tck.preview_url = input.preview_url;
      }
    }
  }

  if (input.admin_reply && input.admin_reply.trim()) {
    await addTicketMessage({
      ticket_id: input.ticket_id,
      sender_user_id: input.admin_user_id,
      sender_name: input.admin_name,
      sender_role: "admin",
      message: input.admin_reply.trim(),
    });
  }
}

export async function logEmailNotification(input: {
  recipient_email: string;
  subject: string;
  event_type: string;
  related_ticket_number?: string | null;
  related_project_code?: string | null;
  client_name: string;
  body_preview: string;
  delivery_status: "sent_resend" | "logged_local_outbox";
}): Promise<EmailLogRecord> {
  const mode = await ensureDatabaseInitialized();
  const id = `eml-${crypto.randomBytes(5).toString("hex")}`;
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const record: EmailLogRecord = {
    id,
    recipient_email: input.recipient_email,
    subject: input.subject,
    event_type: input.event_type,
    related_ticket_number: input.related_ticket_number || null,
    related_project_code: input.related_project_code || null,
    client_name: input.client_name,
    body_preview: input.body_preview,
    delivery_status: input.delivery_status,
    created_at: now,
  };

  if (mode === "mysql") {
    const pool = await getMysqlPool();
    await pool.query(
      `INSERT INTO email_notifications_log (id, recipient_email, subject, event_type, related_ticket_number, related_project_code, client_name, body_preview, delivery_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.recipient_email,
        record.subject,
        record.event_type,
        record.related_ticket_number,
        record.related_project_code,
        record.client_name,
        record.body_preview,
        record.delivery_status,
      ]
    );
  } else {
    getMemStore().emailLogs.unshift(record);
  }

  return record;
}

export async function listEmailNotifications(): Promise<EmailLogRecord[]> {
  const mode = await ensureDatabaseInitialized();
  if (mode === "mysql") {
    const pool = await getMysqlPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM email_notifications_log ORDER BY created_at DESC LIMIT 50"
    );
    return rows as EmailLogRecord[];
  }

  return getMemStore().emailLogs;
}
