import { Card, Button } from "../ui";

function ContinueProject({ project, onOpen }) {
  if (!project) {
    return (
      <Card className="mb-8">
        <h2 className="text-2xl font-bold">🚀 Start Creating</h2>
        <p className="mt-2 text-slate-400">
          Create your first AI video project.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mb-8 bg-gradient-to-br from-blue-950 to-slate-900">
      <p className="text-sm font-bold text-blue-300">Continue Working</p>

      <h2 className="mt-2 text-3xl font-bold">{project.name}</h2>

      <p className="mt-2 text-slate-300">
        {project.type || "AI Video Project"}
      </p>

      <div className="mt-5">
        <Button onClick={onOpen} variant="primary">
          ▶ Open Project
        </Button>
      </div>
    </Card>
  );
}

export default ContinueProject;