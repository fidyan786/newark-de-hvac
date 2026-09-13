import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type LeadPayload = {
  name: string;
  phone: string;
  zip: string;
  service: string;
  message: string;
  preferredContact?: string;
  source: "chatbot" | "contact";
  page?: string;
  intent?: string;
};

export function isLeadBackendConfigured() {
  if (process.env.FORM_WEBHOOK) return true;
  if (process.env.LEAD_FILE_STORE === "1") return true;
  if (!process.env.VERCEL) return true;
  return false;
}

export function validateLead(
  input: {
    name: string;
    phone: string;
    zip: string;
    service?: string;
    message?: string;
    preferredContact?: string;
  },
  opts: { requireZip?: boolean } = {}
) {
  const name = input.name.trim().slice(0, 120);
  const phone = input.phone.trim().slice(0, 40);
  const zip = input.zip.trim().slice(0, 10);
  const service = (input.service || "").trim().slice(0, 80);
  const message = (input.message || "").trim().slice(0, 2000);
  const preferredContact = (input.preferredContact || "").trim().slice(0, 40);
  const requireZip = opts.requireZip !== false;

  if (name.length < 2 || /https?:/i.test(name)) return { ok: false as const, error: "Enter a valid name." };
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) return { ok: false as const, error: "Enter a valid phone number." };
  if (digits.length === 11 && !digits.startsWith("1")) return { ok: false as const, error: "Enter a valid phone number." };
  if (requireZip && !/^\d{5}$/.test(zip)) return { ok: false as const, error: "Enter a 5-digit ZIP code." };
  if (zip && !/^\d{5}$/.test(zip)) return { ok: false as const, error: "Enter a 5-digit ZIP code." };

  return {
    ok: true as const,
    value: { name, phone, zip, service, message, preferredContact },
  };
}

export async function persistLead(payload: LeadPayload): Promise<{ stored: boolean; error?: string }> {
  const hook = process.env.FORM_WEBHOOK;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, at: new Date().toISOString() }),
      });
      if (!res.ok) return { stored: false, error: "Could not deliver the request. Try again." };
      return { stored: true };
    } catch {
      return { stored: false, error: "Could not deliver the request. Try again." };
    }
  }

  if (process.env.VERCEL && process.env.LEAD_FILE_STORE !== "1") {
    return { stored: false, error: "unavailable" };
  }

  try {
    const dir = path.join(process.cwd(), ".data", "leads");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`);
    await writeFile(file, JSON.stringify({ ...payload, at: new Date().toISOString() }, null, 2), "utf8");
    return { stored: true };
  } catch {
    return { stored: false, error: "unavailable" };
  }
}
