import { useEffect, useState } from "react";
import {
  getProjects,
  deleteProject,
  toggleFavorite,
} from "../services/projectService";
import Input from "../components/ui/Input";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickStats from "../components/dashboard/QuickStats";
import ProjectGrid from "../components/dashboard/ProjectGrid";

function Home({ user, setPage, setCurrentProject }) {
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    setLoading(true);
    const userProjects = await getProjects(user.uid);
    setProjects(userProjects);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.favorite === b.favorite) return 0;
    return a.favorite ? -1 : 1;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    project.name.toLowerCase().includes(searchText.toLowerCase())
  );

  async function handleFavorite(event, project) {
    event.stopPropagation();
    await toggleFavorite(project);
    await loadProjects();
  }

  async function handleDeleteProject(event, projectId) {
    event.stopPropagation();

    if (window.confirm("Delete this project?")) {
      await deleteProject(projectId);
      await loadProjects();
    }
  }

  return (
    <div>
      <DashboardHeader
        user={user}
        onNewProject={() => setPage("newProject")}
      />

      <QuickStats projects={projects} />

      <Input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search projects..."
        className="mb-6"
      />

      {loading && (
        <p className="text-center text-slate-400">
          Loading projects...
        </p>
      )}

      {!loading && filteredProjects.length === 0 && (
        <p className="text-center text-slate-400">
          No projects found.
        </p>
      )}

      <ProjectGrid
        projects={filteredProjects}
        setCurrentProject={setCurrentProject}
        setPage={setPage}
        handleFavorite={handleFavorite}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
}

export default Home;