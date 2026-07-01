function SceneCanvas({ sceneNumber, image }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">🖼 Scene Canvas</h2>

      <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-950">
        {image ? (
          <img
            src={image}
            alt={`Scene ${sceneNumber}`}
            className="max-h-[340px] rounded-xl"
          />
        ) : (
          <p className="text-slate-500">
            No image yet for Scene {sceneNumber}
          </p>
        )}
      </div>
    </div>
  );
}

export default SceneCanvas;