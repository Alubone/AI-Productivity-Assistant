import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListTodo, Search, MessageSquare, ArrowRight, Truck, Ship, Warehouse, Plane } from "lucide-react";
import heroImg from "@/assets/hero-logistics.jpg";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const TOOLS = [
  { to: "/email", title: "Smart Email Generator", description: "Draft shipment updates, carrier replies & customer notes.", icon: Mail },
  { to: "/notes", title: "Meeting Notes Summarizer", description: "Turn ops standups into decisions & action items.", icon: NotebookPen },
  { to: "/planner", title: "AI Task Planner", description: "Plan route rollouts, audits, or peak-season prep.", icon: ListTodo },
  { to: "/research", title: "AI Research Assistant", description: "Brief any lane, carrier, port, or regulation.", icon: Search },
  { to: "/chat", title: "AI Chatbot", description: "Your always-on copilot for the logistics floor.", icon: MessageSquare },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <div className="relative overflow-hidden rounded-2xl mb-8" style={{ boxShadow: "var(--shadow-glow)" }}>
        <img
          src={heroImg}
          alt="Container port at blue hour"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg, oklch(0.25 0.08 250 / 0.85), oklch(0.35 0.12 240 / 0.55))" }}
        />
        <div className="relative p-8 text-primary-foreground">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-90">
            <Truck className="h-3.5 w-3.5" /> Logistics AI Workspace
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Good to see you.</h1>
          <p className="mt-2 max-w-xl opacity-90">
            Keep freight, fleet, and warehouse ops moving. Pick a tool below to draft, summarize, plan, or research in seconds.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs opacity-90">
            <span className="inline-flex items-center gap-1.5"><Ship className="h-3.5 w-3.5" /> Ocean</span>
            <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Trucking</span>
            <span className="inline-flex items-center gap-1.5"><Warehouse className="h-3.5 w-3.5" /> Warehouse</span>
            <span className="inline-flex items-center gap-1.5"><Plane className="h-3.5 w-3.5" /> Air cargo</span>
          </div>
        </div>
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