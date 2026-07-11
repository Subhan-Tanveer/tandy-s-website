import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  services?: string[];
  veteran?: boolean;
  message?: string;
};

const CREAM = "#f4ecd8";
const ASPHALT = "#121110";
const RACING_RED = "#c8202f";
const MUSTARD = "#e2a530";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(payload: QuotePayload) {
  const rows = [
    { label: "Name", value: payload.name },
    { label: "Phone", value: payload.phone },
    { label: "Email", value: payload.email },
    { label: "Address", value: payload.address },
  ].filter((row) => row.value);

  const rowsHtml = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e8ddc2;width:120px;vertical-align:top;">
            <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">${row.label}</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #e8ddc2;">
            <span style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${ASPHALT};">${escapeHtml(row.value!)}</span>
          </td>
        </tr>`
    )
    .join("");

  const servicesHtml = payload.services?.length
    ? `<div style="margin-top:20px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">Services Requested</span>
        <div style="margin-top:10px;">
          ${payload.services
            .map(
              (s) =>
                `<span style="display:inline-block;background:${ASPHALT};color:${CREAM};font-family:Arial,Helvetica,sans-serif;font-size:13px;padding:6px 14px;border-radius:3px;margin:0 8px 8px 0;">${escapeHtml(
                  s
                )}</span>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  const veteranHtml = payload.veteran
    ? `<div style="margin-top:20px;padding:14px 16px;background:#fbf3e2;border-left:4px solid ${MUSTARD};">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${ASPHALT};font-weight:700;">&#9733; Veteran discount requested</span>
      </div>`
    : "";

  const messageHtml = payload.message
    ? `<div style="margin-top:20px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">Message</span>
        <p style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${ASPHALT};line-height:1.6;margin:10px 0 0;">${escapeHtml(
          payload.message
        )}</p>
      </div>`
    : "";

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#e8ddc2;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8ddc2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CREAM};border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
            <tr>
              <td style="background:${ASPHALT};padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    ${Array.from({ length: 12 })
                      .map(
                        (_, i) =>
                          `<td style="width:${100 / 12}%;height:8px;background:${i % 2 === 0 ? CREAM : ASPHALT};"></td>`
                      )
                      .join("")}
                  </tr>
                </table>
                <div style="padding:32px 32px 28px;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">
                    Tandy&rsquo;s Window Services
                  </p>
                  <h1 style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;letter-spacing:1px;text-transform:uppercase;color:${CREAM};">
                    New Quote Request
                  </h1>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
                ${servicesHtml}
                ${veteranHtml}
                ${messageHtml}
              </td>
            </tr>
            <tr>
              <td style="background:${RACING_RED};padding:18px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${CREAM};">
                  Reply directly to this email to respond to the customer.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildCustomerEmailHtml(payload: QuotePayload) {
  const servicesLine = payload.services?.length
    ? `<div style="margin-top:18px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">You Requested</span>
        <div style="margin-top:10px;">
          ${payload.services
            .map(
              (s) =>
                `<span style="display:inline-block;background:${ASPHALT};color:${CREAM};font-family:Arial,Helvetica,sans-serif;font-size:13px;padding:6px 14px;border-radius:3px;margin:0 8px 8px 0;">${escapeHtml(
                  s
                )}</span>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  const veteranLine = payload.veteran
    ? `<div style="margin-top:18px;padding:14px 16px;background:#fbf3e2;border-left:4px solid ${MUSTARD};">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${ASPHALT};font-weight:700;">&#9733; We&rsquo;ll have your veteran discount ready</span>
      </div>`
    : "";

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#e8ddc2;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8ddc2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CREAM};border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
            <tr>
              <td style="background:${ASPHALT};padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    ${Array.from({ length: 12 })
                      .map(
                        (_, i) =>
                          `<td style="width:${100 / 12}%;height:8px;background:${i % 2 === 0 ? CREAM : ASPHALT};"></td>`
                      )
                      .join("")}
                  </tr>
                </table>
                <div style="padding:32px 32px 28px;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">
                    Tandy&rsquo;s Window Services
                  </p>
                  <h1 style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:1px;text-transform:uppercase;color:${CREAM};">
                    Got Your Request, ${escapeHtml(payload.name!.split(" ")[0])}
                  </h1>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${ASPHALT};line-height:1.6;">
                  Thanks for reaching out to Tandy&rsquo;s Window Services. Your free quote
                  request came through loud and clear &mdash; we&rsquo;ll follow up with a
                  straightforward quote soon, old-fashioned service, no runaround.
                </p>
                ${servicesLine}
                ${veteranLine}
                <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${ASPHALT}99;">
                  Need us sooner? Call or text
                  <a href="tel:+14694058713" style="color:${RACING_RED};font-weight:700;text-decoration:none;">(469) 405-8713</a>.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:${RACING_RED};padding:18px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${CREAM};">
                  5.0 stars &middot; 43 Google reviews &middot; Fort Worth, TX
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: NextRequest) {
  let payload: QuotePayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!payload.name || !payload.phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 }
    );
  }

  const lines = [
    `New quote request from ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    payload.address ? `Address: ${payload.address}` : null,
    payload.services?.length ? `Services: ${payload.services.join(", ")}` : null,
    payload.veteran ? "Veteran discount requested: yes" : null,
    payload.message ? `Message: ${payload.message}` : null,
  ].filter(Boolean);

  const text = lines.join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO_EMAIL } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS && QUOTE_TO_EMAIL) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"Tandy's Window Services" <${SMTP_USER}>`,
        to: QUOTE_TO_EMAIL,
        replyTo: payload.email || undefined,
        subject: `New Quote Request — ${payload.name}`,
        text,
        html: buildEmailHtml(payload),
      });
    } catch (err) {
      console.error("Failed to send quote email:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }

    // Confirmation to the customer is best-effort — if it fails, the owner
    // notification above already went through, so the request still counts
    // as a success rather than a failure.
    if (payload.email) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT) || 587,
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        await transporter.sendMail({
          from: `"Tandy's Window Services" <${SMTP_USER}>`,
          to: payload.email,
          replyTo: QUOTE_TO_EMAIL,
          subject: "We got your free quote request — Tandy's Window Services",
          text: `Thanks for reaching out, ${payload.name}! We got your free quote request and will follow up soon. Need us sooner? Call or text (469) 405-8713.`,
          html: buildCustomerEmailHtml(payload),
        });
      } catch (err) {
        console.error("Failed to send customer confirmation email:", err);
      }
    }
  } else {
    // SMTP not configured yet — log so submissions are never silently lost during setup.
    console.log("[quote request — email not configured]\n" + text);
  }

  return NextResponse.json({ ok: true });
}
