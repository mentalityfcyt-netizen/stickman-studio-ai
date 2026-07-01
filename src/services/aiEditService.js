import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function improveImagePrompt(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: `
Improve this stickman animation image prompt.

Make it more cinematic, detailed, emotional, and optimized for AI image generation.

Return only the improved prompt.

PROMPT:
${prompt}
`,
      },
    ],
  });

  return response.choices[0].message.content;
}