function StatsCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 text-center shadow-lg">
      <p className="text-slate-400">{title}</p>

      <h2 className="my-3 text-4xl font-bold text-white">{value}</h2>

      <p className="text-slate-400">{subtitle}</p>
    </div>
  );
}

export default StatsCard;