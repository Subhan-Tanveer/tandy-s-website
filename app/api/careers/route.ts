import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ApplicationPayload = {
  name?: string;
  phone?: string;
  email?: string;
  position?: string;
  message?: string;
};

const CREAM = "#f4ecd8";
const ASPHALT = "#121110";
const RACING_RED = "#c8202f";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(payload: ApplicationPayload) {
  const rows = [
    { label: "Name", value: payload.name },
    { label: "Phone", value: payload.phone },
    { label: "Email", value: payload.email },
    { label: "Position", value: payload.position },
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

  const messageHtml = payload.message
    ? `<div style="margin-top:20px;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${RACING_RED};font-weight:700;">About Them</span>
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
                    New Job Application
                  </h1>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
                ${messageHtml}
              </td>
            </tr>
            <tr>
              <td style="background:${RACING_RED};padding:18px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${CREAM};">
                  Reply directly to this email to respond to the applicant.
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

function buildApplicantEmailHtml(payload: ApplicationPayload) {
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
                    Got Your Application, ${escapeHtml(payload.name!.split(" ")[0])}
                  </h1>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${ASPHALT};line-height:1.6;">
                  Thanks for applying to Tandy&rsquo;s Window Services for the
                  <strong>${escapeHtml(payload.position!)}</strong> position. Your application
                  came through loud and clear &mdash; we&rsquo;ll review it and reach out if
                  it&rsquo;s a fit, old-fashioned service, no runaround.
                </p>
                <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${ASPHALT}99;">
                  Questions in the meantime? Call or text
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
  let payload: ApplicationPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!payload.name || !payload.phone || !payload.email || !payload.position) {
    return NextResponse.json(
      { error: "Name, phone, email, and position are required" },
      { status: 400 }
    );
  }

  const lines = [
    `New job application from ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Position: ${payload.position}`,
    payload.message ? `About them: ${payload.message}` : null,
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
        replyTo: payload.email,
        subject: `New Job Application — ${payload.name} (${payload.position})`,
        text,
        html: buildEmailHtml(payload),
      });
    } catch (err) {
      console.error("Failed to send job application email:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }

    // Confirmation to the applicant is best-effort — if it fails, the owner
    // notification above already went through, so the request still counts
    // as a success rather than a failure.
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
        subject: "We got your application — Tandy's Window Services",
        text: `Thanks for applying, ${payload.name}! We got your application for the ${payload.position} position and will follow up if it's a fit. Questions? Call or text (469) 405-8713.`,
        html: buildApplicantEmailHtml(payload),
      });
    } catch (err) {
      console.error("Failed to send applicant confirmation email:", err);
    }
  } else {
    // SMTP not configured yet — log so submissions are never silently lost during setup.
    console.log("[job application — email not configured]\n" + text);
  }

  return NextResponse.json({ ok: true });
}
