import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mail } from "lucide-react";
import { generateEmail } from "@/lib/ai.functions";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { AiOutput, SubmitButton } from "@/components/ai-tool-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/email")({
  component: EmailPage,
});

function EmailPage() {
  const fn = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("professional");
  const [purpose, setPurpose] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!purpose.trim()) return toast.error("Tell Aiden what the email is about");
    setLoading(true);
    try {
      const r = await fn({ data: { recipient, tone, purpose, keyPoints } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10">
      <PageHeader icon={Mail} title="Smart Email Generator" description="Describe what you need and Aiden drafts a ready-to-send email." />
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="space-y-4 rounded-xl border bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="space-y-2">
            <Label>Recipient (optional)</Label>
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah from Marketing" />
          </div>
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="apologetic">Apologetic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>What's the email about? *</Label>
            <Textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Following up on the Q3 budget review and asking for approval by Friday." className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label>Key points to include (optional)</Label>
            <Textarea value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} placeholder="• Mention attached spreadsheet&#10;• Propose meeting Tuesday" className="min-h-[80px]" />
          </div>
          <SubmitButton loading={loading}>Generate Email</SubmitButton>
        </form>
        <AiOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} placeholder="Your drafted email will appear here." />
      </div>
      <AiDisclaimer />
    </div>
  );
}