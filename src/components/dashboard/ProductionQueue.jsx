import { Card } from "../ui";

function ProductionQueue() {
  const jobs = [
    { name: "AI Director", status: "Ready" },
    { name: "Images", status: "Ready" },
    { name: "Videos", status: "Coming Soon" },
    { name: "Voice", status: "Coming Soon" },
  ];

  return (
    <Card>
      <h2 className="mb-4 text-2xl font-bold">⚡ Production Queue</h2>

      <div className="grid gap-3">
        {jobs.map((job) => (
          <div
            key={job.name}
            className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3"
          >
            <span className="font-semibold">{job.name}</span>
            <span className="text-sm text-slate-400">{job.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProductionQueue;