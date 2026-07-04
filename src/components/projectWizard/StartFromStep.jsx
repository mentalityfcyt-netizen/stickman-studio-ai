const startOptions = [
  "✍️ Write an Idea",
  "📄 Paste a Script",
  "🎥 Paste a YouTube URL",
  "📁 Upload a PDF",
  "🖼 Upload Images",
  "🎬 Upload a Reference Video",
];

function StartFromStep({ startFrom, setStartFrom }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">How do you want to start?</h2>

      <p className="mt-2 text-slate-400">
        Choose what you want to give VidoForge as input.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {startOptions.map((option) => (
          <button
            key={option}
            onClick={() => setStartFrom(option)}
            className={`rounded-2xl border p-5 text-left font-bold transition ${
              startFrom === option
                ? "border-purple-500 bg-purple-600 text-white"
                : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartFromStep;