import { useState } from "react";
import SceneSelector from "../SceneSelector";
import TimelineStudio from "../TimelineStudio";
import SceneEditor from "./SceneEditor";
import SceneCanvas from "./SceneCanvas";
import AICopilot from "./AICopilot";
import { generateImage } from "../../services/imageService";
import { rewriteScene } from "../../services/aiEditService";
import { generateSceneVideo } from "../../services/video/videoService";
import { buildSceneObjects } from "../../utils/sceneUtils";

function Workspace({
  sections,
  selectedScene,
  setSelectedScene,
  sceneImages,
  sceneVideos,
  onImagesChange,
  onVideosChange,
  onSaveScene,
}) {
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const scenes = buildSceneObjects(sections, sceneImages, sceneVideos);
  const currentScene = scenes[selectedScene];

  async function handleGenerateImage() {
    if (!currentScene?.imagePrompt) {
      alert("No image prompt found for this scene.");
      return;
    }

    const imageUrl = await generateImage(currentScene.imagePrompt);

    if (imageUrl) {
      onImagesChange({
        ...sceneImages,
        [selectedScene]: imageUrl,
      });
    }
  }

  async function handleGenerateVideo() {
    if (!currentScene) {
      alert("Generate a project first.");
      return;
    }

    setVideoLoading(true);

    try {
      const result = await generateSceneVideo({
        scene: currentScene.description,
        imagePrompt: currentScene.imagePrompt,
        videoPrompt: currentScene.videoPrompt,
        imageUrl: currentScene.imageUrl,
      });

      if (result.videoUrl) {
        onVideosChange({
          ...sceneVideos,
          [selectedScene]: result.videoUrl,
        });

        alert("Video generated successfully.");
      } else {
        alert(result.message || "Video request finished, but no video URL was returned.");
      }
    } catch (error) {
      console.error(error);
      alert("Video generation failed.");
    }

    setVideoLoading(false);
  }

  async function handleCopilotSend(message) {
    if (!currentScene) {
      alert("Generate a project first.");
      return;
    }

    setCopilotLoading(true);

    const rewritten = await rewriteScene(`
User request: ${message}

Current scene:
${currentScene.description}
`);

    await onSaveScene({
      index: selectedScene,
      scene: rewritten,
      imagePrompt: currentScene.imagePrompt,
      videoPrompt: currentScene.videoPrompt,
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
          image={currentScene?.imageUrl}
          video={currentScene?.videoUrl}
        />

        <SceneEditor
  scene={currentScene}
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

      <div className="grid gap-4">
        <button
          onClick={handleGenerateImage}
          className="rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500"
        >
          🖼 Generate Scene Image
        </button>

        <button
          onClick={handleGenerateVideo}
          className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-500"
        >
          {videoLoading ? "Generating Video..." : "🎥 Generate Scene Video"}
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