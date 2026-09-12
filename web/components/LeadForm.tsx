"use client";

import { useState } from "react";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("err");
        setError(json.error || "Please try again or call if you have a number posted.");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
      setError("The form could not send. Please try again in a moment.");
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
    <form className={compact ? "lead-form compact" : "lead-form"} onSubmit={onSubmit}>
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
        <input name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="19711" />
      </label>
      <label className="full">
        What is going on?
        <textarea name="message" rows={compact ? 3 : 4} maxLength={2000} placeholder="No cooling in 19702, outdoor unit silent…" />
      </label>
      {error ? (
        <p className="form-err" role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn btn-call" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request Service"}
      </button>
    </form>
  );
}
