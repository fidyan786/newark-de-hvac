"use client";

import { useEffect, useState } from "react";
import type { ChatBoot } from "@/lib/chat/types";
import { ChatLauncher } from "./ChatLauncher";
import "./chat.css";

export function ChatShell({ boot }: { boot: ChatBoot }) {
  const [App, setApp] = useState<null | typeof import("./ChatApp").ChatApp>(null);
  const [wantOpen, setWantOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      import("./ChatApp")
        .then((mod) => {
          if (!cancelled) setApp(() => mod.ChatApp);
        })
        .catch(() => {
          /* launcher still works on retry */
        });
    };
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(load, { timeout: 2200 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }
    const t = window.setTimeout(load, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (App) return <App boot={boot} initialOpen={wantOpen} />;

  return (
    <div className="nhp-chat">
      <ChatLauncher open={false} notice onOpen={() => setWantOpen(true)} />
    </div>
  );
}
