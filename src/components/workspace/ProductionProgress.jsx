import { Card } from "../ui";

function ProductionProgress({ steps = [] }) {
  return (
    <Card className="mb-6">
      <h2 className="mb-4 text-2xl font-bold">🚀 Production Pipeline</h2>

      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3"
          >
            <span className="font-semibold">{step.label}</span>

            <span
              className={
                step.status === "done"
                  ? "text-green-400"
                  : step.status === "loading"
                  ? "text-yellow-400"
                  : "text-slate-500"
              }
            >
              {step.status === "done"
                ? "✅ Done"
                : step.status === "loading"
                ? "⏳ Working..."
                : "Waiting"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProductionProgress;