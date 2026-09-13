export type RewriteInput = {
  message: string;
  draft: string;
  intent: string;
  pageSlug: string;
  facts: Record<string, string | boolean | null>;
};

export interface ChatProvider {
  id: string;
  rewrite(input: RewriteInput, systemPrompt: string): Promise<string | null>;
}

export class NullChatProvider implements ChatProvider {
  id = "none";
  async rewrite() {
    return null;
  }
}

type OpenAIChatResponse = {
  choices?: { message?: { content?: string } }[];
};

export class OpenAICompatibleProvider implements ChatProvider {
  id: string;
  constructor(
    private opts: { apiKey: string; baseUrl: string; model: string; temperature: number; timeoutMs: number },
    id = "openai-compatible"
  ) {
    this.id = id;
  }

  async rewrite(input: RewriteInput, systemPrompt: string): Promise<string | null> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), this.opts.timeoutMs);
    try {
      const res = await fetch(`${this.opts.baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.opts.apiKey}`,
        },
        body: JSON.stringify({
          model: this.opts.model,
          temperature: this.opts.temperature,
          max_tokens: 180,
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Visitor said:\n${input.message}\n\nDraft reply to polish (keep the same facts):\n${input.draft}\n\nIntent: ${input.intent}\nPage: ${input.pageSlug}\nKnown facts: ${JSON.stringify(input.facts)}`,
            },
          ],
        }),
        signal: ctrl.signal,
      });
      if (!res.ok) return null;
      const data = (await res.json()) as OpenAIChatResponse;
      const text = data.choices?.[0]?.message?.content?.trim();
      return text || null;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}

export function createChatProvider(): ChatProvider {
  const gateway = process.env.AI_GATEWAY_API_KEY;
  const openai = process.env.OPENAI_API_KEY;
  const temperature = Number(process.env.CHAT_TEMPERATURE || "0.3");
  const timeoutMs = Number(process.env.CHAT_TIMEOUT_MS || "8000");

  if (gateway && !openai) {
    return new OpenAICompatibleProvider(
      {
        apiKey: gateway,
        baseUrl: process.env.OPENAI_BASE_URL || "https://ai-gateway.vercel.sh/v1",
        model: process.env.OPENAI_MODEL || "openai/gpt-4.1-mini",
        temperature,
        timeoutMs,
      },
      "ai-gateway"
    );
  }
  if (openai) {
    return new OpenAICompatibleProvider(
      {
        apiKey: openai,
        baseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature,
        timeoutMs,
      },
      "openai"
    );
  }
  if (gateway) {
    return new OpenAICompatibleProvider(
      {
        apiKey: gateway,
        baseUrl: process.env.AI_ENDPOINT || process.env.OPENAI_BASE_URL || "https://ai-gateway.vercel.sh/v1",
        model: process.env.OPENAI_MODEL || "openai/gpt-4.1-mini",
        temperature,
        timeoutMs,
      },
      "ai-gateway"
    );
  }
  return new NullChatProvider();
}
