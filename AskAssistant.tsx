import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const suggestions = [
  "Tell me about the Budget Management System",
  "Which design tools does he use?",
  "What is his education?",
];

export function AskAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);
  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close assistant" : "Ask about my work"}
        className="bg-gold shadow-gold fixed bottom-5 right-5 z-[60] flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        <span className="font-display text-xl italic">{open ? "×" : "E"}</span>
        <span className={open ? "hidden" : "hidden sm:inline"}>Ask about my work</span>
      </button>

      {open && (
        <div className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-gold sm:inset-x-auto sm:right-5 sm:w-[24rem]">
          <div className="border-b border-border px-5 py-4">
            <p className="eyebrow">Portfolio assistant</p>
            <p className="mt-1 font-display text-2xl">Ask about Junior's work</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-sm">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground">Ask anything about projects, skills or education.</p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-lg border border-border px-3 py-2 text-left text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              if (m.role === "user")
                return (
                  <div key={m.id} className="ml-8 rounded-xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground">
                    {text}
                  </div>
                );
              return (
                <div key={m.id} className="mr-4 leading-relaxed text-foreground [&_p+p]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              );
            })}
            {status === "submitted" && <p className="animate-pulse text-primary">Thinking…</p>}
            {error && <p className="text-destructive">{error.message || "Something went wrong."}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-border p-3"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Type your question…"
              className="max-h-28 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            {busy ? (
              <button type="button" onClick={stop} className="h-10 shrink-0 rounded-lg border border-border px-4 text-sm">
                Stop
              </button>
            ) : (
              <button type="submit" className="bg-gold h-10 shrink-0 rounded-lg px-4 text-sm font-semibold text-primary-foreground">
                Send
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
