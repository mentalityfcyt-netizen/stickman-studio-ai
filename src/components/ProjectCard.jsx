import Card from "./ui/Card";
import Button from "./ui/Button";

function ProjectCard({
  project,
  onOpen,
  onFavorite,
  onDelete,
}) {
  const sceneCount = project.sections?.scenes
    ? project.sections.scenes.split(/\n(?=\d+\.|\d+\)|Scene)/).filter(Boolean).length
    : 0;

  const createdDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <Card className="cursor-pointer transition hover:bg-slate-800">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div onClick={onOpen} className="flex-1">
          <h3 className="text-xl font-bold">
            {project.favorite ? "⭐" : "🎬"} {project.name}
          </h3>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
            <span>{project.sections ? "✅ AI Generated" : "⚪ Not generated"}</span>
            <span>🎬 {sceneCount} scenes</span>
            <span>📅 {createdDate}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onFavorite}>
            {project.favorite ? "⭐ Favorited" : "☆ Favorite"}
          </Button>

          <Button variant="danger" onClick={onDelete}>
            🗑 Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;