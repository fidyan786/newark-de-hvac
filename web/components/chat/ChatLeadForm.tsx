"use client";

import { useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/chat/config";

type Props = {
  defaults: {
    name?: string;
    phone?: string;
    zip?: string;
    service?: string;
    description?: string;
    page?: string;
    intent?: string;
  };
  onSuccess: () => void;
  onUnavailable: (message: string) => void;
  onError: (message: string) => void;
};

export function ChatLeadForm({ defaults, onSuccess, onUnavailable, onError }: Props) {
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = {
      name: String(new FormData(form).get("name") || ""),
      phone: String(new FormData(form).get("phone") || ""),
      zip: String(new FormData(form).get("zip") || ""),
      service: String(new FormData(form).get("service") || ""),
      message: String(new FormData(form).get("message") || ""),
      preferredContact: String(new FormData(form).get("preferredContact") || ""),
      company_url: String(new FormData(form).get("company_url") || ""),
      source: "chatbot",
      page: defaults.page || "",
      intent: defaults.intent || "",
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; code?: string };
      if (json.code === "unavailable" || res.status === 503) {
        onUnavailable(json.error || "Please call us directly to request service.");
        setStatus("idle");
        return;
      }
      if (!res.ok || !json.ok) {
        setError(json.error || "Please check the form and try again.");
        setStatus("idle");
        onError(json.error || "Please check the form and try again.");
        return;
      }
      onSuccess();
    } catch {
      const msg = "Something went wrong. You can call us directly for help.";
      setError(msg);
      setStatus("idle");
      onError(msg);
    }
  }

  return (
    <form className="nhp-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" autoComplete="name" required maxLength={120} defaultValue={defaults.name || ""} />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" required maxLength={40} defaultValue={defaults.phone || ""} />
      </label>
      <label>
        ZIP Code
        <input
          name="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          required
          maxLength={10}
          defaultValue={defaults.zip || ""}
          placeholder="19711"
        />
      </label>
      <label>
        Service needed
        <select name="service" defaultValue={defaults.service || ""}>
          <option value="">Select</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        Short description
        <textarea name="message" rows={3} maxLength={2000} defaultValue={defaults.description || ""} />
      </label>
      <label>
        Preferred contact <span style={{ fontWeight: 500, color: "var(--muted)" }}>(optional)</span>
        <select name="preferredContact" defaultValue="">
          <option value="">No preference</option>
          <option value="call">Call</option>
          <option value="text">Text</option>
        </select>
      </label>
      <div className="nhp-honey" aria-hidden="true">
        <input name="company_url" tabIndex={-1} autoComplete="off" />
      </div>
      {error ? (
        <p className="nhp-form-err" role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request Service"}
      </button>
    </form>
  );
}
