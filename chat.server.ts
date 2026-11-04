import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id.server";
import { EMAIL, PHONE_DISPLAY, education, projectInfo, skills } from "../portfolio-data";

const INSTRUCTIONS = `You are the portfolio assistant for Ebongue Abong Junior, a Computer Graphics and Web Designing graduate.
Answer visitors' questions about his projects, skills, education and how to contact him. Be warm, concise and professional (2-5 sentences unless more detail is asked). Speak about him in the third person.
Only use the facts below. If something isn't covered, say you don't have that detail and suggest emailing him at ${EMAIL}. Politely decline unrelated requests.

SKILLS:
${skills.map((s) => `- ${s.group}: ${s.items.join(", ")}`).join("\n")}

EDUCATION: ${education.degree}, ${education.school}, ${education.year}. ${education.result}.

PROJECTS:
${projectInfo.map((p) => `- ${p.title} (${p.tag}): ${p.desc} Tools: ${p.stack.join(", ")}`).join("\n")}

CONTACT: email ${EMAIL}, phone/WhatsApp ${PHONE_DISPLAY}`;

export async function handleChat(request: Request) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return new Response("AI is not configured", { status: 500 });
  const { messages } = (await request.json()) as { messages: UIMessage[] };
  const recent = messages.slice(-20);

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: INSTRUCTIONS,
    messages: await convertToModelMessages(recent),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: recent,
      onError: (e) => {
        console.error("chat error", e);
        const status = (e as { statusCode?: number })?.statusCode;
        if (status === 429) return "Too many questions right now — please try again in a moment.";
        if (status === 402 || status === 403) return "The assistant is unavailable at the moment. Please email Junior directly.";
        return "Sorry, something went wrong. Please try again.";
      },
    }),
    runIdFetch,
  );
}
