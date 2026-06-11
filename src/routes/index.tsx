import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Mail, NotebookPen, ListTodo, Search, MessageSquare, ArrowRight, Truck, Ship, Warehouse, Plane } from "lucide-react";
import heroImg from "@/assets/hero-logistics.jpg";
import trucksImg from "@/assets/logistics-trucks.jpg";
import warehouseImg from "@/assets/logistics-warehouse.jpg";
import cargoImg from "@/assets/logistics-cargo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aiden — AI Productivity for Logistics Teams" },
      { name: "description", content: "Draft shipment emails, summarize ops meetings, plan routes, and research carriers with an AI assistant built for logistics." },
      { property: "og:title", content: "Aiden — AI Productivity for Logistics Teams" },
      { property: "og:description", content: "Automate the busywork across freight, fleet, and warehouse ops — emails, notes, plans, research, and chat in one workspace." },
      { property: "og:image", content: heroImg },
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
    { icon: Mail, title: "Smart Email Generator", desc: "Shipment updates, carrier replies, and customer notes — drafted in seconds." },
    { icon: NotebookPen, title: "Meeting Notes Summarizer", desc: "Turn ops standups into decisions and action items." },
    { icon: ListTodo, title: "AI Task Planner", desc: "Break down route rollouts, peak-season prep, or audits into a plan." },
    { icon: Search, title: "AI Research Assistant", desc: "Brief any lane, carrier, port, or regulation." },
    { icon: MessageSquare, title: "AI Chatbot", desc: "Your always-on copilot for the logistics floor." },
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

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground" style={{ boxShadow: "var(--shadow-soft)" }}>
            <Truck className="h-3 w-3 text-primary" /> AI for Logistics Operations
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Move freight faster with{" "}
            <span style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Aiden
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            The AI workspace built for dispatchers, freight forwarders, and supply-chain teams. Draft shipment emails, summarize ops meetings, plan routes, and research lanes — all in one focused workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Ship className="h-3.5 w-3.5 text-primary" /> Ocean freight</span>
            <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-primary" /> Trucking & fleet</span>
            <span className="inline-flex items-center gap-1.5"><Warehouse className="h-3.5 w-3.5 text-primary" /> Warehousing</span>
            <span className="inline-flex items-center gap-1.5"><Plane className="h-3.5 w-3.5 text-primary" /> Air cargo</span>
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
            style={{ background: "var(--gradient-primary)" }}
            aria-hidden="true"
          />
          <img
            src={heroImg}
            alt="Aerial view of a container port at blue hour with cargo ships and cranes"
            width={1600}
            height={900}
            className="relative rounded-2xl border object-cover w-full h-[360px] lg:h-[460px]"
            style={{ boxShadow: "var(--shadow-glow)" }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { src: trucksImg, label: "Fleet & dispatch", icon: Truck },
            { src: warehouseImg, label: "Warehouse ops", icon: Warehouse },
            { src: cargoImg, label: "Air & ocean cargo", icon: Plane },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="relative overflow-hidden rounded-xl border group">
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 text-primary" /> {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Built for the logistics workday</h2>
          <p className="mt-2 text-muted-foreground">Five AI tools tuned for freight, fleet, and supply-chain teams.</p>
        </div>
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