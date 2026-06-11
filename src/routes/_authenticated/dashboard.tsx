import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail, NotebookPen, ListTodo, Search, ArrowRight, Truck, Ship, Warehouse, Plane,
  Package, FileText, CalendarCheck, TrendingUp, ShieldCheck, Network, Send, Sparkles,
  CheckCircle2, Clock, MessageSquare,
} from "lucide-react";
import heroImg from "@/assets/hero-logistics.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const KPIS = [
  { label: "Shipments", value: "245", delta: "+12% vs yesterday", up: true, icon: Package, spark: [12, 18, 14, 22, 19, 26, 28] },
  { label: "Emails Generated", value: "32", delta: "+8% vs yesterday", up: true, icon: FileText, spark: [6, 8, 7, 10, 12, 11, 14] },
  { label: "Tasks Planned", value: "18", delta: "+15% vs yesterday", up: true, icon: ListTodo, spark: [3, 5, 4, 6, 8, 7, 9] },
  { label: "Meetings Today", value: "5", delta: "No change", up: false, icon: CalendarCheck, spark: [4, 5, 4, 5, 5, 5, 5] },
] as const;

const CHIPS = [
  { label: "Ocean Freight", to: "/operations/ocean", icon: Ship },
  { label: "Air Cargo", to: "/operations/air", icon: Plane },
  { label: "Trucking", to: "/operations/trucking", icon: Truck },
  { label: "Warehouse", to: "/operations/warehouse", icon: Warehouse },
  { label: "Customs", to: "/operations/customs", icon: ShieldCheck },
  { label: "Supply Chain", to: "/operations/supply-chain", icon: Network },
] as const;

const TOOLS = [
  {
    to: "/email", title: "Smart Email Generator", icon: Mail, cta: "Generate Email",
    desc: "Shipment updates, delay notifications, customer & carrier comms.",
    bullets: ["Shipment updates", "Delay notifications", "Customer comms", "Carrier comms"],
  },
  {
    to: "/notes", title: "Meeting Notes Summarizer", icon: NotebookPen, cta: "Summarize Notes",
    desc: "Paste raw notes — get summary, decisions, action items & deadlines.",
    bullets: ["AI summary", "Action items", "Decisions", "Deadlines"],
  },
  {
    to: "/planner", title: "AI Task Planner", icon: ListTodo, cta: "Create Plan",
    desc: "Build daily & weekly schedules with priorities and deadlines.",
    bullets: ["Daily schedule", "Weekly schedule", "Priority ranking", "Suggested deadlines"],
  },
  {
    to: "/research", title: "AI Research Assistant", icon: Search, cta: "Start Research",
    desc: "Research lanes, regulations, ports, carriers — get recommendations.",
    bullets: ["Logistics topics", "Regulations", "Ports & carriers", "Recommendations"],
  },
] as const;

const ACTIVITY = [
  { title: "Customer delay email generated", time: "9 min ago", status: "done", icon: Mail },
  { title: "Weekly warehouse task plan created", time: "32 min ago", status: "done", icon: ListTodo },
  { title: "Carrier research completed — APAC lanes", time: "1 h ago", status: "done", icon: Search },
  { title: "Operations meeting notes summarized", time: "2 h ago", status: "done", icon: NotebookPen },
  { title: "Customs compliance brief in progress", time: "3 h ago", status: "pending", icon: ShieldCheck },
] as const;

const EXAMPLE_PROMPTS = [
  "Summarize shipment delays",
  "Draft customer delay email",
  "Create warehouse task plan",
  "Research port congestion",
  "Carrier performance insights",
];

function Sparkline({ data, up }: { data: readonly number[]; up: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 26}`)
    .join(" ");
  const stroke = up ? "var(--primary)" : "var(--muted-foreground)";
  return (
    <svg viewBox="0 0 100 32" className="h-9 w-24" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
        <img src={heroImg} alt="Container port at blue hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, oklch(0.18 0.06 258 / 0.92) 30%, oklch(0.28 0.10 255 / 0.70) 70%, oklch(0.72 0.11 230 / 0.45))" }} />
        <div className="relative px-6 py-10 sm:p-10 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-wider ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" /> AI Operations Workspace
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">AI Operations Command Center</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/85">
            Manage freight, fleet, warehouse, and customer communications with AI-powered workplace tools.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.label}
                  to={c.to}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" /> {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Sparkline data={k.spark} up={k.up} />
              </div>
              <p className="mt-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">{k.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight">{k.value}</p>
              </div>
              <p className={`mt-1 text-xs ${k.up ? "text-primary" : "text-muted-foreground"} inline-flex items-center gap-1`}>
                {k.up && <TrendingUp className="h-3 w-3" />} {k.delta}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main grid: tools + copilot */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6 min-w-0">
          <div>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">AI Productivity Tools</h2>
                <p className="text-sm text-muted-foreground">Built for logistics operations teams.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {TOOLS.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.to}
                    className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{t.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                    <ul className="mt-3 grid grid-cols-2 gap-y-1 text-xs text-muted-foreground">
                      {t.bullets.map((b) => (
                        <li key={b} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-primary" /> {b}</li>
                      ))}
                    </ul>
                    <Link
                      to={t.to}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {t.cta} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <p className="text-sm text-muted-foreground">Today's AI-assisted work.</p>
              </div>
            </div>
            <ol className="relative space-y-3 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-border">
              {ACTIVITY.map((a) => {
                const Icon = a.icon;
                const done = a.status === "done";
                return (
                  <li key={a.title} className="relative flex items-start gap-3 pl-10">
                    <span className={`absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-card ${done ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                    </span>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-3 rounded-xl border bg-background/60 px-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                        <p className="text-sm truncate">{a.title}</p>
                      </div>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">{a.time}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Responsible AI */}
          <div className="rounded-2xl border p-5 flex items-start gap-4" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 6%, var(--card)), var(--card))", boxShadow: "var(--shadow-card)" }}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-navy)" }}>
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Responsible AI Notice</p>
              <p className="mt-1 text-sm text-muted-foreground">
                AI-generated outputs may contain inaccuracies or incomplete information. Always review, verify, and use human
                judgment before relying on AI-generated content for operational, customer-facing, compliance, or regulatory decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Copilot panel */}
        <CopilotPanel />
      </section>
    </div>
  );
}

function CopilotPanel() {
  const [msg, setMsg] = useState("");
  return (
    <aside className="rounded-2xl border bg-card flex flex-col xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)]" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">AI Logistics Copilot</p>
            <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="rounded-2xl rounded-tl-sm bg-muted/70 px-3.5 py-2.5 text-sm max-w-[90%]">
          Hi Operations User — I can draft shipment emails, plan tasks, or research lanes. Try one of the prompts below.
        </div>
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Example prompts</p>
          {EXAMPLE_PROMPTS.map((p) => (
            <Link
              key={p}
              to="/chat"
              className="block rounded-xl border bg-background/60 px-3 py-2 text-sm hover:border-primary/40 hover:bg-accent/50 transition-colors"
            >
              {p}
            </Link>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); if (msg.trim()) window.location.assign("/chat"); }}
        className="border-t p-3 flex items-center gap-2"
      >
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask the copilot..." className="rounded-xl" />
        <Button type="submit" size="icon" className="rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </aside>
  );
}