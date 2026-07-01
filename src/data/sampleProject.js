export function createSampleProject(projectName, videoIdea) {
  return {
    name: projectName,
    idea: videoIdea,
    script: "You wake up. The city is silent. Nobody is outside.",

    scenes: [
      {
        number: 1,
        narration: "You wake up in your room.",
        imagePrompt: "Stickman waking up in a dark bedroom.",
        videoPrompt: "Slow zoom toward the bed.",
        voicePrompt: "Calm, mysterious narrator voice.",
      },
      {
        number: 2,
        narration: "You look out the window.",
        imagePrompt: "Stickman looking out at an empty street.",
        videoPrompt: "Slow camera pan from window to street.",
        voicePrompt: "Quiet, suspenseful tone.",
      },
      {
        number: 3,
        narration: "The streets are completely empty.",
        imagePrompt: "Empty city street with no people or cars.",
        videoPrompt: "Wide cinematic shot, slow zoom out.",
        voicePrompt: "Dramatic pause before the last word.",
      },
    ],
  };
}