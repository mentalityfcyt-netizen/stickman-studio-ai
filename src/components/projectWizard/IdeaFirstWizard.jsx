import { useState } from "react";
import { Button, Card, Textarea } from "../ui";
import { analyzeVideoRequest } from "../../services/aiProducerService";
import AIProducerPreview from "./AIProducerPreview";

function IdeaFirstWizard({ onCreate, saving }) {
  const [idea, setIdea] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [plan, setPlan] = useState(null);

  async function handleAnalyze() {
    if (!idea.trim()) {
      alert("Describe the video you want to create.");
      return;
    }

    setAnalyzing(true);

    try {
      const result = await analyzeVideoRequest(idea);
      setPlan(result);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze idea.");
    }

    setAnalyzing(false);
  }

  function handleCreate() {
    if (!idea.trim()) {
      alert("Describe the video you want to create.");
      return;
    }

    onCreate({
      name: plan?.projectTitle || idea.slice(0, 60),
      idea,
      type: plan?.videoType || "AI Video Project",
      startFrom: "Idea",
      style: plan?.visualStyle || "Auto",
      length: plan?.length || "Auto",
      voice: plan?.voiceStyle || "Auto",
      targetAudience: plan?.targetAudience || "Auto",
      estimatedScenes: plan?.estimatedScenes || "Auto",
      productionSummary: plan?.productionSummary || "",
      recommendedTemplate: plan?.recommendedTemplate || "Auto",
    });
  }

  return (
    <div>
      <Card>
        <div className="text-center">
          <h1 className="text-5xl font-bold">🎬 VidoForge AI</h1>

          <p className="mt-4 text-xl text-slate-400">
            What do you want to create today?
          </p>
        </div>

        <div className="mt-10">
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={8}
            placeholder="Example: Make me a 5-minute documentary about Afghanistan..."
            className="bg-slate-950 text-lg"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300">
            📄 Paste Script
          </button>

          <button className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300">
            🎥 YouTube Link
          </button>

          <button className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300">
            📁 Upload PDF
          </button>

          <button className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300">
            🎬 Reference Video
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={handleAnalyze} variant="purple" className="text-lg">
            {analyzing ? "Analyzing..." : "🤖 Analyze Idea"}
          </Button>

          <Button onClick={handleCreate} variant="primary" className="text-lg">
            {saving ? "Creating..." : "🚀 Create Video Project"}
          </Button>
        </div>
      </Card>

      <AIProducerPreview plan={plan} />
    </div>
  );
}

export default IdeaFirstWizard;