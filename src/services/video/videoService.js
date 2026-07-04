import { generateGeminiVideo } from "./geminiVideoProvider";

export async function generateSceneVideo({
  scene,
  imagePrompt,
  videoPrompt,
  imageUrl,
}) {
  return generateGeminiVideo({
    prompt: videoPrompt || imagePrompt || scene,
    imageUrl,
  });
}