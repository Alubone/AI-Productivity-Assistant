import { cn } from "@/lib/utils";

export function BrandLogo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 L14.2 9 L21 9 L15.4 13.3 L17.6 20 L12 15.8 L6.4 20 L8.6 13.3 L3 9 L9.8 9 Z" />
        </svg>
      </div>
      {withWordmark && (
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            <span className="dark:text-foreground">MAERSK</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Logistics AI</p>
        </div>
      )}
    </div>
  );
}