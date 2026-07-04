import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function runEdit(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
}

export async function improveImagePrompt(prompt) {
  return runEdit(`
Improve this stickman animation image prompt.

Make it more cinematic, detailed, emotional, and optimized for AI image generation.

Return only the improved prompt.

PROMPT:
${prompt}
`);
}

export async function improveVideoPrompt(prompt) {
  return runEdit(`
Improve this Google Flow animation prompt.

Make it more cinematic, action-focused, clear, and optimized for video generation.

Return only the improved video prompt.

PROMPT:
${prompt}
`);
}

export async function rewriteScene(scene) {
  return runEdit(`
Rewrite this stickman animation scene to make it more dramatic, emotional, and engaging.

Keep it concise.

Return only the rewritten scene.

SCENE:
${scene}
`);
}

export async function makeSceneScarier(scene) {
  return runEdit(`
Rewrite this stickman animation scene to make it scarier and more suspenseful.

Keep it YouTube-friendly.

Return only the rewritten scene.

SCENE:
${scene}
`);
}

export async function makeSceneFunnier(scene) {
  return runEdit(`
Rewrite this stickman animation scene to make it funnier and more entertaining.

Keep the same basic story.

Return only the rewritten scene.

SCENE:
${scene}
`);
}