import { useState } from "react";
import { generateImage } from "../services/imageService";

function splitList(text) {
  return text
    ? text.split(/\n(?=\d+\.|\d+\)|Scene)/).filter((item) => item.trim() !== "")
    : [];
}

function ImageStudio({
  prompts,
  selectedScene,
  savedImages = {},
  onImagesChange,
}) {
  const [images, setImages] = useState(savedImages);
  const [loading, setLoading] = useState(false);

  const promptList = splitList(prompts);
  const prompt = promptList[selectedScene];

  async function handleGenerateImage() {
    if (!prompt) return;

    setLoading(true);

    const imageUrl = await generateImage(prompt);

    if (imageUrl) {
      const updatedImages = {
        ...images,
        [selectedScene]: imageUrl,
      };

      setImages(updatedImages);

      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
    }

    setLoading(false);
  }

  function downloadImage() {
    const image = images[selectedScene];

    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = `scene-${selectedScene + 1}.png`;
    link.click();
  }

  return (
    <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg">
      <h2 className="mb-2 text-3xl font-bold">🖼 Scene Image Studio</h2>

      <p className="mb-6 text-slate-400">
        Working on Scene {selectedScene + 1}
      </p>

      {!prompt && (
        <p className="text-slate-400">
          Generate an AI Director Package first.
        </p>
      )}

      {prompt && (
        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
          <h3 className="mb-3 text-xl font-bold">
            🎬 Scene {selectedScene + 1}
          </h3>

          {images[selectedScene] && (
            <img
              src={images[selectedScene]}
              alt={`Scene ${selectedScene + 1}`}
              className="mb-4 w-full rounded-xl border border-slate-700"
            />
          )}

          <p className="mb-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">
            {prompt}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerateImage}
              className="rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500"
            >
              {loading
                ? "Generating..."
                : images[selectedScene]
                ? "🔄 Regenerate"
                : "🖼 Generate Image"}
            </button>

            {images[selectedScene] && (
              <button
                onClick={downloadImage}
                className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-500"
              >
                ⬇ Download
              </button>
            )}
          </div>

          {images[selectedScene] && (
            <p className="mt-3 text-green-400">
              ✅ Image generated
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageStudio;