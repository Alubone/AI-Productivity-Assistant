import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { NotebookPen } from "lucide-react";
import { summarizeMeeting } from "@/lib/ai.functions";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { AiOutput, SubmitButton } from "@/components/ai-tool-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/notes")({
  component: NotesPage,
});

function NotesPage() {
  const fn = useServerFn(summarizeMeeting);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (notes.trim().length < 10) return toast.error("Paste in your meeting notes (10+ chars)");
    setLoading(true);
    try {
      const r = await fn({ data: { notes } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10">
      <PageHeader icon={NotebookPen} title="Meeting Notes Summarizer" description="Paste your raw notes — get a clean summary with decisions and action items." />
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="space-y-4 rounded-xl border bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="space-y-2">
            <Label>Meeting notes / transcript</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your raw notes or transcript here..." className="min-h-[280px] font-mono text-sm" />
          </div>
          <SubmitButton loading={loading}>Summarize</SubmitButton>
        </form>
        <AiOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} placeholder="Your structured summary will appear here." />
      </div>
      <AiDisclaimer />
    </div>
  );
}