import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateProject(title, idea, project = {}) {
  const prompt = `
You are VidoForge AI, an expert AI video producer.

Your job is to create a complete production package for ANY kind of video.

The user may request:
- realistic documentaries
- soccer animations
- Roblox stories
- Minecraft videos
- anime stories
- stickman animations
- educational videos
- cinematic short films
- news videos
- custom AI videos

Analyze the user's request and automatically choose the best production style.

PROJECT TITLE:
${title}

USER REQUEST:
${idea}

PROJECT SETTINGS:
Type: ${project.type || "Auto Detect"}
Style: ${project.style || "Auto Detect"}
Length: ${project.length || "Auto Detect"}
Voice: ${project.voice || "Auto Detect"}
Start From: ${project.startFrom || "Idea"}

Return ONLY these exact sections:

VIDEO_TYPE:
Identify the video type.

PRODUCTION_PLAN:
Briefly explain the creative direction, target style, pacing, and estimated structure.

SCRIPT:
Write the narration or dialogue script.

SCENES:
Create numbered scenes appropriate for the requested video length and type.

IMAGE_PROMPTS:
Create one detailed image prompt per scene. Match the detected style. If realistic documentary, use realistic cinematic documentary visuals. If Roblox, use Roblox style. If soccer, use soccer animation visuals. If stickman, use stickman visuals.

VIDEO_PROMPTS:
Create one detailed AI video generation prompt per scene. Include camera movement, action, mood, pacing, and style.

VOICE_NOTES:
Give narration voice, tone, emotion, pacing, and pauses.

CAMERA_DIRECTIONS:
Give camera angles, zooms, pans, cuts, and motion instructions.

MUSIC_AND_SOUND:
Give background music and sound effects.

THUMBNAIL_IDEA:
Give one strong YouTube thumbnail idea.

YOUTUBE_METADATA:
Give title ideas, description, hashtags, and tags.
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