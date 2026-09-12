import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "").trim().slice(0, 120);
  const phone = String(form.get("phone") || "").trim().slice(0, 40);
  const zip = String(form.get("zip") || "").trim().slice(0, 10);
  const message = String(form.get("message") || "").trim().slice(0, 2000);

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
  }

  const payload = { name, phone, zip, message, at: new Date().toISOString(), source: "newark-de-hvac" };
  const hook = process.env.FORM_WEBHOOK;

  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      return NextResponse.json({ ok: false, error: "Could not deliver the request. Try again." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
