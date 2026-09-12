/**
 * Newark HVAC chatbot UI — lazy, accessible, page-aware.
 */
(function () {
  "use strict";

  var cfg = window.NHP_CHAT;
  if (!cfg || !window.NHPChatEngine) return;

  var REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STORAGE_KEY = "nhp-chat-v1";
  var root;
  var panel;
  var logEl;
  var inputEl;
  var quickEl;
  var ctaEl;
  var launcher;
  var engine;
  var open = false;
  var started = false;
  var converted = false;
  var abandonedTracked = false;
  var leadSent = false;

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    engine = window.NHPChatEngine.createEngine(cfg);
    mount();
    restore();
    bindViewport();
  });

  function mount() {
    root = document.createElement("div");
    root.className = "nhp-chat";
    root.innerHTML =
      '<button type="button" class="nhp-chat-launcher" aria-controls="nhp-chat-panel" aria-expanded="false" aria-label="Open HVAC help chat">' +
      '<span class="nhp-chat-launcher-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3.5 5.2c0 .9.7 1.5 1.6 1.5.8 0 1.5-.6 1.5-1.5S9.9 7.7 9.1 7.7c-.9 0-1.6.7-1.6 1.5zm5.4 0c0 .9.7 1.5 1.6 1.5.8 0 1.5-.6 1.5-1.5s-.7-1.5-1.5-1.5c-.9 0-1.6.7-1.6 1.5z"/></svg>' +
      '</span><span class="nhp-chat-launcher-text">Need HVAC help?</span></button>' +
      '<div class="nhp-chat-panel" id="nhp-chat-panel" role="dialog" aria-modal="true" aria-labelledby="nhp-chat-title" hidden>' +
      '<div class="nhp-chat-head">' +
      '<div class="nhp-chat-head-copy">' +
      '<p class="nhp-chat-kicker">Newark, Delaware</p>' +
      '<h2 id="nhp-chat-title">' +
      escapeHtml(cfg.brand || "HVAC Help") +
      "</h2>" +
      "</div>" +
      '<div class="nhp-chat-head-actions">' +
      (cfg.phoneTel
        ? '<a class="nhp-chat-head-call" href="' + escapeAttr(cfg.phoneTel) + '" data-nhp-call>Call</a>'
        : "") +
      '<button type="button" class="nhp-chat-close" aria-label="Close chat">&times;</button>' +
      "</div></div>" +
      '<div class="nhp-chat-log" id="nhp-chat-log" aria-live="polite"></div>' +
      '<div class="nhp-chat-cta" hidden></div>' +
      '<div class="nhp-chat-quick" role="group" aria-label="Suggested replies"></div>' +
      '<form class="nhp-chat-form" action="" method="post">' +
      '<label class="nhp-sr-only" for="nhp-chat-input">Message</label>' +
      '<input id="nhp-chat-input" name="message" maxlength="1000" autocomplete="off" enterkeyhint="send" placeholder="Describe the HVAC issue…">' +
      '<button type="submit" class="nhp-chat-send" aria-label="Send message">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 20.6 21 12 3.4 3.4 3 10l11 2-11 2z"/></svg>' +
      "</button></form>" +
      '<p class="nhp-chat-fine">Local HVAC help for Newark &amp; New Castle County. Not a live technician.</p>' +
      "</div>";

    document.body.appendChild(root);
    panel = root.querySelector(".nhp-chat-panel");
    logEl = root.querySelector(".nhp-chat-log");
    inputEl = root.querySelector("#nhp-chat-input");
    quickEl = root.querySelector(".nhp-chat-quick");
    ctaEl = root.querySelector(".nhp-chat-cta");
    launcher = root.querySelector(".nhp-chat-launcher");

    launcher.addEventListener("click", function () {
      toggle(true);
    });
    root.querySelector(".nhp-chat-close").addEventListener("click", function () {
      toggle(false);
    });
    root.querySelector(".nhp-chat-form").addEventListener("submit", onSubmit);
    quickEl.addEventListener("click", onQuick);
    root.addEventListener("click", function (e) {
      var a = e.target.closest("[data-nhp-call]");
      if (!a) return;
      converted = true;
      track("call_clicked", { source: "chatbot" });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        toggle(false);
      }
    });
    window.addEventListener("pagehide", function () {
      maybeAbandon();
    });
  }

  function toggle(next) {
    open = !!next;
    root.classList.toggle("is-open", open);
    document.body.classList.toggle("nhp-chat-open", open);
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      panel.hidden = false;
      track("chatbot_open");
      if (!started) begin();
      window.setTimeout(function () {
        if (inputEl) inputEl.focus();
      }, REDUCE ? 0 : 180);
    } else {
      panel.hidden = true;
      launcher.focus();
      maybeAbandon();
    }
  }

  function begin() {
    started = true;
    track("chatbot_started", { page: cfg.pageSlug });
    var opener = engine.opening();
    addBot(opener, true);
  }

  function onSubmit(e) {
    e.preventDefault();
    var text = (inputEl.value || "").trim();
    if (!text) return;
    inputEl.value = "";
    addUser(text);
    replyTo(text, null);
  }

  function onQuick(e) {
    var btn = e.target.closest("[data-quick]");
    if (!btn) return;
    var id = btn.getAttribute("data-quick");
    var label = btn.textContent.trim();
    if (id === "call") {
      converted = true;
      track("call_clicked", { source: "quick" });
      if (cfg.phoneTel) window.location.href = cfg.phoneTel;
      return;
    }
    addUser(label);
    track("intent_selected", { id: id });
    if (/^intent-/.test(id) || id === "intent-commercial") track("service_selected", { id: id });
    replyTo(label, id);
  }

  function replyTo(text, quickId) {
    typing(true);
    var delay = REDUCE ? 0 : 280 + Math.min(220, text.length * 4);
    window.setTimeout(function () {
      var local = engine.respond(text, { quickId: quickId });
      maybeAi(text, local).then(function (finalReply) {
        typing(false);
        addBot(finalReply);
        if (finalReply.emergency) track("emergency_intent");
        persist();
        maybeLead(finalReply);
      });
    }, delay);
  }

  function maybeAi(userText, local) {
    if (!cfg.aiEnabled || !cfg.endpoints || !cfg.endpoints.chat) {
      return Promise.resolve(local);
    }
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = window.setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, 7000);
    return fetch(cfg.endpoints.chat, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        localReply: local.text,
        state: engine.getState(),
      }),
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data && data.ok && !data.fallback && data.text) {
          local.text = String(data.text).slice(0, 600);
        }
        return local;
      })
      .catch(function () {
        return local;
      })
      .then(function (reply) {
        window.clearTimeout(timer);
        return reply;
      });
  }

  function addUser(text) {
    var el = document.createElement("div");
    el.className = "nhp-msg nhp-msg-user";
    el.innerHTML = "<p>" + escapeHtml(text) + "</p>";
    logEl.appendChild(el);
    scrollLog();
  }

  function addBot(reply, silent) {
    var el = document.createElement("div");
    el.className = "nhp-msg nhp-msg-bot";
    if (reply.emergency) el.classList.add("is-emergency");
    var html = "<p>" + escapeHtml(reply.text) + "</p>";
    if (reply.links && reply.links.length) {
      html += '<p class="nhp-msg-links">';
      reply.links.forEach(function (link) {
        html += '<a href="' + escapeAttr(link.href) + '">' + escapeHtml(link.label) + "</a>";
      });
      html += "</p>";
    }
    el.innerHTML = html;
    logEl.appendChild(el);
    renderQuick(reply.quickReplies || []);
    renderCta(!!reply.showCall);
    scrollLog();
    if (!silent) persist();
  }

  function typing(on) {
    var existing = logEl.querySelector(".nhp-typing");
    if (existing) existing.remove();
    if (!on) return;
    var el = document.createElement("div");
    el.className = "nhp-msg nhp-msg-bot nhp-typing";
    el.setAttribute("aria-label", "Assistant is typing");
    el.innerHTML = "<span></span><span></span><span></span>";
    logEl.appendChild(el);
    scrollLog();
  }

  function renderQuick(items) {
    quickEl.innerHTML = "";
    items.slice(0, 6).forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nhp-chip";
      btn.setAttribute("data-quick", item.id);
      btn.textContent = item.label;
      quickEl.appendChild(btn);
    });
  }

  function renderCta(show) {
    if (!show || !cfg.phoneTel) {
      ctaEl.hidden = true;
      ctaEl.innerHTML = "";
      return;
    }
    ctaEl.hidden = false;
    ctaEl.innerHTML =
      '<p>Need help now?</p>' +
      '<a class="btn btn-call nhp-chat-call" href="' +
      escapeAttr(cfg.phoneTel) +
      '" data-nhp-call>Call Now' +
      (cfg.phoneIsPlaceholder ? "" : " · " + escapeHtml(cfg.phoneDisplay || "")) +
      "</a>";
  }

  function scrollLog() {
    logEl.scrollTop = logEl.scrollHeight;
  }

  function maybeLead(reply) {
    var st = engine.getState();
    if (st.phone && !leadSent) {
      leadSent = true;
      track("lead_started");
      postLead(st)
        .then(function (ok) {
          if (ok) {
            converted = true;
            track("lead_completed");
          }
        })
        .catch(function () {});
    }
    if (reply && reply.showCall && st.phone) {
      /* already handled */
    }
  }

  function postLead(st) {
    if (!cfg.endpoints || !cfg.endpoints.lead) return Promise.resolve(false);
    return fetch(cfg.endpoints.lead, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: st.sessionId,
        sourcePage: st.sourcePage,
        intent: st.intent,
        serviceType: st.serviceType,
        issue: st.issue,
        systemStatus: st.systemStatus,
        propertyType: st.propertyType,
        zipCode: st.zipCode,
        urgency: st.urgency,
        name: st.name || "",
        phone: st.phone,
        qualificationStatus: st.qualificationStatus,
        conversationSummary: st.conversationSummary,
        company_url: "",
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        return !!(data && data.ok);
      })
      .catch(function () {
        return false;
      });
  }

  function persist() {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          html: logEl.innerHTML,
          quick: quickEl.innerHTML,
          cta: ctaEl.innerHTML,
          ctaOn: !ctaEl.hidden,
          state: engine.getState(),
          started: started,
        })
      );
    } catch (e) {}
  }

  function restore() {
    /* Fresh engine per page keeps greetings page-aware. History is session-only within the page. */
  }

  function maybeAbandon() {
    if (!started || converted || abandonedTracked) return;
    abandonedTracked = true;
    track("chatbot_abandoned", { page: cfg.pageSlug });
  }

  function bindViewport() {
    if (!window.visualViewport) return;
    var sync = function () {
      if (!open) return;
      var vv = window.visualViewport;
      var bottom = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      panel.style.setProperty("--nhp-vv-bottom", bottom + "px");
      panel.style.setProperty("--nhp-vv-height", Math.floor(vv.height) + "px");
    };
    window.visualViewport.addEventListener("resize", sync);
    window.visualViewport.addEventListener("scroll", sync);
  }

  function track(event, props) {
    props = props || {};
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: event, event_source: "chatbot" }, props));
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props);
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }
})();
