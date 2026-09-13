"use client";

import { useState } from "react";
import type { Faq } from "@/lib/services";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div className="faq-item" key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="faq-q">{item.q}</span>
                <span className="faq-toggle" aria-hidden="true">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
