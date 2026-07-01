import { useState } from "react";
import { saveProject } from "../services/projectService";
import { Button, Card, Input, Textarea } from "../components/ui";

function NewProject({ user, setPage, setCurrentProject }) {
  const [projectName, setProjectName] = useState("");
  const [videoIdea, setVideoIdea] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleGenerateProject() {
    if (!projectName.trim() || !videoIdea.trim()) {
      alert("Please enter a project name and video idea.");
      return;
    }

    setSaving(true);

    const newProject = await saveProject(
      {
        name: projectName,
        idea: videoIdea,
      },
      user.uid
    );

    setCurrentProject(newProject);
    setPage("project");
    setSaving(false);
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => setPage("home")} className="mb-6">
        ← Back to Library
      </Button>

      <Card>
        <h1 className="text-4xl font-bold">📁 New Project</h1>

        <p className="mt-2 text-slate-400">
          Start with one idea. Stickman Studio AI will turn it into a full video package.
        </p>

        <div className="mt-8">
          <label className="mb-2 block font-semibold">Project Name</label>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="POV: You're the Last Human Alive"
            className="bg-slate-950"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block font-semibold">Video Idea</label>
          <Textarea
            value={videoIdea}
            onChange={(e) => setVideoIdea(e.target.value)}
            rows={8}
            placeholder="Write your video idea here..."
            className="bg-slate-950"
          />
        </div>

        <Button
          variant="primary"
          onClick={handleGenerateProject}
          className="mt-6 text-lg"
        >
          {saving ? "Creating..." : "🚀 Create Project"}
        </Button>
      </Card>
    </div>
  );
}

export default NewProject;