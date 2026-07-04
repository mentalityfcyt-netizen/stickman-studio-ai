export async function generateGeminiVideo({ prompt, imageUrl }) {
  console.log("Gemini video generation request:", {
    prompt,
    imageUrl,
  });

  return {
    status: "pending",
    videoUrl: null,
    message:
      "Gemini/Veo key connected. Backend video generation endpoint is next.",
  };
}