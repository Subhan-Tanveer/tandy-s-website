"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "@/lib/services";
import MagneticButton from "./MagneticButton";

type Status = "idle" | "submitting" | "success" | "error";

const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Google Maps",
  "Facebook",
  "Instagram",
  "Referral / Word of Mouth",
  "Yard Sign",
  "Other",
];

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      address: data.get("address"),
      services: data.getAll("services"),
      veteran: data.get("veteran") === "on",
      howHeard: data.get("howHeard"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please call us instead — we'd love to help.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-cream border-2 border-racing-red rounded-sm p-8 text-center transition-opacity duration-500">
        <CheckCircle2 size={40} className="text-racing-red mx-auto mb-3" />
        <h3 className="font-display text-2xl uppercase mb-2">Quote Request Sent</h3>
        <p className="text-asphalt/70">
          Thanks &mdash; we&apos;ll be in touch shortly. For anything urgent, give us a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-live="polite">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" required autoComplete="name" />
        <Field label="Phone Number" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Property Address" name="address" autoComplete="street-address" />
      </div>

      <fieldset>
        <legend className="font-display uppercase tracking-wide text-sm text-asphalt/70 mb-2">
          Services Needed
        </legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {services.map((s) => (
            <label
              key={s.slug}
              className="flex items-center gap-2 text-sm text-asphalt/80 cursor-pointer"
            >
              <input
                type="checkbox"
                name="services"
                value={s.title}
                className="w-4 h-4 accent-[var(--color-racing-red)]"
              />
              {s.title}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-asphalt/80 cursor-pointer">
        <input type="checkbox" name="veteran" className="w-4 h-4 accent-[var(--color-racing-red)]" />
        I&apos;m a veteran (ask about our discount)
      </label>

      <div>
        <label htmlFor="howHeard" className="block font-display uppercase tracking-wide text-sm text-asphalt/70 mb-1">
          How did you hear about us?
        </label>
        <select
          id="howHeard"
          name="howHeard"
          defaultValue=""
          className="w-full bg-white/60 border-2 border-asphalt/15 rounded-sm px-4 py-3 focus:border-racing-red focus:outline-none transition-colors duration-300"
        >
          <option value="" disabled>
            Select an option
          </option>
          {HEAR_ABOUT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-display uppercase tracking-wide text-sm text-asphalt/70 mb-1">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-white/60 border-2 border-asphalt/15 rounded-sm px-4 py-3 focus:border-racing-red focus:outline-none transition-colors duration-300"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-racing-red-dark text-sm">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}

      <MagneticButton
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto bg-racing-red text-cream font-display text-xl tracking-wide uppercase px-8 py-4 rounded-sm border-2 border-racing-red hover:bg-transparent hover:text-racing-red disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 size={20} className="animate-spin" />}
        {status === "submitting" ? "Sending..." : "Request a Free Quote"}
      </MagneticButton>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-display uppercase tracking-wide text-sm text-asphalt/70 mb-1">
        {label}
        {required && <span className="text-racing-red"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-white/60 border-2 border-asphalt/15 rounded-sm px-4 py-3 focus:border-racing-red focus:outline-none transition-colors duration-300"
      />
    </div>
  );
}
