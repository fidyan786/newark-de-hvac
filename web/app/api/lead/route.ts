import { NextResponse } from "next/server";
import { isLeadBackendConfigured, persistLead, validateLead } from "@/lib/leads/persist";
import { clientIp, rateLimit, sameOrigin } from "@/lib/leads/rateLimit";

async function readPayload(req: Request) {
  const ctype = req.headers.get("content-type") || "";
  if (ctype.includes("application/json")) {
    const body = await req.json();
    return {
      name: String(body.name || ""),
      phone: String(body.phone || ""),
      zip: String(body.zip || body.zipCode || ""),
      service: String(body.service || body.serviceNeeded || ""),
      message: String(body.message || body.description || ""),
      preferredContact: String(body.preferredContact || ""),
      source: String(body.source || "contact") === "chatbot" ? "chatbot" : "contact",
      page: String(body.page || body.sourcePage || ""),
      intent: String(body.intent || ""),
      honey: String(body.company_url || ""),
    };
  }

  const form = await req.formData();
  return {
    name: String(form.get("name") || ""),
    phone: String(form.get("phone") || ""),
    zip: String(form.get("zip") || ""),
    service: String(form.get("service") || ""),
    message: String(form.get("message") || ""),
    preferredContact: String(form.get("preferredContact") || ""),
    source: String(form.get("source") || "contact") === "chatbot" ? "chatbot" : "contact",
    page: String(form.get("page") || ""),
    intent: String(form.get("intent") || ""),
    honey: String(form.get("company_url") || ""),
  };
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  if (!rateLimit(`lead:${clientIp(req)}`, 8, 600_000)) {
    return NextResponse.json({ ok: false, error: "Please wait a moment before sending another request." }, { status: 429 });
  }

  let data: Awaited<ReturnType<typeof readPayload>>;
  try {
    data = await readPayload(req);
  } catch {
    return NextResponse.json({ ok: false, error: "Please try again." }, { status: 400 });
  }

  if (data.honey) return NextResponse.json({ ok: true });

  const checked = validateLead(data);
  if (!checked.ok) {
    return NextResponse.json({ ok: false, error: checked.error }, { status: 400 });
  }

  if (!isLeadBackendConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Please call us directly to request service.", code: "unavailable" },
      { status: 503 }
    );
  }

  const stored = await persistLead({
    ...checked.value,
    source: data.source === "chatbot" ? "chatbot" : "contact",
    page: data.page.slice(0, 160),
    intent: data.intent.slice(0, 80),
  });

  if (!stored.stored) {
    const message =
      stored.error === "unavailable"
        ? "Please call us directly to request service."
        : stored.error || "Could not deliver the request. Try again.";
    return NextResponse.json({ ok: false, error: message, code: stored.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
