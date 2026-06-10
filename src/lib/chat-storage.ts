import type { UIMessage } from "ai";

const KEY = "aiden.chat.threads";

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

export function loadThreads(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: ChatThread[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(threads));
}

export function newThread(): ChatThread {
  return {
    id: (crypto?.randomUUID?.() ?? `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
    title: "New chat",
    updatedAt: Date.now(),
    messages: [],
  };
}

export function deriveTitle(messages: UIMessage[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first) return "New chat";
  const text = first.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ").trim();
  return text.slice(0, 50) || "New chat";
}