import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function analyzeVideoRequest(userRequest) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: `
You are VidoForge AI, an expert AI video producer.

Analyze this user request and return a production plan.

USER REQUEST:
${userRequest}

Return ONLY valid JSON in this exact structure:

{
  "projectTitle": "",
  "videoType": "",
  "visualStyle": "",
  "length": "",
  "voiceStyle": "",
  "targetAudience": "",
  "estimatedScenes": "",
  "productionSummary": "",
  "recommendedTemplate": ""
}

Do not include markdown.
Do not include extra text.
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}