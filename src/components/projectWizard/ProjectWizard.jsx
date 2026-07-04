import { useState } from "react";
import { Button, Card, Input, Textarea } from "../ui";
import ProjectTypeStep from "./ProjectTypeStep";
import StartFromStep from "./StartFromStep";
import StyleStep from "./StyleStep";
import LengthStep from "./LengthStep";
import VoiceStep from "./VoiceStep";

function ProjectWizard({ onCreate, saving }) {
  const [step, setStep] = useState(1);

  const [projectType, setProjectType] = useState("🌍 Realistic Documentary");
  const [startFrom, setStartFrom] = useState("✍️ Write an Idea");
  const [style, setStyle] = useState("🎥 Realistic");
  const [length, setLength] = useState("5 Minutes");
  const [voice, setVoice] = useState("🎙 Male Narrator");
  const [projectName, setProjectName] = useState("");
  const [videoIdea, setVideoIdea] = useState("");

  function handleCreate() {
    onCreate({
      name: projectName,
      idea: videoIdea,
      type: projectType,
      startFrom,
      style,
      length,
      voice,
    });
  }

  return (
    <Card>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">🎬 Create New Video</h1>
          <p className="mt-2 text-slate-400">
            VidoForge will build your project around your chosen format.
          </p>
        </div>

        <p className="text-slate-400">Step {step} of 6</p>
      </div>

      {step === 1 && (
        <ProjectTypeStep projectType={projectType} setProjectType={setProjectType} />
      )}

      {step === 2 && (
        <StartFromStep startFrom={startFrom} setStartFrom={setStartFrom} />
      )}

      {step === 3 && <StyleStep style={style} setStyle={setStyle} />}

      {step === 4 && <LengthStep length={length} setLength={setLength} />}

      {step === 5 && <VoiceStep voice={voice} setVoice={setVoice} />}

      {step === 6 && (
        <div>
          <h2 className="text-3xl font-bold">Final Details</h2>

          <div className="mt-6">
            <label className="mb-2 block font-semibold">Project Name</label>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Example: 5-Minute Documentary About Afghanistan"
              className="bg-slate-950"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold">Video Idea</label>
            <Textarea
              value={videoIdea}
              onChange={(e) => setVideoIdea(e.target.value)}
              rows={8}
              placeholder="Describe the video you want VidoForge to create..."
              className="bg-slate-950"
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button
          variant="secondary"
          onClick={() => setStep(Math.max(1, step - 1))}
        >
          ← Back
        </Button>

        {step < 6 ? (
          <Button onClick={() => setStep(step + 1)}>Next →</Button>
        ) : (
          <Button onClick={handleCreate}>
            {saving ? "Creating..." : "🚀 Create Project"}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default ProjectWizard;