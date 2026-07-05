const API = "http://localhost:5001";

export async function generateSceneVideo({
  scene,
  imagePrompt,
  videoPrompt,
  imageUrl,
}) {
  const response = await fetch(`${API}/api/video/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: videoPrompt || imagePrompt || scene,
      imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Video generation failed.");
  }

  return response.json();
}