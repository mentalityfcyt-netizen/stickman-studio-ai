import { useState } from "react";
import SceneSelector from "../SceneSelector";
import TimelineStudio from "../TimelineStudio";
import SceneEditor from "./SceneEditor";
import SceneCanvas from "./SceneCanvas";
import AICopilot from "./AICopilot";
import { generateImage } from "../../services/imageService";
import { rewriteScene } from "../../services/aiEditService";

function splitList(text) {
  return text
    ? text.split(/\n(?=\d+\.|\d+\)|Scene)/).filter((item) => item.trim() !== "")
    : [];
}

function Workspace({
  sections,
  selectedScene,
  setSelectedScene,
  sceneImages,
  onImagesChange,
  onSaveScene,
}) {
  const [copilotLoading, setCopilotLoading] = useState(false);

  const sceneList = splitList(sections?.scenes);
  const imagePromptList = splitList(sections?.imagePrompts);
  const videoPromptList = splitList(sections?.videoPrompts);

  async function handleGenerateImage() {
    const prompt = imagePromptList[selectedScene];

    if (!prompt) {
      alert("No image prompt found for this scene.");
      return;
    }

    const imageUrl = await generateImage(prompt);

    if (imageUrl) {
      onImagesChange({
        ...sceneImages,
        [selectedScene]: imageUrl,
      });
    }
  }

  async function handleCopilotSend(message) {
    const currentScene = sceneList[selectedScene];

    if (!currentScene) {
      alert("Generate a project first.");
      return;
    }

    setCopilotLoading(true);

    const rewritten = await rewriteScene(`
User request: ${message}

Current scene:
${currentScene}
`);

    await onSaveScene({
      index: selectedScene,
      scene: rewritten,
      imagePrompt: imagePromptList[selectedScene],
      videoPrompt: videoPromptList[selectedScene],
    });

    setCopilotLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr_360px]">
      <SceneSelector
        scenes={sections?.scenes}
        selectedScene={selectedScene}
        setSelectedScene={setSelectedScene}
      />

      <div className="grid gap-6">
        <SceneCanvas
          sceneNumber={selectedScene + 1}
          image={sceneImages[selectedScene]}
        />

        <SceneEditor
          scenes={sections?.scenes}
          imagePrompts={sections?.imagePrompts}
          videoPrompts={sections?.videoPrompts}
          selectedScene={selectedScene}
          onSaveScene={onSaveScene}
        />

        <TimelineStudio
          scenes={sections?.scenes}
          imagePrompts={sections?.imagePrompts}
          videoPrompts={sections?.videoPrompts}
          selectedScene={selectedScene}
        />
      </div>

      <div className="grid gap-6">
        <button
          onClick={handleGenerateImage}
          className="rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500"
        >
          🖼 Generate Scene Image
        </button>

        <AICopilot
          onSend={handleCopilotSend}
          loading={copilotLoading}
        />
      </div>
    </div>
  );
}

export default Workspace;