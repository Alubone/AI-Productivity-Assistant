import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key)(MODEL);
}

async function run(system: string, prompt: string) {
  const { text } = await generateText({ model: getModel(), system, prompt });
  return { text };
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        recipient: z.string().max(200).optional().default(""),
        purpose: z.string().min(1).max(2000),
        tone: z.string().max(50).optional().default("professional"),
        keyPoints: z.string().max(2000).optional().default(""),
      })
      .parse(d),
  )
  .handler(async ({ data }) =>
    run(
      "You are an expert workplace communication assistant. Write clear, polished emails ready to send. Output ONLY the email (Subject line + body). No commentary.",
      `Recipient: ${data.recipient || "(unspecified)"}\nTone: ${data.tone}\nPurpose: ${data.purpose}\nKey points: ${data.keyPoints || "(none)"}`,
    ),
  );

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ notes: z.string().min(10).max(20000) }).parse(d),
  )
  .handler(async ({ data }) =>
    run(
      "You are an expert meeting notes summarizer. Output markdown with sections: ## Summary, ## Key Decisions, ## Action Items (with owners if mentioned), ## Risks/Open Questions. Be concise and faithful to the source.",
      data.notes,
    ),
  );

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        goal: z.string().min(3).max(2000),
        deadline: z.string().max(100).optional().default(""),
        context: z.string().max(2000).optional().default(""),
      })
      .parse(d),
  )
  .handler(async ({ data }) =>
    run(
      "You are an AI task planner for busy professionals. Break the goal into a prioritized, actionable plan as a markdown checklist with estimated effort (e.g. 30m, 2h) and suggested order. Include a brief intro sentence and a 'Next step' callout at the end.",
      `Goal: ${data.goal}\nDeadline: ${data.deadline || "(none)"}\nContext: ${data.context || "(none)"}`,
    ),
  );

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        topic: z.string().min(3).max(2000),
        depth: z.enum(["overview", "deep"]).optional().default("overview"),
      })
      .parse(d),
  )
  .handler(async ({ data }) =>
    run(
      `You are a workplace research assistant. Produce a structured markdown brief: ## TL;DR, ## Background, ## Key Points (bulleted), ## Considerations, ## Suggested Next Steps. Depth: ${data.depth}. Be neutral, factual, and cite uncertainty where appropriate. Note that you cannot browse the web; flag claims that should be verified.`,
      data.topic,
    ),
  );