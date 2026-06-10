import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Check, RotateCw } from "lucide-react";
import { toast } from "sonner";

export function AiOutput({
  value,
  onChange,
  onRegenerate,
  loading,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  loading?: boolean;
  placeholder?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">AI Output — editable</p>
        <div className="flex gap-1">
          {onRegenerate && (
            <Button size="sm" variant="ghost" onClick={onRegenerate} disabled={loading}>
              <RotateCw className={loading ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} />
              Regenerate
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={copy} disabled={!value}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            Copy
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Your AI-generated output will appear here. You can edit it freely."}
        className="min-h-[320px] border-0 rounded-none rounded-b-xl font-mono text-sm leading-relaxed resize-y focus-visible:ring-0"
      />
    </div>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <Button type="submit" disabled={loading} className="text-primary-foreground border-0" style={{ background: "var(--gradient-primary)" }}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}