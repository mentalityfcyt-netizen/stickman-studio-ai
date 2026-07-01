function AIToolbox({ onGenerateImage, hasImage }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">🛠 AI Toolbox</h2>

      <div className="grid gap-3">
        <button
          onClick={onGenerateImage}
          className="rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500"
        >
          {hasImage ? "🔄 Regenerate Image" : "🖼 Generate Image"}
        </button>

        <button className="rounded-xl bg-slate-800 px-4 py-3 font-bold text-slate-400">
          🎥 Generate Video Soon
        </button>

        <button className="rounded-xl bg-slate-800 px-4 py-3 font-bold text-slate-400">
          🎙 Generate Voice Soon
        </button>

        <button className="rounded-xl bg-slate-800 px-4 py-3 font-bold text-slate-400">
          ✨ Improve Prompt Soon
        </button>
      </div>
    </div>
  );
}

export default AIToolbox;