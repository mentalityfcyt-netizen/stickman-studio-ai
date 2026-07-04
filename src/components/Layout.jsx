function Layout({ children, setPage }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="w-72 border-r border-slate-800 bg-slate-950 p-6">
        <h2 className="mb-2 text-3xl font-bold">
          🎬 VidoForge AI
        </h2>

        <p className="mb-8 text-sm text-slate-400">
          AI Video Production Studio
        </p>

        <button onClick={() => setPage("home")} className={navButton}>
          📁 Project Library
        </button>

        <button onClick={() => setPage("newProject")} className={navButton}>
          ➕ New Project
        </button>

        <button className={navButton}>
          🎥 Video Templates
        </button>

        <button className={navButton}>
          🤖 AI Studio
        </button>

        <button className={navButton}>
          ⭐ Favorites
        </button>

        <button className={navButton}>
          ⚙️ Settings
        </button>
      </aside>

      <main className="mx-auto w-full max-w-7xl flex-1 p-10">
        {children}
      </main>
    </div>
  );
}

const navButton =
  "mb-3 block w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-left text-white transition hover:bg-slate-800";

export default Layout;