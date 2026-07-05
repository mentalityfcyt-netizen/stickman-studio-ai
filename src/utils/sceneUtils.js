export function splitList(text) {
  return text
    ? text.split(/\n(?=\d+\.|\d+\)|Scene)/).filter((item) => item.trim() !== "")
    : [];
}

export function buildSceneObjects(sections, sceneImages = {}, sceneVideos = {}) {
  const scenes = splitList(sections?.scenes);
  const imagePrompts = splitList(sections?.imagePrompts);
  const videoPrompts = splitList(sections?.videoPrompts);

  return scenes.map((scene, index) => ({
    id: index + 1,
    title: `Scene ${index + 1}`,
    description: scene,
    imagePrompt: imagePrompts[index] || "",
    videoPrompt: videoPrompts[index] || "",
    imageUrl: sceneImages[index] || "",
    videoUrl: sceneVideos[index] || "",
    duration: 8,
  }));
}