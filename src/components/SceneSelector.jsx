function SceneSelector({ scenes, selectedScene, setSelectedScene }) {
  const sceneList = scenes
    ? scenes.split(/\n(?=\d+\.|\d+\)|Scene)/).filter((item) => item.trim() !== "")
    : [];

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-bold">🎬 Scenes</h2>

      {sceneList.length === 0 && (
        <p className="text-sm text-slate-400">Generate first.</p>
      )}

      <div className="grid gap-3">
        {sceneList.map((scene, index) => (
          <button
            key={index}
            onClick={() => setSelectedScene(index)}
            className={`rounded-xl px-4 py-3 text-left font-bold transition ${
              selectedScene === index
                ? "bg-purple-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Scene {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SceneSelector;