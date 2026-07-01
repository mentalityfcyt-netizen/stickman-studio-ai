import { Button } from "../ui";
import ProjectActions from "./ProjectActions";

function ProjectHeader({
  project,
  goHome,
  onGenerate,
  loading,
  onExport,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <Button
        variant="secondary"
        onClick={goHome}
        className="mb-5"
      >
        ← Back to Library
      </Button>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">
            {project?.name}
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            {project?.idea}
          </p>
        </div>

        <ProjectActions
          onGenerate={onGenerate}
          loading={loading}
          onExport={onExport}
        />
      </div>
    </div>
  );
}

export default ProjectHeader;