function SceneCanvas({ sceneNumber, image, video }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">
        🎬 Scene {sceneNumber}
      </h2>

      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 p-6">

        {video ? (
          <div className="w-full">
            <video
              controls
              className="w-full rounded-xl"
            >
              <source src={video} type="video/mp4" />
            </video>

            <a
              href={video}
              download
              className="mt-5 block rounded-xl bg-blue-600 px-5 py-3 text-center font-bold text-white hover:bg-blue-500"
            >
              ⬇ Download Video
            </a>
          </div>
        ) : image ? (
          <img
            src={image}
            alt={`Scene ${sceneNumber}`}
            className="max-h-[380px] rounded-xl"
          />
        ) : (
          <p className="text-slate-500">
            Nothing generated yet.
          </p>
        )}

      </div>
    </div>
  );
}

export default SceneCanvas;