import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Mail, NotebookPen, ListTodo, Search, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aiden — AI Workplace Productivity Assistant" },
      { name: "description", content: "Draft emails, summarize meetings, plan tasks, and research with your AI workplace assistant." },
      { property: "og:title", content: "Aiden — AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Automate workplace busywork with AI: emails, notes, plans, research, and chat — in one focused workspace." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const features = [
    { icon: Mail, title: "Smart Email Generator", desc: "Polished drafts from a few notes." },
    { icon: NotebookPen, title: "Meeting Notes Summarizer", desc: "Decisions and action items in one click." },
    { icon: ListTodo, title: "AI Task Planner", desc: "Turn goals into prioritized plans." },
    { icon: Search, title: "AI Research Assistant", desc: "Structured briefs on any topic." },
    { icon: MessageSquare, title: "AI Chatbot", desc: "Your always-on AI workmate." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-semibold">Aiden</span>
        </div>
        <a href="/auth" className="text-sm font-medium text-primary hover:underline">Sign in</a>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground" style={{ boxShadow: "var(--shadow-soft)" }}>
          <Sparkles className="h-3 w-3 text-primary" /> AI Workplace Productivity
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight">
          Automate your workday with{" "}
          <span style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Aiden
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          One sleek workspace to draft emails, summarize meetings, plan tasks, and research topics — powered by AI, designed for focus.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            Get started free <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#features" className="inline-flex items-center rounded-lg border bg-card px-6 py-3 text-sm font-medium hover:bg-accent">
            Explore features
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl border bg-card p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          AI outputs may be inaccurate. Always review before sending or acting on them.
        </p>
      </section>
    </div>
  );
}