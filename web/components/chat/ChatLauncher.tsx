"use client";

import type { Ref } from "react";

type Props = {
  open: boolean;
  notice: boolean;
  onOpen: () => void;
  launcherRef?: Ref<HTMLButtonElement>;
};

export function ChatLauncher({ open, notice, onOpen, launcherRef }: Props) {
  return (
    <button
      ref={launcherRef}
      type="button"
      className="nhp-launcher"
      aria-expanded={open}
      aria-controls="nhp-chat-panel"
      aria-haspopup="dialog"
      aria-label="How can we help with your HVAC system?"
      onClick={onOpen}
    >
      <span className="nhp-launcher-icon" aria-hidden="true">
        N
      </span>
      {notice && !open ? <span className="nhp-launcher-dot" aria-hidden="true" /> : null}
    </button>
  );
}
