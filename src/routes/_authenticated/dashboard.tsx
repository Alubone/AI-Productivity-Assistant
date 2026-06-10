import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListTodo, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const TOOLS = [
  { to: "/email", title: "Smart Email Generator", description: "Draft polished emails from a few notes.", icon: Mail },
  { to: "/notes", title: "Meeting Notes Summarizer", description: "Turn raw notes into decisions & action items.", icon: NotebookPen },
  { to: "/planner", title: "AI Task Planner", description: "Break big goals into a prioritized plan.", icon: ListTodo },
  { to: "/research", title: "AI Research Assistant", description: "Structured briefs on any topic.", icon: Search },
  { to: "/chat", title: "AI Chatbot", description: "Open-ended chat with your AI workmate.", icon: MessageSquare },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <div className="rounded-2xl p-8 mb-8 text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80">
          <Sparkles className="h-3.5 w-3.5" /> Workplace AI
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Good to see you.</h1>
        <p className="mt-2 max-w-xl opacity-90">
          Automate the busywork. Pick a tool below to draft, summarize, plan, or research in seconds.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="group rounded-xl border bg-card p-5 transition-all hover:border-primary/50 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="font-semibold text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-muted-foreground text-center">
        Aiden uses AI to assist your work. Outputs may be inaccurate — please review before relying on them.
      </p>
    </div>
  );
}