import { createFileRoute, Outlet, useNavigate, useParams, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { loadThreads, saveThreads, newThread, type ChatThread } from "@/lib/chat-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatShell,
});

function ChatShell() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = pathname.startsWith("/chat/") ? pathname.slice("/chat/".length) : null;
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    const loaded = loadThreads();
    if (loaded.length === 0) {
      const t = newThread();
      saveThreads([t]);
      setThreads([t]);
      navigate({ to: "/chat/$threadId", params: { threadId: t.id }, replace: true });
    } else {
      setThreads(loaded);
      if (!activeId) {
        navigate({ to: "/chat/$threadId", params: { threadId: loaded[0].id }, replace: true });
      }
    }
    const onStorage = () => setThreads(loadThreads());
    window.addEventListener("storage", onStorage);
    window.addEventListener("aiden-threads-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("aiden-threads-changed", onStorage);
    };
  }, [navigate, activeId]);

  const createThread = () => {
    const t = newThread();
    const next = [t, ...threads];
    saveThreads(next);
    setThreads(next);
    navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
  };

  const deleteThread = (id: string) => {
    const next = threads.filter((t) => t.id !== id);
    let finalNext = next;
    if (next.length === 0) {
      const t = newThread();
      finalNext = [t];
    }
    saveThreads(finalNext);
    setThreads(finalNext);
    if (activeId === id) {
      navigate({ to: "/chat/$threadId", params: { threadId: finalNext[0].id }, replace: true });
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] lg:h-screen">
      <div className="hidden md:flex w-64 shrink-0 flex-col border-r bg-muted/30">
        <div className="p-3 border-b">
          <Button onClick={createThread} className="w-full text-primary-foreground border-0" style={{ background: "var(--gradient-primary)" }}>
            <Plus className="h-4 w-4" /> New chat
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {threads.map((t) => {
              const active = activeId === t.id;
              return (
                <div key={t.id} className={cn("group flex items-center rounded-lg", active ? "bg-primary/10" : "hover:bg-accent")}>
                  <Link
                    to="/chat/$threadId"
                    params={{ threadId: t.id }}
                    className={cn("flex-1 flex items-center gap-2 px-3 py-2 text-sm min-w-0", active ? "text-primary font-medium" : "text-foreground")}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{t.title}</span>
                  </Link>
                  <button
                    onClick={() => deleteThread(t.id)}
                    className="px-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    aria-label="Delete thread"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <p className="p-3 text-[10px] text-muted-foreground border-t">
          Chats are saved in this browser only.
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}