import { Card } from "../ui";

function AIProducerPreview({ plan }) {
  if (!plan) return null;

  return (
    <Card className="mt-6 bg-gradient-to-br from-purple-950 to-slate-900">
      <h2 className="text-2xl font-bold">🤖 VidoForge Producer Plan</h2>

      <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <p><strong>🎬 Title:</strong> {plan.projectTitle}</p>
        <p><strong>📌 Type:</strong> {plan.videoType}</p>
        <p><strong>🎨 Style:</strong> {plan.visualStyle}</p>
        <p><strong>⏱ Length:</strong> {plan.length}</p>
        <p><strong>🎙 Voice:</strong> {plan.voiceStyle}</p>
        <p><strong>👥 Audience:</strong> {plan.targetAudience}</p>
        <p><strong>🎞 Scenes:</strong> {plan.estimatedScenes}</p>
        <p><strong>🧩 Template:</strong> {plan.recommendedTemplate}</p>
      </div>

      <p className="mt-5 text-slate-300">
        {plan.productionSummary}
      </p>
    </Card>
  );
}

export default AIProducerPreview;