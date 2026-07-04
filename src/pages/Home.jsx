import { useEffect, useState } from "react";
import {
  getProjects,
  deleteProject,
  toggleFavorite,
} from "../services/projectService";

import Input from "../components/ui/Input";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickStats from "../components/dashboard/QuickStats";
import ContinueProject from "../components/dashboard/ContinueProject";
import ProductionQueue from "../components/dashboard/ProductionQueue";
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

  const latestProject =
    sortedProjects.length > 0 ? sortedProjects[0] : null;

  async function handleFavorite(e, project) {
    e.stopPropagation();

    await toggleFavorite(project);

    await loadProjects();
  }

  async function handleDeleteProject(e, projectId) {
    e.stopPropagation();

    if (window.confirm("Delete this project?")) {
      await deleteProject(projectId);

      await loadProjects();
    }
  }

  function openLatestProject() {
    if (!latestProject) return;

    setCurrentProject(latestProject);

    setPage("project");
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        user={user}
        onNewProject={() => setPage("newProject")}
      />

      <QuickStats projects={projects} />

      <ContinueProject
        project={latestProject}
        onOpen={openLatestProject}
      />

      <ProductionQueue />

      <div>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search projects..."
        />
      </div>

      {loading && (
        <p className="text-center text-slate-400">
          Loading Projects...
        </p>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center">
          <h2 className="text-3xl font-bold">
            🎬 Ready to Create?
          </h2>

          <p className="mt-3 text-slate-400">
            Start your first VidoForge AI project.
          </p>
        </div>
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