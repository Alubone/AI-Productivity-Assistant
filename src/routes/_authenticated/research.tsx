import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Search } from "lucide-react";
import { researchTopic } from "@/lib/ai.functions";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { AiOutput, SubmitButton } from "@/components/ai-tool-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/research")({
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<"overview" | "deep">("overview");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (topic.trim().length < 3) return toast.error("Tell Aiden what to research");
    setLoading(true);
    try {
      const r = await fn({ data: { topic, depth } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10">
      <PageHeader icon={Search} title="AI Research Assistant" description="Get a structured brief on any workplace topic in seconds." />
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="space-y-4 rounded-xl border bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="space-y-2">
            <Label>Research topic or question *</Label>
            <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Best practices for async standups in distributed teams" className="min-h-[120px]" />
          </div>
          <div className="space-y-2">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={(v) => setDepth(v as "overview" | "deep")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Quick overview</SelectItem>
                <SelectItem value="deep">In-depth brief</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton loading={loading}>Research it</SubmitButton>
        </form>
        <AiOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} placeholder="Your research brief will appear here." />
      </div>
      <AiDisclaimer />
    </div>
  );
}