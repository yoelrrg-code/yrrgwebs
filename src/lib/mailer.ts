import { logEmailNotification } from "@/lib/helpdesk-repo";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@yrrg.ai";

export async function notifyAdminByEmail(input: {
  subject: string;
  event_type:
    | "new_registration"
    | "new_project_kickoff"
    | "new_ticket"
    | "preview_ready"
    | "ticket_approved"
    | "new_message";
  related_ticket_number?: string | null;
  related_project_code?: string | null;
  client_name: string;
  body_preview: string;
  html_body?: string;
}) {
  let delivery_status: "sent_resend" | "logged_local_outbox" =
    "logged_local_outbox";

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && resendKey.trim().length > 5) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "YRRG.ai Helpdesk <notificaciones@yrrg.ai>",
          to: [ADMIN_EMAIL],
          subject: input.subject,
          html:
            input.html_body ||
            `<div style="font-family:sans-serif;background:#070d14;color:#f7fafc;padding:24px;border-radius:12px;">
              <h2 style="color:#00b231;margin-top:0;">${input.subject}</h2>
              <p><strong>Cliente:</strong> ${input.client_name}</p>
              ${
                input.related_project_code
                  ? `<p><strong>Proyecto:</strong> ${input.related_project_code}</p>`
                  : ""
              }
              ${
                input.related_ticket_number
                  ? `<p><strong>Ticket:</strong> #${input.related_ticket_number}</p>`
                  : ""
              }
              <hr style="border-color:#1b2a3d;margin:16px 0;" />
              <p style="line-height:1.6;">${input.body_preview}</p>
            </div>`,
        }),
      });
      if (response.ok) {
        delivery_status = "sent_resend";
      }
    } catch {
      delivery_status = "logged_local_outbox";
    }
  }

  return logEmailNotification({
    recipient_email: ADMIN_EMAIL,
    subject: input.subject,
    event_type: input.event_type,
    related_ticket_number: input.related_ticket_number,
    related_project_code: input.related_project_code,
    client_name: input.client_name,
    body_preview: input.body_preview,
    delivery_status,
  });
}
