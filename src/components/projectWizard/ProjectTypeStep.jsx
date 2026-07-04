const projectTypes = [
  "🌍 Realistic Documentary",
  "🎥 Realistic AI Video",
  "⚽ Soccer Animation",
  "🎮 Roblox Story",
  "🧱 Minecraft Story",
  "🧍 Stickman Animation",
  "🎌 Anime Story",
  "📚 Educational Video",
  "🎬 Short Film",
  "🎨 Custom",
];

function ProjectTypeStep({ projectType, setProjectType }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">🎬 What do you want to create?</h2>

      <p className="mt-2 text-slate-400">
        Choose the type of video VidoForge should build.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setProjectType(type)}
            className={`rounded-2xl border p-5 text-left font-bold transition ${
              projectType === type
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProjectTypeStep;