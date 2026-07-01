import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateProject(title, idea) {
  const prompt = `
You are an expert AI animation director for viral stickman YouTube videos.

Create a full production package for this video.

TITLE:
${title}

IDEA:
${idea}

Return ONLY these exact sections:

SCRIPT:
Write a dramatic YouTube narration script.

SCENES:
Create 8 numbered scenes. Include what happens in each scene.

IMAGE_PROMPTS:
Create 8 detailed image prompts, one for each scene.

VIDEO_PROMPTS:
Create 8 Google Flow animation prompts, one for each scene.

VOICE_NOTES:
Give voice-over pacing, emotion, tone, and pauses.

CAMERA_DIRECTIONS:
Give camera angles, zooms, pans, cuts, and movement for every scene.

MUSIC_AND_SOUND:
Give background music and sound effects for every scene.

THUMBNAIL_IDEA:
Give one viral YouTube thumbnail idea.

YOUTUBE_METADATA:
Give a YouTube description, hashtags, and tags.
`;

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