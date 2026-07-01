import StatsCard from "../StatsCard";

function QuickStats({ projects }) {
  const total = projects.length;
  const generated = projects.filter((p) => p.sections).length;
  const pending = total - generated;
  const favorites = projects.filter((p) => p.favorite).length;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Projects"
        value={total}
        subtitle="Library"
      />

      <StatsCard
        title="AI Generated"
        value={generated}
        subtitle="Completed"
      />

      <StatsCard
        title="Pending"
        value={pending}
        subtitle="Need AI"
      />

      <StatsCard
        title="Favorites"
        value={favorites}
        subtitle="Pinned"
      />
    </div>
  );
}

export default QuickStats;