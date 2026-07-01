import { Button } from "../ui";

function ProjectActions({
  onGenerate,
  loading,
  onExport,
  onGenerateEntireProject,
  fullProductionLoading,
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Button variant="primary" onClick={onGenerate}>
        {loading ? "Generating..." : "🎬 Generate"}
      </Button>

      <Button variant="purple" onClick={onGenerateEntireProject}>
        {fullProductionLoading ? "Producing..." : "🚀 Generate Entire Project"}
      </Button>

      <Button variant="success" onClick={onExport}>
        📤 Export
      </Button>
    </div>
  );
}

export default ProjectActions;