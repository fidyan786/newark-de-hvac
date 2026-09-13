import { NextResponse } from "next/server";
import { createChatProvider } from "@/lib/ai/provider";
import { getChatBoot } from "@/lib/chat/boot";
import { buildSystemPrompt } from "@/lib/chat/prompt";
import { sanitizeAssistantText } from "@/lib/chat/sanitize";
import { clientIp, rateLimit, sameOrigin } from "@/lib/leads/rateLimit";

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, fallback: true, error: "Forbidden" }, { status: 403 });
  }
  if (!rateLimit(`chat:${clientIp(req)}`, 20, 60_000)) {
    return NextResponse.json({ ok: true, fallback: true }, { status: 429 });
  }

  let body: {
    message?: string;
    draft?: string;
    intent?: string;
    pageSlug?: string;
    facts?: Record<string, string | boolean | null>;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, fallback: true }, { status: 400 });
  }

  const message = String(body.message || "").trim().slice(0, 1000);
  const draft = String(body.draft || "").trim().slice(0, 800);
  if (!message || !draft) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  const boot = getChatBoot();
  const provider = createChatProvider();
  if (provider.id === "none") {
    return NextResponse.json({ ok: true, fallback: true });
  }

  const polished = await provider.rewrite(
    {
      message,
      draft,
      intent: String(body.intent || ""),
      pageSlug: String(body.pageSlug || ""),
      facts: body.facts || {},
    },
    buildSystemPrompt(boot)
  );

  const text = polished ? sanitizeAssistantText(polished, Boolean(boot.hours && /24/.test(boot.hours))) : null;
  if (!text) return NextResponse.json({ ok: true, fallback: true });
  return NextResponse.json({ ok: true, fallback: false, text });
}
