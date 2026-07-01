import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateImage(prompt) {
  try {
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    const base64Image = result.data[0].b64_json;

    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error(error);
    return null;
  }
}