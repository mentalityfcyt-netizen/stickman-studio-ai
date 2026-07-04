import { useState } from "react";

function AIToolbox({
  onGenerateImage,
  hasImage,
  onImproveImagePrompt,
  onImproveVideoPrompt,
  onRewriteScene,
  onMakeScarier,
  onMakeFunnier,
}) {
  const [workingAction, setWorkingAction] = useState(null);

  async function runAction(actionName, actionFunction) {
    setWorkingAction(actionName);

    try {
      await actionFunction();
    } finally {
      setWorkingAction(null);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">🤖 AI Copilot</h2>

      <div className="grid gap-3">
        <button
          onClick={onGenerateImage}
          className="rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500"
        >
          {hasImage ? "🔄 Regenerate Image" : "🖼 Generate Image"}
        </button>

        <button
          onClick={() =>
            runAction("image", onImproveImagePrompt)
          }
          className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-500"
        >
          {workingAction === "image"
            ? "Improving..."
            : "✨ Improve Image Prompt"}
        </button>

        <button
          onClick={() =>
            runAction("video", onImproveVideoPrompt)
          }
          className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-500"
        >
          {workingAction === "video"
            ? "Improving..."
            : "🎬 Improve Video Prompt"}
        </button>

        <button
          onClick={() =>
            runAction("rewrite", onRewriteScene)
          }
          className="rounded-xl bg-slate-700 px-4 py-3 font-bold text-white hover:bg-slate-600"
        >
          {workingAction === "rewrite"
            ? "Rewriting..."
            : "✍️ Rewrite Scene"}
        </button>

        <button
          onClick={() =>
            runAction("scarier", onMakeScarier)
          }
          className="rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-500"
        >
          {workingAction === "scarier"
            ? "Making scarier..."
            : "😱 Make Scarier"}
        </button>

        <button
          onClick={() =>
            runAction("funnier", onMakeFunnier)
          }
          className="rounded-xl bg-yellow-600 px-4 py-3 font-bold text-white hover:bg-yellow-500"
        >
          {workingAction === "funnier"
            ? "Making funnier..."
            : "😂 Make Funnier"}
        </button>
      </div>
    </div>
  );
}

export default AIToolbox;