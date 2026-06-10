import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export function AiDisclaimer() {
  return (
    <p className="mt-6 rounded-lg border border-dashed bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
      <strong className="text-foreground">Responsible AI:</strong> Outputs are AI-generated and may be inaccurate or biased. Review and edit before sending or sharing.
    </p>
  );
}