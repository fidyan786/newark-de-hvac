"use client";

import { useState } from "react";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: data });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("err");
        setError(json.error || "Please try again in a moment.");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
      setError("The form could not send. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <p className="form-ok" role="status">
        Request received. We will follow up using the phone number you entered.
      </p>
    );
  }

  return (
    <form className="lead-form two" onSubmit={onSubmit} noValidate={false}>
      <label>
        Name
        <input name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" required maxLength={40} />
      </label>
      <label>
        ZIP
        <input name="zip" inputMode="numeric" autoComplete="postal-code" required maxLength={10} pattern="\d{5}" />
      </label>
      <label>
        Service needed
        <select name="service" defaultValue="" required>
          <option value="" disabled>
            Select
          </option>
          <option>AC Repair</option>
          <option>Heating / Furnace</option>
          <option>Heat Pump</option>
          <option>Maintenance</option>
          <option>Installation</option>
          <option>Indoor Air Quality</option>
          <option>Commercial HVAC</option>
          <option>Emergency</option>
        </select>
      </label>
      <label className="full">
        Message
        <textarea name="message" rows={4} maxLength={2000} />
      </label>
      <div className="lead-honey" aria-hidden="true">
        <label>
          Company website
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error ? (
        <p className="form-err full" role="alert">
          {error}
        </p>
      ) : null}
      <div className="full">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request Service"}
        </button>
      </div>
    </form>
  );
}
