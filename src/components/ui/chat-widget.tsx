"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, MessageCircle } from "lucide-react";

const WEBHOOK_URL =
  "https://n8n.aivanov.agency/webhook/6deae7aa-ffc8-48a0-8395-ddfcec3a249e";

type Message = {
  role: "assistant" | "user";
  text: string;
};

function generateSessionId() {
  return "s_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function useChatWidget() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const openChat = useCallback(() => setOpen(true), []);
  return { open, toggle, openChat, setOpen };
}

export default function ChatWidget({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hallo! 👋 Ich bin Ihr Terminassistent bei Rouge Nails. Wie kann ich Ihnen helfen? Möchten Sie einen Termin buchen?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useRef(generateSessionId());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: text,
          sessionId: sessionId.current,
        }),
      });

      let reply = "Entschuldigung, es gab ein Problem. Bitte versuchen Sie es erneut.";

      if (res.ok) {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          const parsed = Array.isArray(data) ? data[0] : data;
          const rawReply = parsed.output || parsed.response || parsed.text || parsed.message || "";
          reply = rawReply.replace(/BOOKING_DATA:\{[\s\S]*?\}/g, "").trim();
        } else {
          reply = await res.text();
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Es tut mir leid, die Verbindung konnte nicht hergestellt werden. Bitte versuchen Sie es später erneut.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-end p-0 md:p-6 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3a0610]/20 backdrop-blur-sm pointer-events-auto md:bg-transparent md:backdrop-blur-none"
        onClick={onClose}
      />

      {/* Chat panel */}
      <div
        className="
          relative pointer-events-auto
          w-full h-[85vh] md:h-[540px] md:w-[400px]
          bg-[#f7f1ea] border border-[#3a0610]/15
          rounded-t-2xl md:rounded-2xl
          shadow-2xl
          flex flex-col overflow-hidden
          animate-[slideUp_0.35s_cubic-bezier(0.22,1,0.36,1)]
        "
      >
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#3a0610]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8b0a1a] flex items-center justify-center">
              <MessageCircle size={16} className="text-[#f7f1ea]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3a0610]">
                Terminassistent
              </p>
              <p className="text-[0.65rem] text-[#3a0610]/50">
                Rouge Nails · Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3a0610]/10 transition-colors"
            aria-label="Chat schließen"
          >
            <X size={16} className="text-[#3a0610]/70" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#8b0a1a] text-[#f7f1ea] rounded-2xl rounded-br-sm"
                    : "bg-[#3a0610]/[0.07] text-[#3a0610] rounded-2xl rounded-bl-sm"
                }`}
              >
                {msg.text.split("\n").filter(line => line.trim() !== "").map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#3a0610]/[0.07] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a0610]/40 animate-[bounce_1.4s_infinite_0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a0610]/40 animate-[bounce_1.4s_infinite_200ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a0610]/40 animate-[bounce_1.4s_infinite_400ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#3a0610]/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nachricht schreiben…"
              className="flex-1 bg-[#3a0610]/[0.05] rounded-full px-4 py-2.5 text-sm text-[#3a0610] placeholder:text-[#3a0610]/40 outline-none focus:ring-2 focus:ring-[#8b0a1a]/30 transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8b0a1a] text-[#f7f1ea] transition-all duration-300 hover:bg-[#a01025] disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Senden"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
