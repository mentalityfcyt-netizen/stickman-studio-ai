import { Button, Card } from "../ui";

function DashboardHeader({ user, onNewProject }) {
  return (
    <Card className="mb-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-slate-400">Welcome back</p>

          <h1 className="mt-1 text-4xl font-bold">
            🎬 Stickman Studio AI
          </h1>

          <p className="mt-3 text-slate-400">
            Signed in as {user?.email}
          </p>
        </div>

        <Button variant="primary" onClick={onNewProject}>
          ➕ New Project
        </Button>
      </div>
    </Card>
  );
}

export default DashboardHeader;