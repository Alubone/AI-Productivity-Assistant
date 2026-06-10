import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { loadThreads, saveThreads, deriveTitle, type ChatThread } from "@/lib/chat-storage";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  component: ChatThreadPage,
});

function ChatThreadPage() {
  const { threadId } = Route.useParams();
  return <ChatWindow key={threadId} threadId={threadId} />;
}

function ChatWindow({ threadId }: { threadId: string }) {
  const initial = useMemo<ChatThread | null>(() => {
    const all = loadThreads();
    return all.find((t) => t.id === threadId) ?? null;
  }, [threadId]);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initial?.messages ?? [],
    transport,
    onError: (e) => toast.error(e.message || "Chat error"),
  });

  const [input, setInput] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persist messages on every change
  useEffect(() => {
    if (messages.length === 0 && (initial?.messages.length ?? 0) === 0) return;
    const all = loadThreads();
    const idx = all.findIndex((t) => t.id === threadId);
    const updated: ChatThread = {
      id: threadId,
      title: deriveTitle(messages),
      updatedAt: Date.now(),
      messages,
    };
    if (idx >= 0) all[idx] = updated;
    else all.unshift(updated);
    saveThreads(all);
    window.dispatchEvent(new Event("aiden-threads-changed"));
  }, [messages, threadId, initial]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  // Focus
  useEffect(() => { taRef.current?.focus(); }, [threadId, status]);

  const isLoading = status === "submitted" || status === "streaming";

  const submit = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-6 py-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">Aiden</p>
          <p className="text-xs text-muted-foreground">AI workplace assistant</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground mb-4" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">How can I help you today?</h2>
              <p className="text-sm text-muted-foreground mt-2">Ask anything about work — drafting, planning, summarizing, brainstorming.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-2 max-w-md mx-auto">
                {[
                  "Draft a status update for my team",
                  "Help me prep for a 1:1 with my manager",
                  "Summarize the pros and cons of OKRs",
                  "Suggest agenda for a kickoff meeting",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); taRef.current?.focus(); }}
                    className="rounded-lg border bg-card px-3 py-2 text-xs text-left text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={cn("flex gap-3", isUser && "flex-row-reverse")}>
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}>
                  {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "rounded-2xl px-4 py-2.5 max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed",
                  isUser ? "bg-primary text-primary-foreground" : "bg-card border",
                )}>
                  {text || <span className="opacity-60 italic">…</span>}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl px-4 py-2.5 bg-card border text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm px-3 py-2">
              {error.message}
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={(e) => { e.preventDefault(); submit(); }}
            className="flex items-end gap-2 rounded-2xl border bg-card p-2 focus-within:ring-2 focus-within:ring-primary/30"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Textarea
              ref={taRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
              }}
              placeholder="Ask Aiden anything…"
              className="min-h-[44px] max-h-40 border-0 focus-visible:ring-0 resize-none bg-transparent"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="shrink-0 text-primary-foreground border-0"
              style={{ background: "var(--gradient-primary)" }}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="mt-2 text-[10px] text-center text-muted-foreground">
            AI may be inaccurate. Verify important details. Chats saved in this browser.
          </p>
        </div>
      </div>
    </div>
  );
}