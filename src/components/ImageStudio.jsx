import { useState } from "react";
import { generateImage } from "../services/imageService";

function ImageStudio({ prompts, savedImages = {}, onImagesChange }) {
  const [images, setImages] = useState(savedImages);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const promptList = prompts
    ? prompts.split(/\n(?=\d+\.|Scene)/).filter((p) => p.trim() !== "")
    : [];

  async function handleGenerateImage(prompt, index) {
    setLoadingIndex(index);

    const imageUrl = await generateImage(prompt);

    if (imageUrl) {
      const updatedImages = {
        ...images,
        [index]: imageUrl,
      };

      setImages(updatedImages);

      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
    } else {
      alert("Image generation failed.");
    }

    setLoadingIndex(null);
  }

  function downloadImage(imageUrl, index) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `scene-${index + 1}.png`;
    link.click();
  }

  return (
    <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg">
      <h2 className="mb-2 text-3xl font-bold">🎬 Scene Studio</h2>

      <p className="mb-6 text-slate-400">
        Generate and save images for each scene.
      </p>

      {promptList.length === 0 && (
        <p className="text-slate-400">Generate image prompts first.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {promptList.map((prompt, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
          >
            <h3 className="mb-3 text-xl font-bold">🎬 Scene {index + 1}</h3>

            {images[index] && (
              <img
                src={images[index]}
                alt={`Scene ${index + 1}`}
                className="mb-4 w-full rounded-xl border border-slate-700"
              />
            )}

            <p className="mb-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">
              {prompt}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleGenerateImage(prompt, index)}
                className="rounded-xl bg-purple-600 px-4 py-3 font-bold text-white transition hover:bg-purple-500"
              >
                {loadingIndex === index
                  ? "Generating..."
                  : images[index]
                  ? "🔄 Regenerate"
                  : "🖼 Generate Image"}
              </button>

              {images[index] && (
                <button
                  onClick={() => downloadImage(images[index], index)}
                  className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-500"
                >
                  ⬇ Download
                </button>
              )}
            </div>

            {images[index] && (
              <p className="mt-3 text-sm text-green-400">✅ Saved to project</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageStudio;