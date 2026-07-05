import { useEffect, useState } from "react";
import { Textarea } from "../ui";

function SceneEditor({ scene, selectedScene, onSaveScene }) {
  const [editedScene, setEditedScene] = useState("");
  const [editedImagePrompt, setEditedImagePrompt] = useState("");
  const [editedVideoPrompt, setEditedVideoPrompt] = useState("");

  useEffect(() => {
    setEditedScene(scene?.description || "");
    setEditedImagePrompt(scene?.imagePrompt || "");
    setEditedVideoPrompt(scene?.videoPrompt || "");
  }, [scene]);

  function handleSave() {
    onSaveScene({
      index: selectedScene,
      scene: editedScene,
      imagePrompt: editedImagePrompt,
      videoPrompt: editedVideoPrompt,
    });
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">
        ✏️ Scene Editor — Scene {selectedScene + 1}
      </h2>

      {!scene && (
        <p className="text-slate-400">
          Generate an AI package first.
        </p>
      )}

      {scene && (
        <div className="grid gap-5">
          <div>
            <label className="mb-2 block font-bold text-blue-400">
              📝 Scene Description
            </label>
            <Textarea
              value={editedScene}
              onChange={(e) => setEditedScene(e.target.value)}
              rows={5}
              className="bg-slate-950"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-purple-400">
              🖼 Image Prompt
            </label>
            <Textarea
              value={editedImagePrompt}
              onChange={(e) => setEditedImagePrompt(e.target.value)}
              rows={5}
              className="bg-slate-950"
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-emerald-400">
              🎥 Video Prompt
            </label>
            <Textarea
              value={editedVideoPrompt}
              onChange={(e) => setEditedVideoPrompt(e.target.value)}
              rows={5}
              className="bg-slate-950"
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