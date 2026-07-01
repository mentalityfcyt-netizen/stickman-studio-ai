import { useEffect, useState } from "react";

function splitList(text) {
  return text
    ? text.split(/\n(?=\d+\.|\d+\)|Scene)/).filter((item) => item.trim() !== "")
    : [];
}

function SceneEditor({
  scenes,
  imagePrompts,
  videoPrompts,
  selectedScene,
  onSaveScene,
}) {
  const sceneList = splitList(scenes);
  const imagePromptList = splitList(imagePrompts);
  const videoPromptList = splitList(videoPrompts);

  const scene = sceneList[selectedScene] || "";
  const imagePrompt = imagePromptList[selectedScene] || "";
  const videoPrompt = videoPromptList[selectedScene] || "";

  const [editedScene, setEditedScene] = useState(scene);
  const [editedImagePrompt, setEditedImagePrompt] = useState(imagePrompt);
  const [editedVideoPrompt, setEditedVideoPrompt] = useState(videoPrompt);

  useEffect(() => {
    setEditedScene(scene);
    setEditedImagePrompt(imagePrompt);
    setEditedVideoPrompt(videoPrompt);
  }, [scene, imagePrompt, videoPrompt]);

  function handleSave() {
    onSaveScene({
      scene: editedScene,
      imagePrompt: editedImagePrompt,
      videoPrompt: editedVideoPrompt,
      index: selectedScene,
    });
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">
        ✏️ Scene Editor — Scene {selectedScene + 1}
      </h2>

      {!scene && (
        <p className="text-slate-400">Generate an AI Director Package first.</p>
      )}

      {scene && (
        <div className="grid gap-5">
          <div>
            <label className="mb-2 block font-bold text-blue-400">
              📝 Scene Description
            </label>
            <textarea
              value={editedScene}
              onChange={(e) => setEditedScene(e.target.value)}
              rows="5"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-200 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-purple-400">
              🖼 Image Prompt
            </label>
            <textarea
              value={editedImagePrompt}
              onChange={(e) => setEditedImagePrompt(e.target.value)}
              rows="5"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-200 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-emerald-400">
              🎥 Video Prompt
            </label>
            <textarea
              value={editedVideoPrompt}
              onChange={(e) => setEditedVideoPrompt(e.target.value)}
              rows="5"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-200 outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500"
          >
            💾 Save Scene
          </button>
        </div>
      )}
    </div>
  );
}

export default SceneEditor;