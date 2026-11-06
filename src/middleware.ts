import { NextRequest, NextResponse } from "next/server";

const AUTH_SECRET =
  process.env.AUTH_SECRET || "yrrg-ai-super-secret-jwt-key-2026-latam";
const SESSION_COOKIE_NAME = "yrrg_session";

// Lightweight Web Crypto HMAC SHA-256 verifier compatible with Next.js Edge Middleware
async function verifySessionTokenEdge(
  token: string | undefined
): Promise<{ id: string; role: string; email: string } | null> {
  if (!token || !token.includes(".")) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(data));
    const expectedSig = Buffer.from(signatureBuffer).toString("base64url");

    if (signature !== expectedSig) {
      return null;
    }

    const jsonStr = Buffer.from(data, "base64url").toString("utf8");
    const payload = JSON.parse(jsonStr);

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  // 1. CORS Pre-flight for API routes
  if (pathname.startsWith("/api/")) {
    if (req.method === "OPTIONS") {
      const preflightHeaders = new Headers();
      preflightHeaders.set(
        "Access-Control-Allow-Origin",
        origin && (origin.includes(host || "") || origin.includes("localhost") || origin.includes("yrrg.ai"))
          ? origin
          : req.nextUrl.origin
      );
      preflightHeaders.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      preflightHeaders.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With"
      );
      preflightHeaders.set("Access-Control-Allow-Credentials", "true");
      preflightHeaders.set("Access-Control-Max-Age", "86400");
      return new NextResponse(null, { status: 204, headers: preflightHeaders });
    }

    // CSRF Protection on API State Mutations (POST/PUT/DELETE)
    if (["POST", "PUT", "DELETE"].includes(req.method) && origin) {
      const allowedOrigin =
        origin.includes(host || "") ||
        origin.includes("localhost") ||
        origin.includes("yrrg.ai");
      if (!allowedOrigin) {
        return NextResponse.json(
          { error: "Origen de solicitud no autorizado (CORS/CSRF bloqueado)." },
          { status: 403 }
        );
      }
    }
  }

  // 2. Protected Route Gates
  const isAuthRoute =
    pathname === "/portal/login" || pathname === "/portal/registro";
  const isPortalProtected =
    pathname.startsWith("/portal") && !isAuthRoute;
  const isAdminProtected = pathname.startsWith("/admin");

  if (isPortalProtected || isAdminProtected) {
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionTokenEdge(sessionCookie);

    if (!session) {
      const loginUrl = new URL("/portal/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminProtected && session.role !== "admin") {
      const portalUrl = new URL("/portal", req.url);
      portalUrl.searchParams.set("error", "unauthorized_admin");
      return NextResponse.redirect(portalUrl);
    }
  }

  const response = NextResponse.next();

  // Add CORS headers on regular API responses
  if (pathname.startsWith("/api/")) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      origin && (origin.includes(host || "") || origin.includes("localhost") || origin.includes("yrrg.ai"))
        ? origin
        : req.nextUrl.origin
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/api/:path*",
  ],
};

