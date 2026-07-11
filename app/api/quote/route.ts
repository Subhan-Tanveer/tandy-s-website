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
        from: SMTP_USER,
        to: QUOTE_TO_EMAIL,
        replyTo: payload.email || undefined,
        subject: `Free Quote Request — ${payload.name}`,
        text,
      });
    } catch (err) {
      console.error("Failed to send quote email:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }
  } else {
    // SMTP not configured yet — log so submissions are never silently lost during setup.
    console.log("[quote request — email not configured]\n" + text);
  }

  return NextResponse.json({ ok: true });
}
