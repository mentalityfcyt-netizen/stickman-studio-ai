const styles = [
  {
    title: "🎥 Realistic",
    description: "Photorealistic AI generated videos."
  },
  {
    title: "🎬 Cinematic",
    description: "Movie-quality dramatic visuals."
  },
  {
    title: "🧍 Stickman",
    description: "Simple stickman animations."
  },
  {
    title: "⚽ Soccer",
    description: "Football highlight animations."
  },
  {
    title: "🎮 Roblox",
    description: "Roblox characters and worlds."
  },
  {
    title: "🧱 Minecraft",
    description: "Minecraft style storytelling."
  },
  {
    title: "🎌 Anime",
    description: "Anime inspired visuals."
  },
  {
    title: "🎨 Cartoon",
    description: "Family friendly cartoon style."
  }
];

function StyleStep({ style, setStyle }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Choose Visual Style
      </h2>

      <p className="mt-2 text-slate-400">
        Every AI prompt will automatically be optimized for this style.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {styles.map((item) => (
          <button
            key={item.title}
            onClick={() => setStyle(item.title)}
            className={`rounded-2xl border p-5 text-left transition ${
              style === item.title
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-slate-700 bg-slate-950 hover:bg-slate-800"
            }`}
          >
            <h3 className="font-bold text-lg">
              {item.title}
            </h3>

            <p className="mt-2 text-sm opacity-80">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StyleStep;