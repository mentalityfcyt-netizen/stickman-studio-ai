import { useState } from "react";
import { generateProject } from "../services/aiService";
import { generateImage } from "../services/imageService";
import { updateProject } from "../services/projectService";
import ProjectHeader from "../components/workspace/ProjectHeader";
import Workspace from "../components/workspace/Workspace";
import BottomTabs from "../components/workspace/BottomTabs";
import ProductionProgress from "../components/workspace/ProductionProgress";

function getSection(text, start, end) {
  return text.split(start)[1]?.split(end)[0]?.trim();
}

function splitAIResult(text) {
  return {
    script: getSection(text, "SCRIPT:", "SCENES:"),
    scenes: getSection(text, "SCENES:", "IMAGE_PROMPTS:"),
    imagePrompts: getSection(text, "IMAGE_PROMPTS:", "VIDEO_PROMPTS:"),
    videoPrompts: getSection(text, "VIDEO_PROMPTS:", "VOICE_NOTES:"),
    voiceNotes: getSection(text, "VOICE_NOTES:", "CAMERA_DIRECTIONS:"),
    cameraDirections: getSection(text, "CAMERA_DIRECTIONS:", "MUSIC_AND_SOUND:"),
    musicAndSound: getSection(text, "MUSIC_AND_SOUND:", "THUMBNAIL_IDEA:"),
    thumbnailIdea: getSection(text, "THUMBNAIL_IDEA:", "YOUTUBE_METADATA:"),
    youtubeMetadata: text.split("YOUTUBE_METADATA:")[1]?.trim(),
  };
}

function splitList(text) {
  return text
    ? text.split(/\n(?=\d+\.|\d+\)|Scene)/).filter((item) => item.trim() !== "")
    : [];
}

function joinList(list) {
  return list.join("\n");
}

const defaultPipelineSteps = [
  { label: "Generate AI Director Package", status: "waiting" },
  { label: "Create Script", status: "waiting" },
  { label: "Create Scenes", status: "waiting" },
  { label: "Create Image Prompts", status: "waiting" },
  { label: "Create Video Prompts", status: "waiting" },
  { label: "Create Voice Notes", status: "waiting" },
  { label: "Create Metadata", status: "waiting" },
  { label: "Generate Scene Images", status: "waiting" },
];

function Project({ project, goHome }) {
  const [sections, setSections] = useState(project?.sections || null);
  const [sceneImages, setSceneImages] = useState(project?.sceneImages || {});
  const [selectedScene, setSelectedScene] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fullProductionLoading, setFullProductionLoading] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState(defaultPipelineSteps);

  function updatePipeline(index, status) {
    setPipelineSteps((oldSteps) =>
      oldSteps.map((step, i) => (i === index ? { ...step, status } : step))
    );
  }

  async function handleGenerateAIProject() {
    setLoading(true);

    setPipelineSteps([
      { label: "Generate AI Director Package", status: "loading" },
      { label: "Create Script", status: "waiting" },
      { label: "Create Scenes", status: "waiting" },
      { label: "Create Image Prompts", status: "waiting" },
      { label: "Create Video Prompts", status: "waiting" },
      { label: "Create Voice Notes", status: "waiting" },
      { label: "Create Metadata", status: "waiting" },
      { label: "Generate Scene Images", status: "waiting" },
    ]);

    const result = await generateProject(project.name, project.idea);
    const splitSections = splitAIResult(result);

    updatePipeline(0, "done");
    updatePipeline(1, "done");
    updatePipeline(2, "done");
    updatePipeline(3, "done");
    updatePipeline(4, "done");
    updatePipeline(5, "done");
    updatePipeline(6, "done");

    setSections(splitSections);
    setSelectedScene(0);

    await updateProject({
      ...project,
      sections: splitSections,
      sceneImages,
    });

    setLoading(false);
  }

  async function handleGenerateEntireProject() {
    setFullProductionLoading(true);

    setPipelineSteps([
      { label: "Generate AI Director Package", status: "loading" },
      { label: "Create Script", status: "waiting" },
      { label: "Create Scenes", status: "waiting" },
      { label: "Create Image Prompts", status: "waiting" },
      { label: "Create Video Prompts", status: "waiting" },
      { label: "Create Voice Notes", status: "waiting" },
      { label: "Create Metadata", status: "waiting" },
      { label: "Generate Scene Images", status: "waiting" },
    ]);

    const result = await generateProject(project.name, project.idea);
    const splitSections = splitAIResult(result);

    updatePipeline(0, "done");
    updatePipeline(1, "done");
    updatePipeline(2, "done");
    updatePipeline(3, "done");
    updatePipeline(4, "done");
    updatePipeline(5, "done");
    updatePipeline(6, "done");
    updatePipeline(7, "loading");

    setSections(splitSections);
    setSelectedScene(0);

    const imagePrompts = splitList(splitSections.imagePrompts);
    const generatedImages = {};

    for (let i = 0; i < imagePrompts.length; i++) {
      const imageUrl = await generateImage(imagePrompts[i]);

      if (imageUrl) {
        generatedImages[i] = imageUrl;
        setSceneImages({ ...generatedImages });
      }
    }

    updatePipeline(7, "done");

    await updateProject({
      ...project,
      sections: splitSections,
      sceneImages: generatedImages,
    });

    setFullProductionLoading(false);
  }

  async function handleImagesChange(images) {
    setSceneImages(images);

    await updateProject({
      ...project,
      sections,
      sceneImages: images,
    });
  }

  async function handleSaveScene(updatedScene) {
    const scenesList = splitList(sections.scenes);
    const imagePromptList = splitList(sections.imagePrompts);
    const videoPromptList = splitList(sections.videoPrompts);

    scenesList[updatedScene.index] = updatedScene.scene;
    imagePromptList[updatedScene.index] = updatedScene.imagePrompt;
    videoPromptList[updatedScene.index] = updatedScene.videoPrompt;

    const updatedSections = {
      ...sections,
      scenes: joinList(scenesList),
      imagePrompts: joinList(imagePromptList),
      videoPrompts: joinList(videoPromptList),
    };

    setSections(updatedSections);

    await updateProject({
      ...project,
      sections: updatedSections,
      sceneImages,
    });

    alert("Scene saved!");
  }

  function exportProject() {
    if (!sections) {
      alert("Generate the AI project first.");
      return;
    }

    const fileText = `
${project.name}

IDEA:
${project.idea}

SCRIPT:
${sections.script}

SCENES:
${sections.scenes}

IMAGE PROMPTS:
${sections.imagePrompts}

VIDEO PROMPTS:
${sections.videoPrompts}

VOICE NOTES:
${sections.voiceNotes}

CAMERA:
${sections.cameraDirections}

MUSIC:
${sections.musicAndSound}

THUMBNAIL:
${sections.thumbnailIdea}

YOUTUBE:
${sections.youtubeMetadata}
`;

    const blob = new Blob([fileText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <ProjectHeader
        project={project}
        goHome={goHome}
        onGenerate={handleGenerateAIProject}
        loading={loading}
        onExport={exportProject}
        onGenerateEntireProject={handleGenerateEntireProject}
        fullProductionLoading={fullProductionLoading}
      />

      <ProductionProgress steps={pipelineSteps} />

      <Workspace
        sections={sections}
        selectedScene={selectedScene}
        setSelectedScene={setSelectedScene}
        sceneImages={sceneImages}
        onImagesChange={handleImagesChange}
        onSaveScene={handleSaveScene}
      />

      <BottomTabs sections={sections} />
    </div>
  );
}

export default Project;