const lengths = [
  "30 Seconds",
  "1 Minute",
  "3 Minutes",
  "5 Minutes",
  "10 Minutes",
  "Custom",
];

function LengthStep({ length, setLength }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">Choose Video Length</h2>

      <p className="mt-2 text-slate-400">
        VidoForge will structure the script, scenes, and pacing around this length.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {lengths.map((item) => (
          <button
            key={item}
            onClick={() => setLength(item)}
            className={`rounded-2xl border p-5 text-left font-bold transition ${
              length === item
                ? "border-emerald-500 bg-emerald-600 text-white"
                : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800"
            }`}
          >
            ⏱ {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LengthStep;