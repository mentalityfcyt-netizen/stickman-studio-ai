import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function runProducerAgent(project) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: `
You are the VidoForge AI Producer.

Analyze this project and create a high-level production strategy.

PROJECT:
${JSON.stringify(project, null, 2)}

Return ONLY this exact section:

PRODUCER_STRATEGY:
`,
      },
    ],
  });

  return response.choices[0].message.content;
}