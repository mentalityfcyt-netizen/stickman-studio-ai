import SceneSelector from "../SceneSelector";
import TimelineStudio from "../TimelineStudio";
import SceneEditor from "./SceneEditor";
import SceneCanvas from "./SceneCanvas";
import AIToolbox from "./AIToolbox";
import { generateImage } from "../../services/imageService";

function Workspace({
  sections,
  selectedScene,
  setSelectedScene,
  sceneImages,
  onImagesChange,
  onSaveScene,
}) {
  const hasImage = Boolean(sceneImages[selectedScene]);

  const imagePromptList = sections?.imagePrompts
    ? sections.imagePrompts
        .split(/\n(?=\d+\.|\d+\)|Scene)/)
        .filter((item) => item.trim() !== "")
    : [];

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

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr_320px]">
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

      <AIToolbox
        onGenerateImage={handleGenerateImage}
        hasImage={hasImage}
      />
    </div>
  );
}

export default Workspace;