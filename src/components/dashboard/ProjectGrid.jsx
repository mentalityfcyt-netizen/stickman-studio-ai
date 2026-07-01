import ProjectCard from "../ProjectCard";

function ProjectGrid({
  projects,
 setCurrentProject,
  setPage,
  handleFavorite,
  handleDeleteProject,
}) {
  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpen={() => {
            setCurrentProject(project);
            setPage("project");
          }}
          onFavorite={(e) => handleFavorite(e, project)}
          onDelete={(e) => handleDeleteProject(e, project.id)}
        />
      ))}
    </div>
  );
}

export default ProjectGrid;