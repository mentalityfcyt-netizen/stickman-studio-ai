import { useState } from "react";
import { saveProject } from "../services/projectService";
import { Button } from "../components/ui";
import IdeaFirstWizard from "../components/projectWizard/IdeaFirstWizard";

function NewProject({ user, setPage, setCurrentProject }) {
  const [saving, setSaving] = useState(false);

  async function handleCreateProject(projectData) {
    setSaving(true);

    const newProject = await saveProject(projectData, user.uid);

    setCurrentProject(newProject);
    setPage("project");
    setSaving(false);
  }

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setPage("home")}
        className="mb-6"
      >
        ← Back to Dashboard
      </Button>

      <IdeaFirstWizard
        onCreate={handleCreateProject}
        saving={saving}
      />
    </div>
  );
}

export default NewProject;