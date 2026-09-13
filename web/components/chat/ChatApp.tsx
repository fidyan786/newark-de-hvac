"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackChat } from "@/lib/chat/analytics";
import { slugFromPath } from "@/lib/chat/config";
import { ChatEngine } from "@/lib/chat/engine";
import type { ChatAction, ChatBoot, EngineReply } from "@/lib/chat/types";
import { ChatLauncher } from "./ChatLauncher";
import { ChatLeadForm } from "./ChatLeadForm";
import "./chat.css";

type UiMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: { href: string; label: string }[];
  actions?: ChatAction[];
  emergency?: boolean;
  form?: boolean;
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function reduceMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ChatApp({ boot, initialOpen = false }: { boot: ChatBoot; initialOpen?: boolean }) {
  const pathname = usePathname() || "/";
  const titleId = useId();
  const engineRef = useRef<ChatEngine | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(initialOpen);
  const [started, setStarted] = useState(false);
  const [notice, setNotice] = useState(true);
  const [messages, setMessages] = useState<UiMsg[]>([]);
  const [actions, setActions] = useState<ChatAction[]>([]);
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const engine = useCallback(() => {
    if (!engineRef.current) engineRef.current = new ChatEngine({ pageSlug: slugFromPath(pathname), boot });
    return engineRef.current;
  }, [boot, pathname]);

  const scrollLog = () => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const pushBot = (reply: EngineReply) => {
    setMessages((m) => [
      ...m.map((msg) => ({ ...msg, form: false })),
      {
        id: uid(),
        role: "assistant",
        text: reply.text,
        links: reply.links,
        actions: reply.actions,
        emergency: reply.emergency,
        form: reply.showForm,
      },
    ]);
    setActions(reply.actions || []);
    setFormOpen(Boolean(reply.showForm));
    if (reply.emergency) trackChat("emergency_detected", { intent: reply.intent });
  };

  const polish = async (userText: string, reply: EngineReply) => {
    if (!boot.aiEnabled) return reply;
    try {
      const snap = engine().snapshot();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          draft: reply.text,
          intent: reply.intent,
          pageSlug: snap.pageSlug,
          facts: {
            zip: snap.zip,
            location: snap.location,
            intent: snap.intent,
            problem: snap.problem,
          },
        }),
      });
      const data = (await res.json()) as { ok?: boolean; fallback?: boolean; text?: string };
      if (data.ok && !data.fallback && data.text) reply.text = data.text;
    } catch {
      /* local reply stands */
    }
    return reply;
  };

  const begin = useCallback(() => {
    if (started) return;
    setStarted(true);
    trackChat("chat_started", { page: slugFromPath(pathname) });
    const reply = engine().opening();
    pushBot(reply);
  }, [engine, pathname, started]);

  const openChat = () => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
    setNotice(false);
    trackChat("chat_open", { page: slugFromPath(pathname) });
  };

  const closeChat = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open || !started) return;
    const id = window.setTimeout(() => {
      (launcherRef.current || lastFocus.current)?.focus();
    }, 30);
    return () => window.clearTimeout(id);
  }, [open, started]);

  useEffect(() => {
    if (open && !started) begin();
  }, [open, started, begin]);

  useEffect(() => {
    if (initialOpen) openChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollLog();
  }, [messages, typing, formOpen]);

  useEffect(() => {
    document.body.classList.toggle("nhp-chat-open", open);
    return () => document.body.classList.remove("nhp-chat-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    window.setTimeout(() => {
      panel?.focus();
    }, reduceMotion() ? 0 : 160);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeChat();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = [...panel.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea")].filter(
        (n) => !n.hasAttribute("disabled") && n.tabIndex !== -1
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeChat]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const root = panelRef.current?.parentElement;
    const sync = () => {
      if (!open || !root) return;
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty("--nhp-kb", `${kb}px`);
      root.style.setProperty("--nhp-vvh", `${Math.floor(vv.height)}px`);
    };
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    sync();
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, [open]);

  async function handleTurn(userText: string, actionId?: string) {
    if (sending) return;
    setSending(true);
    if (userText) {
      setMessages((m) => [...m, { id: uid(), role: "user", text: userText }]);
      trackChat("message_sent", { intent: engine().snapshot().intent || "UNKNOWN" });
    }
    if (actionId) trackChat("intent_selected", { id: actionId });
    setTyping(true);
    const delay = reduceMotion() ? 0 : 240;
    await new Promise((r) => setTimeout(r, delay));
    let reply = engine().respond(userText, actionId);
    reply = await polish(userText || actionId || "", reply);
    setTyping(false);
    pushBot(reply);
    setSending(false);
    inputRef.current?.focus();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    void handleTurn(text);
  }

  function onAction(action: ChatAction) {
    if (action.kind === "link" && action.href) {
      trackChat("service_page_clicked", { href: action.href });
      window.location.href = action.href;
      return;
    }
    if (action.kind === "call" && action.href) {
      trackChat("call_clicked", { source: "chatbot" });
      window.location.href = action.href;
      return;
    }
    if (action.kind === "request") {
      trackChat("request_started");
      void handleTurn(action.label, "request_service");
      return;
    }
    void handleTurn(action.label, action.id);
  }

  function onComposerKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  }

  const snap = engineRef.current?.snapshot();
  const stripActions = actions.filter((action) => !formOpen || action.kind === "call" || action.kind === "link");

  return (
    <div className={`nhp-chat${open ? " is-open" : ""}`}>
      <ChatLauncher open={open} notice={notice} onOpen={openChat} launcherRef={launcherRef} />
      <div
        ref={panelRef}
        className="nhp-panel"
        id="nhp-chat-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        hidden={!open}
        inert={!open ? true : undefined}
        tabIndex={-1}
      >
        <div className="nhp-head">
          <svg className="nhp-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 22V10h3.2l5.2 7.4V10H21v12h-3.1L12.6 14.4V22H9Z" fill="currentColor" />
          </svg>
          <div className="nhp-head-copy">
            <strong id={titleId}>Newark HVAC Pros</strong>
            <span>HVAC Service Assistant</span>
          </div>
          {boot.hasPhone ? (
            <a
              className="nhp-head-call"
              href={`tel:${boot.phoneTel}`}
              onClick={() => trackChat("call_clicked", { source: "chat-header" })}
            >
              Call
            </a>
          ) : null}
          <button type="button" className="nhp-close" aria-label="Close chat" onClick={closeChat}>
            ×
          </button>
        </div>
        <div className="nhp-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`nhp-msg ${msg.role === "user" ? "nhp-msg-user" : "nhp-msg-bot"}${msg.emergency ? " is-emergency" : ""}`}
            >
              <p>{msg.text}</p>
              {msg.links && msg.links.length ? (
                <div className="nhp-links">
                  {msg.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => trackChat("service_page_clicked", { href: link.href })}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
              {msg.form ? (
                <ChatLeadForm
                  defaults={{
                    name: snap?.name || "",
                    phone: snap?.phone || "",
                    zip: snap?.zip || "",
                    service: snap?.service || "",
                    description: snap?.description || "",
                    page: pathname,
                    intent: snap?.intent || "",
                  }}
                  onSuccess={() => {
                    trackChat("request_submitted");
                    setFormOpen(false);
                    setMessages((m) => [
                      ...m.map((msg) => ({ ...msg, form: false })),
                      { id: uid(), role: "assistant", text: "Thanks — your request has been received." },
                    ]);
                    setActions(engine().respond("", "call_now").actions);
                  }}
                  onUnavailable={(message) => {
                    setFormOpen(false);
                    setMessages((m) => [...m, { id: uid(), role: "assistant", text: message }]);
                    const call = engine().respond("", "call_now");
                    setActions(call.actions);
                  }}
                  onError={() => {
                    /* inline error on the form */
                  }}
                />
              ) : null}
            </div>
          ))}
          {typing ? (
            <div className="nhp-msg nhp-msg-bot" aria-label="Assistant is typing">
              <span className="nhp-typing">
                <span />
                <span />
                <span />
              </span>
            </div>
          ) : null}
        </div>
        {stripActions.length ? (
          <div className="nhp-actions" role="group" aria-label="Suggested replies">
            {stripActions.map((action) =>
              action.kind === "link" || action.kind === "call" ? (
                <a
                  key={action.id + action.label}
                  className={action.kind === "call" ? "is-call" : undefined}
                  href={action.href || "/contact/"}
                  onClick={() => {
                    if (action.kind === "call") trackChat("call_clicked", { source: "chatbot" });
                    if (action.kind === "link") trackChat("service_page_clicked", { href: action.href || "" });
                  }}
                >
                  {action.label}
                </a>
              ) : (
                <button
                  key={action.id + action.label}
                  type="button"
                  className={`nhp-chip${action.kind === "request" ? " is-call" : ""}`}
                  onClick={() => onAction(action)}
                >
                  {action.label}
                </button>
              )
            )}
          </div>
        ) : null}
        <form className="nhp-compose" onSubmit={onSubmit}>
          <label className="nhp-sr" htmlFor="nhp-chat-input">
            Type your message
          </label>
          <textarea
            ref={inputRef}
            id="nhp-chat-input"
            rows={1}
            maxLength={1000}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onComposerKey}
            enterKeyHint="send"
          />
          <button className="nhp-send" type="submit" aria-label="Send" disabled={sending || !input.trim()}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M3.4 20.6 21 12 3.4 3.4 3 10l11 2-11 2z" />
            </svg>
          </button>
        </form>
        <p className="nhp-fine">Local HVAC help for Newark &amp; New Castle County. Not a live technician.</p>
      </div>
    </div>
  );
}
