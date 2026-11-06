import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  createSessionToken,
  SESSION_COOKIE_NAME,
  verifyPassword,
} from "@/lib/auth";
import {
  AuthProviderType,
  createProject,
  createTicket,
  createUser,
  findUserByEmail,
} from "@/lib/helpdesk-repo";
import { notifyAdminByEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!checkRateLimit(`login:${ip}`, 20, 60_000)) {
    return NextResponse.json(
      { error: "Demasiados intentos de inicio de sesión. Espera un momento." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { mode, email, password, provider, oauth_email, oauth_name, oauth_company } =
      body;

    // 1. OAuth / AuthProvider Login Flow (Google / GitHub / Magic Link)
    if (mode === "oauth") {
      const targetProvider = (provider as AuthProviderType) || "google";
      const targetEmail = (
        oauth_email ||
        (targetProvider === "github"
          ? "dev@empresa-latam.io"
          : "directora@corporativo-latam.com")
      )
        .trim()
        .toLowerCase();

      let user = await findUserByEmail(targetEmail);
      if (user && user.role === "admin") {
        return NextResponse.json(
          { error: "Las cuentas de administrador deben autenticarse con credenciales seguras." },
          { status: 403 }
        );
      }
      if (!user) {
        user = await createUser({
          name:
            oauth_name ||
            (targetProvider === "github"
              ? "Usuario GitHub Enterprise"
              : "Carolina Vega (Google Workspace)"),
          email: targetEmail,
          auth_provider: targetProvider,
          role: "client",
          company: oauth_company || "TechCorp LATAM",
          phone_whatsapp: "+54 9 11 6789-1234",
          country: "Argentina",
        });

        const demoPrj = await createProject({
          user_id: user.id,
          name: `Smart Website ${user.company}`,
          service_type: "smart-website",
          current_domain: "techcorp-latam.com",
          kickoff_date: "Jueves 15:00 hs (GMT-3)",
          kickoff_notes: `Cuenta creada vía AuthProvider (${targetProvider.toUpperCase()}).`,
        });

        await createTicket({
          user_id: user.id,
          project_id: demoPrj.id,
          type: "initial_build",
          priority: "normal",
          subject: `Onboarding Inicial vía ${targetProvider.toUpperCase()} — ${demoPrj.name}`,
          description:
            "Proyecto inicial generado automáticamente al autenticar con proveedor SSO.",
          sender_name: user.name,
        });

        await notifyAdminByEmail({
          subject: `[YRRG.ai OAuth ${targetProvider.toUpperCase()}] Nuevo acceso de ${user.name} (${user.company})`,
          event_type: "new_registration",
          related_project_code: demoPrj.code,
          client_name: user.name,
          body_preview: `Autenticación mediante AuthProvider (${targetProvider}) para ${user.email}. Proyecto inicial: ${demoPrj.code}.`,
        });
      }

      const token = createSessionToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        authProvider: user.auth_provider,
      });

      const res = NextResponse.json({
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
        },
      });

      res.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    }

    // 2. Standard Credentials or Quick Demo Login
    if (!email || !password) {
      return NextResponse.json(
        { error: "Ingresa tu correo y contraseña." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json(
        { error: "Credenciales inválidas. Verifica tu correo y contraseña." },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      authProvider: user.auth_provider,
    });

    const response = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
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
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Error al iniciar sesión." },
      { status: 500 }
    );
  }
}
