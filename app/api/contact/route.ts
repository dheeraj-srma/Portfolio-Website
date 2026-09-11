import { Resend } from "resend";

// Regex for standard RFC 5322 compliant email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DEFAULT_RECEIVER_EMAIL = "dheerajkauhsik136@gmail.com";
const DEFAULT_SENDER_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return Response.json(
        { error: "Invalid Content-Type. Expected application/json." },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return Response.json(
        { error: "Invalid payload. Request body must be a JSON object." },
        { status: 400 }
      );
    }

    const { name, email, message, botcheck } = body;

    // --- BARRIER 1: Anti-Spam Honeypot ---
    // If hidden honeypot field is filled by an automated bot, silently discard
    if (botcheck) {
      return Response.json(
        { success: true, message: "Transmission received." },
        { status: 200 }
      );
    }

    // --- BARRIER 2: Required Fields Existence ---
    if (!name || !email || !message) {
      const missingFields: string[] = [];
      if (!name) missingFields.push("Name");
      if (!email) missingFields.push("Email");
      if (!message) missingFields.push("Message");

      return Response.json(
        {
          error: `Missing required field(s): ${missingFields.join(", ")}. Email could not be sent.`,
        },
        { status: 400 }
      );
    }

    // --- BARRIER 3: String Type & Non-Empty Trimming ---
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return Response.json(
        {
          error: "Name, Email, and Message must contain non-empty content.",
        },
        { status: 400 }
      );
    }

    // --- BARRIER 4: Input Length & Format Verification ---
    if (cleanName.length < 2) {
      return Response.json(
        { error: "Name must be at least 2 characters long." },
        { status: 400 }
      );
    }
    if (cleanName.length > 100) {
      return Response.json(
        { error: "Name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return Response.json(
        { error: "Please provide a valid email address (e.g. alex@example.com)." },
        { status: 400 }
      );
    }
    if (cleanEmail.length > 100) {
      return Response.json(
        { error: "Email address must not exceed 100 characters." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 5) {
      return Response.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }
    if (cleanMessage.length > 5000) {
      return Response.json(
        { error: "Message must not exceed 5000 characters." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_RECEIVER_EMAIL;
    const senderEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_SENDER_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    // --- Graceful Dev Mode Fallback ---
    // If no API key is supplied yet, handle dev environment cleanly without throwing
    if (!apiKey) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[Contact API - Dev Mode] RESEND_API_KEY is not set. Simulating message dispatch:"
        );
        console.log(`To: ${recipientEmail}`);
        console.log(`From: ${cleanName} <${cleanEmail}>`);
        console.log(`Message: ${cleanMessage}`);

        return Response.json(
          {
            success: true,
            devMode: true,
            message:
              "Message logged in dev mode. Set RESEND_API_KEY in .env.local to send live emails.",
          },
          { status: 200 }
        );
      }

      return Response.json(
        {
          error:
            "Email service is not yet configured. Please set RESEND_API_KEY in environment variables.",
        },
        { status: 503 }
      );
    }

    // --- DIRECT EMAIL DISPATCH ---
    const resend = new Resend(apiKey);

    const emailSubject = `Portfolio Message from ${cleanName}`;
    const formattedDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d12; color: #e2e8f0; margin: 0; padding: 32px 16px; }
            .container { max-width: 600px; margin: 0 auto; background: #13151f; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
            .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 24px 32px; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.85; }
            .content { padding: 32px; }
            .field-group { margin-bottom: 20px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 6px; font-weight: 600; font-family: monospace; }
            .field-value { font-size: 15px; color: #f8fafc; line-height: 1.5; }
            .message-box { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap; word-break: break-word; }
            .footer { padding: 20px 32px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #64748b; text-align: center; }
            .badge { display: inline-block; padding: 4px 10px; background: rgba(59,130,246,0.2); color: #60a5fa; border-radius: 9999px; font-size: 11px; font-weight: 600; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Portfolio Contact Transmission</h1>
              <p>Received on ${formattedDate} (IST)</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="field-label">Sender Name</div>
                <div class="field-value"><strong>${cleanName}</strong></div>
              </div>
              <div class="field-group">
                <div class="field-label">Sender Email</div>
                <div class="field-value"><a href="mailto:${cleanEmail}" style="color: #60a5fa; text-decoration: none;">${cleanEmail}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Message Content</div>
                <div class="message-box">${cleanMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>
              <div class="badge">Direct Reply Enabled &bull; Reply to this email to reach ${cleanName}</div>
            </div>
            <div class="footer">
              Sent via Dheeraj Sharma's Portfolio Serverless Contact API &bull; <a href="https://github.com/dheeraj-srma" style="color: #64748b;">dheeraj-srma</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const plainTextContent = `
New Portfolio Contact Message
----------------------------------------
From: ${cleanName} (${cleanEmail})
Time: ${formattedDate} (IST)

Message:
${cleanMessage}

----------------------------------------
Hit Reply to respond directly to ${cleanEmail}.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: cleanEmail,
      subject: emailSubject,
      html: htmlContent,
      text: plainTextContent,
    });

    if (error) {
      console.error("[Contact API] Resend API error:", error);
      return Response.json(
        {
          error: error.message || "Failed to dispatch email through provider.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Your message has been dispatched directly to Dheeraj.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[Contact API] Unexpected error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected server error occurred.";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
