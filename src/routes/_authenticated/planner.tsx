import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ListTodo } from "lucide-react";
import { planTasks } from "@/lib/ai.functions";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { AiOutput, SubmitButton } from "@/components/ai-tool-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/planner")({
  component: PlannerPage,
});

function PlannerPage() {
  const fn = useServerFn(planTasks);
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (goal.trim().length < 3) return toast.error("Describe your goal");
    setLoading(true);
    try {
      const r = await fn({ data: { goal, deadline, context } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10">
      <PageHeader icon={ListTodo} title="AI Task Planner" description="Turn a goal into an actionable, prioritized plan." />
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="space-y-4 rounded-xl border bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="space-y-2">
            <Label>Goal *</Label>
            <Textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Launch new onboarding flow for enterprise customers" className="min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <Label>Deadline (optional)</Label>
            <Input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. End of Q3" />
          </div>
          <div className="space-y-2">
            <Label>Context (optional)</Label>
            <Textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Team size, constraints, dependencies..." className="min-h-[80px]" />
          </div>
          <SubmitButton loading={loading}>Build the plan</SubmitButton>
        </form>
        <AiOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} placeholder="Your prioritized plan will appear here." />
      </div>
      <AiDisclaimer />
    </div>
  );
}