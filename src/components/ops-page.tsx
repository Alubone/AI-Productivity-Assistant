import type { LucideIcon } from "lucide-react";
import { Construction, Truck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export function OpsPage({
  icon,
  title,
  description,
  highlights,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: { label: string; value: string; hint?: string }[];
}) {
  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <PageHeader icon={icon} title={title} description={description} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((h) => (
          <div key={h.label} className="rounded-2xl border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{h.label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{h.value}</p>
            {h.hint && <p className="text-xs text-muted-foreground mt-1">{h.hint}</p>}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border bg-card p-6 flex items-start gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-navy)" }}>
          <Construction className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold">Module preview</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This operations module is connected to the AI workspace. Use the
            {" "}
            <Link to="/chat" className="text-primary hover:underline">AI Logistics Copilot</Link>
            {" "}
            to query shipments, draft updates, or build a plan for this area.
          </p>
          <p className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" /> Live data integration available in production deployments.
          </p>
        </div>
      </div>
    </div>
  );
}